// // pages/feedback.tsx

// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import Router from 'next/router';
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const FeedbackPage: React.FC = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [feedbacks, setFeedbacks] = useState<string[]>([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false); // Add loading state

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if (token) {
//       setLoggedIn(true);
//     } else {
//       Router.push('/login');
//     }
//   }, []);

//   useEffect(() => {
//     fetchFeedbacks(); // Fetch feedbacks when component mounts
//   }, []);

//   const fetchFeedbacks = async () => {
//     try {
//       const response = await fetch('http://localhost:5002/feedback');
//       const data = await response.json();
//       setFeedbacks(data);
//     } catch (error) {
//       console.error('Error fetching feedbacks:', error.message);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (name.trim() !== '' && email.trim() !== '' && title.trim() !== '' && description.trim() !== '') {
//       setLoading(true); // Set loading state while submitting
//       try {
//         const response = await fetch('http://localhost:5002/feedback', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             title,
//             description,
//           }),
//         });
//         if (response.ok) {
//           const newFeedback = await response.json();
//           setFeedbacks([...feedbacks, newFeedback]);
//           setName('');
//           setEmail('');
//           setTitle('');
//           setDescription('');
//         } else {
//           console.error('Failed to submit feedback:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error submitting feedback:', error.message);
//       } finally {
//         setLoading(false); // Reset loading state after submission
//       }
//     }
//   };

//   const handleLogout = () => {
//     Cookies.remove('token');
//     Router.push('/login');
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//           <h1 className="text-3xl font-semibold mb-4">Feedback Page</h1>
//           {loggedIn ? (
//             <>
//               <form onSubmit={handleSubmit} className="mb-4">
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter your name"
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="Enter title"
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Enter description"
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
//                     rows={3}
//                   />
//                 </div>
//                 <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-green-600 hover:bg-green-600 transition duration-300" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
//               </form>
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold mb-2">Feedbacks:</h2>
//                 {feedbacks.length === 0 ? (
//                   <p>No feedbacks yet</p>
//                 ) : (
//                   <ul>
//                     {feedbacks.map((feedback, index) => (
//                       <li key={index} className="mb-2">{feedback}</li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <button onClick={handleLogout} className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-red-600 hover:bg-red-600 transition duration-300">Logout</button>
//             </>
//           ) : (
//             <p>Please log in to view this page</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default FeedbackPage;
// pages/feedback.tsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Header from "../components/Header";
import Footer from "../components/Footer";

const FeedbackPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]); // Changed feedbacks state type
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      Router.push('/login');
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5002/feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== '' && email.trim() !== '' && title.trim() !== '' && description.trim() !== '') {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5002/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            title,
            description,
          }),
        });
        if (response.ok) {
          const newFeedback = await response.json();
          setFeedbacks([...feedbacks, newFeedback]);
          setName('');
          setEmail('');
          setTitle('');
          setDescription('');
        } else {
          console.error('Failed to submit feedback:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting feedback:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Router.push('/login');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Feedback Page</h1>
          {loggedIn ? (
            <>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                    rows={3}
                  />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-green-600 hover:bg-green-600 transition duration-300" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
              </form>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Feedbacks:</h2>
                {feedbacks.length === 0 ? (
                  <p>No feedbacks yet</p>
                ) : (
                  <ul>
                    {feedbacks.map((feedback, index) => (
                      <li key={index} className="mb-2">{feedback.title}: {feedback.description}</li> // Adjusted rendering of feedback
                    ))}
                  </ul>
                )}
              </div>
              <button onClick={handleLogout} className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-red-600 hover:bg-red-600 transition duration-300">Logout</button>
            </>
          ) : (
            <p>Please log in to view this page</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedbackPage;
