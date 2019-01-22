import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import { Input, Message } from 'semantic-ui-react'
import { Button, Divider, Form, Grid } from 'semantic-ui-react'
import axios from 'axios'
import Navbar from './Navbar.js'

class SignIn extends Component {

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
        //
        axios.post('/api/signin', {email: this.state.email, password: this.state.password}).then(res => {
            console.log(res)
            if (!res.data.success){
                this.setState({
                    errorMessage: res.data.message
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
        const {errorMessage, email, password} = this.state

        return (
            <div>

                <Navbar/>

                <Segment raised style={{width: '600px', margin: '150px auto 0px auto'}}>

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
                                <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' value={email}  onChange={this.inputChanged}/>
                                <Form.Input icon='lock' iconPosition='left' label='Password' type='password' placeholder="Enter password" value={password}  onChange={this.inputChanged}/>

                                <Button primary style={{width: '250px'}} onClick={this.submitName}> Login </Button>
                            </Form>
                        </Grid.Column>


                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' icon='signup' size='big' style={{width: '250px'}}/>
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

export default SignIn;
