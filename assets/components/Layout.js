import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, loggedInUser, setLoggedInUser }) => {
    return (
        <>
            <Header
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
            />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
