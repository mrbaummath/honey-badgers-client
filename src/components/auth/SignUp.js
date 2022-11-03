import React, { useState, Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { Grid, Segment, Feed, Icon, Button, Divider, Form, Container, Input, Message } from 'semantic-ui-react'


const SignUp = (props) => {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [passwordConfirmation, setPasswordConfirmation] = useState('')

    // const navigate = useNavigate()

	// const onSignUp = (event) => {
	// 	event.preventDefault()

	// 	const { msgAlert, setUser } = props

    //     const credentials = {email, password, passwordConfirmation}

	// 	signUp(credentials)
	// 		.then(() => signIn(credentials))
	// 		.then((res) => setUser(res.data.user))
	// 		.then(() =>
	// 			msgAlert({
	// 				heading: 'Sign Up Success',
	// 				message: messages.signUpSuccess,
	// 				variant: 'success',
	// 			})
	// 		)
	// 		.then(() => navigate('/'))
	// 		.catch((error) => {
    //             setEmail('')
    //             setPassword('')
    //             setPasswordConfirmation('')
	// 			msgAlert({
	// 				heading: 'Sign Up Failed with error: ' + error.message,
	// 				message: messages.signUpFailure,
	// 				variant: 'danger',
	// 			})
	// 		})
	// }


    // return (
    //     <div >
    //             <Container 
    //                 id="container"
    //             >
    //                 <Segment  
    //                     padded='very'  
    //                     inverted color='yellow' 
    //                     verticalAlign='middle' 
    //                     id="segment"
    //                 >
    //                     <h3>Sign Up</h3>
    //                     <Form  onSubmit={onSignUp}>
    //                         <Form.Field>
    //                             <Form.Input 
    //                                 fluid
    //                                 icon='users' 
    //                                 iconPosition='left' 
    //                                 required
    //                                 type='email'
    //                                 name='email'
    //                                 value={email}
    //                                 placeholder='Enter email'
    //                                 onChange={e => setEmail(e.target.value)}
    //                             />
    //                         </Form.Field>
    //                         <br />
    //                         <Form.Field>
    //                             <Form.Input 
    //                                 fluid
    //                                 icon='lock'
    //                                 iconPosition='left'
    //                                 required
    //                                 name='password'
    //                                 value={password}
    //                                 type='password'
    //                                 placeholder='Password'
    //                                 onChange={e => setPassword(e.target.value)}
    //                             />
    //                         </Form.Field>
    //                         <br />
    //                         <Form.Field>
    //                             <Form.Input
    //                                 fluid 
    //                                 icon='check' 
    //                                 iconPosition='left' 
    //                                 placeholder='Confim Password'
    //                                 required
    //                                 name='passwordConfirmation'
    //                                 value={passwordConfirmation}
    //                                 type='password'
    //                                 onChange={e => setPasswordConfirmation(e.target.value)}
    //                             />
    //                         </Form.Field>
    //                         <br />
    //                         <Form.Button 
    //                              secondary 
    //                              inverted 
    //                              color='yellow'
    //                             class="signButton" 
    //                             type='submit'
    //                         >
    //                             Submit
    //                         </Form.Button>
    //                     </Form>
    //                 </Segment>
    //             </Container>
    //         </div>
    // )
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const onSignUp = (event) => {
  event.preventDefault()

  const { msgAlert, setUser } = props

      const credentials = {email, username, password, passwordConfirmation}

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
    .then(() => navigate('/user-page'))
    .catch((error) => {
              setEmail('')
              setUsername('')
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

  <Grid columns={2} divided>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment
    raised
  inverted
  color='yellow'
  verticalAlign='middle'>
<Segment >
<h2>List of User Activities</h2>
  </Segment>
<Feed>
    <Feed.Event>
      <Feed.Label>
        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Helen Troy</a> added <a>2 new illustrations</a>
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />1 Like
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
      <Feed.Content>
        <Feed.Summary
          date='2 Days Ago'
          user='Jenny Hess'
          content='add you as a friend'
        />
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />8 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Joe Henderson</a> posted on his page
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          Ours is a life of constant reruns. We're always circling back to where
          we'd we started, then starting all over again. Even if we don't run
          extra laps that day, we surely will come back for more of the same
          another day soon.
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />5 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

    <Feed.Event>
      <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/justen.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <Feed.Date>4 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            41 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  </Feed>

  </Segment>
        <Segment 
    raised
  inverted
  color='yellow'
  verticalAlign='middle'
  centered>Honey Badges is an application where users can keep a running list of activites to complete and earn "badges" for completing multiple activites of the same type. Together, users form a community of badge-earners who can opt to share their accomplishments and use eachother's activities for inspiration. We hope the social aspect of creating and sharing activities will motivate users in a positive way. At the same time, users will have the option to make specific activities on their tasklist private. Users who need some help getting started can also choose to randomly generate an activity within specified parameters.</Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment 
    raised
  inverted
  color='yellow'
  verticalAlign='middle'><div >
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
          <Form  onSubmit= {onSignUp}>
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
              < br/>
              <Form.Field>
                  <Form.Input 
                      fluid
                      icon='users' 
                      iconPosition='left' 
                      required
                      type='username'
                      name='username'
                      value={username}
                      placeholder='Enter a Username'
                      onChange={e => setUsername(e.target.value)}

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
                      placeholder='Confirm Password'
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
                  centered
                  textAlign='center'
                  verticalAlign='middle'
              >
                  Submit
              </Form.Button>
          </Form>


      </Segment>
  </Container>
</div>
<Divider horizontal>Or</Divider>
<div >
        <Container id="container">
		  <Segment raised  padded='very'  inverted color='yellow' verticalAlign='middle' id="segment">
            <Grid columns={2} stackable textAlign='center'>
                <Grid.Column centered>
                    {/* <Button secondary inverted color='yellow' class="signButton" href='sign-in'>Sign in</Button> */}
                <Message attached='bottom' color='yellow'>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='sign-in'>Login here</a>&nbsp;instead.
    </Message> 
    </Grid.Column>
            </Grid>
		  </Segment>
          </Container>
		</div>
</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

}

export default SignUp