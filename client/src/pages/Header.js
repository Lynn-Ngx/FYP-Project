import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    state = {
        activeItem: 'shopaholic',
        loggedIn:true,
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout = () => this.setState({ loggedIn: false })

    render() {
        const { activeItem, loggedIn} = this.state

        return (

            <div>
                {!loggedIn && <Menu borderless style={{backgroundColor:'#181818', border: '5px solid #181818', borderRadius:'0px'}}>
                    {/*<Link to={'/home'} active={activeItem === 'shopaholic'}>SHOPAHOLIC</Link>*/}
                    <Menu.Item  style={{color:'white', fontSize:'30px', marginLeft:'10px'}} name='shopaholic' as={Link} to='/home' active={activeItem === 'shopaholic'}
                               onClick={this.handleItemClick}/>

                    <Menu.Menu position='right'>
                        <Menu.Item style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', marginTop:'20px', width: '90px'}} name='login' as={Link} to='/login' active={activeItem === 'login'}
                                   onClick={this.handleItemClick}/>
                        <Menu.Item style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', margin:'20px 20px 0px 20px'}} name='register' as={Link} to='/register' active={activeItem === 'register'}
                                   onClick={this.handleItemClick}/>
                    </Menu.Menu>
                </Menu>
                }

                { loggedIn &&  <Menu style={{backgroundColor:'#181818', border: '5px solid #181818', borderRadius:'0px'}}>
                    <Menu.Item
                        name='home'
                        style={{color:'white', fontSize:'20px', marginLeft:'10px'}}
                        active={activeItem === 'home'}
                        as={Link} to='/user'
                        onClick={this.handleItemClick} />
                    <Menu.Item
                        name='recommendations'
                        style={{color:'white', fontSize:'20px'}}
                        active={activeItem === 'recommendations'}
                        as={Link} to='/recommend'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            style={{color:'white', fontSize:'15px',  border: '1px solid white', height:'40px', margin:'10px 20px 0px 20px'}}
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