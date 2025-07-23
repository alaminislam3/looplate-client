import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const MyPickup = () => {
  
  const axiosSecure = UseAxiosSecure();

  // ✅ Fetch all accepted donation requests
  const { data: receivedDonations = [], isLoading } = useQuery({
    queryKey: ["receivedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationrequests/pickedup");
      return res.data;
    }
  });

  const handleConfirmPickup = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Pickup?",
      text: "Are you sure you picked it up?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
    });
    
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donationrequests/pickup/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Pickup confirmed.", "success");
          refetch();
        }
        console.log(res.data);
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) {
    return <Loading> </Loading>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📦 My Pickups</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {receivedDonations.map((item) => (
          <div key={item._id} className="border rounded-xl p-4 shadow bg-white">
            <h3 className="text-lg font-bold mb-1">🍽 {item.donationtitle}</h3>
            <p><strong>Restaurant:</strong> {item.requesterName}</p>
            
            <p><strong>Food Type:</strong> {item.foodtype}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Pickup Time:</strong> {item.time}</p>
            <p><strong>Status:</strong> 
              <span className="text-orange-600 font-medium"> {item.status}</span>
            </p>
            {item.status === "assigned" && (
              <button
                onClick={() => handleConfirmPickup(item._id)}
                className="mt-3 px-4 py-2 bg-primary hover:bg-sky-500 text-white rounded"
              >
                ✅ Confirm Pickup
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPickup;
