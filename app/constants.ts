export const constants = {
  checkout:
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_8wM01L0DI5G126A6oo"
      : "https://buy.stripe.com/eVabMo0pp2zZ24geUU",
  supportEmail: "fliptrackcouch@gmail.com",
};
