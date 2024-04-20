import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

  const fetchUserEmail = () => {
    const userEmailFromCookie = Cookies.get('userEmail');
    setUserEmail(userEmailFromCookie || '');
  };

  useEffect(() => {
    fetchUserEmail();
    const token = Cookies.get('token');
    if (!token) {
      Router.push('/');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

await axios.post('http://localhost:5002/send-email', { userEmail, ...formData }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setFormData({ title: '', description: '' });
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
