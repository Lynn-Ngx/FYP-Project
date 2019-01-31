import React, { Component } from 'react';
import { Button, Divider, Grid } from 'semantic-ui-react'
import {Segment, Popup, Input } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'

const options = [
    { key: 's', text: 'Small', value: 1 },
    { key: 'm', text: 'Medium', value: 2 },
    { key: 'l', text: 'Large', value: 3 },
]

class AddItem extends Component {
    render(){
        return (
            <div>
                <Segment raised style={{width: '800px', margin: '120px auto 0px auto'}}>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <Input
                                style={{margin:'110px auto auto 40px'}}
                                action={{ color: 'blue', content: 'Search'}}
                                icon='search'
                                iconPosition='left'
                                placeholder='Enter Link...'
                                id="linkInput"
                                // onChange={this.onInputChange}
                            />
                        </Grid.Column>


                        <Grid.Column>
                            <h2>Bershka Bomber Jacket</h2>
                            <p>Current Price: €100</p>

                            <Popup
                                trigger={<Button color='white' icon='eye' content='View Price History'/>}
                                content={'Price History Graph'}
                                on='click'
                                position='bottom right'
                            />

                            <br/><br/>

                            <p>Select a size:</p>
                            <Menu compact style={{width:'180px'}}>
                                <Dropdown style={{width:'180px'}} text='Select Size' options={options} simple item />
                            </Menu>

                            <br/><br/>

                            <Button icon='add' content='Add Item' color={'blue'}/>


                        </Grid.Column>
                    </Grid>

                    <Divider vertical> - </Divider>



                </Segment>
            </div>);
    }
}
export default AddItem;