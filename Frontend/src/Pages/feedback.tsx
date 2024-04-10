// pages/feedback.tsx
import Head from "next/head";
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { useState, FormEvent } from "react";
import styles from "./plant-log.css";
import '../../style.css';

export default function PlantLog() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Construct the form data payload
    const FeedbackFormEntry = { feedback };
    // Submit the form data to your API route
    const response = await fetch("/api/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FeedbackFormEntry),
    });
    // Handle the response from your API route
    const data = await response.json();
    console.log({ feedback });
    if (response.ok) {
      // Do something with the successful response
    } else {
      // Handle errors
    }
  };

  return (
    <>
      <Header />
      <div className="home">
      <div className="top-level">
      <div className={styles.container}>
        {" "}
        <Head>
          <title>Feedback Form</title>
          <meta name="description" content="Submit a Feedback Form" />
        </Head>
        <h1 className={styles.title}>Enter Feedback</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="feedback" className={styles.label}>
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={styles.inputField} // Changed class for textarea to use inputField for better spacing
            placeholder="What feedback would you like to give us?"
          />

          <button type="submit" className={styles.button}>
            Submit Feedback Form
          </button>
        </form>
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
