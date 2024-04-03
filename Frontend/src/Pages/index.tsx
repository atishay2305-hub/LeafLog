import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/style.css";
import image1 from "../img/1.jpg";
import image2 from "../img/2.jpg";
import image3 from "../img/3.jpg";
import { StaticImageData } from "next/image";

interface Person {
  name: string;
  role: string;
}

interface Feature {
  name: string;
  description: string;
  details: string;
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
          />{" "}
          {/* Accessing src property */}
          <h1 className="mt-6 text-xl leading-8 text-gray-900">{item.title}</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {item.description}
          </p>
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

const GettingStarted: React.FC<{ features: Feature[] }> = ({ features }) => (
  <div className="bg-white">
    <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-x-8 gap-y-12 px-4 py-10 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Getting Started
        </h1>
        <p className="mt-5 text-xl text-gray-600">
          Welcome to LeafLog! Here's a quick guide to get you started:
        </p>
        <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {features.map((feature, index) => (
            <div key={index} className="border-t border-gray-200 pt-4">
              <dt className="mt-2 text-xl text-gray-900">{feature.name}</dt>
              <dt className="mt-2 text-lg text-gray-600">
                {feature.description}
              </dt>
              <dd className="mt-2 text-lg text-gray-600">
                {feature.details.split("; ").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <img
          src="https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
          className="rounded-lg bg-gray-100"
        />
        <img
          src="https://images.unsplash.com/photo-1585328000852-779be6a6582b?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Top down view of walnut card tray with embedded magnets and card groove."
          className="rounded-lg bg-gray-100"
        />
        <img
          src="https://images.unsplash.com/photo-1506543277633-99deabfcd722?q=80&w=2288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Side of walnut card tray with card groove and recessed card area."
          className="rounded-lg bg-gray-100"
        />
        <img
          src="https://images.unsplash.com/photo-1583794095112-29cd1d641834?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Walnut card tray filled with cards and card angled in dedicated groove."
          className="rounded-lg bg-gray-100"
        />
      </div>
    </div>
  </div>
);

const people: Person[] = [
  {
    name: "Atishay Jain",
    role: "Backend Developer",
  },
  {
    name: "Mikayla Mount",
    role: "Project Manager and Developer",
  },
  {
    name: "Caitlin",
    role: "Test Engineer and Frontend",
  },

  {
    name: "Hiral",
    role: "Frontend",
  },
];

const feature: Feature[] = [
  {
    name: "Succulents and Cacti",
    description: "Low-maintenance, drought-tolerant plants.",
    details:
      "Soil: Well-draining mix.; Light: Bright indirect or direct sunlight.; Watering: Let soil dry completely between waterings.",
  },
  {
    name: "Mosses",
    description: "Moisture-loving plants for shady spots.",
    details:
      "Soil: Moisture-retentive substrate.; Light: Indirect or low light.; Watering: Keep consistently moist, avoid waterlogging.",
  },
  {
    name: "Ferns",
    description: "Moisture-loving plants for humid environments.",
    details:
      "Soil: Rich, well-draining mix.; Light: Indirect or low light.; Watering: Keep soil consistently moist.; Humidity: Maintain high levels.",
  },

  {
    name: "Climbers",
    description: "Vining plants needing support.",
    details:
      "Soil: Well-draining mix.; Light: Moderate to bright indirect light.; Support: Provide trellis or stakes.; Watering: Allow soil to slightly dry between waterings.",
  },

  {
    name: "Herbs",
    description: "Culinary plants with flavorful leaves.",
    details:
      "Soil: Well-draining mix.; Light: Bright, indirect light or direct sunlight.; Watering: Keep soil evenly moist.; Harvesting: Regularly prune for bushier growth.",
  },

  {
    name: "Flowering Plants",
    description: "Vibrant blooms adding color and fragrance.",
    details:
      "Soil: Well-draining mix.; Light: Varied, based on species.; Watering: Follow specific needs, avoid extremes.; Deadheading: Remove spent flowers for continuous blooming.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <div className="home">
        <div className="top-level">
          <div className="rectangle-image-container"></div>
          <div className="summary-box">
            <p className="summary-text" style={{ textAlign: "center" }}>
              Leaflog
              <br />
              <span className="role"></span>
            </p>

            <br />
            <h1 className="text-3xl">Enhance your plant care experience</h1>
          </div>
        </div>

        <GettingStarted features={feature} />

        <BentoBoxGrid items={bentoBoxItems} />

        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet our leadership
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                The team behind this project.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex  items-center gap-x-6">
                    <div>
                      <h2 className="text-xl font-semibold leading-7 tracking-tight text-gray-900">
                        {person.name}
                      </h2>
                      <p className="text-lg font-semibold leading-6 text-indigo-600">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />

        <div className="max-w-lg px-4 mx-auto text-left md:max-w-none md:text-center">
          <div className="sm:mx-72 sm:mt-20 mt-8">
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 sm:border-0 rounded-xl sm:rounded-0 border">
              <div className="flex flex-col items-center justify-between w-full lg:flex-row">
                <img
                  className="hidden sm:block"
                  alt="logo"
                  width="230"
                  height="230"
                  src="https://i.pinimg.com/564x/3a/4c/78/3a4c78091217ef8ee5f852d4129b5433.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
