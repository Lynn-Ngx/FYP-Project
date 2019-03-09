import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    state = {
        activeItem: 'shopaholic',
        loggedIn: this.props.signedIn,
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => this.setState({ loggedIn: false })

    render() {
        const { activeItem, loggedIn} = this.state

        return (

            <div>
                {!loggedIn && <Menu borderless>
                    {/*<Link to={'/home'} active={activeItem === 'shopaholic'}>SHOPAHOLIC</Link>*/}
                    <Menu.Item name='shopaholic' as={Link} to='/home' active={activeItem === 'shopaholic'}
                               onClick={this.handleItemClick}/>

                    <Menu.Menu position='right'>
                        <Menu.Item name='login' as={Link} to='/login' active={activeItem === 'login'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item name='register' as={Link} to='/register' active={activeItem === 'register'}
                                   onClick={this.handleItemClick}/>
                    </Menu.Menu>
                </Menu>
                }

                { loggedIn &&  <Menu pointing secondary>
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
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            as={Link} to='/home'
                            onClick={this.handleItemClick && this.logout}
                        />
                    </Menu.Menu>
                </Menu>
                }
            </div>
        )
    }
}