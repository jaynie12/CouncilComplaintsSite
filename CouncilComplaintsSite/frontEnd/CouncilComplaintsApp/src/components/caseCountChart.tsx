import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";


//https://medium.com/@vprince001/creating-dynamic-and-interactive-charts-in-react-using-recharts-18ebab12bd03

const BarChartComponent: React.FC = () => {
    // Define the type for our data
type ChartData = {
    name: string;
    value: number;
  };
  
  const [caseType, setCaseType] = useState([]);
  
  // Sample data for the chart
  const data: ChartData[] = caseType;
  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/count-case-types/")
      .then((response) => {
          setCaseType(response.data); // Update state with fetched choices
      })
      .catch((error) => {
          console.error("Error fetching case counts:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center">Case Type Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="case_type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;