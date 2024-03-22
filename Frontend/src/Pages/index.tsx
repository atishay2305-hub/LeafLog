import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style.css";
import bg1 from "../img/bg-img/1.jpg";
import bg2 from "../img/bg-img/2.jpg";
import bg3 from "../img/bg-img/3.jpg";
import bg16 from "../img/bg-img/16.jpg";
import bg17 from "../img/bg-img/17.jpg";
import bg18 from "../img/bg-img/18.jpg";
import bg19 from "../img/bg-img/19.jpg";
import bg20 from "../img/bg-img/20.jpg";
import bg21 from "../img/bg-img/21.jpg";
import bg22 from "../img/bg-img/22.jpg";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />

      <div className="home">
        <div className="top-level">
          <div className="rectangle-image-container"></div>
          <div className="summary-box">
            <p className="summary-text" style={{ textAlign: "center" }}>
              Atishay Jain
              <br />
              <span className="role">Software Engineer based in New Jersey, USA</span>
            </p>
          </div>
        </div>

        <div className="content">
          <div className="about">
            <div className="about-content">
              <div className="summary-container">
                <h1 className="summary">
                  <center>SUMMARY</center>
                </h1>

                <p className="professional-summary">
                  As a Software Engineer, I have earned a Master's in Software Engineering
                  from Stevens Institute of Technology. My proficiency spans various
                  programming languages, including Python, Java, and JavaScript, with
                  expertise in full-stack development, testing methodologies, and agile
                  practices. I have excelled in impactful roles in both the USA and India,
                  demonstrating my ability to develop robust backend APIs, implement
                  serverless architectures using AWS technologies, and conduct
                  comprehensive testing with tools such as Selenium WebDriver and CircleCI.
                  My contributions include enhancing user experiences in eCommerce web
                  applications, conducting influential research on IoT in Sports, and
                  leading teams in the development of innovative applications. My
                  commitment to excellence is underscored by academic achievements,
                  certifications, and successful project outcomes, making me a valuable
                  asset to any software engineering team.
                </p>
              </div>

              <div className="skills-container">
                <div className="skills-box">
                  <h1 className="skills"><center>SKILLS</center></h1>
                  <ul>
                    <li>
                      <strong>Programming:</strong> Python, JAVA, JavaScript,
                      JSON, SQL, C, C++, Bash, HTML, CSS
                    </li>
                    <li>
                      <strong>Technologies:</strong> GIT, GitHub, AWS, Linux,
                      React.js, Node.js, Express.js, Socket.IO, jQuery, Flask,
                      Docker
                    </li>
                    <li>
                      <strong>Data Tools and Databases:</strong> NumPy,
                      Scikit-Learn, Pandas, Matplotlib, MySQL, PostgreSQL,
                      MongoDB, AWS DynamoDB
                    </li>
                    <li>
                      <strong>Testing:</strong> Postman, Selenium WebDriver,
                      BeautifulSoup, CircleCI, Junit, PyTest, PyLint, Code
                      Coverage, Apache JMeter, Burp Suite
                    </li>
                    <li>
                      <strong>Certifications:</strong> AWS Certified Cloud
                      Practitioner, Datacamp: Data Manipulation in SQL
                    </li>
                    <li>
                      <strong>Functional:</strong> Agile, SCRUM, Waterfall, SDLC,
                      STLC, JIRA, Bitbucket, Confluence, Microsoft Office
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="hero-area">
          <div className="hero-post-slides owl-carousel">
            <div className="single-hero-post bg-overlay">
              <div
                className="slide-img bg-img"
                style={{ backgroundImage: `url(${bg1.src})` }}
              ></div>

              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12">
                    <div className="hero-slides-content text-center">
                      <h2>LeafLog</h2>
                      <h2></h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-hero-post bg-overlay">
              <div
                className="slide-img bg-img"
                style={{ backgroundImage: `url(${bg2.src})` }}
              ></div>
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12">
                    <div className="hero-slides-content text-center">
                      <h2></h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="our-services-area bg-gray section-padding-100-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>OUR SERVICES</h2>
                  <p>We provide the perfect service for you.</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-12 col-lg-5">
                <div className="alazea-service-area mb-100">
                  <div
                    className="single-service-area d-flex align-items-center wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <div className="service-icon mr-30">
                      <img src="img/core-img/s1.png" alt="" />
                    </div>
                    <div className="service-content">
                      <h4>Plants Wiki</h4>
                      <p>
                        Acess a comprehensive plant encyclopedia to learn more
                        about your favorite plants. Expand your knowledge and
                        discover new species to add to your collection
                      </p>
                    </div>
                  </div>
                  <div
                    className="single-service-area d-flex align-items-center wow fadeInUp"
                    data-wow-delay="300ms"
                  >
                    <div className="service-icon mr-30">
                      <img src="img/core-img/s2.png" alt="" />
                    </div>
                    <div className="service-content">
                      <h4>Notification</h4>
                      <p>
                        Recive timely Notifications to help you stay on top of
                        your plant care routine. Get reminders for watering,
                        fertilizing and other essential tasks.
                      </p>
                    </div>
                  </div>
                  <div
                    className="single-service-area d-flex align-items-center wow fadeInUp"
                    data-wow-delay="500ms"
                  >
                    <div className="service-icon mr-30">
                      <img src="img/core-img/s3.png" alt="" />
                    </div>

                    <div className="service-content">
                      <h4>Plant Logging</h4>
                      <p>
                        keep a detailed log of your plant collection. Track
                        watering schedules, soil changes and any special care your
                        leafy friends need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="alazea-video-area bg-overlay mb-100">
                  <img src={bg22.src} alt="" />
                  <a className="video-icon">
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-us-area section-padding-100-0">
          <div className="container">
            <div className="row justify-content-between">
              <div className="section-heading">
                <h2>ABOUT LeafLog</h2>
              </div>
              <p>
                Your go-to web app for plant care. Access a vast plant
                encyclopedia, receive timely care reminders, and log your plant
                activities. Join a vibrant community of plant enthusiasts. Let's
                grow together!
              </p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="border-line"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="alazea-portfolio-area section-padding-100-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2>Explore Plants</h2>
                  <p></p>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="alazea-portfolio-filter">
                  <div className="portfolio-filter">
                    <button className="btn active" data-filter="*">
                      All
                    </button>

                    <button className="btn" data-filter=".garden">
                      Garden
                    </button>
                    <button className="btn" data-filter=".home-design">
                      Home Design
                    </button>
                    <button className="btn" data-filter=".office-design">
                      Office Design
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row alazea-portfolio">
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item design home-design wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg16.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/16.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 1"
                  >
                    <div className="port-hover-text">
                      <h3>Minimal Flower Store</h3>
                      <h5>Office Plants</h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item garden wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg17.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/17.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 2"
                  >
                    <div className="port-hover-text">
                      <h3>Grape Hyacinths</h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item garden design wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg18.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/18.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 3"
                  >
                    <div className="port-hover-text">
                      <h3>Bromeliad</h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item garden office-design wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg19.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/19.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 4"
                  >
                    <div className="port-hover-text">
                      <h3>Genus Peperomia</h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item design office-design wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg20.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/20.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 5"
                  >
                    <div className="port-hover-text">
                      <h3></h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-sm-6 col-lg-3 single_portfolio_item garden wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg21.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/21.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 6"
                  >
                    <div className="port-hover-text">
                      <h3>Peonies</h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
              <div
                className="col-12 col-lg-6

                single_portfolio_item home-design wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div
                  className="portfolio-thumbnail bg-img"
                  style={{ backgroundImage: `url(${bg22.src})` }}
                ></div>
                <div className="portfolio-hover-overlay">
                  <a
                    href="img/bg-img/22.jpg"
                    className="portfolio-img d-flex align-items-center justify-content-center"
                    title="Portfolio 7"
                  >
                    <div className="port-hover-text">
                      <h3>Ficus</h3>
                      <h5></h5>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
