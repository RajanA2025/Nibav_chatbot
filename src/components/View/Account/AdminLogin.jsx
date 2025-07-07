// import { Input, Button, message, Card, Typography, Form } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Header from "../Header";
// import axios from "axios";

// const API_URL = "http://65.0.113.12:8000";
// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [input, setInput] = useState({
//     email: "",
//     phoneNumber: "",
//   });

//   const [status, setStatus] = useState({
//     inputs: {
//       email: "",
//       phoneNumber: "",
//     },
//   });

//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (error) message.error("Something went wrong while fetching data.");
//   }, [error]);

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateInput = () => {
//     let valid = true;
//     const newStatus = { email: "", phoneNumber: "" };

//     if (!validateEmail(input.email)) {
//       newStatus.email = "error";
//       valid = false;
//     }
//     if (!input.phoneNumber || input.phoneNumber.length < 10) {
//       newStatus.phoneNumber = "error";
//       valid = false;
//     }

//     setStatus({ inputs: newStatus });
//     return valid;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//     setStatus({ inputs: { ...status.inputs, [name]: "" } });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateInput()) return;

//     try {
//       const formData = new URLSearchParams();
//       formData.append("email", input.email);
//       formData.append("phone", input.phoneNumber);

//       await axios.post(`${API_URL}/admin/login`, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }).then((res) => {
//         console.log("Login success:", res.data);
//         message.success("Login successful!");
//         navigate('/admin/activity');
//       });

//     } catch (err) {
//       console.error("Login error:", err);
//       message.error("Login failed. Check your credentials.");
//       setError(true);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "90vh",
//           background: "#f9f9f9",
//         }}
//       >
//         <Card
//           title={<Typography.Title level={3} style={{ marginBottom: 0 }}>Login</Typography.Title>}
//           bordered={false}
//           style={{
//             width: 400,
//             padding: "1rem",
//             boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
//             borderRadius: 10,
//           }}
//         >
//           <Form layout="vertical" onSubmitCapture={handleSubmit}>
//             <Form.Item label="Email">
//               <Input
//                 name="email"
//                 type="email"
//                 value={input.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 status={status.inputs.email}
//               />
//             </Form.Item>

//             <Form.Item label="Phone Number">
//               <Input
//                 name="phoneNumber"
//                 type="tel"
//                 value={input.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 status={status.inputs.phoneNumber}
//                 minLength={10}
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 style={{ height: "40px", fontWeight: "bold" }}
//               >
//                 Sign In
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default AdminLogin;




import { Input, Button, message, Card, Typography, Form } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";

const API_URL = "http://65.0.113.12:8000";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    inputs: {
      email: "",
      password: "",
    },
  });
const [role, setRole] = useState("")
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   if (error) message.error("Something went wrong while fetching data.");
  // }, [error]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInput = () => {
    let valid = true;
    const newStatus = { email: "", password: "" };

    if (!validateEmail(input.email)) {
      newStatus.email = "error";
      valid = false;
    }
    if (!input.password || input.password.length < 6) {
      newStatus.password = "error";
      valid = false;
    }

    setStatus({ inputs: newStatus });
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setStatus({ inputs: { ...status.inputs, [name]: "" } });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateInput()) return;

  //   try {
  //     const formData = new URLSearchParams();
  //     formData.append("email", input.email);
  //     formData.append("password", input.password);

  //     await axios.post(`${API_URL}/admin/login`, formData,
  //        {
  //         headers: {
  //           accept: 'application/json',
  //         },
  //     }
  //   ).then((res) => {
  //       message.success("Login successful!");
  //       localStorage.setItem("Role",res.data.role )
  //       localStorage.setItem("Auth" , "true")
  //       setRole(res.data.role)
  //       if(res.data.role == "Admin"){
  //       navigate('/admin/dashboard');}
  //       else{
  //         navigate('/sales/dashboard')
  //       }
  //     });    

  //   } catch (err) {
  //     // console.error("Login error:", err);
  //     message.error("Login failed. Please Check your credentials.");
  //     setError(true);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateInput()) return;
  
    try {
      const res = await axios.post(
        `${API_URL}/admin/login`,
        '', // IMPORTANT: empty string body to match `-d ''` in curl
        {
          headers: {
            accept: 'application/json',
          },
          params: {
            email: input.email,
            password: input.password,
          },
        }
      );
  
      message.success("Login successful!");
      localStorage.setItem("Role", res.data.role);
      localStorage.setItem("Auth", "true");
      setRole(res.data.role);
  
      if (res.data.role.toLowerCase() === "admin") {
        navigate('/admin/dashboard');
      } else {
        navigate('/sales/dashboard');
      }
    } catch (err) {
      message.error("Login failed. Please check your credentials.");
      setError(true);
    }
  };
  
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          background: "#f9f9f9",
        }}
      >
        <Card
          title={<Typography.Title level={3} style={{ marginBottom: 0 }}>{currentPath === '/adminlogin' ? 'Welcome Back! Admin' : 'Login'}</Typography.Title>}
          bordered={false}
          style={{
            width: 400,
            padding: "1rem",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
          }}
        >
          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Form.Item label="Email" validateStatus={status.inputs.email} help={status.inputs.email ? "Please enter a valid email." : ""}>
              <Input
                name="email"
                type="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item label="Password" validateStatus={status.inputs.password} help={status.inputs.password ? "Password must be at least 6 characters." : ""}>
              <Input.Password
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ height: "40px", fontWeight: "bold" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          {/* <ForgotPassword/> */}
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
