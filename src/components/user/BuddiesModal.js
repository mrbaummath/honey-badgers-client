import React, { useState, useEffect } from 'react'
import {  Button, Container, Segment, Grid, Feed, Icon, Image, Progress, Modal, List, IconGroup } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingPage'
import { deleteBuddy, getMyBuddies } from '../../api/user'


const BuddiesModal = ({user, msgAlert}) => {

    const[open, setOpen] = useState(false)

    //buddies state -> will grab from the db on open and when you delete. This makes sense insofar as you will more quickly see if someone else has 'de-friended' you
    const [buddies, setBuddies] = useState(null)

    //piece of state to trigger refresh if buddy is deleted
    const [anUpdate, setAnUpdate] = useState(false)
    
    //pull in navigate to a user can go to the profile of a requestor
    const navigate = useNavigate()

    useEffect(()=>{
            getMyBuddies(user)
                .then((res)=>setBuddies(res.data.buddies))
                .catch(error => {
                    msgAlert({
                        heading: 'Buddy Error',
                        message: 'Could not get your buddies: ' + error,
                        variant: 'danger'
                })})

    },[anUpdate, open])

    const handleRemoveBuddy = (buddyId) => {
        //delete from DB
        deleteBuddy(user, buddyId)
            .then(() => setAnUpdate(prev => !prev))
            .catch(error => {
                msgAlert({
                    heading:'Could not Remove',
                    message: 'could not remove this badger budy: ' + error,
                    variant: 'danger'
                })
            })
        //delete from user's current buddy array using a filter
        
    }

    //if awaiting buddies data, show loading
    if (!buddies) {
        return <LoadingScreen />
    }

   const buddiesJSX = buddies.length > 0 ?
        buddies.map((buddy) => {
            const handle = buddy.username ? buddy.username : buddy.email
            const buddyId = buddy._id
            return (
                <List.Item key={`buddy-${buddyId}`}>
                    {buddy.avatar && <Image avatar src={buddy.avatar} />}
                    <List.Content>
                        <List.Header
                            as='a'
                            onClick={() => navigate(`/user-public-page/${buddyId}`)}>{handle}
                        </List.Header>
                        <List.Description padded>
                            Remove this badger buddy:
                            <Icon link 
                            onClick={()=>handleRemoveBuddy(buddyId)}
                            name='dont'
                            color='red'
                            />
                        </List.Description>

                    </List.Content>

                </List.Item>
            )

        })
        :

        <p>You have no badger buddies yet. Send a request to someone by going to their profile</p>

    return (
        <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Badger Buddies</Button>}
                size='small'
            >
                <Modal.Header>Your Badger Buddies</Modal.Header>
                <Modal.Content scrolling> 
                </Modal.Content>
                    <Container fluid text>
                    <List>
                        {buddiesJSX}
                    </List>
                    </Container>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
    )
}

export default BuddiesModal