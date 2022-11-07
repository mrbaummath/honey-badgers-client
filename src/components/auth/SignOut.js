import { useNavigate } from 'react-router-dom'
import {  Segment, Form, Container, Button} from 'semantic-ui-react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
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
                    <h3 id="signOutText">Are you sure you want to sign out?</h3>
                    <Button secondary inverted color='yellow' onClick={onSignOut}>Sign Out</Button>
                    <Button secondary inverted color='yellow' onClick={onCancel}>Stay</Button>
                </Segment>
            </Container>
        </div>
		</>
	)
}

export default SignOut
