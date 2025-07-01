import { Input, Button, Select } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import Header from "../Header";
// import { validateEmail, matchValues, fetcher } from "../../_services";
const Signup = () => {
  const navigate = useNavigate();

  const apiUrl = "http://localhost:5000/api";

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "student",
    department: "",
  });

  const [status, setStatus] = useState({
    inputs: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      role: "",
      department: "",
      grade: "",
    },
  });

  const [departments, setDepartments] = useState([]);

  const roles = [
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
  ];

  const grades = [
    { name: "9", value: "nine" },
    { name: "10", value: "ten" },
  ];

  const getDepartments = () => {
    fetcher("get-departments").then((res) => {
      const depts = res.result;
      const departments = [];
      depts.map((dept) =>
        departments.push({ name: dept.title, value: dept._id })
      );
      setDepartments(departments);
      setInput({ ...input, department: depts[0]._id });
    });
  };

  const handleChange = (e) => {
    setStatus({ ...status, inputs: {} });
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleRoleChange = (role) => {
    setInput({ ...input, role: role });
  };

  const handleDeptChange = (dept) => {
    setInput({ ...input, department: dept });
  };

  const handleGradeChange = (grade) => {
    setInput({ ...input, grade: grade });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    checkUser().then((res) => {
      if (res) {
        setStatus({ ...status, inputs: { ...status.inputs, email: "error" } });
        return;
      } else {
        createNewUser();
      }
    });
  };

  const checkUser = () => {
    return fetch(`${apiUrl}/filterUserByEmail`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.result && res.result.length > 0) return true;
        else return false;
      });
  };

  const createNewUser = () => {
    const result = fetcher("create-account", "post", input);
    result.then((res) => {
      navigate("/account/wait-for-approval");
    });
  };

  const validateInput = () => {
    let valid = true;
    // if (!validateEmail(input.email)) {
    //   setStatus({ ...status, inputs: { ...status.inputs, email: "error" } });
    //   valid = false;
    // }
    // if (!matchValues(input.password, input.cpassword)) {
    //   setStatus({
    //     ...status,
    //     inputs: { ...status.inputs, cpassword: "error" },
    //   });
    //   valid = false;
    // }

    return valid;
  };

  // useEffect(() => {
  //   getDepartments();
  // }, []);

  return (
    <>
    <Header />
      <div
        className="d-flex flex-column justify-content-center align-items-center inherit-br-right mx-auto border rounded p-3"
        style={{ width: "45%", marginTop: "5%" }}      >
        <h3 className="fw-bold">Create Account</h3>
        <div className="mt-2" style={{ width: "80%" }}>
          <form
            className="d-flex justify-content-center align-items-center flex-column"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="w-100">
              Name
            </label>
            <Input
              style={{ height: "2.5rem" }}
              className="half-black"
              placeholder="Name"
              name="name"
              id="name"
              value={input.name}
              onChange={handleChange}
              status={status.inputs.name}
              required
            />
            <label htmlFor="email" className="w-100 mt-2 d-block">
              Email
            </label>
            <Input
              style={{ height: "2.5rem" }}
              className="half-black"
              placeholder="Email"
              name="email"
              id="email"
              value={input.email}
              onChange={handleChange}
              status={status.inputs.email}
              required
            />
            
           
           
            
            <label htmlFor="password" className="w-100 mt-2">
              Password
            </label>
            <Input.Password
              style={{ height: "2.5rem" }}
              className="half-black"
              placeholder="Password"
              name="password"
              id="password"
              value={input.password}
              onChange={handleChange}
              status={status.inputs.password}
              required
              minLength="8"
            />
            <label htmlFor="cpassword" className="w-100 mt-2">
              Confirm Password
            </label>
            <Input.Password
              style={{ height: "2.5rem" }}
              className="half-black"
              placeholder="Confirm Password"
              name="cpassword"
              id="cpassword"
              value={input.cpassword}
              onChange={handleChange}
              status={status.inputs.cpassword}
              required
              minLength="8"
            />
            <Button
              className="rounded-button mt-3 text-white"
              style={{
                width: "45%",
                height: "2.5rem",
                background: "darkslategray",
              }}
              htmlType="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>

        <small className="mt-2">
          Already have an{" "}
          <a className="text-blue text-decoration-none" href="/#">
          Nibav          </a>{" "}
          account?
        </small>
        <Link to="/account/login" style={{ width: "35%" }}>
          <Button
            className="rounded-button mt-3"
            style={{ width: "100%", height: "2.5rem" }}
          >
            Sign In
          </Button>
        </Link>
      </div>
      <Footer mt="6rem" />
    </>
  );
};

export default Signup;
