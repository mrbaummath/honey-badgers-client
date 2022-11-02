import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Button, Segment, Grid, Feed, Icon, Image, Progress } from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import ActivitySegment from '../activities/ActivitySegment'
import { getMyActivities } from '../../api/activity'
import LoadingScreen from '../shared/LoadingPage'
import BadgesSegment from './BadgesSegment'



const UserPage = ({ user, msgAlert }) => {

    //set state variables for all activities, badges and user's count of completed activities
    const [allMyActivities, setAllMyActivities] = useState([])
    const [completedCounts, setCompletedCounts] = useState({})
    const [badges, setBadges] = useState(null)
    const [open, setOpen] = useState(false)

    //tbd: badges virtual 

    //after initial render, make axios call to grab activity/count data and set the state variables 
    useEffect(() => {
        getMyActivities(user)
            .then(res => {
                setAllMyActivities(res.data.activities)
                setCompletedCounts(res.data.completedCounts)
                setBadges(res.data.userBadges.filter(badge => badge.level != 'none'))
            })
            .catch((error) => {
                msgAlert({
                    heading:'Something went wrong',
                    message: "Could not get user activities " + error,
                    variant: 'danger'
            })})
    },[])

    //set JSX for activities w/ MyActivity component --> will show loading screen until call to get data is completed and page re-renders 
    const activitiesJSX = allMyActivities ? 
        allMyActivities.map((activity) => (
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
                <Grid columns={3}>
                    <Grid.Column width={3}>
                        <BadgesSegment 
                            setOpen={setOpen} 
                            badges={badges} 
                            open={open}
                            badgeOwnerHandle={user.email} 
                            mine={true} 
                            activities={allMyActivities} 
                        />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment.Group id='actList' raised >
                            <h2>Your Activities</h2>
                            {activitiesJSX}          
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Segment raised>
                            <h2>Community Tasks</h2>
                            {/* <Feed events={events} /> */}
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>Elliot Fu</Feed.User> added you as a friend
                                            <Feed.Date>1 Hour Ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />4 Likes
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>

                                <Feed.Event>
                                    <Feed.Label>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <a>Helen Troy</a> completed <a>2 activities</a>
                                            <Feed.Date>4 days ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Extra images>
                                            <a>
                                                <img src='https://i.etsystatic.com/13215769/r/il/c4241b/2849297993/il_1140xN.2849297993_2n4t.jpg' />
                                            </a>
                                            <a>
                                                <img src='https://i.etsystatic.com/13215769/r/il/58b696/2968473182/il_1140xN.2968473182_fhtj.jpg' />
                                            </a>
                                        </Feed.Extra>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />1 Like
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Feed.Label>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/justen.jpg' />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary
                                        date='2 Days Ago'
                                        user='Jenny Hess'
                                        content='add you as a friend'
                                        />
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />8 Likes
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>

                                <Feed.Event>
                                    <Feed.Label>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <a>Joe Henderson</a> completed the activity "Solve a Rubix Cube"
                                            <Feed.Date>3 days ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Extra images>
                                            <Image 
                                                src='https://i.etsystatic.com/34145471/r/il/101581/4076317209/il_794xN.4076317209_jld1.jpg' 
                                                size='small' 
                                                circular 
                                                alt='A picture of a badge'
                                            /> 
                                        </Feed.Extra>
                                        <Feed.Extra text>
                                            Finally solved that dang Rubix Cude! That was a hard one!
                                        </Feed.Extra>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />5 Likes
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>

                                <Feed.Event>
                                    <Feed.Label>
                                        <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <a>Justen Kitsune</a> added <a>2 new photos</a> of "Explore a park you have never been to before"
                                            <Feed.Date>4 days ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Extra images>
                                            <Image 
                                                src='http://www.discovernw.org/mm5/graphics/00000001/PLU02813b.jpg'
                                                size='small'
                                                circular 
                                            />
                                        </Feed.Extra>
                                        <Feed.Extra images>
                                            <a>
                                                <img src='https://www.exploregeorgia.org/sites/default/files/listing_images/profile/2584/MPPIMG_0347.jpg' />
                                            </a>
                                            <a>
                                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Halleyparknovember.jpg/1200px-Halleyparknovember.jpg' />
                                            </a>
                                        </Feed.Extra>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />
                                                41 Likes
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Segment>
                    </Grid.Column>
                </Grid>
		    </Segment>
         
		
        </div>
		</>
	)
}

export default UserPage