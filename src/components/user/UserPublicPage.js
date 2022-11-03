import { useNavigate, useParams } from 'react-router-dom'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { getTheirActivities } from '../../api/activity'
import ActivitySegment from '../activities/ActivitySegment'
import LoadingScreen from '../shared/LoadingPage'
import getUserInfo  from '../../api/user'
import BadgesSegment from './BadgesSegment'

const UserPublicPage = ({currentUser, msgAlert}) => {

    //grab requested user's id from params
    const { otherUserId } = useParams()

    //piece of state for badges modal --> should be abstracte into it's own component
   
    //piece of state for user email
   
    

    //set state variables for activities which are public for this user's public profile and completed counts
    const [publicActivities, setPublicActivities] = useState(null)
    const [completedCounts, setCompletedCounts] = useState({})
    const [email, setEmail] = useState('')
    const [createdDate, setCreatedDate] = useState('')
    const [badges, setBadges] = useState(null)

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
            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user info " + error,
                    variant: 'danger'
            })})
    },[])


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
                <Grid columns={2} padded>
                    <Grid.Row>
                        <Segment>
                            <Grid columns={2}>
                                <Grid.Column width={8} verticalAlign='center' textAlign='middle'>
                                    <Grid columns={2}>
                                        <Grid.Column width={5} textAlign='middle'>
                                            <Image 
                                                src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
                                                size='small' 
                                                circular 
                                                centered
                                                alt='A picture of the user'
                                            /> 
                                        </Grid.Column>
                                        <Grid.Column textAlign='middle'>
                                            <h1>Super Active Guy</h1> 
                                            <h2>member since {createdDate}</h2>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Grid padded textAlign='center'>
                                            <Grid.Row>
                                                <h2 id="bestBuds">{email}'s Best Buds</h2>
                                            </Grid.Row>

                                            <Grid.Row >
                                                <Grid columns={4}>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                                            Joe
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                                                            Elliot
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
                                                            Stevie
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                                            Jenny
                                                        </Label>
                                                    </Grid.Column>
                                                    
                                                </Grid>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <div id='viewBudsButton'>
                                                <Button verticalAlign='middle' size='medium'> 
                                                        <Icon size='large'name='user' />
                                                    View {email}'s Buddies
                                                </Button>
                                                </div>
                                            </Grid.Row>
                                        </Grid>
                                        
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <br/>
                    <Grid.Column width={8}>
                        
                        <Grid.Row>
                            <Grid columns={2} padded width={5}>
                                <BadgesSegment
                                badges={badges} 
                                badgeOwnerHandle={email} 
                                mine={false} 
                                activities={publicActivities} 
                            />
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column >
                        <Grid.Row>
                            <Segment raised textAlign='center'>
                                <h1>{email}'s Activity Timeline</h1>
                                {activitiesJSX} 
                            </Segment>
                        </Grid.Row>
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