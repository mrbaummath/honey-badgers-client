import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, List, Divider, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const MyActivity = (props) => {
    const imgSrc = 'https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg'

    const { activity, msgAlert } = props
    //declare piece of state --> grab current progress from activity object and set it as initial state
    const [percent, setPercent] = useState(activity.progress)

    //function to increment progress when user clicks
    //for now, just getting visual done
    //******TBD: Need to hook this up to an axios call to update the activity */

    const handleProgressChange = (e) => {
        const change = e.target.dataset.change === 'increase' ? 20 : -20
        if (percent === 100 && change === 20) {
            msgAlert({
                heading: 'Already Done!',
                message: 'You already finished this task!!',
                variant: 'success'
            })
        } else {
            setPercent((prevPercent) => (prevPercent += change))
        }
        //now make axios call to update 
    }

    return (
        <Segment id='actListItems'>
            <Container fluid>
            <Grid>
                <Grid.Column width={4}>
                <Image 
                    src='https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg'
                    size='small'
                    circular />
                </Grid.Column>
                <Grid.Column width={8}>
                    <h1>{activity.activity}</h1>
                    <List horizontal>
                        <List.Item as='p'>Category: {activity.type}</List.Item>
                        <List.Item as='p'>Price Rating: {activity.price}</List.Item>
                        <List.Item as='p'>Accessibiity Rating: {activity.accessibility}</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Progress percent={percent} indicating />
                    <Button onClick={handleProgressChange} data-change='decrease'  negative circular icon='minus'/>
                    <Button onClick={handleProgressChange} data-change='increase' positive circular icon='plus'/>
                    
                 
                    
                    
                </Grid.Column>
            </Grid>
            </Container>
        </Segment>
    )
}

export default MyActivity