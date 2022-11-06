import { useNavigate, useParams, Link } from 'react-router-dom'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List, Form, Container } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import messages from '../shared/AutoDismissAlert/messages'
import { getTheirActivities } from '../../api/activity'
import ActivitySegment from '../activities/ActivitySegment'
import LoadingScreen from '../shared/LoadingPage'



import imgSrc from '../shared/ImgSrc'

import { getUserInfo }  from '../../api/user'
import RequestModal from './RequestModal'



import MessageForm from '../shared/MessageForm'
import getViewedUserInfo from '../../api/viewedUser'
import { createMessage } from '../../api/message'

import BadgesSegment from '../badges/BadgesSegment'


const UserPublicPage = ({currentUser, msgAlert, viewedUser, triggerRefresh}) => {
    const [open, setOpen] = React.useState(false)
    //grab requested user's id from params
    const { otherUserId } = useParams()
    const { viewedUserId } = useParams()
    const navigate = useNavigate()


    //piece of state for badges modal --> should be abstracte into it's own component
   
    //piece of state for user email
   
    

    //set state variables for activities which are public for this user's public profile and completed counts
    const [publicActivities, setPublicActivities] = useState(null)
    const [completedCounts, setCompletedCounts] = useState({})
    const [email, setEmail] = useState('')
    const [thisUser, setThisUser] = useState({})
    const [createdDate, setCreatedDate] = useState('')
    const [createdAvatar, setAvatar] = useState('')
    const [badges, setBadges] = useState(null)
    // const [buddiesArr, setBuddiesArr] = useState([]) ==> not going to view other's buddies for now

     //after initial render, make axios call to grab activity/count data and set the state variables 
     useEffect(() => {
        getTheirActivities(currentUser, otherUserId)
            .then(res => {
                setPublicActivities(res.data.activities)
                setCompletedCounts(res.data.completedCounts)
                setBadges(res.data.userBadges.filter(badge => badge.level != 'none'))
            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user activities " + error,
                    variant: 'danger'
            })})
        getUserInfo(currentUser, otherUserId)
            .then(res => {
                setEmail(res.data.user.email)
                setCreatedDate(res.data.user.createdDate)

                setAvatar(res.data.user.avatar)


                setThisUser(res.data.user.user)
                // setBuddiesArr(res.data.user.buddies)

            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user info " + error,
                    variant: 'danger'
            })})
    },[])

    const handleRefresh = (e) => {
        e.preventDefault()
        triggerRefresh()
    }


    
    


     //set JSX for activities w/ MyActivity component --> will show loading screen until call to get data is completed and page re-renders 
     const activitiesJSX = publicActivities ? 
        publicActivities.map((activity) => (
            <ActivitySegment key={activity.id} activity={activity} user={currentUser} msgAlert={msgAlert} mine={false} />
        ))
        :
        <LoadingScreen />

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
                
                    <Grid.Row>
                        <Segment>
                            <Grid columns={2} >
                                <Grid.Column width={8} verticalAlign='center' textAlign='middle' >
                                    <Grid columns={2}>
                                        <Grid.Column width={5} textAlign='middle'>
                                            <Image 
                                                src={createdAvatar}
                                                size='small' 
                                                circular 
                                                centered
                                                alt='A picture of the user'
                                            /> 
                                        </Grid.Column>
                                        <Grid.Column textAlign='middle'>
                                    
                                        

                                            <h1>{email}</h1> 

                                            <h2>member since {createdDate}</h2>
                                            { currentUser._id !== otherUserId 
                                            //&&

                                            // (messages.recipients.filter(message => message == currentUser).length > 0
                                            //     && 
                                            //     messages.owner.filter(message => message).length > 0
                                            // )
                                            ?
                                            // <Button onClick={handleChangeBuddyStatus}>Add Buddy</Button>
                                            <Container className="justify-content-center">
                                                <RequestModal msgAlert={msgAlert} sender={currentUser} recipient={thisUser}  />
                                            </Container>
                                            
                                            :
                                            null    
                                            }
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <br/>

                    <Grid columns={2} padded>
                    <Grid.Column width={8}>
                        
                        
                            <Grid columns={2} padded centered>
                                <BadgesSegment
                                badges={badges} 
                                badgeOwnerHandle={email} 
                                mine={false} 
                                activities={publicActivities} 
                            />
                            </Grid>
                       
                    </Grid.Column>
                    <Grid.Column >

                            <Segment raised textAlign='center' fluid>
                                <h1>{email}'s Activity Timeline</h1>
                                {activitiesJSX} 
                            </Segment>
     
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
	</>	
	)
}

export default UserPublicPage 


{/* <Grid.Column fluid width={11}>
                                        <Segment padded>
                                            <Grid columns={4}>
                                                <Grid.Row>  
                                                    <h2 id='ranksHeader'>Ranks</h2>
                                                </Grid.Row> 
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>Relaxed Mstr General</h3>
                                                        <h3><Icon name='certificate'/>Sooooo Educated</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>The Most Selfless</h3>
                                                    <   h3><Icon name='certificate'/>Captain Popularity</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>BusyBodyBee</h3>
                                                        <h3><Icon name='certificate'/>Oui Chef</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>Sounds Good</h3>
                                                        <h3><Icon name='certificate'/>I Did It</h3>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>  */}