import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class UserHeader extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        as={Link} to='/user'
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        name='recommendations'
                        active={activeItem === 'recommendations'}
                        as={Link} to='/recommend'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='add item'
                        active={activeItem === 'add item'}
                        as={Link} to='/add'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            as={Link} to='/home'
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}
