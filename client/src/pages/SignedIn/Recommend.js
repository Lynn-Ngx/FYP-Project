import React from 'react'
import {Segment, Grid, Header} from 'semantic-ui-react'

const DashboardHome = () => (
    <div>
        <h1 style={{textAlign: 'center', marginTop:'100px'}}>You May Also Like...</h1>
        <Segment placeholder style={{margin: '50px'}}>
            <Grid columns={4} stackable textAlign='center'>

                <Grid.Row verticalAlign='middle'>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/adidas-originals-gazelle-trainers-in-black-bb5476/6755863-1-black?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/adidas-originals/adidas-originals-gazelle-trainers-in-black-bb5476/prd/6755863?clr=black&SearchQuery=&cid=4209&gridcolumn=4&gridrow=14&gridsize=4&pge=4&pgesize=72&totalstyles=2471"}> View item </a>
                                <h3>€96.78</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/new-look-muscle-fit-poplin-shirt-in-white/9442726-1-white?$XXL$&wid=513&fit=constrain' }/>
                                <br/><br/>
                                <a href={"https://www.asos.com/new-look/new-look-muscle-fit-poplin-shirt-in-white/prd/9442726?clr=white&SearchQuery=&cid=3602&gridcolumn=4&gridrow=3&gridsize=4&pge=1&pgesize=72&totalstyles=2767"}> View item </a>
                                <h3>€20.72</h3>
                            </Header>
                        </Grid.Column>
                    </div>


                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/asos-design-sweetheart-tropical-print-maxi-dress-with-bow-front/11207905-1-tropical?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/asos-design/asos-design-sweetheart-tropical-print-maxi-dress-with-bow-front/prd/11207905?clr=tropical&SearchQuery=maxi%20dress&gridcolumn=3&gridrow=7&gridsize=4&pge=3&pgesize=72&totalstyles=2524"}> View item </a>
                                <h3>€102.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/ted-baker-white-leather-floral-sole-trainers/11517786-1-whitefloral?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/ted-baker/ted-baker-white-leather-floral-sole-trainers/prd/11517786?clr=white-floral&SearchQuery=&cid=6456&gridcolumn=1&gridrow=4&gridsize=4&pge=1&pgesize=72&totalstyles=683"}> View item </a>
                                <h3>€26.27</h3>
                            </Header>
                        </Grid.Column>
                    </div>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
)

export default DashboardHome