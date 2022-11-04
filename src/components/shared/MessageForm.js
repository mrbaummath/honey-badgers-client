import React from 'react'
import {Button, Form, Container } from 'semantic-ui-react'

const MessageForm = (props) => {

    const { message, handleSubmit, handleClose} = props

    return (
        <Container className="justify-content-center">
            <Form onSubmit={ handleSubmit }>
                <Form.Input
                    type='text'
                    defaultValue='So And So sent you a buddy request'></Form.Input>
                <Button onClick={handleClose}>Deny</Button>
                <Button type='submit' color='yellow'>Accept</Button>
            </Form>
        </Container>
    )
}

export default MessageForm