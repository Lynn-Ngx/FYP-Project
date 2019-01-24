import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavagationBar extends Component {
    state = { activeItem: 'shopaholic' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (

            <div>
                <Menu borderless>
                    <Menu.Item name='shopaholic' active={activeItem === 'shopaholic'} onClick={this.handleItemClick}/>

                    <Menu.Menu position='right'>
                        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
                        <Menu.Item name='register' active={activeItem === 'register'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}