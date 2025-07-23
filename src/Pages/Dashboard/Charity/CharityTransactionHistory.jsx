import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";

const CharityTransactionHistory = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charitytransactions");
      return res.data;
    },
  });

  
  if (isError) return <p>Failed to load transaction history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Charity Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={txn._id}>
                <td>{index + 1}</td>
                <td>{txn.transactionId || "N/A"}</td>
                <td>{txn.amount || "N/A"} ৳</td>
                <td>{txn.date}</td>
                <td>{txn.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharityTransactionHistory;
