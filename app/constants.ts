export const constants = {
  checkout:
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_8wM01L0DI5G126A6oo"
      : "https://buy.stripe.com/test_7sI01LgCG3xT12waEF", // TODO update this for prod
};
