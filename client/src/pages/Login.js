import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'
import { Button, Divider, Form, Grid } from 'semantic-ui-react'
import axios from 'axios'
import {Link} from "react-router-dom";

class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: ''
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
        const {errorMessage, email, password} = this.state

        return (
            <div>
                <Segment raised style={{width: '600px', margin: '120px auto 0px auto'}}>

                    <h1>SIGN IN</h1>

                    {/*<div>*/}
                    {/*<form  onSubmit={this.submitName}>*/}
                    {/*<Input style={{width: '250px', marginBottom: '20px'}} type='email' name='email'  placeholder="Enter email" value={email}  onChange={this.inputChanged} />*/}
                    {/*<Input style={{width: '250px', marginBottom: '20px'}} type='password' name='password'  placeholder="Enter password" value={password}  onChange={this.inputChanged} />*/}
                    {/*<Button primary style={{width: '250px'}} onClick={this.submitName}> Sign Up </Button>*/}
                    {/*</form>*/}
                    {/*</div>*/}

                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form onSubmit={this.submitName}>
                                {/*<Input style={{width: '250px', marginBottom: '20px'}} type='email' name='email'  placeholder="Enter email" value={email}  onChange={this.inputChanged} />*/}
                                {/*<Input style={{width: '250px', marginBottom: '20px'}} type='password' name='password'  placeholder="Enter password" value={password}  onChange={this.inputChanged} />*/}

                                <Form.Input icon='user' iconPosition='left' name='email' placeholder='Username' value={email}  onChange={this.inputChanged}/>
                                <Form.Input icon='lock' iconPosition='left' name='password' type='password' placeholder="Enter password" value={password}  onChange={this.inputChanged}/>

                                <Button primary style={{width: '250px'}} onClick={this.submitName}> Login </Button>
                            </Form>
                        </Grid.Column>


                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' as={Link} to='/register' icon='signup' size='big' style={{width: '250px'}}/>
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
            </div>
        );
    }
}

export default Login;
