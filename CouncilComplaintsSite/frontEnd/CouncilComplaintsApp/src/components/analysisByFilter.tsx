import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
//https://recharts.org/en-US/examples/TwoSimplePieChart

const CaseAnalysisForm: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [SelectedDataChoice, setDataChoice] = useState<{ key: string, value: string }[]>([]);
  const [chartData, setChartData] = useState<{ status: string, total: number }[]>([]); // Store the data for the chart

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/get-data-choices/")
      .then((response) => {
        setDataChoice(response.data); // Update state with fetched choices
      })
      .catch((error) => {
        console.error("Error fetching data types:", error);
      });
  }, []);

  useEffect(() => {
    // Clear chart data when the filter changes
    setChartData([]);
  }, [selectedFilter]);

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    dataChoice: Yup.string().required("Filter is required"),
  });

  const handleSubmit = async (values: { dataChoice: string }) => {
    setSelectedFilter(values.dataChoice);
    if (values.dataChoice) {
      // Fetch filtered data based on the selected filter options
      try {
        // Make an API call to get the data for the selected filter
        const url = `http://127.0.0.1:8000/api/choice/` + values.dataChoice;
        const response = await axios.get(url);

        // Update the chart data based on the response
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          dataChoice: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {/* Case Type Dropdown */}
          <div className="mb-4">
            <label className="block font-semibold">Select a filter to analyze the issues</label>
            <Field as="select" name="dataChoice" className="w-full p-2 border rounded">
              <option value="">Select a filter </option>
              {SelectedDataChoice.map((choice) => (
                <option key={choice.key} value={choice.value}>
                  {choice.key}
                </option>
              ))}
            </Field>
            <ErrorMessage name="dataChoice" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Submit Case
          </button>
        </Form>
      </Formik>

      {chartData.length > 0 && (
        <div>
          <h3>Chart based on selected filter</h3>
          <ResponsiveContainer width="100%" height={400}>
          <PieChart>
      <Pie
        data={chartData}
        dataKey="total"
        // Dynamically set nameKey based on user selection
        nameKey={SelectedDataChoice.length > 0 ? SelectedDataChoice[0].value : "status"}  // Assuming 'value' is the dynamic choice
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        // Dynamically set the label to reflect the selected data choice
        label={({ status, total }: any) => {
          return status && total ? `${status}: ${total}` : ''; // Avoid undefined labels
        }}
      />
      <Tooltip />
    </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CaseAnalysisForm;
