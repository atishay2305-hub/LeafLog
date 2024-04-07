import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
          <h1 className="text-base leading-8 text-gray-900">{item.title}</h1>
          <p className="text-lg leading-8 text-gray-600">
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

export default function LandingPage() {
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      Router.push('/');
    }
  }, []);

  const logout = () => {
    Cookies.remove('token');
    Router.push('/');
  };

  return (
    <>
      <Header />
      <div className='min-h-screen bg-green-400 flex items-center justify-center text-white flex-col'>
        <h1 className='text-4xl font-extrabold mb-4'>Welcome to Leaflog</h1>
        <p>Your One Stop place to maintain your plants.</p>
      </div>


      <Footer />
    </>
  );
}
