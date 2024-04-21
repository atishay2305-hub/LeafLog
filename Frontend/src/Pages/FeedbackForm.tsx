import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '' // Add email field to formData
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      Router.push('/'); // Redirect to login page if no token is found
    } else {
      try {
        const decodedToken = decodeToken(token);
        setFormData(prevState => ({
          ...prevState,
          email: decodedToken.email // Set email from decoded token
        }));
      } catch (error) {
        console.error('Error decoding token:', error);
        Router.push('/'); // Redirect to login page if token decoding fails
      }
    }
  }, []);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5002/send-email', formData);
      setFormData({ title: '', description: '', email: '' });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-grow flex justify-center items-center bg-green-100">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-2">
                Description (Up to 2000 characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                maxLength={2000}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-500 resize-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
                disabled // Disable email input field as it's read-only
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackForm;
