import React, { Component } from 'react'
import axios from "axios/index";
import queryString from 'query-string';
import { Dimmer, Loader } from 'semantic-ui-react'


export default class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageID: queryString.parse(this.props.location.search).imageID,
            imageLoaded: false,
            src: ''
        }
    }

    componentDidMount(){
        axios.post('/api/recommendation', {id: this.state.imageID}).then(res => {
            this.setState ({
                imageLoaded: true,
                src: 'data:image/jpeg;base64,' + res.data.imageBase64
            })
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                {
                   !this.state.imageLoaded &&
                       <div>
                           <h1 style={{margin: '50px'}}>Your recommendations are being processed...</h1>
                           <Dimmer active inverted>
                               <Loader inverted size='large'>This may take a few minutes :)</Loader>
                           </Dimmer>
                       </div>

                }

                {
                    this.state.imageLoaded &&
                    <div>
                        <h1 style={{margin: '80px'}}>We think you would also like... </h1>
                        <img style={{margin: '0px 100px 0px 200px', width: '1000px'}} src={this.state.src} />
                    </div>
                }
            </div>

        )
    }
}