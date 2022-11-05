import LoadingScreen from '../shared/LoadingPage'
import BadgeModal from './BadgeModal'
import { Segment, Grid } from 'semantic-ui-react'
import { useEffect } from 'react'
import NewBadgeModal from './NewBadgeModal'

const BadgesSegment = ({badges, setBadges, badgeOwnerHandle, mine, activities, badgeUpdate, completedCounts}) => {

    useEffect(() => {
        //if badge is new, push a new badge to badges array
        if (badgeUpdate.change === 'up' && badgeUpdate.level === 'novice') {
            const newBadge= {'name': badgeUpdate.type, 'level':badgeUpdate.level}
            setBadges(prevBadges => [...prevBadges, newBadge])
        }
    }, [badgeUpdate])


    const header = mine ? "Badges You've Earned" : `${badgeOwnerHandle}'s badges` 
    const badgesJSX = badges ?
        badges.map((badge,index) => (
            <BadgeModal
            key={`${badge.name}-${badge.level}-${index}`} 
            badge={badge}
            activities={activities}
            completedCounts={completedCounts}
            />
        ))
        :
        <LoadingScreen />
    return (
        <Segment raised>
            <h1 id='commFeed'>{header}</h1>
            <Grid columns={2} padded>
            {badgesJSX}
            <NewBadgeModal badgeUpdate={badgeUpdate} />
            </Grid>
        </Segment>
    )
}

export default BadgesSegment