import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { Menu } from 'semantic-ui-react'


export default class SignedOutLinks extends Component {
    state = {
        activeItem: 'shopaholic',
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem} = this.state
        return (
            <Menu borderless style={{backgroundColor:'#181818', border: '5px solid #181818', borderRadius:'0px'}}>
                <Menu.Item  style={{color:'white', fontSize:'30px', marginLeft:'10px'}}
                            name='shopaholic'
                            as={NavLink} to='/'
                            active={activeItem === 'shopaholic'}
                            onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', marginTop:'20px', width: '90px'}}
                        name='login'
                        as={NavLink} to='/login'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', margin:'20px 20px 0px 20px'}}
                        name='register'
                        as={NavLink} to='/register'
                        active={activeItem === 'register'}
                        onClick={this.handleItemClick}/>
                </Menu.Menu>
            </Menu>
        )
    }
}