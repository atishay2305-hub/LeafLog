import { useEffect } from 'react';
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./tos.css";
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function TosPage() {
  // Check authentication status
  const isAuthenticated = !!Cookies.get('token');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      Router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service" />
      </Head>
      <Header />
      <div className={styles.tosContainer}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-green-500 mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            By using LeafLog, you agree to its terms. LeafLog helps users track
            plant information. Users must follow laws and not harm the site.
            Account holders must keep credentials confidential. Privacy is
            respected; the Privacy Policy applies. Content belongs to LeafLog.
            No warranties are provided. LeafLog isn't liable for damages. Terms
            may change; users should check periodically. LeafLog can terminate
            or suspend access without notice. These terms are governed by New
            Jersey law. If you use LeafLog, you accept these terms. Contact us
            for questions or concerns.{" "}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
