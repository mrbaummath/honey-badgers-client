import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { createMessage } from '../../api/message'

const RequestModal = ({sender, recipient, msgAlert}) => {
   
    const [open, setOpen] = useState(false)
    const [messageContent, setMessageContent] = useState('')

    const sendInvite = (e, form) => {
        e.preventDefault()
        createMessage(sender, message)
            .then((res) => {
                setOpen(false)
                msgAlert({
                heading:'Sent',
                message:'Your Request Sent Successfully',
                variant:'success'
            })})
            .catch(err => msgAlert({
                heading: 'Sorry!',
                message:'something went wront ' + err,
                variant: 'danger'
            }))
        
    }

   const handleMessageChange = (e,target) => {
        const {value} = target
        setMessageContent(value) 
   }

   const message = {
    recipient: recipient._id,
    content: messageContent
   }
   
    return(
        <Modal
            closeIcon
            onClose={() => {
                setOpen(false)
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Badger Buddy Request</Button>}
        >
            <Modal.Header>Send {recipient.username || recipient.email} Badger Buddy Invite</Modal.Header>
            <Modal.Content>
                <Form onSubmit={sendInvite}>
                    <Form.TextArea 
                        label='Message' 
                        placeholder='(optional) Send a message with your request'
                        value={messageContent}
                        onChange={handleMessageChange}
                        />
                    <Button type='submit'>Send Request</Button>
                </Form>
                </Modal.Content>
        </Modal>
    )
  
}

export default RequestModal