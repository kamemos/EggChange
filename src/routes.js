import React from "react";
import { Route, Switch } from 'react-router-dom';
import { ContentEditor, Home, Post, Authen, Login } from "./pages";

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/authen" component={Authen}/>
        <Route exact path="/editor" component={ContentEditor} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/api/login" render={(props) => <Login {...props} />}/>
    </Switch>
)