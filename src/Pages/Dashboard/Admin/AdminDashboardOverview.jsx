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
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Users", value: adminData.totalUsers },
          { title: "Donations", value: adminData.totalDonations },
          { title: "Requests", value: adminData.totalRequests },
          { title: "Charities", value: adminData.totalCharities },
        ].map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-xl shadow text-center bg-white dark:bg-[#1a1c2a] transition-colors"
          >
            <h3 className="text-gray-500 dark:text-gray-300 font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-[#f1f3fa]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Donations Line Chart */}
        <div className="p-6 bg-white rounded-xl shadow dark:bg-[#1a1c2a] transition-colors">
          <h3 className="text-gray-800 dark:text-[#f1f3fa] font-bold mb-4">Weekly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminData.weeklyDonations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#0c0e18" darkColor="#f1f3fa" />
              <YAxis stroke="#0c0e18" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#00C49F"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Request Status Pie Chart */}
        <div className="p-6 bg-white rounded-xl shadow dark:bg-[#1a1c2a] transition-colors">
          <h3 className="text-gray-800 dark:text-[#f1f3fa] font-bold mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={adminData.requestStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {adminData.requestStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#0c0e18" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Donations Pie Chart */}
      <div className="mt-6 p-6 bg-white rounded-xl shadow dark:bg-[#1a1c2a] transition-colors">
        <h3 className="text-gray-800 dark:text-[#f1f3fa] font-bold mb-4">Featured Donations</h3>
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
            <Legend wrapperStyle={{ color: "#0c0e18" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
