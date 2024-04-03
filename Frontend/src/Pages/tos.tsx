import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/tos.module.css';

export default function TosPage() {
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
            By using LeafLog ("the Site"), you agree to be bound by the terms
            and conditions outlined in this document. If you do not agree to
            these terms, please refrain from using the Site.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            LeafLog is a website designed to assist users in logging and
            tracking information about their plants, including care routines,
            watering schedules, and growth progress.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Users are solely responsible for their conduct while using the Site.
            This includes adherence to all applicable laws and regulations.
            Users must not engage in any activities that could harm the
            integrity or functionality of the Site.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Users may be required to create an account to access certain
            features of the Site. Users are responsible for maintaining the
            confidentiality of their account credentials and for all activities
            that occur under their account.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            LeafLog respects user privacy and is committed to protecting
            personal information. Our Privacy Policy outlines how we collect,
            use, and disclose user data. By using the Site, you consent to the
            terms of our Privacy Policy.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            All content and materials provided through the Site, including but
            not limited to text, graphics, logos, and software, are the
            property of LeafLog.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            LeafLog is provided on an "as is" and "as available" basis. We make
            no warranties or representations regarding the reliability,
            accuracy, or availability of the Site. In no event shall LeafLog be
            liable for any indirect, incidental, special, or consequential
            damages arising out of or in connection with the use of the Site.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            LeafLog reserves the right to modify or update these terms at any
            time without prior notice. Users are encouraged to review the terms
            periodically for changes. Continued use of the Site after the
            posting of modifications constitutes acceptance of the revised
            terms.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            LeafLog reserves the right to terminate or suspend access to the
            Site at any time, with or without cause, and without prior notice.
            Upon termination, all rights granted to users will cease
            immediately.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            These terms shall be governed by and construed in accordance with
            the laws of New Jersey, without regard to its conflict of law
            provisions.
          </p>
          <p className="text-lg text-gray-700">
            By using LeafLog, you acknowledge that you have read, understood,
            and agreed to abide by these Terms of Service. If you have any
            questions or concerns regarding these terms, please contact us at
            [Contact Information].
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
