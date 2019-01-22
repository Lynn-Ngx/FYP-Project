import React, { Component } from 'react';
import SignUpPage from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import DashboardHome from './pages/DashboardHome'
import Recommend from './pages/Recommend'
import SizeChoose from './pages/SizeChoose'


class App extends Component {
  render() {
    return (
        <div>
            {/*<SignUpPage path={'/signup'}/>*/}
             {/*<SignIn path={'/signin'}/>*/}
            {/*<Home path={'/home'}/>*/}
            <SizeChoose path={'/SizeChoose'}/>
            {/*<DashboardHome path={'/DashboardHome'}/>*/}
            {/*<Recommend path={'/Recommend'}/>*/}
        </div>
    );
  }
}

export default App;
