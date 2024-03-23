import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../style.css";
import image1 from "../img/1.jpeg";
import image2 from "../img/2.jpeg";
import image3 from "../img/3.jpeg";


export default function Home() {
  interface Person {
    name: string;
    imageUrl: string;
    role: string;
  }

  const people: Person[] = [
    // Define your people array here
    {
      name: "Atishay Jain",
      imageUrl: "https://example.com/john.jpg",
      role: "Backend Developer",
    },
    {
      name: "Mikayla",
      imageUrl: "https://example.com/jane.jpg",
      role: "Project Manager and Developer",
    },
    {
      name: "Caitlyn",
      imageUrl: "https://example.com/alice.jpg",
      role: "Test Engineer and Frontend",
    },

    {
      name: "Hiral",
      imageUrl: "https://example.com/alice.jpg",
      role: "Frontend",
    },
  ];

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
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center">
          <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                Who we are?
              </h6>
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"></h4>
              <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                LeafLog is a full-stack MERN (MongoDB, Express.js, React,
                Node.js) web application with Next.js integration, specially
                crafted for plant enthusiasts. Whether you are a seasoned plant
                parent or just starting your botanical journey, LeafLog is here
                to enhance your plant care experience.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet our leadership
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
               The team behind this project.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">
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

        <div className="bento-box-grid">
          <div className="bento-box-item">
            <div className="bento-box-item-content">
            <img src="../img/1.jpeg" alt="Image 1" 
                className="bento-box-image"/>
              <h1>Plant Logging</h1>
              <p>
                Keep a detailed log of your plant collection. Track watering
                schedules, soil changes, and any special care your leafy friends
                need.
              </p>
            </div>
          </div>
          <div className="bento-box-item">
            <div className="bento-box-item-content">
              <img
                src={image2}
                alt="Plant Image 2"
                className="bento-box-image"
              />
              <h1>Plant Wiki</h1>
              <p>
                Access a comprehensive plant encyclopedia to learn more about
                your favorite plants. Expand your knowledge and discover new
                species to add to your collection.
              </p>
            </div>
          </div>
          <div className="bento-box-item">
            <div className="bento-box-item-content">
              <img
                src={image3}
                alt="Plant Image 3"
                className="bento-box-image"
              />
              <h1>Notifications</h1>
              <p>
                Receive timely notifications to help you stay on top of your
                plant care routine. Get reminders for watering, fertilizing, and
                other essential tasks.
              </p>
            </div>
          </div>
        </div>

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
                <div className="lg:mb-0 lg:max-w-lg lg:pr-5">
                  <div className="max-w-xl mb-6">
                    <h2 className="text-left text-xl sm:mt-0 mt-6 font-semibold tracking-tight sm:text-2xl sm:leading-none max-w-lg mb-6">
                      Github Daily
                    </h2>
                    <div className="text-left text-base md:text-lg">
                      <p>
                        Lorem Ipsum is so cool and awesome to act and so cool to
                        think. And very awesome to eat and talk.
                      </p>
                      <div className="text-sky-600 mt-4">
                        <span className="bg-neutral-200 text-lg px-4 py-1.5 rounded-md">
                          mywapp.site
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-12 sm:border-0 rounded-xl sm:rounded-0 border sm:mt-0 mt-8">
              <div className="flex flex-col items-center justify-between w-full lg:flex-row">
                <div className="lg:mb-0 lg:max-w-lg lg:pr-5">
                  <div className="max-w-xl mb-6">
                    <h2 className="text-left text-xl font-semibold tracking-tight sm:pt-0 pt-5 sm:text-2xl sm:leading-none max-w-lg mb-6">
                      Sipson
                    </h2>
                    <div className=" text-left text-base md:text-lg">
                      <p>
                        Lorem Ipsum is so cool and awesome to act and so cool to
                        think. And very awesome to eat and talk.
                      </p>
                      <div className="text-sky-600 mt-4">
                        <span className="bg-neutral-200 text-lg px-4 py-1.5 rounded-md">
                          sipson.tech
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* Add any additional elements here */}
                  </div>
                </div>
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
