import LoadingScreen from '../shared/LoadingPage'
import BadgeModal from './BadgeModal'
import { Segment, Grid } from 'semantic-ui-react'

const BadgesSegment = ({badges, badgeOwnerHandle, mine, activities}) => {

    //when completed count changes, chec

    const header = mine ? "Badges You've Earned" : `${badgeOwnerHandle}'s badges` 
    const badgesJSX = badges ?
        badges.map((badge,index) => (
            <BadgeModal
            key={`${badge.name}-${badge.level}-${index}`} 
            badge={badge}
            activities={activities}
            />
        ))
        :
        <LoadingScreen />
    return (
        <Segment raised>
            <h1 id='commFeed'>{header}</h1>
            <Grid columns={2} padded>
            {badgesJSX}
            </Grid>
        </Segment>
    )
}

export default BadgesSegment