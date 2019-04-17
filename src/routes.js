import React from "react";
import { Route, Switch } from 'react-router-dom';
import { ContentEditor, Home, Post } from "./pages";

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={ContentEditor} />
        <Route exact path="/post" component={Post} />
    </Switch>
)