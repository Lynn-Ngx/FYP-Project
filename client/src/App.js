import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Choose from "./pages/ChooseSize";
import User from "./pages/User";
import Recommend from "./pages/Recommend";
import addItem from "./pages/AddItem"

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Root>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/home" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/chooseSize" component={Choose} />
                            <Route path="/user" component={User} />
                            <Route path="/recommend" component={Recommend} />
                            <Route path="/add" component={addItem} />
                        </Switch>
                    </Root>

                </div>
            </Router>
        )
    }
}

export default App;
