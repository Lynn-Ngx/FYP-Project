import React from 'react'
import { Divider, Grid } from 'semantic-ui-react'
import {Segment, Button, Form, Popup } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Navbar from './Navbar.js'

const options = [
    { key: 's', text: 'Small', value: 1 },
    { key: 'm', text: 'Medium', value: 2 },
    { key: 'l', text: 'Large', value: 3 },
]

const chooseSize = () => (
   <div>
       <Navbar/>

       <Segment style={{margin: '50px', padding:'50px'}}>

           <Grid columns={2} relaxed='very'>
               <Grid.Column>
                   <h2>Bershka Bomber Jacket</h2>
                   <p>Current Price: €100</p>

                   <Popup
                       trigger={<Button color='white' icon='eye' content='View Price History' />}
                       content={'Price History Graph'}
                       on='click'
                       position='bottom right'
                   />

                   <br/><br/><br/>

                   <p>Select a size:</p>
                   <Menu compact>
                       <Dropdown text='Select Size' options={options} simple item />
                   </Menu>
               </Grid.Column>

               <Grid.Column>
                       <h2>Enter Details</h2>

                       <div>
                           <Form>
                               <Form.Field>
                                   <label>Name</label>
                                   <input placeholder='Enter Name' />
                               </Form.Field>
                               <Form.Field>
                                   <label>Email</label>
                                   <input placeholder='Enter Email' />
                               </Form.Field>
                               <Button type='submit'>Notify Me!</Button>
                           </Form>
                       </div>
               </Grid.Column>
           </Grid>

           <Divider vertical></Divider>
       </Segment>
   </div>
)

export default chooseSize