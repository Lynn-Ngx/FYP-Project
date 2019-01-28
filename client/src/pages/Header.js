import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class NavagationBar extends Component {
    state = { activeItem: 'shopaholic' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

            <div>
                <Menu borderless>
                    {/*<Link to={'/home'} active={activeItem === 'shopaholic'}>SHOPAHOLIC</Link>*/}
                    <Menu.Item name='shopaholic' as={Link} to='/home' active={activeItem === 'shopaholic'} onClick={this.handleItemClick}/>

                    <Menu.Menu position='right'>
                        <Menu.Item name='login' as={Link} to='/login' active={activeItem === 'login'} onClick={this.handleItemClick} />
                        <Menu.Item name='register' as={Link} to='/register' active={activeItem === 'register'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}