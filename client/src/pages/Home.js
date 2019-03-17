import React, { Component } from 'react'
import { Button, Divider, Input, Segment,  Header, Popup, Grid, Dimmer, Loader} from 'semantic-ui-react'
import history from './History';
import ChooseSize from './ChooseSize'
import {Link} from "react-router-dom";
import axios from "axios/index";
import ImageUploader from 'react-images-upload';

export default class HomePage extends Component {

    // state = {
    //     name: '',
    //     price: '',
    //     sizes: [],
    //     loading: false,
    // }

    constructor(props) {
        super(props);
        this.state = { link: '', click: false, loading: false, pictures: [] };

        this.onDrop = this.onDrop.bind(this);
        this.linkSubmitHandler = this.linkSubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    recomLinkSubmitHandler = async (event) => {
        event.preventDefault();

        this.setState({
            imageID: '',
            loading: true
        })

        axios.post('/api/scrapeImage', {link: this.state.link}).then(res => {
            this.setState({
                imageID: res.data.item,
                loading: false
            })
        })
    }

    linkSubmitHandler = async (event) => {
        //history.push('./chooseSize')
        event.preventDefault();

        this.setState({
            name: '',
            price: '',
            sizes: [],
            prices: [],
            loading: true
        })

        // axios.post('/api/getPrices', {link: this.state.link}).then(res => {
        //     this.setState({
        //         prices: res.data.price.price,
        //     })
        // })

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

    attachImage(){

    }

    render() {
        const {loading} = this.state

        console.log(loading)

        if (this.state.click) {
            return (
                <ChooseSize link={this.state.link} name={this.state.name} sizes={this.state.sizes} price={this.state.price} prices={this.state.prices}/>
            );
        }

        return (
            <div>

                {
                    loading &&
                    <Dimmer active >
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                }

                <Segment basic textAlign='center' style={{backgroundColor:'#181818', height:'310px', paddingTop: '50px'}}>

                    <div >
                        <p style={{color: 'white', fontFamily:'fantasy', fontSize:'20px'}}>I'M A </p>
                        <h3 style={{color: 'white', fontFamily:'fantasy', fontSize:'50px'}}>"SHOPAHOLIC"</h3>
                        <p style={{color: 'white', fontFamily:'fantasy', fontSize:'20px'}}>...IT'S IN MY JEANS</p>
                    </div>

                    <br/><br/>

                    <Input
                        action={{ color: 'blue', content: 'Search',
                            as: Link, to: 'chooseSize',onClick: this.linkSubmitHandler} }
                        icon='search'
                        style={{width:'500px'}}
                        //autoComplete="off"
                        iconPosition='left'
                        placeholder='Enter Link...'
                        id="linkInput"
                        //type='submit'
                        onChange={this.onInputChange}
                    />

                    <br/><br/><br/>


                    <Divider horizontal style={{color:'black'}}>Or</Divider>

                    <br/><br/>

                    <Popup trigger={<Button color='teal' content='Recommend Me' icon='add'/> } on='click' position='top center' flowing hoverable>
                        <Grid centered divided columns={2}>
                            <Grid.Column textAlign='center' style={{width: '300px'}}>
                                <Header as='h4'>Upload an Image</Header>
                                {/*<p>*/}
                                    {/*Upload an image to receive a recommendation*/}
                                {/*</p>*/}
                                {/*<Button icon='add' content='Attach' onChange={this.attachImage}/>*/}
                                <ImageUploader
                                    withIcon={false}
                                    buttonText='Attach Image'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.jpeg', '.png']}
                                    maxFileSize={5242880}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Insert Link</Header>
                                <p>
                                    <br/> Enter a link that contain an image/images <br/>
                                </p>
                                <Input
                                    action={{ color: 'blue', content: 'Search', onClick: this.recomLinkSubmitHandler, type:'submit'}}
                                    icon='search'
                                    iconPosition='left'
                                    placeholder='Enter Link...'
                                   // type='submit'
                                    onChange={this.onInputChange}
                                />
                                <button onClick={this.recomLinkSubmitHandler}>click here</button>
                            </Grid.Column>
                        </Grid>
                    </Popup>

                    <br/><br/><br/><br/><br/><br/>
                    <Grid columns={3} divided >
                        <Grid.Row>
                            <Grid.Column>
                               <h1>User Notification</h1>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfdd</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnffsff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsffs</p>
                            </Grid.Column>
                            <Grid.Column>
                                <h1>Price History</h1>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfdd</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnffsff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsffs</p>
                            </Grid.Column>
                            <Grid.Column>
                                <h1>Recommender</h1>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfdd</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnffsff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsfff</p>
                                <p>jdsfkjsdgjsdjgldgsjjfsdnfsdnfsffs</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>

        )
    }
}