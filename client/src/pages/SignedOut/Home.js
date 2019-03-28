import React, { Component } from 'react'
import { Button, Divider, Input, Segment,  Header, Popup, Grid, Dimmer, Loader, Message} from 'semantic-ui-react'
import history from '../NavigationBar/History';
import ChooseSize from './ChooseSize'
import {NavLink, Redirect} from "react-router-dom";
import axios from "axios/index";
import ImageUploader from 'react-images-upload';

var fs = require('fs');

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { link: '', click: false, loading: false, pictures: [], noInput: true, errMessage:''};

        this.onDrop = this.onDrop.bind(this);
        this.linkSubmitHandler = this.linkSubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

        fs.writeFile('/../../image/image.jpg', picture, 'binary', function(err) {
            console.log("The file was saved!");
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
        history.push('./chooseSize')
        event.preventDefault();

        this.setState({
            name: '',
            price: '',
            sizes: [],
            prices: [],
            dates: [],
            loading: true
        })

        axios.post('/api/getPrices', {link: this.state.link}).then(res => {
            this.setState({
                prices: res.data.prices,
                dates: res.data.dates,
                priceExist: true
            })
        })

        axios.post('/api/getItemDetails', {itemLink: this.state.link}).then(res => {
            this.setState({
                    name: res.data.name,
                    price: res.data.price,
                    sizes: res.data.sizes,
                    loading: false,
                    click: true
            })

            if(!res.data.success){
                this.setState({
                    loading:false,
                    errMessage: 'Invalid Link Entered'
                })
            }

        })
    }

    onInputChange(event) {
        this.setState({link: event.target.value});

        if(event.target.value === '') this.setState({noInput: true});
        else this.setState({noInput: false});

    }

    render() {
        const {loading, noInput, errMessage} = this.state

        return (
            <div>

                {
                    this.state.click &&
                    <div>
                        <ChooseSize link={this.state.link} name={this.state.name} sizes={this.state.sizes} price={this.state.price} prices={this.state.prices} dates={this.state.dates}/>
                    </div>
                }

                {
                    loading &&
                    <Dimmer active >
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                }

                <Segment basic textAlign='center' style={{backgroundColor:'#181818', height:'310px', paddingTop: '50px'}}>

                    <div>
                        <p style={{color: 'white', fontFamily:'fantasy', fontSize:'20px'}}>I'M A </p>
                        <h3 style={{color: 'white', fontFamily:'fantasy', fontSize:'50px'}}>"SHOPAHOLIC"</h3>
                        <p style={{color: 'white', fontFamily:'fantasy', fontSize:'20px'}}>...IT'S IN MY JEANS</p>
                    </div>

                    <br/><br/>

                    <Input
                        action={{ color: 'blue', content: 'Search', disabled: noInput,
                            as: NavLink, to: '/chooseSize', onClick: this.linkSubmitHandler} }
                        icon='search'
                        style={{width:'500px'}}
                        //autoComplete="off"
                        iconPosition='left'
                        placeholder='Enter Link...'
                        id="linkInput"
                        //type='submit'
                        onChange={this.onInputChange}
                    />

                    {
                        (errMessage !== '') &&
                        <Message negative style={{width:'500px', display: 'block', marginLeft: 'auto', marginRight:'auto'}}>
                            <p>{errMessage}</p>
                        </Message>
                    }

                    <br/><br/><br/>


                    <Divider horizontal style={{color:'black'}}>Or</Divider>

                    <br/><br/>

                    <Popup trigger={<Button color='teal' content='Recommend Me' icon='add'/> } position='top center' flowing hoverable>
                        <Grid centered divided columns={2}>
                            <Grid.Column textAlign='center' style={{width: '300px'}}>
                                <Header as='h4'>Upload an Image</Header>
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
                            </Grid.Column>
                        </Grid>
                    </Popup>

                    <br/><br/><br/><br/><br/><br/>
                    <Grid columns={3} divided >
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{width:'70px', height:'70px', position:'block', margin:'0px auto 0px auto'}}>
                                    <span dangerouslySetInnerHTML={{__html: "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n" +
                                        "<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n" +
                                        "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
                                        "\t viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n" +
                                        "<path style=\"fill:#FF9102;\" d=\"M242.757,6.452L0.351,202.324v36.503H256h255.649v-36.503L269.243,6.452\n" +
                                        "\tC261.518,0.21,250.482,0.21,242.757,6.452z\"/>\n" +
                                        "<linearGradient id=\"SVGID_1_\" gradientUnits=\"userSpaceOnUse\" x1=\"61.4467\" y1=\"491.3357\" x2=\"522.0567\" y2=\"30.7167\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#FFFFFF\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#E8EFEE\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_1_);\" d=\"M469.509,441.27H42.491c-11.636,0-21.07-9.434-21.07-21.07V21.07\n" +
                                        "\tC21.421,9.434,30.854,0,42.491,0h427.018c11.636,0,21.07,9.434,21.07,21.07v399.131C490.579,431.838,481.146,441.27,469.509,441.27z\n" +
                                        "\t\"/>\n" +
                                        "<linearGradient id=\"SVGID_2_\" gradientUnits=\"userSpaceOnUse\" x1=\"460.6831\" y1=\"143.2783\" x2=\"-4.0069\" y2=\"105.8684\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#C2CECE;stop-opacity:0\"/>\n" +
                                        "\t<stop  offset=\"0.179\" style=\"stop-color:#AFBCBC;stop-opacity:0.179\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#5B6A6A\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_2_);\" d=\"M490.579,408.463v8.202c0,13.583-11.024,24.606-24.606,24.606H46.028\n" +
                                        "\tc-13.583,0-24.606-11.024-24.606-24.606v-8.202H490.579z\"/>\n" +
                                        "<g>\n" +
                                        "\t<rect x=\"120.448\" y=\"66.72\" style=\"fill:#C2CECE;\" width=\"271.104\" height=\"15.452\"/>\n" +
                                        "\t<rect x=\"120.448\" y=\"128.523\" style=\"fill:#C2CECE;\" width=\"271.104\" height=\"15.452\"/>\n" +
                                        "\t<rect x=\"120.448\" y=\"191.733\" style=\"fill:#C2CECE;\" width=\"271.104\" height=\"15.452\"/>\n" +
                                        "\t<rect x=\"120.448\" y=\"254.944\" style=\"fill:#C2CECE;\" width=\"271.104\" height=\"15.452\"/>\n" +
                                        "</g>\n" +
                                        "<linearGradient id=\"SVGID_3_\" gradientUnits=\"userSpaceOnUse\" x1=\"461.6277\" y1=\"285.9978\" x2=\"353.6177\" y2=\"394.0078\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#C2CECE;stop-opacity:0\"/>\n" +
                                        "\t<stop  offset=\"0.179\" style=\"stop-color:#AFBCBC;stop-opacity:0.179\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#5B6A6A\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_3_);\" d=\"M425.262,208.593c-21.018,0-40.277-7.513-55.254-19.99l-5.849,1.027l126.42,126.42V178.707\n" +
                                        "\tC474.739,197.002,451.361,208.593,425.262,208.593z\"/>\n" +
                                        "<linearGradient id=\"SVGID_4_\" gradientUnits=\"userSpaceOnUse\" x1=\"236.9375\" y1=\"240.3775\" x2=\"236.9375\" y2=\"62.4675\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#FFC200\"/>\n" +
                                        "\t<stop  offset=\"0.268\" style=\"stop-color:#FFBB00\"/>\n" +
                                        "\t<stop  offset=\"0.659\" style=\"stop-color:#FFA801\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#FF9102\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_4_);\" d=\"M511.649,202.791V490.93c0,11.631-9.439,21.07-21.07,21.07H21.421\n" +
                                        "\tc-11.631,0-21.07-9.439-21.07-21.07V202.791L258.81,406.651L511.649,202.791z\"/>\n" +
                                        "<linearGradient id=\"SVGID_5_\" gradientUnits=\"userSpaceOnUse\" x1=\"237.879\" y1=\"104.5775\" x2=\"237.879\" y2=\"42.8575\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#FFC200\"/>\n" +
                                        "\t<stop  offset=\"0.268\" style=\"stop-color:#FFBB00\"/>\n" +
                                        "\t<stop  offset=\"0.659\" style=\"stop-color:#FFA801\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#FF9102\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_5_);\" d=\"M508.807,501.465L272.034,310.559c-7.718-6.223-18.732-6.223-26.45,0L5.201,504.375\n" +
                                        "\tc3.866,4.657,9.695,7.625,16.22,7.625h469.157C498.373,512,505.163,507.757,508.807,501.465z\"/>\n" +
                                        "<linearGradient id=\"SVGID_6_\" gradientUnits=\"userSpaceOnUse\" x1=\"361.8644\" y1=\"481.9572\" x2=\"429.0144\" y2=\"321.9662\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#D63305\"/>\n" +
                                        "\t<stop  offset=\"0.366\" style=\"stop-color:#CF3004\"/>\n" +
                                        "\t<stop  offset=\"0.899\" style=\"stop-color:#BC2602\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#B72401\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<circle style=\"fill:url(#SVGID_6_);\" cx=\"425.259\" cy=\"129.227\" r=\"86.387\"/>\n" +
                                        "<path style=\"fill:#FFFFFF;\" d=\"M405.781,94.628c0-2.802,1.132-5.012,3.395-6.629l16.816-16.169c1.185-1.185,2.64-1.779,4.366-1.779\n" +
                                        "\tc1.94,0,3.691,0.513,5.254,1.536c1.562,1.025,2.345,2.4,2.345,4.123v107.037c0,1.726-0.864,3.1-2.587,4.124\n" +
                                        "\tc-1.726,1.025-3.718,1.536-5.982,1.536c-2.372,0-4.394-0.511-6.063-1.536c-1.673-1.023-2.507-2.398-2.507-4.124V92.848l-5.659,7.115\n" +
                                        "\tc-1.078,1.078-2.263,1.617-3.557,1.617c-1.617,0-2.991-0.727-4.124-2.182C406.347,97.942,405.781,96.353,405.781,94.628z\"/>\n" +
                                        "<linearGradient id=\"SVGID_7_\" gradientUnits=\"userSpaceOnUse\" x1=\"125.2828\" y1=\"427.4929\" x2=\"-211.8172\" y2=\"764.5828\" gradientTransform=\"matrix(1.0667 0 0 -1.0667 3.2667 557.5334)\">\n" +
                                        "\t<stop  offset=\"0\" style=\"stop-color:#C2CECE;stop-opacity:0\"/>\n" +
                                        "\t<stop  offset=\"0.179\" style=\"stop-color:#AFBCBC;stop-opacity:0.179\"/>\n" +
                                        "\t<stop  offset=\"1\" style=\"stop-color:#5B6A6A\"/>\n" +
                                        "</linearGradient>\n" +
                                        "<path style=\"fill:url(#SVGID_7_);\" d=\"M27.99,426.77V27.638c0-11.636,9.434-21.07,21.07-21.07h427.018\n" +
                                        "\tc4.135,0,7.98,1.209,11.234,3.267C483.579,3.932,477.01,0,469.509,0H42.491c-11.636,0-21.07,9.434-21.07,21.07v399.131\n" +
                                        "\tc0,7.502,3.932,14.07,9.836,17.804C29.199,434.75,27.99,430.905,27.99,426.77z\"/>\n <g>\n </g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n"+ "</g>\n" +  "<g>\n</g>\n</svg>\n"}}
                                    />
                                </div>
                               <h1 style={{fontSize:'40px'}}>User Notification</h1>
                                <p style={{fontSize:'15px', textAlign:'left', marginLeft:'60px'}}>
                                    Constantly checking for an item that is<br/>
                                    out of stock? Using Shopaholic will allow<br/>
                                    you to keep track of an item without having<br/>
                                    to go on the website. Enter a link above, choose<br/>
                                    the size you are looking for and finally enter your<br/>
                                    email. Once the item is back in stock you will <br/>
                                    receive an email. Yes, it is THAT simple! </p>

                                <br/><br/><br/>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{width:'70px', height:'70px', position:'block', margin:'0px auto 0px auto'}}>
                                    <span dangerouslySetInnerHTML={{__html: "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n" +
                                        "<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n" +
                                        "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n" +
                                        "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
                                        "\t viewBox=\"0 0 60 60\" style=\"enable-background:new 0 0 60 60;\" xml:space=\"preserve\">\n" +
                                        "<g>\n" +
                                        "\t<g>\n" +
                                        "\t\t<path style=\"fill:#9777A8;\" d=\"M18.306,33.28l-5.013,5.013c-0.391,0.391-0.391,1.023,0,1.414C13.488,39.902,13.744,40,14,40\n" +
                                        "\t\t\ts0.512-0.098,0.707-0.293l5.013-5.013c0.391-0.391,0.391-1.023,0-1.414S18.696,32.89,18.306,33.28z\"/>\n" +
                                        "\t\t<path style=\"fill:#9777A8;\" d=\"M27.694,33.28c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.025,6.025\n" +
                                        "\t\t\tc0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L27.694,33.28z\"/>\n" +
                                        "\t\t<path style=\"fill:#9777A8;\" d=\"M50.707,30.293c-0.391-0.391-1.023-0.391-1.414,0l-10,10c-0.391,0.391-0.391,1.023,0,1.414\n" +
                                        "\t\t\tC39.488,41.902,39.744,42,40,42s0.512-0.098,0.707-0.293l10-10C51.098,31.316,51.098,30.684,50.707,30.293z\"/>\n" +
                                        "\t</g>\n" +
                                        "\t<path style=\"fill:#556080;\" d=\"M3,60c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1s1,0.447,1,1v58C4,59.553,3.553,60,3,60z\"/>\n" +
                                        "\t<path style=\"fill:#556080;\" d=\"M59,58H1c-0.553,0-1-0.447-1-1s0.447-1,1-1h58c0.553,0,1,0.447,1,1S59.553,58,59,58z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,29H7c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,29,9,29z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,25H7c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,25,9,25z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,21H7c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,21,9,21z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,17H7c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,17,9,17z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,13H7c-0.553,0-1-0.447-1-1s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,13,9,13z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,9H7C6.447,9,6,8.553,6,8s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,9,9,9z\"/>\n" +
                                        "\t<path style=\"fill:#BDC3C7;\" d=\"M9,5H7C6.447,5,6,4.553,6,4s0.447-1,1-1h2c0.553,0,1,0.447,1,1S9.553,5,9,5z\"/>\n" +
                                        "\t<circle style=\"fill:#F29C1F;\" cx=\"11.012\" cy=\"42.988\" r=\"5\"/>\n" +
                                        "\t<circle style=\"fill:#71C285;\" cx=\"23\" cy=\"31\" r=\"5\"/>\n" +
                                        "\t<circle style=\"fill:#71C285;\" cx=\"54\" cy=\"28\" r=\"5\"/>\n" +
                                        "\t<circle style=\"fill:#F29C1F;\" cx=\"36\" cy=\"44\" r=\"5\"/>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>\n"}}
                                    />
                                        </div>
                                <h1 style={{fontSize:'40px'}}>Price History</h1>
                                <p style={{fontSize:'15px', textAlign:'left', marginLeft:'60px'}}>
                                    This feature lets you track the item price!<br/>
                                    You can use this to see how often the item<br/>
                                    goes on sale, or if the price was raised before<br/>
                                    the sale. This  helps you decide when is the<br/>
                                    best time to purchase the item. The price<br/>
                                    history is neatly displayed on a line graph with<br/>
                                    the date and price of the item. </p>

                                <br/><br/><br/>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{width:'70px', height:'70px', position:'block', margin:'0px auto 0px auto'}}>
                                    <span dangerouslySetInnerHTML={{__html:"<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n" +
                                        "<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n" +
                                        "<svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
                                        "\t viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n" +
                                        "<path style=\"fill:#78B9EB;\" d=\"M504.464,89.698v332.605c0,14.283-11.579,25.863-25.863,25.863H33.398\n" +
                                        "\tc-14.283,0-25.863-11.579-25.863-25.863V89.698c0-14.283,11.579-25.863,25.863-25.863h445.203\n" +
                                        "\tC492.885,63.836,504.464,75.415,504.464,89.698z\"/>\n" +
                                        "<path style=\"fill:#96C8EF;\" d=\"M504.464,89.698v332.605c0,14.283-11.579,25.863-25.863,25.863H65.765\n" +
                                        "\tc-14.283,0-25.863-11.579-25.863-25.863V89.698c0-14.283,11.579-25.863,25.863-25.863h412.837\n" +
                                        "\tC492.885,63.836,504.464,75.415,504.464,89.698z\"/>\n" +
                                        "<path style=\"fill:#3D9AE2;\" d=\"M504.464,89.698v38.035H7.537V89.698c0-14.283,11.579-25.863,25.863-25.863h445.203\n" +
                                        "\tC492.885,63.836,504.464,75.415,504.464,89.698z\"/>\n" +
                                        "<path style=\"fill:#1E81CE;\" d=\"M33.398,63.836c-14.283,0-25.863,11.579-25.863,25.863v38.035h32.366V89.698\n" +
                                        "\tc0-14.283,11.579-25.863,25.863-25.863C65.764,63.836,33.398,63.836,33.398,63.836z\"/>\n" +
                                        "<path style=\"fill:#A5001E;\" d=\"M415.418,278.074l-35.03,67.617l-27.521,53.132c-2.503,4.845-9.7,3.86-10.815-1.478l-1.98-9.509\n" +
                                        "\tc-1.98-9.499-12.182-14.786-21.078-10.926l-8.906,3.87c-5.006,2.171-9.961-3.136-7.458-7.981l25.863-49.926l36.688-70.823\n" +
                                        "\tL415.418,278.074z\"/>\n" +
                                        "<path style=\"fill:#C70024;\" d=\"M474.037,380.781l-8.906-3.87c-8.906-3.86-19.108,1.427-21.088,10.926l-1.98,9.509\n" +
                                        "\tc-1.106,5.337-8.303,6.322-10.815,1.478l-27.612-53.303l-34.939-67.446l50.238-26.023l36.216,69.908l26.335,50.841\n" +
                                        "\tC483.999,377.645,479.034,382.952,474.037,380.781z\"/>\n" +
                                        "<path style=\"fill:#B3D8F4;\" d=\"M266.685,262.927v124.327c0,10.082-8.172,18.254-18.244,18.254H78.69\n" +
                                        "\tc-10.072,0-18.244-8.172-18.244-18.254V262.927H266.685z\"/>\n" +
                                        "<path style=\"fill:#D1E7F8;\" d=\"M266.685,262.927v92.836c0,10.082-8.172,18.244-18.244,18.244H78.69\n" +
                                        "\tc-10.072,0-18.244-8.162-18.244-18.244v-92.836H266.685z\"/>\n" +
                                        "<path style=\"fill:#3D9AE2;\" d=\"M116.418,171.048l-20.355,93.073H96.06c0,18.637,15.107,33.744,33.744,33.744\n" +
                                        "\tc18.636,0,33.743-15.106,33.744-33.742l0,0v-93.074h-47.13V171.048z\"/>\n" +
                                        "<path style=\"fill:#FF0C38;\" d=\"M231.031,264.121l-20.427-93.073h-47.058v93.074l0,0c0.001,18.636,15.108,33.742,33.744,33.742\n" +
                                        "\tc18.637,0,33.744-15.107,33.744-33.744h-0.003V264.121z\"/>\n" +
                                        "<path style=\"fill:#3D9AE2;\" d=\"M294.609,253.869l-19.722-51.66c-7.166-18.762-25.164-31.161-45.252-31.161h-19.03\n" +
                                        "\tc11.192,50.998,16.237,74.055,18.519,84.477c0.954,4.354,1.619,8.759,2.218,13.177c2.235,16.469,16.353,29.164,33.435,29.164\n" +
                                        "\tc0.388,0,0.775-0.007,1.16-0.02C287.967,297.102,302.471,274.461,294.609,253.869z\"/>\n" +
                                        "<path style=\"fill:#FF0C38;\" d=\"M97.721,171.048c-20.023,0-37.978,12.317-45.187,30.998c-10.8,27.979-16.725,43.352-19.977,51.797\n" +
                                        "\tc-7.927,20.578,6.559,43.259,28.598,44.003c0.385,0.013,0.772,0.02,1.16,0.02c17.083,0,31.201-12.694,33.435-29.164\n" +
                                        "\tc0.601-4.428,1.267-8.843,2.219-13.209c2.278-10.439,7.306-33.5,18.448-84.445L97.721,171.048L97.721,171.048z\"/>\n" +
                                        "<g>\n" +
                                        "\t<path style=\"fill:#830018;\" d=\"M415.418,278.074l-35.03,67.617c-19.731-2.231-37.653-10.454-51.896-22.817l36.688-70.823\n" +
                                        "\t\tL415.418,278.074z\"/>\n" +
                                        "\t<path style=\"fill:#830018;\" d=\"M455.152,321.959c-14.062,12.564-31.853,21.048-51.514,23.561l-34.939-67.446l50.238-26.023\n" +
                                        "\t\tL455.152,321.959z\"/>\n" +
                                        "</g>\n" +
                                        "<path style=\"fill:#C70024;\" d=\"M468.258,250.804c0,37.452-27.019,68.592-62.631,74.994c-4.403,0.794-8.936,1.206-13.57,1.206\n" +
                                        "\tc-42.086,0-76.201-34.115-76.201-76.201c0-42.096,34.115-76.211,76.201-76.211c4.634,0,9.167,0.412,13.57,1.206\n" +
                                        "\tC441.24,182.203,468.258,213.342,468.258,250.804z\"/>\n" +
                                        "<path style=\"fill:#FF0C38;\" d=\"M468.258,250.804c0,37.452-27.019,68.592-62.631,74.994c-35.613-6.403-62.631-37.542-62.631-74.995\n" +
                                        "\tc0-37.462,27.019-68.602,62.631-75.005C441.24,182.203,468.258,213.342,468.258,250.804z\"/>\n" +
                                        "<path style=\"fill:#EEBF00;\" d=\"M435.339,249.638l-10.826,10.554c-2.312,2.252-3.367,5.498-2.824,8.685l2.563,14.896\n" +
                                        "\tc1.377,8.021-7.046,14.132-14.243,10.353l-13.379-7.036c-2.865-1.508-6.282-1.508-9.137,0l-6.704,3.528l-6.674,3.508\n" +
                                        "\tc-7.207,3.779-15.62-2.332-14.243-10.353l2.553-14.896c0.543-3.186-0.513-6.433-2.824-8.685l-10.825-10.554\n" +
                                        "\tc-5.82-5.679-2.613-15.57,5.438-16.746l14.967-2.171c3.196-0.462,5.961-2.473,7.388-5.368l6.694-13.56\n" +
                                        "\tc3.598-7.297,14.002-7.297,17.6,0l0.995,2.03l5.689,11.529c1.437,2.895,4.202,4.905,7.398,5.368l14.957,2.171\n" +
                                        "\tC437.953,234.069,441.17,243.959,435.339,249.638z\"/>\n" +
                                        "<path style=\"fill:#FFD422;\" d=\"M435.339,249.638l-10.826,10.554c-2.312,2.252-3.367,5.498-2.824,8.685l2.563,14.896\n" +
                                        "\tc1.377,8.021-7.046,14.132-14.243,10.353l-13.379-7.036c-2.865-1.508-6.282-1.508-9.137,0l-6.704,3.528\n" +
                                        "\tc-1.196-1.91-1.759-4.282-1.317-6.845l2.553-14.896c0.543-3.186-0.513-6.433-2.824-8.685l-10.825-10.554\n" +
                                        "\tc-5.82-5.679-2.613-15.57,5.438-16.746l14.967-2.171c3.196-0.462,5.961-2.473,7.388-5.368l5.689-11.529l5.689,11.529\n" +
                                        "\tc1.437,2.895,4.202,4.905,7.398,5.368l14.957,2.171C437.953,234.069,441.17,243.959,435.339,249.638z\"/>\n" +
                                        "<g>\n" +
                                        "\t<path style=\"fill:#1E81CE;\" d=\"M161.425,329.478v34.708c0,4.674-3.83,8.494-8.504,8.494H95.446c-4.674,0-8.504-3.82-8.504-8.494\n" +
                                        "\t\tv-34.708c0-4.684,3.83-8.504,8.504-8.504h57.475C157.595,320.974,161.425,324.794,161.425,329.478z\"/>\n" +
                                        "\t<path style=\"fill:#1E81CE;\" d=\"M242.098,327.528v77.95h-58.389v-77.95c0-4.403,3.608-8.011,8.021-8.011h42.357\n" +
                                        "\t\tC238.491,319.517,242.098,323.125,242.098,327.528z\"/>\n" +
                                        "</g>\n" +
                                        "<g>\n" +
                                        "\t<path style=\"fill:#3D9AE2;\" d=\"M161.425,329.478v34.708c0,4.674-3.83,8.494-8.504,8.494H105.9c-4.674,0-8.504-3.82-8.504-8.494\n" +
                                        "\t\tv-34.708c0-4.684,3.83-8.504,8.504-8.504h47.021C157.595,320.974,161.425,324.794,161.425,329.478z\"/>\n" +
                                        "\t<path style=\"fill:#3D9AE2;\" d=\"M242.098,327.528v77.95h-47.936v-77.95c0-4.403,3.609-8.011,8.021-8.011h31.904\n" +
                                        "\t\tC238.491,319.517,242.098,323.125,242.098,327.528z\"/>\n" +
                                        "</g>\n" +
                                        "<path d=\"M504.461,230.577c-4.164,0-7.539,3.375-7.539,7.539V422.3c0,10.104-8.22,18.323-18.323,18.323H99.327\n" +
                                        "\tc-4.163,0-7.539,3.375-7.539,7.539s3.375,7.539,7.539,7.539H478.6c18.417,0,33.4-14.984,33.4-33.4V238.115\n" +
                                        "\tC512,233.952,508.626,230.577,504.461,230.577z\"/>\n" +
                                        "<path d=\"M478.6,56.3H33.401C14.984,56.3,0,71.284,0,89.701V422.3c0,18.417,14.984,33.4,33.401,33.4h35.771\n" +
                                        "\tc4.163,0,7.539-3.375,7.539-7.539s-3.375-7.539-7.539-7.539H33.401c-10.104,0-18.324-8.22-18.324-18.323V135.273h481.845v72.687\n" +
                                        "\tc0,4.163,3.374,7.539,7.539,7.539c4.164,0,7.539-3.375,7.539-7.539V89.701C512,71.284,497.017,56.3,478.6,56.3z M496.923,120.196\n" +
                                        "\tH15.077V89.701c0-10.104,8.22-18.324,18.324-18.324H478.6c10.104,0,18.323,8.22,18.323,18.324V120.196z\"/>\n" +
                                        "<path d=\"M407.182,90.335h-76.913c-4.164,0-7.539,3.375-7.539,7.539c0,4.163,3.374,7.539,7.539,7.539h76.913\n" +
                                        "\tc4.164,0,7.539-3.375,7.539-7.539C414.72,93.71,411.345,90.335,407.182,90.335z\"/>\n" +
                                        "<path d=\"M300.114,90.335H48.825c-4.163,0-7.539,3.375-7.539,7.539c0,4.163,3.375,7.539,7.539,7.539h251.288\n" +
                                        "\tc4.164,0,7.539-3.375,7.539-7.539C307.652,93.71,304.278,90.335,300.114,90.335z\"/>\n" +
                                        "<path d=\"M483.143,82.168c-2.761-3.117-7.526-3.405-10.642-0.645l-6.834,6.053l-6.834-6.053c-3.118-2.761-7.88-2.472-10.642,0.645\n" +
                                        "\tc-2.76,3.117-2.472,7.88,0.645,10.642l5.461,4.837l-5.461,4.837c-5.179,4.587-1.912,13.182,5.002,13.182\n" +
                                        "\tc4.522,0,6.142-3.452,11.83-7.949l6.834,6.053c3.129,2.772,7.891,2.459,10.642-0.645c2.76-3.117,2.472-7.88-0.645-10.642\n" +
                                        "\tl-5.461-4.837l5.461-4.837C485.615,90.048,485.903,85.284,483.143,82.168z\"/>\n" +
                                        "<path d=\"M354.34,265.587c0.537,0.524,0.781,1.277,0.653,2.016l-2.554,14.899c-2.431,14.174,12.458,24.984,25.18,18.294\n" +
                                        "\tc13.292-6.615,13.641-8.013,15.499-7.034l13.381,7.034c12.725,6.691,27.611-4.123,25.18-18.294l-2.554-14.898\n" +
                                        "\tc-0.356-2.076,1.089-1.977,11.48-12.568c10.296-10.036,4.608-27.534-9.618-29.601c-14.628-2.46-15.742-1.532-16.674-3.42\n" +
                                        "\tl-6.689-13.555l0,0c-6.364-12.895-24.763-12.889-31.125,0l-6.69,13.555c-0.332,0.672-0.973,1.139-1.714,1.246l-14.961,2.174\n" +
                                        "\tc-6.585,0.957-11.953,5.482-14.01,11.811c-2.056,6.328-0.373,13.145,4.392,17.79L354.34,265.587z M353.463,241.905\n" +
                                        "\tc0.199-0.614,0.681-1.381,1.836-1.55l14.962-2.174c5.653-0.821,10.537-4.37,13.066-9.494l6.69-13.555\n" +
                                        "\tc0.518-1.048,1.396-1.27,2.041-1.27c0.645,0,1.524,0.22,2.041,1.268l6.689,13.557c2.529,5.122,7.414,8.671,13.068,9.493l14.96,2.174\n" +
                                        "\tc1.157,0.168,1.638,0.936,1.837,1.55c0.2,0.614,0.262,1.518-0.576,2.334l-10.825,10.552c-4.091,3.986-5.958,9.729-4.992,15.361\n" +
                                        "\tl2.555,14.899c0.197,1.153-0.384,1.847-0.906,2.227c-0.524,0.379-1.365,0.717-2.398,0.173l-13.381-7.035\n" +
                                        "\tc-5.056-2.658-11.094-2.658-16.152,0l-13.381,7.035c-1.683,0.882-3.626-0.521-3.304-2.401l2.555-14.897\n" +
                                        "\tc0.967-5.631-0.899-11.372-4.99-15.362l-10.825-10.552C353.202,243.423,353.263,242.519,353.463,241.905z\"/>\n" +
                                        "<path d=\"M313.083,387.696l8.916-3.87c4.496-1.954,9.68,0.705,10.695,5.548l1.98,9.499c1.312,6.299,6.707,10.624,13.117,10.624\n" +
                                        "\tc4.945,0,9.438-2.694,11.77-7.207l32.497-62.732l32.497,62.732c2.342,4.513,6.825,7.207,11.77,7.207\n" +
                                        "\tc6.336,0,11.8-4.247,13.127-10.624c1.979-6.938,0.944-12.21,6.011-14.816c5.066-2.618,8.692,1.234,15.57,3.639\n" +
                                        "\tc11.493,4.986,22.933-7.214,17.148-18.364l-32.959-63.616c46.81-53.749,8.71-138.661-63.164-138.661\n" +
                                        "\tc-46.177,0-83.739,37.573-83.739,83.749c0,20.988,7.76,40.196,20.576,54.912l-32.959,63.616\n" +
                                        "\tC290.149,380.528,301.642,392.681,313.083,387.696z M472.54,371.915c-1.99-0.492-11.94-7.51-24.013-1.246\n" +
                                        "\tc-12.089,6.262-12.053,18.332-12.836,20.334l-29.843-57.595c14.193-2.362,27.179-8.303,38.015-16.856L472.54,371.915z\n" +
                                        "\t M323.396,250.804c0-37.864,30.798-68.672,68.662-68.672c63.527,0,92.882,79.346,44.709,120.739\n" +
                                        "\tc-30.181,25.961-76.437,21.024-100.294-11.8C328.251,279.753,323.396,265.831,323.396,250.804z M340.263,316.551\n" +
                                        "\tc10.825,8.564,23.822,14.494,38.005,16.856l-29.833,57.595c-0.793-2.027-0.772-14.075-12.836-20.334\n" +
                                        "\tc-6.211-3.209-13.321-3.396-19.611-0.673l-4.403,1.92L340.263,316.551z\"/>\n" +
                                        "<path d=\"M78.69,413.046h169.75c14.213,0,25.782-11.569,25.782-25.792v-82.965c9.479-2.302,17.731-8.071,23.34-16.515\n" +
                                        "\tc7.177-10.815,8.705-24.496,4.091-36.598l-19.721-51.655c-8.232-21.54-29.25-36.015-52.298-36.015c-38.381,0-93.461,0-131.916,0\n" +
                                        "\tc-22.968,0-43.945,14.394-52.218,35.824c-10.805,27.983-16.726,43.362-19.982,51.806c-4.654,12.092-3.156,25.782,4.011,36.608\n" +
                                        "\tc5.609,8.473,13.871,14.263,23.38,16.555v82.955C52.909,401.477,64.479,413.046,78.69,413.046z M234.56,397.939h-43.312v-70.411\n" +
                                        "\tc0-0.241,0.241-0.472,0.482-0.472h42.357c0.241,0,0.472,0.231,0.472,0.472V397.939z M229.635,178.584\n" +
                                        "\tc16.846,0,32.195,10.574,38.206,26.315l19.721,51.655c6.134,16.051-5.359,33.773-22.787,33.773\n" +
                                        "\tc-12.926,0-24.157-9.574-25.963-22.636l-18.837-89.107H229.635z M171.085,178.584h33.452c19.566,90.472,19.752,85.749,18.173,91.881\n" +
                                        "\tc-2.835,11.398-13.157,19.862-25.42,19.862s-22.586-8.463-25.43-19.862C170.755,266.008,171.085,271.287,171.085,178.584z\n" +
                                        "\t M163.546,287.884c16.534,23.392,51.005,23.321,67.496-0.01c6.493,9.177,16.625,15.56,28.104,17.148v82.232\n" +
                                        "\tc0,5.508-4.171,10.052-9.509,10.645v-70.371c0-8.574-6.976-15.55-15.55-15.55h-42.357c-8.574,0-15.56,6.976-15.56,15.55v70.441\n" +
                                        "\th-97.48c-5.9,0-10.705-4.805-10.705-10.715v-82.242c11.459-1.598,21.581-7.971,28.064-17.138\n" +
                                        "\tc7.488,10.594,19.822,17.53,33.753,17.53C143.725,305.404,156.068,298.479,163.546,287.884z M156.008,178.584\n" +
                                        "\tc0,93.752,0.277,87.632-0.774,91.881c-2.845,11.398-13.168,19.862-25.43,19.862c-12.263,0-22.586-8.463-25.42-19.862\n" +
                                        "\tc-1.455-5.693-2.246,1.674,18.103-91.881H156.008z M39.591,256.554c3.257-8.443,9.177-23.812,19.972-51.796\n" +
                                        "\tc6.041-15.65,21.38-26.174,38.156-26.174h9.338c-25.451,115.658-15.517,70.952-19.451,90.157\n" +
                                        "\tc-1.875,10.259-9.528,18.71-19.706,20.98c-4.907,1.094-10.129,0.773-14.991-1.253C41.455,283.631,34.477,269.806,39.591,256.554z\"/>\n" +
                                        "<path d=\"M79.405,329.478v34.708c0,8.845,7.197,16.032,16.042,16.032h57.475c8.845,0,16.042-7.187,16.042-16.032v-34.708\n" +
                                        "\tc0-8.845-7.197-16.042-16.042-16.042H95.447C86.601,313.435,79.405,320.632,79.405,329.478z M153.886,329.478\n" +
                                        "\tc-0.433,34.173,0.905,35.663-0.965,35.663H95.446c-0.513,0-0.965-0.442-0.965-0.955v-34.708c0-0.523,0.452-0.965,0.965-0.965h57.475\n" +
                                        "\tC153.435,328.513,153.886,328.955,153.886,329.478z\"/>\n" +
                                        "<path d=\"M110.167,355.082c5.086,0,6.662-4.316,10.674-8.07c2.8-3.081,2.573-7.848-0.508-10.65c-3.081-2.8-7.848-2.574-10.65,0.508\n" +
                                        "\tl-5.093,5.603C100.168,347.338,103.696,355.082,110.167,355.082z\"/>\n" +
                                        "<path d=\"M128.012,359.968c5.483,0,6.824-4.759,15.767-13.673c2.8-3.081,2.573-7.848-0.508-10.65c-3.081-2.8-7.849-2.575-10.65,0.508\n" +
                                        "\tl-10.186,11.204C118.012,352.225,121.542,359.968,128.012,359.968z\"/>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>\n"}}
                                    />
                                </div>
                                <h1 style={{fontSize:'40px'}}>Recommender</h1>
                                <p style={{fontSize:'15px', textAlign:'left', marginLeft:'50px'}}>
                                    This recommender feature was built on an artificial<br/>
                                    intelligent system. Using Machine Learning the<br/>
                                    system plots out the most accurate result before<br/>
                                    displaying it to you. Unlike other systems, the<br/>
                                    application does not use keywords but uses the <br/>
                                    image that can be uploaded. If a link is entered,<br/>
                                    the system will scrape the link before recommening</p>

                                <br/><br/><br/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <footer style={{backgroundColor:'#181818', border: '5px solid #181818', borderRadius:'0px', color:'white',margin: '0px'}}>
                        shopaholicsystem@gmail.com
                    </footer>
                </Segment>
            </div>

        )
    }
}

// const mapStateToProps = (state) =>{
//     return{
//         projects: state.project.projects
//     }
// }

// export default connect(mapStateToProps)