import React, { useState } from 'react'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List, Container } from 'semantic-ui-react'
import ActivityBadgeGroup from '../activities/ActivityBadgeGroup'

//badge image linkes
import imgSrc from '../shared/ImgSrc'

const BadgeModal = ({badge, activities, completedCounts}) => {

    const [open, setOpen] = useState(false)

    const badgeImages = imgSrc.badgeImages
    const badgeName = `${badge.name[0].toUpperCase()}${badge.name.slice(1)}`
    return (       
        <Grid.Column>
        
        <Modal
            open={open}
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            dimmer='blurring'
            size='small'
            trigger={
                <Image 
                    src={badgeImages[badge.name][badge.level]} 
                    size='big' 
                    circular 
                    alt='A picture of a badge'
                /> 
            
            }
        >
            <Modal.Header >
                <Grid centered padded>
                    Completed Activities
                </Grid>
            </Modal.Header>
            <Modal.Content scrolling>
                <Grid columns={2}>
                    <Grid.Column verticalAlign='middle' textAlign='center'>
                        <Image 
                            src={badgeImages[badge.name][badge.level]} 
                            size='medium' 
                            circular 
                            alt='A picture of a badge'
                            wrapped
                        /> 
                        <h1>{badge.level} badge for {badgeName}</h1>
                    </Grid.Column>
                    <Grid.Column>
                    <Modal.Description>
                        
                            <ActivityBadgeGroup 
                                badge={badge}
                                activities={activities}
                                completedCounts={completedCounts}
                            />
                        
                    </Modal.Description>
                    </Grid.Column>
                </Grid>
                
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