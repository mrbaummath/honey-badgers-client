import React, { useState } from 'react'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List, Container } from 'semantic-ui-react'
import ActivityBadgeGroup from '../activities/ActivityBadgeGroup'

//badge image linkes
import imgSrc from '../shared/ImgSrc'

const BadgeModal = ({badge, activities}) => {

    const [open, setOpen] = useState(false)

    const badgeImages = imgSrc.badgeImages
    const badgeName = `${badge.name[0].toUpperCase()}${badge.name.slice(1)}`
    return (       
        <Grid.Column>
        
        <Modal
            open={open}
            centered={true}
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            dimmer='blurring'
            size='small'
            trigger={
                <Image 
                    src={badgeImages[badge.name]} 
                    size='big' 
                    circular 
                    alt='A picture of a badge'
                /> 
            
            }
        >
            <Modal.Header>Completed Activities</Modal.Header>
            <Modal.Content image scrolling>
                <Image 
                    src={badgeImages[badge.name]} 
                    size='small' 
                    circular 
                    alt='A picture of a badge'
                    wrapped
                /> 
                <Modal.Description>
                <h1>{badge.level} badge for {badgeName}</h1>
                <ActivityBadgeGroup 
                    badge={badge}
                    activities={activities}
                />
                </Modal.Description>
                
                
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => setOpen(false)}>
                    Done
                </Button>
            </Modal.Actions> 
        </Modal>
            <h3 id='commFeed'>{badgeName} Badge: {badge.level}</h3>
         
        </Grid.Column>
    )
}

export default BadgeModal