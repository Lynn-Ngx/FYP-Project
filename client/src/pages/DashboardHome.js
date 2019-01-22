import React from 'react'
import { Button, Image, List } from 'semantic-ui-react'
import DashboardNavbar from './DashboardNavbar'

const DashboardHome = () => (
    <div>
        <DashboardNavbar/>

        <List divided verticalAlign='middle' style={{margin: '50px'}}>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

            <List.Item style={{margin: '30px'}}>
                <List.Content floated='right'>
                    <Button>Delete</Button>
                </List.Content>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png' />
                <List.Content>
                    <b>Bershka Bomber Jacker</b>
                    <br/>Size : S
                    <br/> Not Available
                    <br/> Link: www.asos.com/bershkabomberjacket
                </List.Content>
            </List.Item>

        </List>
    </div>
)

export default DashboardHome