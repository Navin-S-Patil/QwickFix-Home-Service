import { useState } from "react";
import "../CommonSignInSignUp.css";
import { FormInput } from "../Form-Inputs/FormInput";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const BASE_URL = "http://localhost:5000/api";
const SIGN_UP_URL = "/users/register";

export const SignUp = () => {
  const navigate = useNavigate();

  const [isProfessional, setIsProfessional] = useState(false);
  const [url, setUrl] = useState("/users/register");
  const [errMsg, setErrMsg] = useState("");

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone Number",
      errorMessage: "10 digits required!",
      label: "Phone Number",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = isProfessional ? {
        name: values.fullName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
      } : {
        name: values.fullName,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };

      console.log(userData);

      const response = await axios.post(
        BASE_URL + url,
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert("Successfully registered!");

      navigate("/SignIn");

      toast.success("Registred Successful");
    } catch (err) {
      if (err?.response?.status === 400) {
        alert(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function handleChange(event) {
    const isChecked = event.target.checked;
    setIsProfessional(isChecked);

    switch (isChecked) {
      case true:
        setUrl("/professionals/register");
        setInputs((prevInputs) => [
          ...prevInputs,
          {
            id: 6,
            name: "address",
            type: "text",
            placeholder: "Address",
            errorMessage: "Address is required!",
            label: "Address",
            required: true,
          },
        ]);
        break;
      case false:
        setUrl("/users/register");
        setInputs((prevInputs) => prevInputs.slice(0, 5));
        break;
      default:
        break;
    }
  }

  return (
    <section>
      <form className="SignInSignUpForm" onSubmit={handleSubmit}>
        <div className="SignInSignUpTitle">Sign Up</div>
        {/* <FormGroup> */}
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              checked={isProfessional}
              onChange={handleChange}
            />
          }
          label="Professional"
        />
        {/* </FormGroup> */}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="SignInSignUpButton">Submit</button>
      </form>
    </section>
  );
};
