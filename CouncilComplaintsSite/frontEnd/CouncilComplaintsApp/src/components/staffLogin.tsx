import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomButton from './staffHomePage';

interface LoginProps {
  username?: string;
  password?: string;
}

const StaffLogin: React.FC<LoginProps> = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  const initialValues = {
    username: props.username || '',
    password: props.password || '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: LoginProps) => {
    try {
      const response = await axios.post('http://localhost:8000/api/staff-login/', values, {
        headers: {
          'Content-Type': 'application/json', // Ensure you're sending JSON
        },
      });
      const token = (response.data as { detail: string }).detail;

      if (token === 'Login successful.') {  
        alert('Login successful!');
        setIsVisible(false);  // Hide the login form after success
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {isVisible && (
              <>
                <div className="mb-4">
                  <label className="block font-semibold">Username</label>
                  <Field type="text" name="username" className="w-full p-2 border rounded" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold">Password</label>
                  <Field type="password" name="password" className="w-full p-2 border rounded" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                  Login
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>

      {/* Show CustomButton when login is successful */}
      {!isVisible && <CustomButton />}
    </div>
  );
};

export default StaffLogin;
