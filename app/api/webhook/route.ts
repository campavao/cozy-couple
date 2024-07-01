import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertDocument } from "../firebase/upsertDocument";
import updateDocument from "../firebase/updateData";
import { getDocuments } from "../firebase/get";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, endpointSecret!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const savedSession = await onCheckoutComplete(event);
      if (!savedSession) {
        return NextResponse.json(
          {
            error: "Unable to save checkout session",
          },
          {
            status: 500,
          }
        );
      }
      return NextResponse.json({ message: "Checkout session completed and saved" }, { status: 200 });
    }
    // case "customer.subscription.updated": {
    //   const savedSession = await onUpdateSubscription(event);
    //   if (!savedSession) {
    //     return NextResponse.json(
    //       {
    //         error: "Unable to update customer subscription",
    //       },
    //       {
    //         status: 500,
    //       }
    //     );
    //   }
    // }
    case "customer.subscription.deleted": {
      const savedSession = await onDeleteSubscription(event);
      if (!savedSession) {
        return NextResponse.json(
          {
            error: "Unable to delete customer subscription",
          },
          {
            status: 500,
          }
        );
      }
      return NextResponse.json({ message: "Customer subscription deleted successfully" }, { status: 200 });
    }
    default:
      console.warn(`Handled event type ${event.type}`);
      return NextResponse.json({ message: "success" }, { status: 200 });
  }
}

const onCheckoutComplete = async (
  event: Stripe.CheckoutSessionCompletedEvent
) => {
  try {
    const stripeId = event.id;
    const stripeSubscriptionIdRaw = event.data.object.subscription;
    const stripeSubscriptionId =
      typeof stripeSubscriptionIdRaw === "string"
        ? stripeSubscriptionIdRaw
        : stripeSubscriptionIdRaw?.id;

    const userId = event.data.object.client_reference_id;
    const stripeEmail =
      event.data.object.customer_email ??
      event.data.object.customer_details?.email;

    if (!stripeSubscriptionId) {
      return NextResponse.json(
        { error: "Subscription not found " },
        { status: 404 }
      );
    }

    await upsertDocument("checkout_sessions", event, stripeId);

    if (userId) {
      await updateDocument("users", userId, {
        isPremium: true,
        stripeId: stripeSubscriptionId,
      });
      return true;
    }

    if (stripeEmail) {
      const [user] = await getDocuments<User>("users", [
        {
          fieldPath: "email",
          opStr: "==",
          value: stripeEmail,
        },
      ]);

      if (user?.id) {
        await updateDocument("users", user.id, {
          isPremium: true,
          stripeId: stripeSubscriptionId,
        });
        return true;
      } else {
        console.error("couldnt find user for email", stripeEmail);
      }
    } else {
      console.error("no email found for session, creating");
    }

    console.error(
      "error fufilling orders for",
      JSON.stringify(event.data.object)
    );
    return false;
  } catch (err) {
    console.error("error onCheckoutComplete", err);
    return false;
  }
};

const onUpdateSubscription = async (
  event:
    | Stripe.CheckoutSessionCompletedEvent
    | Stripe.CustomerSubscriptionUpdatedEvent
) => {
  return event;
};

const onDeleteSubscription = async (
  event:
    | Stripe.CheckoutSessionCompletedEvent
    | Stripe.CustomerSubscriptionDeletedEvent
    | Stripe.CustomerSubscriptionUpdatedEvent
) => {
  const subscriptionId = event.data.object.id;
  const [user] = await getDocuments<User>("users", [
    {
      fieldPath: "stripeId",
      opStr: "==",
      value: subscriptionId,
    },
  ]);

  if (!user?.id) {
    console.error("No user found for subscription ID", subscriptionId);
    return false;
  }

  await updateDocument("users", user.id, {
    isPremium: false,
    stripeId: null,
  });

  return true;
};
