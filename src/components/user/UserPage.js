import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, Modal } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import ActivitySegment from '../activities/ActivitySegment'
import { getMyActivities } from '../../api/activity'
import LoadingScreen from '../shared/LoadingPage'
import BadgesSegment from '../badges/BadgesSegment'
import ActivityFeedUserPage from '../activities/ActivityFeedUserPage'
import { getAllActivities } from '../../api/activity'

import { getAllMessages } from '../../api/message'

import MyActivities from '../activities/MyActivities'




const UserPage = ({ user, msgAlert }) => {

    //set state variables for all activities, badges and user's count of completed activities
    const [allMyActivities, setAllMyActivities] = useState(null)
    //this completed counts object can be used to trigger refresh of badge modal data as new activities apply to the badge
    const [completedCounts, setCompletedCounts] = useState({})
    //badges are passed down to BadgeSegment through to BadgeModal. the set function will also pass through to the ActivitySegment so that if there is a new badge it can be added. There will be a listener on BadgesSegment and NewBadgeModal to determine whether the 
    const [badges, setBadges] = useState(null)
    const [publicActivities, setPublicActivities] = useState(null)

    const [open, setOpen] = React.useState(false)
    const [allMyMessages, setMyMessages] = useState([])

    //state for an update to badges --> will tell whether a badge was gained or lost. If there is a new badge, it's description will also be in the object. setBadgeUpdate will be passed through to activity segment. badgeUpdate will be sent to the newBadge Modal 
    const [badgeUpdate, setBadgeUpdate] = useState({})

    
    
    //after initial render, make axios call to grab activity/count data and set the state variables. Also listen for an update to user badge/completions data 
    useEffect(() => {
        getMyActivities(user)
            .then(res => {
                setAllMyActivities(res.data.activities)
                setCompletedCounts(res.data.completedCounts)
                setBadges(res.data.userBadges.filter(badge => badge.level != 'none'))
            })
        getAllMessages(user)
            .then(res => {
                setMyMessages(res.data.messages)    
                console.log(res)
            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user activities " + error,
                    variant: 'danger'
            })})
    },[])

    //set JSX for rendering the user's feed of community activities 
    const activitiesJSX = publicActivities ? 
    publicActivities.slice(0).reverse().filter((activity, idx) => idx < 10).map((activity) => (
        <ActivityFeedUserPage key={activity.id} activity={activity} user={user} msgAlert={msgAlert} mine={false} />
    ))
    :
    <LoadingScreen />

    useEffect(() => {
        getAllActivities()
            .then(res => {
                setPublicActivities(res.data.activities.filter(activity => activity.owner))
            })
            .catch(console.log('oops'))
    },[])


        allMyMessages.map((message) => (<h1>{message.owner}</h1>))
        console.log(allMyMessages, 'messages')

	return (
		<>
        <div >
		    <Segment 
                raised
                inverted 
                color='yellow' 
                // verticalAlign='middle' 
                fluid
                
            >

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Show Messages</Button>}
                >
                <Modal.Header>Buddy Requests</Modal.Header>
                <Modal.Content> 
                    {allMyMessages} 
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Modal.Actions>
                </Modal>
                <Grid columns={3}>
                    <Grid.Column width={4}>
                        <BadgesSegment 
                            badges={badges} 
                            badgeOwnerHandle={user.email} 
                            mine={true} 
                            activities={allMyActivities}
                            setBadgeUpdate={setBadgeUpdate}
                            completedCounts={completedCounts}
                            badgeUpdate={badgeUpdate} 
                            setBadges={setBadges}

                        />
                    </Grid.Column>
                    <Grid.Column width={7}>
                            <Segment>
                                <h2 id='yourActs'>Your Activities</h2>
                                <MyActivities
                                    allMyActivities={allMyActivities}
                                    user={user}
                                    msgAlert={msgAlert}
                                    completedCounts={completedCounts}
                                    setCompletedCounts={setCompletedCounts}
                                    setBadgeUpdate={setBadgeUpdate}
                                />
                            </Segment>          
        
                    </Grid.Column>
                    <Grid.Column width={5} >
                        <Segment raised textAlign='middle'>
                            <h1 id='commFeed'>Community Tasks</h1>
                            {/* <Feed events={events} /> */}
                            {activitiesJSX}
                        </Segment>
                    </Grid.Column>
                </Grid>
		    </Segment>
         
		
        </div>
		</>
	)
}

export default UserPage