// src/components/Dashboard.js
import React from "react";
import RevenueCharts from "../components/LocationRevenueCharts";
import JobCharts from "../components/JobTypeRevenueChart";
const data = [
  {
    number: "95875054",
    content: "Total Revenue",
  },
  { number: "24536", content: "Total Job Average" },
  { number: "3236", content: "Tickets Created" },
  { number: "426", content: "Tickets Scheduled" },
  { number: "565", content: "Outstanding Amount" },
  { number: "603", content: "Memberships Sold" },
  { number: "72", content: "Jobs Completed" },
  { number: "81", content: "Total Cancelled" },
];

const Dashboard = () => {
  return (
    <>
      <section>
        <div className=" mx-12 items-center justify-center mt-16">
          <h1 className="mb-4 font-semibold">Company Matrix</h1>
          <div className="grid grid-cols-4 gap-x-16 gap-y-8">
            {data.map((card) => (
              <div
                key={card.number}
                className="bg-white p-4 rounded shadow-md w-64"
              >
                <h2 className=" font-bold mb-2"> {card.number}</h2>
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-12">
        <div className="grid grid-cols-2 gap-8 mx-20">
        <div className="">
          <RevenueCharts />
        </div>
        <div className="">
          <JobCharts />
        </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
