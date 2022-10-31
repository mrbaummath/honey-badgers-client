import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, List, Divider, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { updateActivity } from '../../api/activity'

const MyActivity = (props) => {
    const imgSrc = 'https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg'

    const { activity, msgAlert, user } = props
    //declare pieces of state --> grab current progress from activity object and set it as initial state. Set state variables to track when progress is being saved and whether to show the save button
    const [percent, setPercent] = useState(activity.progress)
    const [percentChangeSaving, setPercentChangeSaving] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    console.log(percent, activity.progress)

    //function to increment progress when user clicks --> this only changes the progress bar. Nothing is changed on the backend until "save" is hit

    const handleProgressChange = (e) => {
        console.log(activity.progress)
        console.log(percent)
        const change = e.target.dataset.change === 'increase' ? 20 : -20
        //do not allow user to increment beyond 100 or below 0
        if (percent === 100 && change === 20) {
            msgAlert({
                heading: 'Already Done!',
                message: 'You already finished this task!!',
                variant: 'success'
            })
        //
        } else if (percent === 0 && e.target.dataset.change === 'decrease') {
            msgAlert({
                heading: 'NO!!!',
                message: "Don't be so negative",
                variant: 'success'
            })
        } else {
            //set the new percent in state
            setPercent((prevPercent) => (prevPercent += change))
        }
        
    }

    const handleSaveProgress = (e) => {
        //set percentChangeSaving to true so that save button will show as loading
        setPercentChangeSaving(true)
        //set new progress
        activity.progress = percent
        //make axios call
        updateActivity(user, activity, activity.id )
            //set 'saving' state to false so save button is no longer loading
            .then(() => {setPercentChangeSaving(false)})
            .catch(error => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Update progress failed " + error,
                    variant: 'danger'
                })
            })
    }

    //function to determine whether to show save button or not 
    useEffect (()=> {
        setShowSaveButton((percent != activity.progress))
    }, [percent])

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
                    <Button onClick={handleProgressChange} data-change='decrease' tiny negative circular icon='minus'/>
                    <Button onClick={handleProgressChange} data-change='increase' tiny positive circular icon='plus'/>
                    {
                        showSaveButton ?
                        <>
                            <Divider hidden />
                            <Button onClick={handleSaveProgress} loading={percentChangeSaving}>Save</Button>

                        </>
                        :
                        null
                    }
                    
                 
                    
                    
                </Grid.Column>
            </Grid>
            </Container>
        </Segment>
    )
}

export default MyActivity