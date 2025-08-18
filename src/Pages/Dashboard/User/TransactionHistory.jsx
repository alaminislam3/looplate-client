import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";


const TransactionHistory = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if email exists
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto ">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount ($)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={trx._id}>
                  <td>{index + 1}</td>
                  <td>{trx.transactionId}</td>
                  <td>{trx.amount}</td>
                  <td>{new Date(trx.date).toLocaleDateString()}</td>
                  <td className="capitalize">{trx.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
