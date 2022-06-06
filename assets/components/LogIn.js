import axios from "axios";
import React from "react";
import { useState } from "react";

const LogIn = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [isLogin, setIsLogin] = useState(true);

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", data);
            window.localStorage.setItem(
                "loggedInUserToken",
                JSON.stringify({ token: response.data.token })
            );
        } catch (error) {
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

                <button type="submit" className=" form-control btn-dark">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogIn;
