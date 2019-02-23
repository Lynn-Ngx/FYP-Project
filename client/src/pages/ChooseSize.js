import React, {Component} from 'react'
import { Divider, Grid } from 'semantic-ui-react'
import {Segment, Button, Form, Popup } from 'semantic-ui-react'
import { Dropdown, Menu, Message} from 'semantic-ui-react'
import {Line} from 'react-chartjs-2';
import axios from "axios/index";


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};


export default class ChooseSize extends Component {

    state = {
        link: this.props.link,
        name: this.props.name,
        size: '',
        price: this.props.price,
        username: '',
        email: '',
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
        axios.post('/api/saveItem', {username: this.state.username,  email: this.state.email, link: this.state.link, name: this.state.name, size: this.state.size, price: this.state.price}).then(res => {
            console.log(res)
            if (!res.data.success){
                this.setState({
                    errorMessage: res.data.message
                })
            }
        })

    }

    validateInput= ({username, email}) => {
        let error = false

        if (!email || !username) error = 'Fields cannot be empty'
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
        const {errorMessage, username, email} = this.state
        return(
            <div>
                <Segment style={{margin: '100px', padding: '50px'}}>

                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <h2>{this.props.name}</h2>
                            <p>Current Price: {this.props.price}</p>

                            <br/>

                            <Line data={data}/>
                            {/*<Popup*/}
                                {/*trigger={<Button color='white' icon='eye' content='View Price History'/>}*/}
                                {/*content={<Line data={data}/>}*/}
                                {/*on='click'*/}
                                {/*position='bottom right'*/}
                            {/*/>*/}

                            <br/><br/>

                            <p>Select a size:</p>
                            <Menu compact style={{width:'180px'}}>
                                <Dropdown onChange={this.onChangeFollower} style={{width:'180px'}} placeholder='Select Size' fluid selection options={this.props.sizes.map(size => ({
                                    key: size,
                                    value: size,
                                    text: size,
                                }))} />
                            </Menu>
                        </Grid.Column>

                        <Grid.Column style={{marginTop:'100px'}}>
                            <h2>Enter Details</h2>

                            <div>
                                <Form>
                                    <Form.Field>
                                        <label>Name</label>
                                        <input  autoComplete="off" placeholder='Enter Name' name="username" onChange={this.inputChanged} value={username}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input autoComplete="off" placeholder='Enter Email' name="email" onChange={this.inputChanged} value={email}/>

                                        {
                                            (errorMessage !== '') &&
                                            <Message negative style={{width:'450px'}}>
                                                <p>{errorMessage}</p>
                                            </Message>
                                        }
                                    </Form.Field>
                                    <Button type='submit' style={{backgroundColor: 'rgb(21, 135, 205)', color: 'White'}} onClick={this.submitName}>Notify Me!</Button>
                                </Form>
                            </div>

                        </Grid.Column>

                    </Grid>

                    <Divider vertical> - </Divider>
                </Segment>
            </div>
        )
    }

}