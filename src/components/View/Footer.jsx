import { Button, Input } from "antd";
import {
  CiFacebook,
  CiLinkedin,
  CiTwitter,
  CiLocationOn,
} from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer = ({ mt }) => {
  return (
    <div className="w-100 d-flex flex-column mb-2">
      <div
        className="w-100 footer footer_bg row rounded p-2"
        style={{ marginTop: mt ? mt : "0", minHeight: "15rem" }}
      >
        <div className="col-sm-6 col-md-3 p-3 d-flex flex-column justify-content-center justify-content-sm-left align-items-center align-items-sm-start">
          <h4>Nibav_Management</h4>
          <p>Learning Management Platform</p>
          <p className="fw-bold">Follow Us</p>
          <div
            className="d-flex justify-content-between fs-3"
            style={{ width: "60%" }}
          >
            <a href="/#">
              <CiFacebook />
            </a>
            <a href="/#">
              <CiLinkedin />
            </a>
            <a href="/#">
              <CiTwitter />
            </a>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 p-3 d-flex flex-column justify-content-center justify-content-sm-left align-items-center align-items-sm-start">
          <h4>Resources</h4>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Departments</li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-3 p- d-flex flex-column justify-content-center justify-content-sm-left align-items-center align-items-sm-start">
          <h4>Contact</h4>
          <ul>
            <li>
              <FaPhoneAlt />
              &nbsp;+91 9876543210
            </li>
            <li>
              <MdEmail />
              &nbsp;Nibav_management@gmail.com
            </li>
            <li>
              <CiLocationOn />
              &nbsp;India, US, UAE
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-3 p- d-flex flex-column justify-content-center justify-content-sm-left align-items-center align-items-sm-start">
          <h4>Email Us</h4>
          <Input.TextArea style={{ resize: "none", height: "7rem" }} />
          <Button type="primary" className="mt-2" style={{ width: "5rem" }}>
            Send
          </Button>
        </div>
      </div>
      <div style={{ width: "20%", height: "2rem" }} className="mt-2 mx-auto">
        <p className="text-center fw-bold">&copy; &nbsp; Copyright 2024</p>
      </div>
    </div>
  );
};

export default Footer;
