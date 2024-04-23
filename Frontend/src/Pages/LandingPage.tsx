import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import image1 from "../img/1.jpg";
import image2 from "../img/2.jpg";
import image3 from "../img/3.jpg";
import { StaticImageData } from "next/image";
import "../styles/global.css";

interface Person {
  name: string;
  email?: string;
  role: string;
}

interface Feature {
  name: string;
  description: string;
  details?: string;
}

interface BentoBoxItem {
  title: string;
  description: string;
  image: StaticImageData;
}

const BentoBoxGrid: React.FC<{ items: BentoBoxItem[] }> = ({ items }) => (
  <div className="bento-box-grid">
    {items.map((item, index) => (
      <div key={index} className="bento-box-item">
        <div className="bento-box-item-content">
          <img
            src={item.image.src}
            alt={item.title}
            className="bento-box-image"
          />
          <h1 className="text-base leading-8 text-gray-900">{item.title}</h1>
          <p className="text-lg leading-8 text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const bentoBoxItems: BentoBoxItem[] = [
  {
    title: "Plant Logging",
    description:
      "Keep a detailed log of your plant collection. Track watering schedules, soil changes, and any special care your leafy friends need.",
    image: image1,
  },
  {
    title: "Plant Wiki",
    description:
      "Access a comprehensive plant encyclopedia to learn more about your favorite plants. Expand your knowledge and discover new species to add to your collection.",
    image: image2,
  },
  {
    title: "Notifications",
    description:
      "Receive timely notifications to help you stay on top of your plant care routine. Get reminders for watering, fertilizing, and other essential tasks.",
    image: image3,
  },
];

const people: Person[] = [
  {
    name: "Atishay Jain",
    role: "Full Stack Developer & DevOps",
  },
  {
    name: "Mikayla Mount",
    role: "Project Manager & Full Stack Developer",
  },
  {
    name: "Hiral Makhwana",
    role: "Software Test",
  },
  {
    name: "Caitlyn",
    role: "Frontend Developer",
  },
];

const features: Feature[] = [
  {
    name: "Plant Logging",
    description:
      "Keep a detailed log of your plant collection. Track watering schedules, growth cycles, and any special care your leafy friends need.",
  },
  {
    name: "Interactive Interface",
    description:
      "Enjoy a visually appealing and user-friendly interface that makes navigating and interacting with LeafLog a breeze.",
  },
  {
    name: "User Profile",
    description:
      "Create a user profile - Utilize your own directory hub for all a LeafLog user could need.",
  },
  {
    name: "Plant Wiki",
    description:
      "Access a comprehensive plant encyclopedia to learn more about your favorite plants. Expand your knowledge and discover new species to add to your collection.",
  },
  {
    name: "Notification",
    description:
      "Receive timely notifications to help you stay on top of your plant care routine. Get personalized reminders for watering and other essential tasks.",
  },
  {
    name: "Secure Authentication",
    description:
      "A secure system of authentication for you to see your plants and maintain.",
  },
];

const LandingPage: React.FC = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home | LeafLog</title>
      </Head>

      <Header />
      <section className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl  p-11 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-6xl font-bold text-green-600 mb-8">
            Welcome to LeafLog
          </h1>
          <p className="text-lg text-gray-600">
            Nuture Plants, Find Care Plans, Cultivate Expertise
          </p>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About Leaflog
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              LeafLog is a full-stack MERN (MongoDB, Express.js, React, Node.js)
              web application with Next.js integration, specially crafted for
              plant enthusiasts. Whether you are a seasoned plant parent or just
              starting your botanical journey, LeafLog is here to enhance your
              plant care experience.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4 text-lg"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-md text-gray-500">
                    {feature.description}
                  </dd>
                  {feature.details && (
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.details}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <img
              src="https://64.media.tumblr.com/32090cdc70e0098abde641e7176fab8e/tumblr_n5dzc6VUKR1qfxxzto1_500.gifv"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100 w-full max-w-md sm:max-w-lg lg:max-w-xl"
            />

            <img
              src="https://64.media.tumblr.com/d6b6ac44147e5dbaac9ef5a208c939e3/tumblr_ojjkxvOlqd1vqs93co6_500.gifv"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100 w-full max-w-md sm:max-w-lg lg:max-w-xl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            Our Team
          </h2>
          <ul role="list" className="divide-y divide-gray-100">
            {people.map((person, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-lg font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    {/* Render email if available */}
                    {person.email && (
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {person.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-lg leading-6 text-gray-900">
                    {person.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
