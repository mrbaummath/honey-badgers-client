import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Label } from 'semantic-ui-react'
import SearchCategory from "../SearchBar/Search";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllActivities } from '../../api/activity'
import { act } from "react-dom/test-utils";




const IndexActivity = ({ user, msgAlert }) => {

    const [allActivities, setGetAllActivities] = useState([])
    
        useEffect(() => {
            getAllActivities(user)
            .then(res => {
                setGetAllActivities(res.data.activities)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Activities failed' + error,
                    variant: 'danger'
                })
            })
        },[])

        const allActivitiesJSX = allActivities.map(activity => {
            return (
                <Link to={`/activities/${activity._id}`} key={activity._id}>
                    <li>
                    activity: {activity.name} accessibility: {activity.accessibility} 
                    type: {activity.type} participants: {activity.participants} 
                    price: {activity.price} progress: {activity.progress} 
                    </li>
                </Link>
            )
        })
        const Index = allActivities.map(activities => (
            <Segment key={ activities.id } inverted color='yellow'>
                <Grid centered stretched columns={9}>
        <Grid.Row padded>
            {/* <Segment.Group id='actList' raised  >
            <h2>All Activities</h2>
            <p>Take a look to find things to do when you're bored! </p>
            < Search/>
            </Segment.Group> */}
            {/* Put all Activites in Here */}
                {/* <Segment><h1>Recent User Completed Activities </h1></Segment> */}
                
                        <h1>Activity: {activities.activity}</h1>
                        <Segment fluid textAlign="left">
                        <h3>Category: {activities.type}</h3>
                        <h3>Accessibility: {activities.accessibility}</h3>
                        <h3>Type: {activities.type}</h3>
                        <h3>Participants: {activities.participants}</h3>
                        <h3>Price: {activities.price}</h3>
                        </Segment>
                        
                {/* Put all Activities in Here */}
        </Grid.Row>
    </Grid>
            </Segment>
        ))
return (
    <>
    <Segment inverted color='yellow'>
        <Grid centered stretched columns={9}>
            <Grid.Row padded>
                        <Segment.Group id='actList' raised  >
                        <h2>All Activities</h2>
                        <p>Take a look to find things to do when you're bored! </p>
                        < Search/>
                        </Segment.Group>
                        <Segment><h1>Recent User Completed Activities </h1></Segment>
            </Grid.Row>
        </Grid>
    </Segment>
    {Index}
    </>
)


}

export default IndexActivity