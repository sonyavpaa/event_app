import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SignUp = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    let navigate = useNavigate();

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        if (data.password !== data.passwordConfirm) {
            const submitMessage = document.createElement("p");

            submitMessage.innerHTML = "Passwords need to match";

            document.querySelector(".submitMessage").appendChild(submitMessage);
        } else {
            try {
                delete data["passwordConfirm"];
                await axios.post("/api/signup", data);
                navigate("/login");
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const toggleShowPassword = (elementId) => {
        const input = document.getElementById(elementId);

        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    };

    return (
        <div className="formFrame signupFormFrame">
            <h2>Sign Up</h2>
            <form className="signupForm" onSubmit={submitData}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstname"
                        onChange={changeData}
                        placeholder="First Name"
                        value={data.firstname}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        onChange={changeData}
                        placeholder="Last Name"
                        value={data.lastname}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={changeData}
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        value={data.email}
                        required
                    />
                </div>
                <div className="form-group eye-div">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={changeData}
                        placeholder="Password"
                        value={data.password}
                        required
                    />
                    <input
                        type="checkbox"
                        name="showPassword"
                        id="showPassword"
                        onClick={() => toggleShowPassword("password")}
                    />
                    <label className="eye-icon" htmlFor="showPassword">
                        <VisibilityIcon />
                    </label>
                </div>
                <div className="form-group eye-div">
                    <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={changeData}
                        placeholder="Confirm password"
                        value={data.passwordConfirm}
                        required
                    />
                    <input
                        type="checkbox"
                        name="showConfirmPassword"
                        id="showConfirmPassword"
                        onClick={() => toggleShowPassword("passwordConfirm")}
                    />
                    <label className="eye-icon" htmlFor="showConfirmPassword">
                        <VisibilityIcon />
                    </label>
                </div>

                <button type="submit" className=" form-control btn-primary">
                    Sign Up
                </button>
            </form>
            <div className="submitMessage"></div>
        </div>
    );
};

export default SignUp;
