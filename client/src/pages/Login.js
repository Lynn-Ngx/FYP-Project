import React, { Component} from 'react';
import { Segment } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'
import { Button, Divider, Form, Grid } from 'semantic-ui-react'
import axios from 'axios'
import {NavLink, Redirect} from "react-router-dom";
import User from './SignedIn/User'
import history from './NavigationBar/History';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        signedIn: false
    }


    submitName = async (e) => {
        this.setState({
            errorMessage: ''
        })
        //this just stops page redirecting when submitting form
        e.preventDefault()
        //
        let error = this.validateInput(this.state)
        //
        if (error) {
            this.setState({
                errorMessage: error
            })

            return
        }

        axios.post('/api/signin', {email: this.state.email, password: this.state.password}).then(res => {
            console.log(res)
            if (!res.data.success){
                this.setState({
                    errorMessage: res.data.message
                })
            }

            if(res.data.success){
                localStorage.setItem('shopaholic-token', res.data.token)
                history.push('./user')
                this.setState({
                    signedIn: true
                })
            }

        })

    }

    validateInput= ({email, password}) => {
        let error = false

        if (!email || !password ) error = 'Fields cannot be empty'
        else if (email.length < 1) error =  'Must have a username'

        return error
    }

    inputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {errorMessage, email, password, signedIn} = this.state

        return (
            <div>
                {
                    signedIn &&
                    <div>
                        <User/>
                        <Redirect to="/user"/>
                    </div>
                }

                {
                    !signedIn &&
                        <Segment raised style={{width: '600px', margin: '100px auto 0px auto'}}>

                            <h1>SIGN IN</h1>

                            <Grid columns={2} relaxed='very' stackable>
                                <Grid.Column>
                                    <Form onSubmit={this.submitName}>
                                        <Form.Input icon='user' iconPosition='left' name='email' placeholder='Username' autoComplete="off" value={email}  onChange={this.inputChanged}/>
                                        <Form.Input icon='lock' iconPosition='left' name='password' type='password' placeholder="Enter password" value={password}  onChange={this.inputChanged}/>

                                        <Button primary style={{width: '250px'}} onClick={this.submitName} content='Login'/>
                                    </Form>
                                </Grid.Column>


                                <Grid.Column verticalAlign='middle'>
                                    <Button content='Sign up' as={NavLink} to='/register' icon='signup' size='big' style={{width: '250px'}}/>
                                </Grid.Column>
                            </Grid>

                            <Divider vertical>Or</Divider>

                            {
                                (errorMessage !== '') &&
                                <Message negative style={{width:'250px'}}>
                                    <p>{errorMessage}</p>
                                </Message>
                            }

                        </Segment>
                }

            </div>
        );
    }
}

export default Login;
