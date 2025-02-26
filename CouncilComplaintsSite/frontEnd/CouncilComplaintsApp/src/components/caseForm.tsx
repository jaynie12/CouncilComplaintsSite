import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CaseForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caseType, setCaseType] = useState([]);

  // Case type options
 
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/case-types/")
      .then((response) => {
        setCaseType(response.data); // Update state with fetched choices
      })
      .catch((error) => {
        console.error("Error fetching case types:", error);
      });
  }, []);

  // Form Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    caseType: Yup.string().required("Case type is required"),
    caseDescription: Yup.string().required("Description is required"),
    caseImage: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File too large", (value: any) => {
        return value && value.size <= 2000000; // 2MB max size
      }),
  });

  // Handle Form Submission
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("id", Math.floor(Math.random() * (10000000 - 1 + 1) + 1));
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("telephone", values.phone);
    formData.append("case_type", values.caseType);
    formData.append("case_short_description", values.caseDescription);
    formData.append("case_image", values.caseImage);

    try {
      const response = await axios.post("http://localhost:8000/api/cases/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const case_id = response.data.id.toString();
      alert("Case submitted successfully! If you want to get in touch with us regarding your case, please note down your case ID: " + case_id);
      setImagePreview(null);
      resetForm();
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("Failed to submit case");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        caseType: "",
        caseDescription: "",
        caseImage: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="p-4 max-w-lg mx-auto border rounded shadow-lg">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block font-semibold">Name</label>
            <Field type="text" name="name" className="w-full p-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <Field type="email" name="email" className="w-full p-2 border rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block font-semibold">Phone</label>
            <Field type="text" name="phone" className="w-full p-2 border rounded" />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Case Type Dropdown */}
          <div className="mb-4">
            <label className="block font-semibold">Case Type</label>
            <Field as="select" name="caseType" className="w-full p-2 border rounded">
              <option value="">Select a case type</option>
              {caseType.map((choice) => (
                <option key={choice.key} value={choice.value}>
                  {choice.key}
                </option>
              ))}
            </Field>
            <ErrorMessage name="caseType" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Case Description */}
          <div className="mb-4">
            <label className="block font-semibold">Case Description</label>
            <Field as="textarea" name="caseDescription" className="w-full p-2 border rounded" />
            <ErrorMessage name="caseDescription" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold">Case Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  setFieldValue("caseImage", file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="caseImage" component="div" className="text-red-500 text-sm" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32" />}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Submit Case
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CaseForm;
