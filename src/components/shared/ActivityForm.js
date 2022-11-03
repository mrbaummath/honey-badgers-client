import React from 'react'
import {Button, Checkbox, Form, Container, Icon} from 'semantic-ui-react'
import RandomActivity from '../activities/RandomActivity'

const options = [
    {text: 'Education', value: 'education'},
    {text: 'Social', value: 'social'},
    {text: 'DIY', value: 'diy'},
    {text: 'Charity', value: 'charity'},
    {text: 'Cooking', value: 'cooking'},
    {text: 'Relaxation', value: 'relaxation'},
    {text: 'Music', value: 'music'},
    {text: 'Busywork', value: 'busywork'},
    {text: 'Recreational', value: 'recreational'},
]

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
                        defaultValue={ activity.activity }
                        onChange= { handleChange }
                    />
                    <Form.Select
                        required
                        name='type'
                        id='type'
                        label='Type'
                        defaultValue={ activity.type }
                        options={options}
                        placeholder='Type'
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Input 
                        required
                        width={6}
                        type='number'
                        name='accessibility'
                        id='accessibility'
                        label='Accessibility'
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
                <Button class="ui circular icon button" 
                        type='button'
                        onClick= { handleActivity }>
                <Icon name='random' /></Button>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ActivityForm