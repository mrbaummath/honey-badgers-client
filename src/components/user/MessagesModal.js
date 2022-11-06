import React, { useState, useEffect } from 'react'
import {  Button, Container, Segment, Grid, Feed, Icon, Image, Progress, Modal, List } from 'semantic-ui-react'
import { getMyMessages } from '../../api/message'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingPage'

const MessagesModal = ({user, msgAlert}) => {

    const[open, setOpen] = useState(false)
    const [myMessages, setMymessages] = useState(null)

    const navigate = useNavigate()

    useEffect(()=> {
        if (open) {
            getMyMessages(user)
                .then(res => {
                    setMymessages(res.data.messages)
                })
                .catch((error) => {
                    msgAlert({
                        heading: 'Something went wrong',
                        message: 'Could not get your messages ' + error,
                        variant: 'danger'
                    })
                })
        }
    }, [open])

    let messagesJSX = null
    if (myMessages && myMessages.length > 0) {
        messagesJSX = myMessages.map(message => {
            const sender = message.owner.username ? message.owner.username : message.owner.email
            return (
                <List.Item>
                    {/* <Image avatar src={message.owner.avatar} /> */}
                    <List.Content>
                        <List.Header as='a' onClick={()=>navigate(`/user-public-page/${message.owner._id}`)}>{sender}</List.Header>
                        <List.Description><p>{message.content}</p></List.Description>
                    </List.Content>
                </List.Item>
            )
        })
    } else if (myMessages && myMessages.length === 0) {
        messagesJSX= <List.Item>No requests to display</List.Item>
    } else {
        messagesJSX = <LoadingScreen />
    }

    

    return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Show Messages</Button>}
            >
                <Modal.Header>Buddy Requests</Modal.Header>
                <Modal.Content> 
                </Modal.Content>
                    <Container fluid text>
                    <List>
                        {messagesJSX}
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

export default MessagesModal