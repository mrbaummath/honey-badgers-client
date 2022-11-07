import {  List, Grid, Icon, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react'

//component to filter out activities which are relevant to a particular badge and render them in the badge's modal
const ActivityBadgeGroup = ({badge, activities, completedCounts}) => {
    //piece of state to trigger refresh here if there is a change in completed counts 
    const[updatedCounts,setUpdatedCounts] = useState(false)

    useEffect(()=>{
        setUpdatedCounts(prev => (!prev))
    },[completedCounts])

    const type = badge.name
    const activityGroup = activities.filter(activity => (activity.type === type && activity.progress === 100))
    const activityGroupJSX = activityGroup.map(activity => (
        <List.Item key={`badge-group-${activity._id}`}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={2} textAlign='center' verticalAlign='middle'>
                        <Icon name={activity.categoryIcon} centered size='large'></Icon>
                    </Grid.Column>
                    <Grid.Column>
                        <Link to={`/show-page/${activity._id}`} ><h1>{activity.activity}</h1></Link>
                    </Grid.Column>
                </Grid>
            </Segment>
        </List.Item>
    ))
    return (
        <List>
            {activityGroupJSX}
        </List>

    )
}

export default ActivityBadgeGroup