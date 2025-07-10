import { Button } from "antd";
import { FaHandPointUp } from "react-icons/fa";
import { GrGrow } from "react-icons/gr";
import { IoGlobe } from "react-icons/io5";
import { IoIosSpeedometer } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import FloatingChatBot from "../subComponents/Chatbox";
import lms from "../../assets/undraw_online_learning_re_qw08.svg";
import teacher from "../../assets/undraw_teacher_re_sico.svg";
import student from "../../assets/undraw_online_reading_np7n.svg";
import admin from "../../assets/undraw_dashboard_re_3b76.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return !user ? (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold mb-3">Smart Lift Booking System</h1>
            <p className="fs-5 mb-4">Book. Ride. Track. Hassle-Free Elevator Access.</p>
            <Link to="/">
              <Button type="primary" size="large">Get Started</Button>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img src="https://www.domesticliftsusa.com/wp-content/uploads/2023/12/rendering-living-room-with-couch-coffee-table-min-scaled.jpg" alt="Lift Booking" className="img-fluid" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="container mt-5">
        <div className="row text-center">
          <div className="col-md-3 col-6 mb-3">
            <Button icon={<FaHandPointUp />} className="w-100">User-Friendly</Button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <Button icon={<GrGrow />} className="w-100">Scalable</Button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <Button icon={<IoGlobe />} className="w-100">Global Access</Button>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <Button icon={<IoIosSpeedometer />} className="w-100">Fast Speed</Button>
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section className="container mt-5">
        {[{
          title: "Series iii Max Domestic Lifts",
          points: [
            "Introducing the Nibav Lifts Series III Max, a premier residential elevator designed for discerning clients and distributed in the USA by Domestic Lifts USA, an authorized distributor of Nibav Lifts Inc. This addition to our Series III lineup features spacious customizable cabins accommodating up to 240 kg/529 lbs, ensuring complete wheelchair accessibility and enhancing both home mobility and sophistication. With esteemed TÜV SÜD, CE, and SIL-3 certifications, the Series III Max demonstrates exceptional design and safety. Integrating Nibav Lift technology and advanced safety systems, it seamlessly combines aesthetics with innovation, Versatile and capable of up to 4 Stops (G+3) with a maximum travel height of 13,500mm, this model sets a new benchmark for in-home domestic lifts. These space-saving lifts redefine modern home mobility, exclusively distributed in the USA by Domestic Lifts USA. Choosing the Series III Max means embracing a new era of home accessibility and luxury. Elevate your living experience with this symbol of sophistication and the future of domestic lifts – the Series III Max by Nibav Lifts, available through Domestic Lifts USA."
          ],
          img: "https://www.domesticliftsusa.com/wp-content/uploads/2023/12/Edit-Image-47-min-1-scaled.jpg",
          reverse: false,
        }
        // {
        //   title: "For Students",
        //   points: [
        //     "Course Access and Navigation",
        //     "Assignment Submission",
        //     "Gradebook and Progress Tracking",
        //     "Resource Library"
        //   ],
        //   img: student,
        //   reverse: true,
        // }
        // ,
        // {
        //   title: "For Admins",
        //   points: [
        //     "User Management",
        //     "Course Creation and Organization",
        //     "Data Analytics and Reporting",
        //     "Content Management"
        //   ],
        //   img: admin,
        //   reverse: false,
        // }
      ].map(({ title, points, img, reverse }, i) => (
          <div className={`row align-items-center my-4 ${reverse ? "flex-row-reverse" : ""}`} key={i}>
            <div className="col-md-6 text-center">
              <img src={img} alt={title} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h3 className="mb-3">{title}</h3>
              <ul className="list-unstyled fw-bold">
                {points.map((point, idx) => <li key={idx}>• {point}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      {/* <section className="container my-5 py-4 border rounded text-center bg-light">
        <div className="row">
          {[
            { count: "200+", label: "Courses" },
            { count: "40+", label: "Lecturers" },
            { count: "2000+", label: "Students" },
            { count: "20+", label: "Schools" },
          ].map((stat, index) => (
            <div className="col-sm-6 col-md-3 mb-3" key={index}>
              <h4 className="fw-bold display-6">{stat.count}</h4>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      <FloatingChatBot/>
      <Footer mt="5rem" />
    </div>
  ) : null;
};

export default LandingPage;
