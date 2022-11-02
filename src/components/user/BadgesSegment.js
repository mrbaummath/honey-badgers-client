import LoadingScreen from '../shared/LoadingPage'
import Badge from './Badge'
import { Segment, Grid } from 'semantic-ui-react'

const BadgesSegment = ({badges}) => {
    const badgesJSX = badges ?
        badges.map((badge,index) => (
            <Badge
            key={`${badge.name}-${badge.level}-${index}`} 
            badge={badge}
            />
        ))
        :
        <LoadingScreen />
    return (
        <Segment raised>
            <h2>Badges You've Earned</h2>
            <Grid columns={2} padded>
            {badgesJSX}
            </Grid>
        </Segment>
    )
}

export default BadgesSegment