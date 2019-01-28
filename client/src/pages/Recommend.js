import React from 'react'
import {Image, List } from 'semantic-ui-react'
import UserHeader from './UserHeader'

const DashboardHome = () => (
    <div>
        <UserHeader/>

        <h2 style={{margin: '50px'}}> Because you liked... </h2>

        <List divided verticalAlign='middle' style={{margin: '50px'}}>

            <List.Item style={{margin: '30px'}}>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>
        </List>

        <h3 style={{margin: '50px'}}> We recommend... </h3>

        <List divided verticalAlign='middle' style={{margin: '50px'}}>
            <List.Item style={{margin: '30px'}}>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

        </List>
    </div>
)

export default DashboardHome