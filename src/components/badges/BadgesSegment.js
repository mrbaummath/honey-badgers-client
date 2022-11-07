import LoadingScreen from '../shared/LoadingPage'
import BadgeModal from './BadgeModal'
import { Segment, Grid } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import NewBadgeModal from './NewBadgeModal'

const BadgesSegment = ({badges, setBadges, badgeOwnerHandle, mine, activities, badgeUpdate, completedCounts, setBadgeUpdate}) => {

    //piece of state to help reset badgeUpdated state. 
    const [badgeWasUpdated, setBadgeWasUpdated] = useState(false)

    useEffect(() => {
        if(!badgeUpdate) {
            setBadgeWasUpdated(false)
        } else {
            console.log(badgeUpdate)
            //if badge is new, push a new badge to badges array
            if (badgeUpdate.change === 'up' && badgeUpdate.level === 'novice') {
                const newBadge= {'name': badgeUpdate.type, 'level':badgeUpdate.level}
                setBadges(prevBadges => [...prevBadges, newBadge])
                setBadgeWasUpdated(true)
            //otherwise, register the change of level
            } else if (badges && (badgeUpdate.change === 'up' || badgeUpdate.change === 'down')) {
                //grab the affected badge object out of the badges array
                const newBadges = badges.map(badge => {
                    if (badge.name == badgeUpdate.type) {
                        return {
                            ...badge,
                            level: badgeUpdate.level
                        }
                    } else {
                        return badge
                    }
                })
                setBadges(newBadges)
                setBadgeWasUpdated(true)
            } else if(badgeUpdate.change == 'lost') {
                setBadges(
                    badges.filter(badge => badge.name != badgeUpdate.type)
                )
                setBadgeWasUpdated(true)
            }
        }
    }, [badgeUpdate])

   // if there has been a change in badgeWasUpdated bool, reset the badge update. Otherise, a new badge may keep getting into the array
    useEffect(() => {
        if (badgeWasUpdated) {
        setBadgeUpdate(null)
        }
    }, [badgeWasUpdated])

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