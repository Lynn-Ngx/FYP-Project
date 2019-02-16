import React, { Component } from 'react'
import { Button, Divider, Input, Segment,  Header, Popup, Grid } from 'semantic-ui-react'
import history from './History';
import ChooseSize from './ChooseSize'
import {Link} from "react-router-dom";
import axios from "axios/index";

export default class HomePage extends Component {

    state = {
        name: '',
        price: '',
        sizes: []
    }

    constructor(props) {
        super(props);
        this.state = { link: '', click: false };

        this.linkSubmitHandler = this.linkSubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    linkSubmitHandler = async (event) => {
        event.preventDefault();

        this.setState({
            name: '',
            price: '',
            sizes: []
        })

        axios.post('/api/getItemDetails', {itemLink: this.state.link}).then(res => {

            this.setState({
                name: res.data.name,
                price: res.data.price,
                sizes: res.data.sizes
            })

            this.setState({ click: true});


        })

    }

    onSearch(){
        // history.push('./chooseSize')
    }

    onInputChange(event) {
        this.setState({link: event.target.value});


    }

    render() {
        if (this.state.click) {
            return (
                <ChooseSize link={this.state.link} name={this.state.name} sizes={this.state.sizes} price={this.state.price} />
            );
        }

        return (

            <div style={{margin: '50px', padding:'50px'}}>
                <Segment basic textAlign='center'>

                    <div style={{margin: '20px'}}>
                        <p>I'M A </p>
                        <p>SHOPAHOLIC</p>
                        <p>...IT'S IN MY JEANS</p>
                    </div>

                    <Input
                        action={{ color: 'blue', content: 'Search',
                            /* as: Link, to: './chooseSize',*/ onClick: this.linkSubmitHandler}}
                        icon='search'
                        //autoComplete="off"
                        iconPosition='left'
                        placeholder='Enter Link...'
                        id="linkInput"
                        onChange={this.onInputChange}
                    />

                    <Divider horizontal>Or</Divider>

                    <Popup trigger={<Button color='teal' content='Recommend Me' icon='add'/> }  position='top center' flowing hoverable>
                        <Grid centered divided columns={2}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Upload an Image</Header>
                                <p>
                                    Upload an image to receive a recommendation
                                </p>
                                <Button icon='add' content='Attach'/>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Insert Link</Header>
                                <p>
                                    Enter a link that contain an image/images
                                </p>
                                <Input
                                    action={{ color: 'blue', content: 'Search' }}
                                    icon='search'
                                    iconPosition='left'
                                    placeholder='Enter Link...'
                                />
                            </Grid.Column>
                        </Grid>
                    </Popup>
                </Segment>
            </div>

        )
    }
}