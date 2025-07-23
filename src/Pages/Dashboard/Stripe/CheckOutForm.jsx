// CheckoutForm.jsx
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ user, orgName, mission }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    const { data: existingRequest } = await axiosSecure.get(
      `/role-requests/${user.email}`
    );

    if (
      existingRequest &&
      (existingRequest.status === "Pending" ||
        existingRequest.status === "Approved")
    ) {
      Swal.fire({
        icon: "warning",
        title: "Already Requested",
        text: `You already have a ${existingRequest.status} charity request.`,
      });
      return; // stop further execution
    }

    try {
      // 1. Create payment intent
      const { data: clientSecretData } = await axiosSecure.post(
        "/create-payment-intent",
        { amount: 2500 }
      );

      // 2. Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecretData.clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              email: user?.email,
              name: user?.displayName || "Anonymous",
            },
          },
        }
      );

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const roleRequest = {
          name : user.displayName,
          email: user.email,
          organizationName: orgName,
          mission,
          transactionId: paymentIntent.id,
          status: "Pending",
        };

        const transaction = {
          transactionId: paymentIntent.id,
          amount: 25,
          date: new Date(),
          email: user.email,
          status: "pending",
        };

        // Save role request and transaction
        await axiosSecure.post("/role-requests", roleRequest);
        await axiosSecure.post("/transactions", transaction);

        Swal.fire({
          title: "Payment successfull!",
          icon: "success",
          draggable: true,
        });
        navigate("/dashboard/transactions");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded" />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay $25"}
      </button>
    </form>
  );
};

export default CheckoutForm;
