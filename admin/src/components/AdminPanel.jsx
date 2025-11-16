import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { backendUrl } from "../App";

Chart.register(...registerables);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/admin/sum/sales");

        console.log("Sales Response:", res.data);

        // Backend → res.data.sales
        const salesArray = res.data.sales || [];

        // Convert month number → month names
        const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const months = salesArray.map((item) => MONTH_NAMES[item.month - 1]);
        const totals = salesArray.map((item) => item.totalSales);

        setSalesData({
          labels: months,
          datasets: [
            {
              label: "Monthly Sales",
              data: totals,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  const stockData = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        data: [300, 50, 20],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const recentOrders = [
    { id: 1234, customer: "Aditya Joshi", status: "Pending" },
    { id: 1235, customer: "Fatima Khan", status: "Shipped" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome back, Admin!
            </h2>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Sales Trends
                </h3>
                <Bar data={salesData} />
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Inventory Status
                </h3>
                <Pie data={stockData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
