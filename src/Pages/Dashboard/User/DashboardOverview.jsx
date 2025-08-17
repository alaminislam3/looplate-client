import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const overviewData = {
  users: 1200,             // Total users
  restaurants: 45,         // Restaurants contributing
  charities: 20,           // Charity organizations receiving food
  donations: 540,          // Total donations made
  weeklyDonations: [       // Weekly donation trend
    { day: "Mon", donations: 50 },
    { day: "Tue", donations: 80 },
    { day: "Wed", donations: 45 },
    { day: "Thu", donations: 90 },
    { day: "Fri", donations: 70 },
    { day: "Sat", donations: 60 },
    { day: "Sun", donations: 100 },
  ],
  donationStatus: [        // Donation distribution
    { name: "Completed", value: 400 },
    { name: "Pending", value: 100 },
    { name: "Rejected", value: 40 },
  ],
};

const DashboardOverview = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Users</h3>
          <p className="text-2xl font-bold text-gray-800">{overviewData.users}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Restaurants</h3>
          <p className="text-2xl font-bold text-gray-800">{overviewData.restaurants}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Charities</h3>
          <p className="text-2xl font-bold text-gray-800">{overviewData.charities}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Donations</h3>
          <p className="text-2xl font-bold text-gray-800">{overviewData.donations}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart for Weekly Donations */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-800 font-bold mb-4">Weekly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overviewData.weeklyDonations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Donation Status */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-800 font-bold mb-4">Donation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overviewData.donationStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {overviewData.donationStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
