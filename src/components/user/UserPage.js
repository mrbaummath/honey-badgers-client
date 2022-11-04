import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress, Modal } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import ActivitySegment from '../activities/ActivitySegment'
import { getMyActivities } from '../../api/activity'
import LoadingScreen from '../shared/LoadingPage'
import BadgesSegment from './BadgesSegment'
import ActivityFeedUserPage from '../activities/ActivityFeedUserPage'
import { getAllActivities } from '../../api/activity'
import { getAllMessages } from '../../api/message'



const UserPage = ({ user, msgAlert }) => {

    //set state variables for all activities, badges and user's count of completed activities
    const [allMyActivities, setAllMyActivities] = useState([])
    const [completedCounts, setCompletedCounts] = useState({})
    const [badges, setBadges] = useState(null)
    const [publicActivities, setPublicActivities] = useState(null)
    const [open, setOpen] = React.useState(false)
    const [allMyMessages, setMyMessages] = useState([])
    
    //tbd: badges virtual 

    //after initial render, make axios call to grab activity/count data and set the state variables 
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
            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user activities " + error,
                    variant: 'danger'
            })})
    },[])

    const activitiesJSX = publicActivities ? 
    publicActivities.slice(0).reverse().filter((activity, idx) => idx < 10).map((activity) => (
        <ActivityFeedUserPage key={activity.id} activity={activity} user={user} msgAlert={msgAlert} mine={false} />
    ))
    :
    <LoadingScreen />

    useEffect(() => {
        getAllActivities()
            .then(res => {
                console.log(res)
                setPublicActivities(res.data.activities.filter(activity => activity.owner))
                setCompletedCounts(res.data.completedCounts)
                //set badges when that virtual is done
            })
            .catch(console.log('oops'))
    },[])

    //set JSX for activities w/ MyActivity component --> will show loading screen until call to get data is completed and page re-renders 
    const myActivitiesJSX = publicActivities ? 
    publicActivities.map((activity) => (
            <ActivitySegment 
            key={activity.id} 
            activity={activity} 
            user={user} 
            msgAlert={msgAlert} 
            mine={true} 
            />
        ))
        :
        <LoadingScreen />

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
                        />
                    </Grid.Column>
                    <Grid.Column width={7}>
                            <Segment>
                                <h2 id='yourActs'>Your Activities</h2>
                                {myActivitiesJSX}
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