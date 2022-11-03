import {  List } from 'semantic-ui-react'

//badge image linkes
import imgSrc from '../shared/ImgSrc'

//component to filter out activities which are relevant to a particular badge and render them in the badge's modal
const ActivityBadgeGroup = ({badge, activities}) => {
    const type = badge.name
    const activityGroup = activities.filter(activity => activity.type === type)
    const activityGroupJSX = activityGroup.map(activity => (
        <List.Item key={`badge-group-${activity._id}`}>
            <List.Icon name='certificate' />
            <List.Content>
                <p>{activity.activity}</p>
            </List.Content>
        </List.Item>
    ))
    return (
        <List>
            {activityGroupJSX}
        </List>
    )
}

export default ActivityBadgeGroup