import LoadingScreen from '../shared/LoadingPage'
import BadgeModal from './BadgeModal'
import { Segment, Grid } from 'semantic-ui-react'

const BadgesSegment = ({badges, badgeOwnerHandle, mine, setOpen, open, activities}) => {
    const header = mine ? "Badges You've Earned" : `${badgeOwnerHandle}'s badges` 
    const badgesJSX = badges ?
        badges.map((badge,index) => (
            <BadgeModal
            key={`${badge.name}-${badge.level}-${index}`} 
            badge={badge}
            setOpen={setOpen}
            open={open}
            activities={activities}
            />
        ))
        :
        <LoadingScreen />
    return (
        <Segment raised>
            <h2>{header}</h2>
            <Grid columns={2} padded>
            {badgesJSX}
            </Grid>
        </Segment>
    )
}

export default BadgesSegment