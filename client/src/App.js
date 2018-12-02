import React, { Component } from 'react';
import SignUpPage from './pages/SignUp'
import SignIn from './pages/SignIn'


class App extends Component {
  render() {
    return (
        <div>
            <SignUpPage path={'/signup'}/>
             <SignIn path={'/signin'}/>
        </div>
    );
  }
}

export default App;
