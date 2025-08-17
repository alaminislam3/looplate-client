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

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28"];

const adminData = {
  totalUsers: 1200,
  totalDonations: 540,
  totalRequests: 180,
  totalCharities: 20,
  weeklyDonations: [
    { day: "Mon", donations: 50 },
    { day: "Tue", donations: 80 },
    { day: "Wed", donations: 45 },
    { day: "Thu", donations: 90 },
    { day: "Fri", donations: 70 },
    { day: "Sat", donations: 60 },
    { day: "Sun", donations: 100 },
  ],
  requestStatus: [
    { name: "Approved", value: 120 },
    { name: "Pending", value: 40 },
    { name: "Rejected", value: 20 },
  ],
  featureDonations: [
    { name: "Food Packets", value: 200 },
    { name: "Clothes", value: 150 },
    { name: "Medical Kits", value: 90 },
  ],
};

const AdminDashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Users</h3>
          <p className="text-2xl font-bold text-gray-800">{adminData.totalUsers}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Donations</h3>
          <p className="text-2xl font-bold text-gray-800">{adminData.totalDonations}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Requests</h3>
          <p className="text-2xl font-bold text-gray-800">{adminData.totalRequests}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h3 className="text-gray-500 font-semibold">Charities</h3>
          <p className="text-2xl font-bold text-gray-800">{adminData.totalCharities}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Donations Line Chart */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-800 font-bold mb-4">Weekly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminData.weeklyDonations}>
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

        {/* Request Status Pie Chart */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-gray-800 font-bold mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={adminData.requestStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {adminData.requestStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Donations Pie Chart */}
      <div className="mt-6 p-6 bg-white rounded-xl shadow">
        <h3 className="text-gray-800 font-bold mb-4">Featured Donations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={adminData.featureDonations}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {adminData.featureDonations.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
