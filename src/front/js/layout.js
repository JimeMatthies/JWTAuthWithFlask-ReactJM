import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login";
import { Singup } from "./pages/singup";
import { NotFound } from "./pages/notfound";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

const Layout = () => {

    const basename = process.env.BASENAME || "";

    return (
        <>
            <BrowserRouter basename={basename}>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Demo />} path="/demo" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Singup />} path="/singup" />
                    <Route element={<Single />} path="/single/:theid" />
                    <Route element={<NotFound />} path="*" />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default injectContext(Layout);
