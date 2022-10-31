import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import {  Button, Segment, Form, Container, Input } from 'semantic-ui-react'

const ChangePassword = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        // <div className='row'>
        //     <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        //         <h3>Change Password</h3>
        //         <Form onSubmit={onChangePassword}>
        //             <Form.Group controlId='oldPassword'>
        //                 <Form.Label>Old password</Form.Label>
        //                 <Form.Control
        //                     required
        //                     name='oldPassword'
        //                     value={oldPassword}
        //                     type='password'
        //                     placeholder='Old Password'
        //                     onChange={e => setOldPassword(e.target.value)}
        //                 />
        //             </Form.Group>
        //             <Form.Group controlId='newPassword'>
        //                 <Form.Label>New Password</Form.Label>
        //                 <Form.Control
        //                     required
        //                     name='newPassword'
        //                     value={newPassword}
        //                     type='password'
        //                     placeholder='New Password'
        //                     onChange={e => setNewPassword(e.target.value)}
        //                 />
        //             </Form.Group>
        //             <Button variant='primary' type='submit'>
        //                 Submit
        //             </Button>
        //         </Form>
        //     </div>
        // </div>
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
                <h3 id="signOutText">Change Password</h3>
                <Form  onSubmit={onChangePassword}>
                    <Form.Field>
                        <Form.Input 
                            fluid
                            icon='lock' 
                            iconPosition='left' 
                            required
                            type='password'
                            name='oldPassword'
                            value={oldPassword}
                            placeholder='Current Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Field>
                    <br />
                    <Form.Field>
                        <Form.Input 
                            fluid
                            icon='lock'
                            iconPosition='left'
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </Form.Field>
                    <br />
                    <Form.Field>
                        <Form.Input 
                            fluid
                            icon='check'
                            iconPosition='left'
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm New Password'
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

export default ChangePassword