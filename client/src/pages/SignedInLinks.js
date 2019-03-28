import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import { Menu } from 'semantic-ui-react'


export default class SignedInLinks extends Component {
    state = {
        activeItem: 'home',
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => {
        localStorage.removeItem("shopaholic-token")
    }

    render() {
        const { activeItem} = this.state
        return (
            <Menu style={{backgroundColor:'#181818', border: '5px solid #181818', borderRadius:'0px'}}>
                <Menu.Item
                    name='home'
                    style={{color:'white', fontSize:'20px', marginLeft:'10px'}}
                    active={activeItem === 'home'}
                    as={NavLink} to='/user'
                    onClick={this.handleItemClick} />
                <Menu.Item
                    name='recommendations'
                    style={{color:'white', fontSize:'20px'}}
                    active={activeItem === 'recommendations'}
                    as={NavLink} to='/recommend'
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', margin:'10px 20px 0px 20px'}}
                        active={activeItem === 'logout'}
                        as={NavLink} to='/'
                        onClick={this.handleItemClick && this.logout}
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}