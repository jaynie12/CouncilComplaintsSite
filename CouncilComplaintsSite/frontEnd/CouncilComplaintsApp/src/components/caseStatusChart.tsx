import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

//https://medium.com/@vprince001/creating-dynamic-and-interactive-charts-in-react-using-recharts-18ebab12bd03
const PieChartComponent: React.FC = () => {
  type ChartData = {
    status: string;
    total: number;
  };

  const [caseStatus, setCaseStatus] = useState<ChartData[] | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/count-case-status/")
      .then((response) => {
        console.log("API Response:", response.data);
        setCaseStatus(response.data.length > 0 ? response.data : null);
      })
      .catch((error) => {
        console.error("Error fetching case counts:", error);
        setCaseStatus(null);
      });
  }, []);

  return (
    <div>  <h2 className="text-center">Case Statuses</h2>
      <ResponsiveContainer width="100%" height={400}>
        {caseStatus && caseStatus.length > 0 ? (
          <PieChart>
            <Pie
              dataKey="total"
              data={caseStatus}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={({ status, total }) => `${status}: ${total}`}
            />
            <Tooltip />
          </PieChart>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
