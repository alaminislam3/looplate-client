import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllDonations = () => {
  const axiosSecure = UseAxiosSecure();

  const {data: donations = [],isLoading,isError,} = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations?status=Verified");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load donations.
      </p>
    );

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="bg-white rounded-xl shadow md:p-10 p-5 space-y-2 "
        >
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-semibold">{donation.title}</h2>
          <p>
            <strong>Restaurant:</strong> {donation.restaurant_name}
          </p>
          <p>
            <strong>Location:</strong> {donation.location}
          </p>
          <p>
            <strong>Charity:</strong>{" "}
            {donation.charityName ? donation.charityName : "Not Assigned Yet"}
          </p>
          <p>
            <strong>Status:</strong> {donation.status}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>

          <Link
            to={`/donation-details/${donation._id}`}
            className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-sky-400 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllDonations;
