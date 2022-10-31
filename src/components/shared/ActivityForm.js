import React from 'react'
import {Button, Checkbox, Form, Container} from 'semantic-ui-react'

const options = [
    {key: 'e', text: 'Education', value: 'education'},
    {key: 's', text: 'Social', value: 'social'},
    {key: 'd', text: 'DIY', value: 'diy'},
    {key: 'ch', text: 'Charity', value: 'charity'},
    {key: 'co', text: 'Cooking', value: 'cooking'},
    {key: 'r', text: 'Relaxation', value: 'relaxtion'},
    {key: 'm', text: 'Music', value: 'music'},
    {key: 'b', text: 'Busywork', value: 'busywork'},
    {key: 'r', text: 'Recreational', value: 'recreational'},
]

const ActivityForm = (props) => {

    const { activity, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Group inline>
                    <Form.Input 
                        required 
                        fluid 
                        name='activity'
                        id='activity'
                        label='Activity' 
                        placeholder='Activity'
                        value= { activity.activity }
                        onChange= { handleChange }
                    />
                    <Form.Select
                        fluid
                        required
                        name='type'
                        id='type'
                        label='Type'
                        options={options}
                        placeholder='Type'
                        value= { activity.type }
                        onChange= { handleChange }
                    />
                </Form.Group>
                <Form.Group inline>
                    <Form.Input 
                        required
                        width={3}
                        type='number'
                        name='accessibility'
                        id='accessibility'
                        label='Accessibility'
                        value = { activity.accessibility }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        required
                        width={3}
                        type='number'
                        name='participants'
                        id='participants'
                        label='Number of Participants'
                        value = { activity.participants }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        required
                        width={3}
                        type='number'
                        name='price'
                        id='price'
                        label='Price'
                        value = { activity.price }
                        onChange= { handleChange }
                    />
                    <Form.Input 
                        width={3}
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
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ActivityForm