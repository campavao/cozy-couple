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
    case "invoice.payment_succeeded":
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
      return NextResponse.json(
        { message: "Checkout session completed and saved" },
        { status: 200 }
      );
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
    case "invoice.payment_failed":
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
      return NextResponse.json(
        { message: "Customer subscription deleted successfully" },
        { status: 200 }
      );
    }
    default:
      console.warn(`Handled event type ${event.type}`);
      return NextResponse.json({ message: "success" }, { status: 200 });
  }
}

const onCheckoutComplete = async (
  event:
    | Stripe.CheckoutSessionCompletedEvent
    | Stripe.InvoicePaymentSucceededEvent
) => {
  try {
    const stripeId = event.id;
    const stripeSubscriptionIdRaw = event.data.object.subscription;
    const stripeSubscriptionId =
      typeof stripeSubscriptionIdRaw === "string"
        ? stripeSubscriptionIdRaw
        : stripeSubscriptionIdRaw?.id;

    const userId =
      event.type === "checkout.session.completed"
        ? event.data.object.client_reference_id
        : null;

    const stripeEmail =
      event.data.object.customer_email ??
      (event.type === "checkout.session.completed"
        ? event.data.object.customer_details?.email
        : event.data.object.customer_email);

    const customerId =
      typeof event.data.object.customer === "string"
        ? event.data.object.customer
        : event.data.object.customer?.id;

    if (!stripeSubscriptionId) {
      return NextResponse.json(
        { error: "Subscription not found " },
        { status: 404 }
      );
    }

    await upsertDocument<
      Stripe.CheckoutSessionCompletedEvent | Stripe.InvoicePaymentSucceededEvent
    >("checkout_sessions", event, stripeId);

    if (userId) {
      await updateDocument("users", userId, {
        isPremium: true,
        stripeId: stripeSubscriptionId,
        customerId: customerId,
      });
      return true;
    }

    if (customerId) {
      const [user] = await getDocuments<User>("users", [
        {
          fieldPath: "customerId",
          opStr: "==",
          value: customerId,
        },
      ]);

      if (user?.id) {
        await updateDocument("users", user.id, {
          isPremium: true,
          stripeId: stripeSubscriptionId,
          customerId: customerId,
        });

        return true;
      } else {
        console.error("couldnt find user for customerId", customerId);
      }
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
          customerId: customerId,
        });

        return true;
      } else {
        console.error("couldnt find user for email", stripeEmail);
      }
    } else {
      console.error("no email found for session, creating");
    }

    if (customerId)
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
    | Stripe.InvoicePaymentFailedEvent
) => {
  const subscriptionId = event.data.object.id;
  let [user] = await getDocuments<User>("users", [
    {
      fieldPath: "stripeId",
      opStr: "==",
      value: subscriptionId,
    },
  ]);

  if (!user?.id) {
    console.error(
      "No user found for subscription ID, trying customerId",
      subscriptionId
    );
    const customerId =
      typeof event.data.object.customer === "string"
        ? event.data.object.customer
        : event.data.object.customer?.id;

    if (!customerId) {
      console.error("No customer ID found");
      return false;
    }

    const [customerUser] = await getDocuments<User>("users", [
      {
        fieldPath: "customerId",
        opStr: "==",
        value: customerId,
      },
    ]);

    if (!customerUser) {
      console.error("No customer found for customerId", customerId);
      return false;
    }

    user = customerUser;
  }

  await updateDocument("users", user.id, {
    isPremium: false,
    stripeId: null,
  });

  return true;
};
