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
            <h1 className="fw-bold mb-3">The Best Learning Platform</h1>
            <p className="fs-5 mb-4">Learn, Grow, Achieve – Together.</p>
            <Link to="/account/login">
              <Button type="primary" size="large">Get Started</Button>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img src={lms} alt="Learning" className="img-fluid" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mt-5">
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
      </section>

      {/* Services Section */}
      <section className="container mt-5">
        {[{
          title: "For Lecturers",
          points: [
            "Course Creation and Management",
            "Assignment and Assessment Management",
            "Grading and Analytics",
            "Attendance Tracking"
          ],
          img: teacher,
          reverse: false,
        },
        {
          title: "For Students",
          points: [
            "Course Access and Navigation",
            "Assignment Submission",
            "Gradebook and Progress Tracking",
            "Resource Library"
          ],
          img: student,
          reverse: true,
        },
        {
          title: "For Admins",
          points: [
            "User Management",
            "Course Creation and Organization",
            "Data Analytics and Reporting",
            "Content Management"
          ],
          img: admin,
          reverse: false,
        }].map(({ title, points, img, reverse }, i) => (
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
      <section className="container my-5 py-4 border rounded text-center bg-light">
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
      </section>

      <FloatingChatBot/>
      <Footer mt="5rem" />
    </div>
  ) : null;
};

export default LandingPage;
