import React, { Component } from 'react'
import { Button, Divider, Input, Segment,  Header, Popup, Grid } from 'semantic-ui-react'
import Navbar from './Navbar'


export default class HomePage extends Component {
    state = { activeItem: 'shopaholic' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

            <div>
                <Navbar/>

                <div>
                    <Segment basic textAlign='center'>

                        <div style={{margin: '50px'}}>
                            <p>I'M A </p>
                            <p>SHOPAHOLIC</p>
                            <p>...IT'S IN MY JEANS</p>
                        </div>

                        <Input
                            action={{ color: 'blue', content: 'Search' }}
                            icon='search'
                            iconPosition='left'
                            placeholder='Enter Link...'
                        />

                        <Divider horizontal>Or</Divider>

                        <Popup trigger={<Button color='teal' content='Recommend Me' icon='add'/> }  position='top center' flowing hoverable>
                            <Grid centered divided columns={2}>
                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Upload an Image</Header>
                                    <p>
                                        Upload an image to receive a recommendation
                                    </p>
                                    <Button>Attach</Button>
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
            </div>
        )
    }
}