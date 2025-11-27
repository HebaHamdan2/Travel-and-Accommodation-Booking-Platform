export const userDetailsInfo = {
  fullName: "Heba Hamdan",
  email: "heba@test.com",
  paymentMethod: "PayPal",
  specialRequests: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
};
export const invalidEmailUser = {
  fullName: "Heba",
  email: "heba",
};
export const invalidCreditCardInfo = {
  fullName: "test",
  email: "test@test.com",
  paymentMethod: "credit card",
  specialRequests: "",
  cardNumber: "123",
  cardExpiry: "13/99",
  cardCvv: "0",
};
export const validCreditCardInfo = {
  fullName: "test",
  email: "test@test.com",
  paymentMethod: "Credit Card",
  specialRequests: "",
  cardNumber: "2111111111111111",
  cardExpiry: "12/30",
  cardCvv: "2222",
};
