import React from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'

const ActivityForm = (props) => {

    const { activity, handleChange, handleSubmit, handleActivity, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Group widths='equal'>
                    <Form.Input 
                        required 
                        name='activity'
                        id='activity'
                        label='Activity' 
                        placeholder='Activity'
                        defaultValue= { activity.activity }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Input 
                        required 
                        name='type'
                        id='type'
                        label='Type: (education, social, diy, charity, cooking, relaxation, music, busywork, recreational)' 
                        placeholder='Type'
                        defaultValue= { activity.type}
                        onChange= { handleChange }
                    />
                <Form.Group inline>
                    <Form.Input 
                        required
                        width={6}
                        type='number'
                        name='accessibility'
                        id='accessibility'
                        label='Accessibility Rating'
                        value = { activity.accessibility }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        required
                        width={6}
                        type='number'
                        name='participants'
                        id='participants'
                        label='Number of Participants'
                        value = { activity.participants }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        required
                        width={6}
                        type='number'
                        name='price'
                        id='price'
                        label='Price'
                        value = { activity.price }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        width={6}
                        type='number'
                        name='progress'
                        id='progress'
                        label='Progress'
                        value = { activity.progress }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Field>
                    <Checkbox 
                        label='Mark Activity as Private'
                        name='private'
                        defaultChecked= { activity.private }
                        onChange={ handleChange }
                    />
                </Form.Field>
                <Button icon
                        type='button'
                        color='yellow'
                        label='Generate Random Activity'
                        onClick= { handleActivity }>
                <Icon name='random' /></Button>
                <Button type='submit' color='yellow'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ActivityForm