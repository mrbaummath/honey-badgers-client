import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, List, Divider, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { updateActivity } from '../../api/activity'

const ActivityFeedUserPage = ({ activity, msgAlert, user, mine}) => {
    const imgSrc = 'https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg'
    //declare pieces of state --> grab current progress from activity object and set it as initial state. Set state variables to track when progress is being saved and whether to show the save button
    const [percent, setPercent] = useState(activity.progress)
    const [percentChangeSaving, setPercentChangeSaving] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)

    //function to increment progress when user clicks --> this only changes the progress bar. Nothing is changed on the backend until "save" is hit

    const increaseProgress = (e) => {
        setPercent(prevPercent => {
            if (prevPercent >= 100) {
                
                msgAlert({
                    heading:'Whoa There!',
                    message: "You're already done!",
                    variant: 'success'
                })
                return prevPercent
            } else {
                return Math.min(100, (prevPercent + 20))
            }
        })  
    }

    const decreaseProgress = (e) => {
        setPercent(prevPercent => {
            if (prevPercent <= 0) {
                msgAlert({
                    heading:'Hey now',
                    message: "You can't do less than nothing! ",
                    variant: 'success'
                })
                return prevPercent
            } else {
                return Math.max(0, (prevPercent - 20))
            }
        })  
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
            <Grid columns={2} centered>
                <Grid.Column width={5} verticalAlign='center' textAlign='middle'>
                    
                <Image 
                    src={activity.owner.avatar || 'https://react.semantic-ui.com/images/avatar/small/christian.jpg'}
                    size='small'
                    circular 
                    centered/>
                </Grid.Column>
                <Grid.Column textAlign='center' verticalAlign='middle' width={10}>
                    <h2><Link to={`/user-public-page/${activity.owner._id}`}>{activity.owner.email}</Link> is currently working on the <Link to={`/show-page/${activity._id}`}>{activity.activity}</Link> activity</h2>
                </Grid.Column>
                <Grid.Row verticalAlign='middle' textAlign='center'>
                    <Progress  percent={percent} indicating verticalAlign='middle'/>
                    {/* <Button size='large' useNavigate={`/page-page/${activity.owner}`}>View Their Activity</Button> */}
                    
                    {/* { mine ? 
                    <>
                    <Button onClick={decreaseProgress}  negative circular icon='minus'/>
                    <Button onClick={increaseProgress} positive circular icon='plus'/>
                    {
                        showSaveButton ?
                        <>
                            <Divider hidden />
                            <Button onClick={handleSaveProgress} loading={percentChangeSaving}>Save</Button>

                        </>
                        :
                        null
                    }
                    </>
                    :
                    null
                    }  */}
                </Grid.Row>
            </Grid>
            </Container>
        </Segment>
    )
}

export default ActivityFeedUserPage