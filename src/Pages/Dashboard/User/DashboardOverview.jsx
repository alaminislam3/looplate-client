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

const COLORS = ["#435cd1", "#8c9eee", "#4d6bf4"]; // Dark mode friendly colors

const overviewData = {
  users: 1200,
  restaurants: 45,
  charities: 20,
  donations: 540,
  weeklyDonations: [
    { day: "Mon", donations: 50 },
    { day: "Tue", donations: 80 },
    { day: "Wed", donations: 45 },
    { day: "Thu", donations: 90 },
    { day: "Fri", donations: 70 },
    { day: "Sat", donations: 60 },
    { day: "Sun", donations: 100 },
  ],
  donationStatus: [
    { name: "Completed", value: 400 },
    { name: "Pending", value: 100 },
    { name: "Rejected", value: 40 },
  ],
};

const DashboardOverview = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Users", value: overviewData.users },
          { label: "Restaurants", value: overviewData.restaurants },
          { label: "Charities", value: overviewData.charities },
          { label: "Donations", value: overviewData.donations },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-[#1a1c28] rounded-xl shadow text-center transition-colors"
          >
            <h3 className="text-gray-500 dark:text-[#8c9eee] font-semibold">{item.label}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-[#f1f3fa]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-6 bg-white dark:bg-[#1a1c28] rounded-xl shadow transition-colors">
          <h3 className="text-gray-800 dark:text-[#f1f3fa] font-bold mb-4">Weekly Donations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overviewData.weeklyDonations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="day" stroke="#0c0e18" className="dark:text-[#f1f3fa]" />
              <YAxis stroke="#0c0e18" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#435cd1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white dark:bg-[#1a1c28] rounded-xl shadow transition-colors">
          <h3 className="text-gray-800 dark:text-[#f1f3fa] font-bold mb-4">Donation Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overviewData.donationStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {overviewData.donationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#0c0e18", dark: { color: "#f1f3fa" } }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
