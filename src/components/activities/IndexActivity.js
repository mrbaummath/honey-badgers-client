import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAllActivities } from '../../api/activity'
// import { act } from "react-dom/test-utils";
// import SearchBar from "../SearchBar/Search";




const IndexActivity = ({ user, msgAlert }) => {
    //set state for all public activities, filtered activities based on search
    const [allActivities, setAllActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchText, setSearchText] = useState([])

    //function for filtering as user types in activity name
    const handleChange = (e) => {
        let activities = allActivities
        setFilterActivities(activities.filter(
        a => a.activity.includes(e.target.value) || a.type.includes(e.target.value))
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

    // const allActivitiesJSX = allActivities.map(activity => {
    //     return (
    //         <Link to={`/activities/${activity._id}`} key={activity._id}>
    //             <li>
    //             activity: {activity.name} accessibility: {activity.accessibility} 
    //             type: {activity.type} participants: {activity.participants} 
    //             price: {activity.price} progress: {activity.progress} 
    //             </li>
    //         </Link>
    //     )
    // })

    const Index = filterActivities.map(activities => (
        <Segment key={ activities.id } inverted color='yellow' class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <h1>{activities.activity}</h1>
                    <Segment fluid>
                        <Grid columns={5}>
                            <Grid.Column>
                            {
                            activities.owner 
                            ?
                            <h3>Activity Owner: 
                                <Link to={`/user-public-page/${activities.owner._id}`}> 
                                    <h2>{activities.owner.email}</h2>
                                </Link>
                            </h3>
                            : 
                            <h3>Activity Owner: 
                                <h3>None</h3>
                            </h3>
                            }
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Category: </h3>
                                <h3>
                                    { activities.catagoryIcon
                                        ?
                                        <Icon size='large' name={activities.catagoryIcon}></Icon>
                                        :
                                        null
                                    }

                                    {activities.type}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Accessibility: </h3>
                                <h3>{activities.accessibility}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Participants: </h3>
                                <h3>{activities.participants}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Price: </h3>
                                <h3>{activities.price}</h3>
                            </Grid.Column>

                        </Grid>
                        
                    </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
    ))

    

return (
    <>
        <Segment inverted color='yellow' class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                        <Segment raised >
                        <h1>All Activities</h1>
                        <h2>Take a look to find things to do when you're bored! </h2>
                        <div className="headerSearch">
                    {/* <form className="searchForm" >
                        <input className="headerSearchInput" type="text" onChange={handleChange} />
                        <input type="submit" value="Search"></input>
                    </form> */}

                    <Form >
                        <Form.Input
                            placeholder='Type  here  to  filter  results  by  activity  name  or  type'
                            onChange={handleChange}
                            >
                            
                        </Form.Input>
                    </Form>
                    </div>
                        </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
        
        {Index}
    </>
)


}

export default IndexActivity