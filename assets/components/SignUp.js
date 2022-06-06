import React from "react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/signup", data);
        } catch (error) {
            console.error(error.message);
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
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={changeData}
                        placeholder="Password"
                    />
                </div>

                <button type="submit" className=" form-control btn-dark">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
