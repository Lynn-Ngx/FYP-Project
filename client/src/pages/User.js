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
        this.state = {
            items: [],
            expiredItems: [],
            link: '',
            click: false,
            loading: false,
            addClicked: false};

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
            image: '',
            sizes: [],
            loading: true,
            addClicked: true
        })

        axios.post('/api/getItemDetails', {itemLink: this.state.link}).then(res => {


            this.setState({
                name: res.data.name,
                price: res.data.price,
                sizes: res.data.sizes,
                image: res.data.image,
                loading: false,
                addClicked: true
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

    validateInput = ({link, size}) => {
        let error = false

        if (!link || !size) error = 'Fields cannot be empty'
        else if (link.length < 1) error =  'Enter Link'

        return error
    }


    submitItem = async (e) => {
        this.setState({
            errorMessage: ''
        })
        //this just stops page redirecting when submitting form
        e.preventDefault()
        //
        let error = this.validateInput(this.state)
        //
        if (error) {
            this.setState({
                errorMessage: error
            })

            return
        }
        //
        axios.post('/api/saveItem', {token: localStorage.getItem('shopaholic-token'), link: this.state.link, name: this.state.name, size: this.state.size, price: this.state.price, image: this.state.image, isLoggedIn: true}).then(res => {
            const item = {
                link: this.state.link,
                name: this.state.name,
                size: this.state.size,
                price: this.state.price,
                image: this.state.image,
            }
            if (!res.data.success){
                this.setState({
                    errorMessage: res.data.message
                })
            }else{
                const itemArr = this.state.items
                itemArr.unshift(item)
                document.getElementById("input").value = '';

                this.setState({
                    items: itemArr,
                    addClicked: false
                })
            }
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
        const {items, expiredItems, loading, addClicked, name, sizes} = this.state
        const deleteItem = this.deleteItem
        const renewItem = this.renewItem
        let options;

        if(sizes) {
            options = sizes.map(size => ({
                key: size,
                value: size,
                text: size,
            }));
        }

        const itemsList = items.map( function(item, index) {
            return (
                <List.Item key={index} style={{margin: '20px'}} >
                    <img style={{width: '200px', display: 'inline-block', margin:'20px 50px 0px 0px'}} src={item.image} />
                    <div style={{display: 'inline-block', verticalAlign: 'top', marginTop: '30px'}}>
                        <b><h3>{item.name}</h3></b>
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
                        <b><h2>{item.name}</h2></b>
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

                <Input style={{margin: '50px 0px 20px 70px', width:'500px'}}
                       id={'input'}
                       label='http://'
                       placeholder='Insert a link to add an item'
                       action={{ color: 'blue', content: 'Add New Item', onClick: this.linkSubmitHandler}}
                       onChange={this.onInputChange}
                       autoComplete="on"/>

                {
                    addClicked && <div style={{margin:'30px 0px 50px 70px' }}>
                        <h3 style={{display:'inline-block'}}>{name}</h3> &nbsp; &emsp;
                        <Menu compact style={{width:'180px'}}>
                            <Dropdown onChange={this.onChangeFollower} style={{width:'180px'}} placeholder='Select Size' fluid selection options={options} />
                        </Menu> &nbsp; &emsp;
                        <Button type='submit' style={{backgroundColor: 'rgb(21, 135, 205)', color: 'White'}} onClick={this.submitItem}>Add Item</Button>
                    </div>
                }


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