// This is the server component which is responsible for server-side rendering.
// It renders static content that does not require client-side interactivity.
import dynamic from "next/dynamic";

export default function SignupPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <p>Welcome to our service. Please sign up to continue.</p>

      {/* Here we'll render the Client Component which contains the sign-up form */}
      <SignupFormClient />
    </div>
  );
}

// Dynamically import the client component for the form
const SignupFormClient = dynamic(
  () => import("./page.client"),
  { ssr: false } // This will disable server-side rendering for the form
);
