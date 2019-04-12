import React, { Component } from 'react'
import { Divider, Grid } from 'semantic-ui-react'
import { Segment, Button, Form } from 'semantic-ui-react'
import { Dropdown, Menu, Message} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import axios from "axios/index";
import HomePage from "./Home";

export default class ChooseSize extends Component {
    state = {
        link: this.props.location.state.link,
        name: this.props.location.state.name,
        size: '',
        price: this.props.location.state.price,
        username: '',
        email: '',
        errorMessage: '',
        errMessage: '',
        saved: false,


        data : {
            labels: this.props.location.state.dates,
            datasets: [
                {
                    label: 'Price',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.location.state.prices
                }
            ]
        }
    }

    submitName = async (e) => {
        this.setState({
            errorMessage: '',
            errMessage: ''
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

        axios.post('/api/saveItem', {username: this.state.username,  email: this.state.email, link: this.state.link, name: this.state.name, size: this.state.size, price: this.state.price, isLoggedIn: false}).then(res => {
            if (res.data.success){
                this.setState({
                    saved: true
                })
            }

            if (!res.data.success){
                this.setState({
                    errorMessage: res.data.message
                })
            }
        })

    }

    validateInput= ({username, email, size}) => {
        let error = false

        if (!email || !username) {error = 'Fields cannot be empty'}
        else if(!size) {error = 'Please select a size'}
        else if (email.length < 1) error =  'Must have a email'
        else if (username.length < 1) error =  'Must have a username'

        return error
    }

    onChangeFollower = (event, data) => {
        this.setState({size: data.value})
    }

    inputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {errorMessage, username, email, data, saved} = this.state
        return(
            <div>

                {
                    saved &&
                    <div>
                        <HomePage/>
                        <Redirect to="/"/>
                    </div>
                }

                {
                    !saved &&
                    <Segment style={{margin: '100px', height: '400px', padding: '50px', overflow: 'scroll'}}>

                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <h2 style={{marginTop: '20px'}}>{this.props.location.state.name}</h2>
                                <p style={{fontSize: '20px'}}>Current Price: {this.props.location.state.price}</p>

                                <p style={{fontSize: '15px'}}>Select a size:</p>

                                <Menu compact style={{width: '180px'}}>
                                    <Dropdown onChange={this.onChangeFollower} style={{width: '180px'}}
                                              placeholder='Select Size' fluid selection
                                              options={this.props.location.state.sizes.map(size => ({
                                                  key: size,
                                                  value: size,
                                                  text: size,
                                              }))}/>
                                </Menu>

                                <br/><br/><br/><br/>

                                {
                                    data.labels && <Line data={data}/>
                                }
                            </Grid.Column>

                            <Grid.Column>
                                <h2 style={{marginTop: '20px'}}>Enter Details</h2>

                                <div>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input autoComplete="off" placeholder='Enter Name' name="username"
                                                   onChange={this.inputChanged} value={username}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Email</label>
                                            <input autoComplete="off" placeholder='Enter Email' name="email"
                                                   onChange={this.inputChanged} value={email}/>

                                            {
                                                (errorMessage !== '') &&
                                                <Message negative style={{width: '550px'}}>
                                                    <p>{errorMessage}</p>
                                                </Message>
                                            }
                                        </Form.Field>
                                        <Button type='submit'
                                                style={{backgroundColor: 'rgb(21, 135, 205)', color: 'White'}}
                                                onClick={this.submitName}>Notify Me!</Button>
                                    </Form>
                                </div>

                            </Grid.Column>

                        </Grid>

                        <Divider vertical> - </Divider>
                    </Segment>
                }
            </div>
        )
    }

}