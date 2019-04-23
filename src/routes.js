import React from "react";
import { Route, Switch } from 'react-router-dom';
import { ContentEditor, Home, Post, Authen, Login, Board, ErrorPage } from "./pages";

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/authen" component={Authen}/>
        <Route exact path="/editor" component={ContentEditor} />
        <Route exact path="/post/:blog_title" render={(props) => <Post {...props} />} />
        <Route exact path="/api/login" render={(props) => <Login {...props} />}/>
        <Route exact path="/board" component={Board}/>
        <Route component={ErrorPage} />
    </Switch>
)