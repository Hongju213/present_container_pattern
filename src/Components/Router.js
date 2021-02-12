/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "../Components/Header";
import Detail from "../Routes/Detail";
import Home from "../Routes/Home";
import Search from "../Routes/Search";
import TV from "../Routes/TV";


export default () => {
    return (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/tv" component={TV}></Route>
                <Route path="/search" component={Search}></Route>
                <Route path="/show/:id" component={Detail} />
                <Route path="/movie/:id" component={Detail} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
    )
};


