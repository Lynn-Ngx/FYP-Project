import React from 'react'
import {Segment, Grid, Divider, Header, Icon, Search, Button, Image} from 'semantic-ui-react'

const DashboardHome = () => (
    <div>
        <h1 style={{textAlign: 'center', marginTop:'100px'}}>You May Also Like...</h1>
        <Segment placeholder style={{margin: '100px'}}>
            <Grid columns={4} stackable textAlign='center'>
                <Grid.Row verticalAlign='middle'>
                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img src='../images/image1.jpeg' />
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <h2>Berska Jacket</h2>
                                <h3>€52.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>


                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>                        <Grid.Column>
                            <Header>
                                <img src='../images/image1.jpeg' />
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <h2>Berska Jacket</h2>
                                <h3>€52.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>                        <Grid.Column>
                            <Header>
                                <img src='../images/image1.jpeg' />
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <h2>Berska Jacket</h2>
                                <h3>€52.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>                        <Grid.Column>
                            <Header>
                                <img src='../images/image1.jpeg' />
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <h2>Berska Jacket</h2>
                                <h3>€52.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
)

export default DashboardHome