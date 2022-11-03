import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Label } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllActivities } from '../../api/activity'
import { act } from "react-dom/test-utils";
import SearchBar from "../SearchBar/Search";




const IndexActivity = ({ user, msgAlert }) => {
    //set state for all public activites, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])

    //function for filtering as user types in activity name
    const handleChange = (e) => {
        let activities = allActivities
        setFilterActivities(activities.filter(
        a => a.activity.includes(e.target.value) )
        )
    }
    
        useEffect(() => {
            getAllActivities(user)
            .then(res => {
                setAllActivities(res.data.activities)
                setFilterActivities(res.data.activities)
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
        const Index = filterActivities.map(activities => (
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
                        <div className="headerSearch">
                    <form className="searchForm" >
                        <input className="headerSearchInput" type="text" onChange={handleChange} />
                        <input type="submit" value="Search"></input>
                    </form>
                </div>
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