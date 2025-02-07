import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const getStripe = async () => {
  if (stripePromise == null) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

export default getStripe;
