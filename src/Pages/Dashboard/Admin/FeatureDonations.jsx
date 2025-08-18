import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useState } from "react";

const FeatureDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [featuredIds, setFeaturedIds] = useState([]);

  // Get only verified donations
  const {
    data: verifiedDonations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      const allDonations = res.data;
      const verified = allDonations.filter(
        (item) => item.status === "Verified"
      );
      return verified;
    },
  });

  // Mutation for featuring donation
  const featureDonation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      setFeaturedIds((prev) => [...prev, id]); // ✅ disable after success
      queryClient.invalidateQueries({ queryKey: ["verifiedDonations"] });
      Swal.fire(
        "Featured!",
        "The donation has been added to homepage.",
        "success"
      );
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to feature the donation.", "error");
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-2xl font-bold mb-6">Feature Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-black">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {verifiedDonations.map((donation) => (
              <tr key={donation._id}>
                <td>
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td>{donation.title}</td>
                <td>{donation.food_type}</td>
                <td>{donation.restaurant_name}</td>
                <td>
                  <button
                    disabled={donation.isFeatured}
                    onClick={() => featureDonation.mutate(donation._id)}
                    className={`px-3 py-1 rounded text-white ${
                      donation.isFeatured
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {donation.isFeatured ? "Featured" : "Feature"}
                  </button>
                </td>
              </tr>
            ))}
            {verifiedDonations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Verified Donations Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
