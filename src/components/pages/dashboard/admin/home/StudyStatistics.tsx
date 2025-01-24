import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Dropdown } from "flowbite-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Sun",
    Business: 1500,
    Branding: 2000,
    Design: 3000,
  },
  {
    name: "Mon",
    Business: 2000,
    Branding: 3000,
    Design: 2700,
  },
  {
    name: "Tue",
    Business: 2200,
    Branding: 4000,
    Design: 1000,
  },
  {
    name: "Wed",
    Business: 4000,
    Branding: 3000,
    Design: 1000,
  },
  {
    name: "Thur",
    Business: 1890,
    Branding: 4800,
    Design: 4181,
  },
  {
    name: "Fri",
    Business: 2890,
    Branding: 3800,
    Design: 2500,
  },
  {
    name: "Sat",
    Business: 1490,
    Branding: 2300,
    Design: 4100,
  },
];

export default function StudyStatistics() {
  return (
    <>
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="font-semibold text-xl">Study Statistics</h3>
        <div className="flex gap-2 items-center">
          <p className="text-gray-300">Short By:</p>
          <Dropdown label="Monthly" dismissOnClick={false}>
            <Dropdown.Item>Days</Dropdown.Item>
            <Dropdown.Item>Weeks</Dropdown.Item>
            <Dropdown.Item>Months</Dropdown.Item>
            <Dropdown.Item>Year</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className=" w-full h-80">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="left"
              height={30}
              width={280}
              iconType="circle"
            />
            <Line dataKey="Branding" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line dataKey="Design" stroke="#D88ff8" activeDot={{ r: 8 }} />
            <Line dataKey="Business" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
