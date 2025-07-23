// RequestCharity.jsx
import { useState } from "react";
import CheckoutForm from "../Stripe/CheckOutForm";
import StripeProvider from "../Stripe/StripeProvider";
import UseAuth from "../../../Hooks/UseAuth";


const RequestCharityRole = () => {
  const { user } = UseAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input value={user?.displayName} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">User Email</label>
          <input value={user?.email} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Organization Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mission Statement</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            required
          />
        </div>
      </div>

      <StripeProvider>
        <CheckoutForm user={user} orgName={orgName} mission={mission} />
      </StripeProvider>
    </div>
  );
};

export default RequestCharityRole;
