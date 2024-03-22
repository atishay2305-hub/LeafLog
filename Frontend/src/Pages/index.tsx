import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style.css";
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
              Leaflog
              <br />
              <span className="role"></span>
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

             </div>

      <Footer />
    </>
  );
}
