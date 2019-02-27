import React, { Component } from 'react'
import { Button, Divider, Input, Segment,  Header, Popup, Grid, Dimmer, Loader} from 'semantic-ui-react'
import history from './History';
import ChooseSize from './ChooseSize'
import {Link} from "react-router-dom";
import axios from "axios/index";

export default class HomePage extends Component {

    // state = {
    //     name: '',
    //     price: '',
    //     sizes: [],
    //     loading: false,
    //     test: 'ughh'
    // }

    constructor(props) {
        super(props);
        this.state = { link: '', click: false, test: 'ughh', loading: false };

        this.linkSubmitHandler = this.linkSubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    linkSubmitHandler = async (event) => {
        //history.push('./chooseSize')
        event.preventDefault();

        this.setState({
            name: '',
            price: '',
            sizes: [],
            loading: true
        })

        axios.post('/api/getItemDetails', {itemLink: this.state.link}).then(res => {


            this.setState({
                name: res.data.name,
                price: res.data.price,
                sizes: res.data.sizes,
                loading: false
            })

            this.setState({ click: true});


        })

    }

    onInputChange(event) {
        this.setState({link: event.target.value});
    }

    render() {
        const {loading, test } = this.state

        console.log(loading)

        if (this.state.click) {
            return (
                <ChooseSize link={this.state.link} name={this.state.name} sizes={this.state.sizes} price={this.state.price} />
            );
        }

        return (
            <div style={{margin: '50px', padding:'50px'}}>

                {
                    loading &&
                    <Dimmer active >
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                }


                <Segment basic textAlign='center'>

                    <div style={{margin: '20px'}}>
                        <p>I'M A </p>
                        <p>"SHOPAHOLIC"</p>
                        <p>...IT'S IN MY JEANS</p>
                    </div>

                    <br/><br/>

                    <Input
                        action={{ color: 'blue', content: 'Search',
                            as: Link, to: '/chooseSize',onClick: this.linkSubmitHandler}}
                        icon='search'
                        style={{width:'500px'}}
                        //autoComplete="off"
                        iconPosition='left'
                        placeholder='Enter Link...'
                        id="linkInput"
                        onChange={this.onInputChange}
                    />

                    <br/><br/><br/>


                    <Divider horizontal>Or</Divider>

                    <br/><br/>

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