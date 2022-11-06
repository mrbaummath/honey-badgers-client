import React from 'react'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'

const NoteForm = (props) => {

    const { note, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Input
                    reply
                    required
                    name='text'
                    id='text'
                    Label='Note'
                    placeholder='Note Content'
                    defaultValue = { note.text}
                />
                <Form.Field>
                    <Checkbox 
                        label='Mark Note as Private'
                        name='private'
                        defaultchecked={ note.private }
                        onChange={ handleChange }
                    />
                </Form.Field>
                {/* <Button type='submit' color='yellow'>Submit</Button> */}
            </Form>
        </Container>
    )
}

export default NoteForm