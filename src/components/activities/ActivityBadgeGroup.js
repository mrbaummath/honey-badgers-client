import {  List, Grid, Icon, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

//badge image linkes
import imgSrc from '../shared/ImgSrc'

//component to filter out activities which are relevant to a particular badge and render them in the badge's modal
const ActivityBadgeGroup = ({badge, activities}) => {
    const type = badge.name
    const activityGroup = activities.filter(activity => activity.type === type)
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