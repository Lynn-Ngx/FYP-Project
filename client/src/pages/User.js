import { Button, Image, List } from 'semantic-ui-react'
import React, { Component } from 'react';
import axios from 'axios'

class User extends Component {

    state = {
        items: [],
        expiredItems: []

    }

    componentDidMount(){
        const token = localStorage.getItem('shopaholic-token');

        //if no token redirect to home page

        axios.post('/api/getDashboardItems', {token}).then(res => {

            if (res.data.success === false){
                console.log('redirecting....')
            }
            //will return the items
            //could return something like false no token - if this is returned then user is not authenticated and
            //should be redirected
            this.setState({
                items: res.data.dashboardData.items,
                expiredItems: res.data.dashboardData.expiredItems
            })

            console.log(res.data)
        })
    }

    render() {
        const {items} = this.state

        const itemsList = items.map( function(item, index) {
            return (
                <List.Item key={index} style={{margin: '30px'}} >
                    <List.Content floated='right'>
                        <Button style={{marginTop: '20px'}}>Delete</Button>
                    </List.Content>
                    <img style={{width: '100px', display: 'inline-block', marginRight: '10px'}} src='https://images.asos-media.com/products/rahi-scarlett-midi-dress-in-dot-flower-print/11230722-1-fleurprint?$XXL$&wid=513&fit=constrain' />
                    <div style={{display: 'inline-block', verticalAlign: 'top', marginTop: '30px'}}>
                        <b>{item.name}</b>
                        <br/>Size : {item.size}
                        <br/>Price : {item.price}
                        <br/><a href={item.link}> View item </a>
                    </div>
                </List.Item>
            )
        })

        return (
            <div>
                <List divided verticalAlign='middle' style={{margin: '50px'}}>

                    {itemsList}
                </List>
            </div>
        );
    }
}



export default User