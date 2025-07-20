import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';


const Featured = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ['featured-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/fourcard');
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p className="text-center text-red-500 py-10">Something went wrong!</p>;

  return (
    <section className="px-4 md:px-8 lg:px-16 md:py-20 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-10  text-center text-primary">Pick from Today’s Specials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4  flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{donation.food_type}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Restaurant:</span> {donation.restaurant_name}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {donation.location}
              </p>
              <p className="mt-auto mb-3">
                <span className="inline-block text-sm font-medium px-2 py-1 rounded-full 
                  bg-green-100 text-green-700">
                  {donation.status}
                </span>
              </p>
              <Link
                to={`/donation/${donation._id}`}
                className="mt-auto inline-block text-center bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
