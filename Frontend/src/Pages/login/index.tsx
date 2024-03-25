import { useState, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Login.module.css'; // Make sure to create a Login.module.css or reuse Signup.module.css
import '../../style.css';
import { useRouter } from 'next/router'; // Changed from Router to useRouter

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter(); // Initialized useRouter hook

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        // Implement error handling logic, perhaps show an error message to the user
      } else {
        // Redirect logic here...
        router.push('/search');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      // Implement error handling logic, perhaps show an error message to the user
    }
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="top-level">
          <div className={styles.container}>
            <Head>
              <title>Login</title>
              <meta name="description" content="Log in to your account" />
            </Head>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.description}>Please log in to continue.</p>
            <form onSubmit={handleSubmit} id="loginForm" className={styles.form}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Password"
                required
              />
              <button type="submit" className={styles.button}>
                Login
              </button>
            </form>
            <div className={styles.bottom}>
              <br />
              <p className={styles.bottomText}>Don't have an account?</p>
              <a href="http://localhost:3000/signup" className={styles.redirectButton}>
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
