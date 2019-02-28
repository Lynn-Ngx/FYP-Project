import { Button, Input, List, Dimmer, Loader, Menu, Dropdown } from 'semantic-ui-react'
import React, { Component } from 'react';
import axios from 'axios'

class User extends Component {

    state = {
        items: [],
        expiredItems: []
    }

    constructor(props) {
        super(props);
        this.state = { items: [],  expiredItems: [], link: '', click: false,  loading: false };

        this.linkSubmitHandler = this.linkSubmitHandler.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(event) {
        this.setState({link: event.target.value});
    }

    onChangeFollower = (event, data) => {
        this.setState({size: data.value})
    }

    linkSubmitHandler = async (event) => {
        //history.push('./chooseSize')
        event.preventDefault();

        this.setState({
            name: '',
            price: '',
            sizes: [],
            loading: true
        })

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

    deleteItem = (itemId, expiredItem) => {
        console.log(itemId)
        const token = localStorage.getItem('shopaholic-token');

        //store if it is expired or unexpired
        const itemType = (expiredItem) ? 'expiredItems' : 'items'

        const items = [...this.state[itemType]]
        const index = items.findIndex(element => element._id === itemId)

        if (index === -1) return
        items.splice(index, 1)

        this.setState({[itemType]: items})

        axios.post('/api/deleteItem', {token, itemId, expiredItem}).then(res => {
            console.log(res.data)
        })
    }

    renewItem = (itemId) => {
        const token = localStorage.getItem('shopaholic-token');
        const items = [...this.state.expiredItems]
        const index = items.findIndex(element => element._id === itemId)

        if (index === -1) return

        const itemArr = this.state.items

        itemArr.push(items[index])
        items.splice(index, 1)

        this.setState({items: itemArr})
        this.setState({expiredItems: items})


        axios.post('/api/renew', {token, itemId}).then(res => {
            console.log(res.data)
        })
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
        const {items, expiredItems, loading, name, sizes} = this.state
        const deleteItem = this.deleteItem
        const renewItem = this.renewItem

        const itemsList = items.map( function(item, index) {
            return (
                <List.Item key={index} style={{margin: '20px'}} >
                    <img style={{width: '200px', display: 'inline-block', margin:'20px 50px 0px 0px'}} src={item.image} />
                    <div style={{display: 'inline-block', verticalAlign: 'top', marginTop: '30px'}}>
                        <b><h1>{item.name}</h1></b>
                        <br/><p style={{fontSize:'18px'}}>Size : {item.size}
                        <br/>Price : {item.price}
                        <br/><a href={item.link}> View item </a>
                    </p>
                        <Button style={{marginTop: '20px'}} onClick={() => deleteItem(item._id, false)}>Delete</Button>
                    </div>
                </List.Item>
            )
        })

        const expiredItemsList = expiredItems.map( function(item, index) {
            return (
                <List.Item key={index} style={{margin: '20px'}} >
                    <img style={{width: '200px', display: 'inline-block', margin:'20px 50px 0px 0px'}} src={item.image}/>
                    <div style={{display: 'inline-block', verticalAlign: 'top', marginTop: '30px'}}>
                        <b><h1>{item.name}</h1></b>
                        <br/><p style={{fontSize:'18px'}}>Size : {item.size}
                        <br/>Price : {item.price}
                        <br/><a href={item.link}> View item </a>
                    </p>
                        <Button style={{margin: '20px 10px 0px 0px'}} onClick={() => deleteItem(item._id, true)}>Delete</Button>
                        <Button style={{margin: '20px 10px 0px 0px'}} onClick={() => renewItem(item._id, true)}>Renew</Button>
                    </div>
                </List.Item>
            )
        })

        return (
            <div>
                {
                    loading &&
                    <Dimmer active >
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                }

                <Input style={{margin: '50px 0px 0px 70px', width:'500px'}}
                       label='http://'
                       placeholder='Insert a link to add an item'
                       action={{ color: 'blue', content: 'Add New Item', onClick: this.linkSubmitHandler}}
                       onChange={this.onInputChange}
                       autoComplete="on"/>

                <div style={{margin:'30px 0px 50px 70px' }}>
                    <h4>{name}</h4>
                    {/*<Menu compact style={{width:'180px'}}>*/}
                        {/*<Dropdown onChange={this.onChangeFollower} style={{width:'180px'}} placeholder='Select Size' fluid selection options={sizes.map(size => ({*/}
                            {/*key: size,*/}
                            {/*value: size,*/}
                            {/*text: size,*/}
                        {/*}))} />*/}
                    {/*</Menu>*/}
                </div>


                {
                    items.length > 0 ? <List divided verticalAlign='middle' style={{margin: '50px'}}>
                        <h1>You Are Currently Tracking...</h1>
                        {itemsList}
                    </List> : ''
                }


                {
                    expiredItems.length > 0 ? <List divided verticalAlign='middle' style={{margin: '50px'}}>
                        <h1>Expired Items...</h1>
                        {expiredItemsList}
                    </List> : ''
                }
            </div>
        );
    }
}



export default User