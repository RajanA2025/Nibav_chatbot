import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/school-solid.svg";
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
 
  {
    key: '1',
    label: ' Productivity',
    children: [
      {
        key: '1-1',
        label: 'College Managed Solution',
      },
      {
        key: '1-2',
        label: 'Computer Vision',
      },
    ],
  },
  {
    key: '2',
    label: ' Intelligence',
    children: [
      {
        key: '2-1',
        label: 'Personalization Recommendation',
      },
      {
        key: '2-2',
        label: 'Customer Insights',
      },
    ],
  },
  {
    key: '3',
    label: 'Cloud',
    // disabled: true,
    children: [
      {
        key: '3-1',
        label: 'Cloud Transformation Framework',
      },
      {
        key: '3-2',
        label: 'Rapid Infra Automation',
      },
      {
        key: '3-3',
        label: 'Cloud Cost Optimization',
      },
      {
        key: '3-4',
        label: 'Integrated Management Systems',
      },
    ],
  },
];
function Header() {
  return (
    <div>
        <div
      className="mx-auto mt-2 p-0"
      style={{ width: "90%", height: "auto" }}
    >

        <nav
        className="navbar navbar-expand-md navbar-light d-md-flex justify-content-md-between align-items-md-center mx-auto"
        style={{ width: "95%" }}
      >
        <a className="navbar-brand d-flex align-items-center" href="/#">
          <img
            // src={logo}
            src="https://www.nibavlift.in/residential-elevators/wp-content/uploads/2023/12/nibav-logo.svg"
            
            alt="logo"
            // style={{ width: "1.2rem", height: "1.2rem", objectFit: "cover" }}
            width={95}
          />
          {/* <p className="m-0 ms-2">Nibav_Management</p> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-md-flex flex-md-row flex-column justify-content-md-between justify-content-center align-items-center mx-auto mx-md-0 p-2 p-md-0"
          id="navbarSupportedContent"
          style={{ maxWidth: "50%" }}
        >
          <ul
            className="navbar-nav mr-auto d-flex justify-content-md-between justify-content-center align-items-center align-items-md-left"
            style={{ width: "50%" }}
          >
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Home
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/#">
                Resources
              </a>
            </li> */}
            {/* <li className="nav-item">
            <Dropdown menu={{ items }}>
    <a onClick={e => e.preventDefault()}>
      <Space>
      Products
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/#">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#">
                About Us
              </a>
            </li>
          </ul>
          
        {/* <Link to="/account/login" style={{ width: "25%" }} className="h-auto">
            <Button
              style={{ width: "100%", minHeight: "2.5rem" }}
              type="primary"
              icon={<UserOutlined />}
              className="mt-2 mt-md-0 text-wrap h-auto"
            >
              Login / Sign Up
            </Button>
          </Link> */}
        </div>
      </nav> 
    </div>

    </div>
  )
}

export default Header