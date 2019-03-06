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
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/asos-design-neon-midi-rib-bodycon-dress-with-open-back/11045115-1-neonpink?$XXL$&wid=513&fit=constrain' }/>
                                <br/><br/>
                                <a href={"https://www.asos.com/asos-petite/asos-design-petite-denim-button-through-slip-dress-in-black-with-tortoiseshell-buttons/prd/9892027?clr=black&SearchQuery=&cid=13491&gridcolumn=3&gridrow=11&gridsize=4&pge=1&pgesize=72&totalstyles=335"}> View item </a>
                                <h3>€42.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>


                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/rahi-scarlett-midi-dress-in-dot-flower-print/11230722-1-fleurprint?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/asos-petite/asos-design-petite-denim-button-through-slip-dress-in-black-with-tortoiseshell-buttons/prd/9892027?clr=black&SearchQuery=&cid=13491&gridcolumn=3&gridrow=11&gridsize=4&pge=1&pgesize=72&totalstyles=335"}> View item </a>
                                <h3>€102.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/oasis-cami-top-in-floral-print/12055426-1-multi?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/asos-petite/asos-design-petite-denim-button-through-slip-dress-in-black-with-tortoiseshell-buttons/prd/9892027?clr=black&SearchQuery=&cid=13491&gridcolumn=3&gridrow=11&gridsize=4&pge=1&pgesize=72&totalstyles=335"}> View item </a>
                                <h3>€74.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>

                    <div style={{backgroundColor:'white', textAlign:'center', padding:'20px', margin:'20px'}}>
                        <Grid.Column>
                            <Header>
                                <img style={{width: '200px'}} src={'https://images.asos-media.com/products/asos-design-petite-denim-button-through-slip-dress-in-black-with-tortoiseshell-buttons/9892027-1-black?$XXL$&wid=513&fit=constrain'} />
                                <br/><br/>
                                <a href={"https://www.asos.com/asos-petite/asos-design-petite-denim-button-through-slip-dress-in-black-with-tortoiseshell-buttons/prd/9892027?clr=black&SearchQuery=&cid=13491&gridcolumn=3&gridrow=11&gridsize=4&pge=1&pgesize=72&totalstyles=335"}> View item </a>
                                <h3>€62.00</h3>
                            </Header>
                        </Grid.Column>
                    </div>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
)

export default DashboardHome