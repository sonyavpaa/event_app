import React from "react";
import ReactDOM from "react-dom/client";

const Main = () => {
    return <div>hello world</div>;
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

export default Main;
