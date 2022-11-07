import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, List, Divider, Container } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { updateActivity } from '../../api/activity'
import badgeLevel from '../badges/badgeLevel'

const ActivitySegment = ({ activity, msgAlert, user, mine, setCompletedCounts, completedCounts, setBadgeUpdate }) => {
    //declare pieces of state --> grab current progress from activity object and set it as initial state. Set state variables to track when progress is being saved and whether to show the save button
    const [percent, setPercent] = useState(activity.progress)
    const [percentChangeSaving, setPercentChangeSaving] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)

    //functions to increment/decrement progress when user clicks --> this only changes the progress bar. Nothing is changed on the backend until "save" is hit. Progress cannot be above 100 or below 0

    const detectNewBadge = (oldCounts, type, newCount) => {
        const oldCount = oldCounts[type]
        const oldLevel = badgeLevel(oldCount)
        const newLevel = badgeLevel(newCount)
        console.log(oldCount, newCount)
        if (oldLevel != newLevel) {
            if (newLevel == 'none') {
                setBadgeUpdate({'type':type, 'change':'lost'})
            } else if (newCount > oldCount){
                console.log(newLevel)
                setBadgeUpdate({'type':type, 'change': 'up', 'level': newLevel})
            } else if (newCount < oldCount) {
                setBadgeUpdate({'type': type, 'change': 'down', 'level': newLevel})
            } 
        } else {
                setBadgeUpdate({'type':type, 'change':'none'})
            }
        }
    

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

    
    //save the progress made/lost and determine if completed activity count needs to change
    const handleSaveProgress = (e) => {
        //set percentChangeSaving to true so that save button will show as loading
        setPercentChangeSaving(true)
        //if the activity had been completed, decrement completed count. Strictly speaking the percent < 100 here is not needed because the user shouldn't be able to save progress as 100 if it was already 100.
        if (activity.progress == 100 && percent < 100) {
            detectNewBadge(completedCounts, activity.type, completedCounts[activity.type] - 1)
            setCompletedCounts(oldCounts => {
                const counts = oldCounts
                counts[activity.type] -= 1
                return {...oldCounts, ...counts}
            })
        }
        //if the activity is now completed, increment completedCounts
        if (percent == 100) {
            detectNewBadge(completedCounts, activity.type, completedCounts[activity.type] + 1)
            setCompletedCounts(oldCounts => {
                const counts = oldCounts
                counts[activity.type] += 1
                return {...oldCounts, ...counts}
            })
        }
        //set new progress
        activity.progress = percent
        //make axios call
        updateActivity(user, activity, activity.id )
            //set 'saving' state to false so save button is no longer loading
            .then(() => {
                setPercentChangeSaving(false)
                setShowSaveButton(false)
            })
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
                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                    <Icon size='huge' name={activity.categoryIcon}></Icon>
                </Grid.Column>

                <Grid.Column width={8} textAlign='middle' verticalAlign='center'>
                    <Link to={`/show-page/${activity._id}`}><h1>{activity.activity}</h1></Link>
                    <List horizontal size='huge'>
                        <List.Item >Category: {activity.categoryName}</List.Item>
                        <List.Item >Price Rating: {activity.price}</List.Item>
                        <List.Item >Accessibiity Rating: {activity.accessibility}</List.Item>

                    </List>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='center' textAlign='middle'>
                    <Progress percent={percent} indicating />
                    { mine ? 
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
                    } 
                </Grid.Column>
            </Grid>
            </Container>
        </Segment>
    )
}

export default ActivitySegment