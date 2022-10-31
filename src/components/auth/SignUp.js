import React, { useState, Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import {  Button, Segment, Form, Container, Input } from 'semantic-ui-react'

const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div >
                <Container 
                    id="container"
                >
                    <Segment  
                        padded='very'  
                        inverted color='yellow' 
                        verticalAlign='middle' 
                        id="segment"
                    >
                        <h3>Sign Up</h3>
                        <Form  onSubmit={onSignUp}>
                            <Form.Field>
                                <Form.Input 
                                    fluid
                                    icon='users' 
                                    iconPosition='left' 
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter email'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <br />
                            <Form.Field>
                                <Form.Input 
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    required
                                    name='password'
                                    value={password}
                                    type='password'
                                    placeholder='Password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Field>
                            <br />
                            <Form.Field>
                                <Form.Input
                                    fluid 
                                    icon='check' 
                                    iconPosition='left' 
                                    placeholder='Confim Password'
                                    required
                                    name='passwordConfirmation'
                                    value={passwordConfirmation}
                                    type='password'
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                />
                            </Form.Field>
                            <br />
                            <Form.Button 
                                 secondary 
                                 inverted 
                                 color='yellow'
                                class="signButton" 
                                type='submit'
                            >
                                Submit
                            </Form.Button>
                        </Form>
                    </Segment>
                </Container>
            </div>
    )

}

export default SignUp