import React, { Component } from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


export default class NavigationBar extends Component {
    render() {
        const token = localStorage.getItem('shopaholic-token') ? <SignedInLinks/> : <SignedOutLinks/>

        return (

            <div>
                {token}
            </div>
        )
    }
}