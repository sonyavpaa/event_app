import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ loggedInUser, setLoggedInUser }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    let navigate = useNavigate();

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", data);
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    userId: data.email,
                    token: response.data.token,
                })
            );

            setLoggedInUser({ userId: data.email });
            navigate("/my_events");
        } catch (error) {
            const submitMessage = document.createElement("p");

            submitMessage.innerHTML = "Login fail, please check login info";

            document.querySelector(".submitMessage").appendChild(submitMessage);
            console.error(error.message);
        }
    };

    return (
        <div className="formFrame loginFormFrame">
            <h2>Log In</h2>
            <form className="loginForm" onSubmit={submitData}>
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

                <button type="submit" className=" form-control btn-primary">
                    Log In
                </button>
                <div className="submitMessage"></div>
            </form>
        </div>
    );
};

export default LogIn;
