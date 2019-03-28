import React, { Component } from 'react';
import  {BrowserRouter, Switch, Route } from "react-router-dom"
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import Root from "./pages/Root";
import Home from "./pages/SignedOut/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Choose from "./pages/SignedOut/ChooseSize";
import User from "./pages/SignedIn/User";
import Recommend from "./pages/SignedIn/Recommend";
import NavigationBar from "./pages/NavigationBar/Header"

class App extends Component {
    render() {
        return (
            //{/*<Router>*/}
              //  {/*<div>*/}
                   // {/*<Root>*/}
                    //    {/*<Switch>*/}
                       //     {/*/!*<Route exact path="/" component={Home} />*!/*/}
                         //   {/*/!*<Route path="/home" component={Home} />*!/*/}
                           // {/*/!*<Route path="/login" component={Login} />*!/*/}
                            //{/*/!*<Route path="/register" component={Register} />*!/*/}
                            //{/*/!*<Route path="/chooseSize" component={Choose} />*!/*/}
                            //{/*/!*<Route path="/user" component={User} />*!/*/}
                            //{/*/!*<Route path="/recommend" component={Recommend} />*!/*/}
                        //{/*</Switch>*/}
                    //{/*</Root>*/}
                //{/*</div>*/}
           // {/*</Router>*/}

            <BrowserRouter>
                <div className="App">
                    <NavigationBar/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login}/>
                        <Route path='/chooseSize' component={Choose}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/user' component={User}/>
                        <Route path='/recommend' component={Recommend}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
