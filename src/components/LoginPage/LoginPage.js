import React, { useState, Component} from 'react'
import { Grid, Segment, Feed, Icon, Button, Divider, Form, Container, Input, Message, Header, List, Image, Progress } from 'semantic-ui-react'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'


import AvatarSelection from '../../components/Avatars/AvatarSelection'

import { useNavigate, Link } from 'react-router-dom'





const LoginPage = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')
  const [createdDate, setCreatedDate] = useState('')
  //default avatar will be badger
  const [avatar, setAvatar] = useState('https://i.imgur.com/uEW4fPX.png')
  const navigate = useNavigate()

  const onSignUp = (event) => {
    event.preventDefault()

    const { msgAlert, setUser } = props

    const credentials = {email, username, password, passwordConfirmation, createdDate, avatar }
    console.log(credentials)

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
                setCreatedDate('')
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger',
        })
      })
  }


return (

  <Grid columns={2} divided padded centered>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment
    raised
  inverted
  color='yellow'
  verticalAlign='middle'
  padded='very'>

<Segment 
    raised
  verticalAlign='middle'
  centered>
    <h4><h3>Honey Badges </h3> is an application where users can keep a running list of activites to complete and earn "badges" for completing multiple activites of the same type. Together, users form a community of badge-earners who can opt to share their accomplishments and use eachother's activities for inspiration. We hope the social aspect of creating and sharing activities will motivate users in a positive way. At the same time, users will have the option to make specific activities on their tasklist private. Users who need some help getting started can also choose to randomly generate an activity within specified parameters.</h4></Segment>
  

    <Segment >
  <Header textAlign='center'>
  <h1>Earn Cool Badges!</h1>
</Header>
  </Segment>


  <Segment>

  <Grid columns={2}>


    <Grid.Column verticalAlign='middle' width={5}>

      <Image 
          src='https://i.imgur.com/lrr0PdB.png' 
          size='small' 
          circular 
          centered
          alt='A picture of a badge'
      />

      </Grid.Column>
      <Grid.Column width={11}>
      <Header><h1>Busy Work</h1></Header>
            <List size='big' >
                <List.Item>
                    <List.Icon name='edit outline' verticalAlign='bottom'/>
                    <List.Content><p>Resolve a problem you've been putting off</p></List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='edit outline' verticalAlign='bottom' />
                    <List.Content  verticalAlign='middle'><p>Organize your dresser</p></List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='edit outline'  verticalAlign='bottom'/>
                    <List.Content  verticalAlign='middle'>
                    <p>Make a budget</p>
                    </List.Content>
                </List.Item>
                <List.Item >
                    <List.Icon name='edit outline'  verticalAlign='bottom'/>
                    <List.Content  verticalAlign='middle'>
                        <p>Match your storage containers with their lids</p>
                    </List.Content>
                </List.Item>
            </List>
        </Grid.Column>
    </Grid>
  </Segment>
  <Segment>
  <Header textAlign='center'>
<h2> View an Updated Feed of Recent User Activities</h2>
</Header>

</Segment>
<Segment>
  <Segment raised>
          <Container fluid>
            <Grid>
                <Grid.Column width={2} verticalAlign='center' textAlign='middle'>
                    
                <Image 
                    src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                    size='small'
                    circular 
                    centered
                    
                    />
                </Grid.Column>
                <Grid.Column width={10} textAlign='center' verticalAlign='middle'>
                    <h3><Link to={`/`}>Arthur</Link> is currently working on the <Link to={`/`}>Research a topic you're interested in</Link> activity</h3>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                    <Progress percent='10' indicating />
                </Grid.Column>
            </Grid>
          </Container>
  </Segment>
  <Segment raised>
          <Container fluid>
            <Grid>
                <Grid.Column width={2} verticalAlign='center' textAlign='middle'>
                    
                <Image 
                    src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
                    size='small'
                    circular 
                    centered/>
                </Grid.Column>
                <Grid.Column width={10} textAlign='center' verticalAlign='middle'>
                    <h3><Link to={`/`}>Trillian</Link> is currently working on the <Link to={`/`}>Organize your music collection</Link> activity</h3>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                    <Progress percent='50' indicating />
                </Grid.Column>
            </Grid>
          </Container>
  </Segment>
  <Segment raised>
          <Container fluid>
            <Grid>
                <Grid.Column width={2} verticalAlign='center' textAlign='middle'>
                    
                <Image 
                    src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'
                    size='small'
                    circular 
                    centered/>
                </Grid.Column>
                <Grid.Column width={10} textAlign='center' verticalAlign='middle'>
                    <h3><Link to={`/`}>Ford</Link> is currently working on the <Link to={`/`}>Learn how to french braid hair</Link> activity</h3>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                    <Progress percent='50' indicating />
                </Grid.Column>
            </Grid>
          </Container>
  </Segment>
  <Segment raised>
          <Container fluid>
            <Grid>
                <Grid.Column width={2} verticalAlign='center' textAlign='middle'>
                    
                <Image 
                    src='https://react.semantic-ui.com/images/avatar/small/justen.jpg'
                    size='small'
                    circular 
                    centered/>
                </Grid.Column>
                <Grid.Column width={10} textAlign='center' verticalAlign='middle'>
                    <h3><Link to={`/`}>Marvin</Link> is currently working on the <Link to={`/`}>Have a paper airplane contest with some friends</Link> activity</h3>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                    <Progress percent='100' indicating />
                </Grid.Column>
            </Grid>
          </Container>
  </Segment>
</Segment>
  
  </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment 
          raised
          inverted
          color='yellow'
          
        >
 
      
        <Header size='huge'>Welcome to HoneyBadges</Header>
          <h3>Sign Up</h3>
          <Container fluid>
          <Form  onSubmit= {onSignUp}>
              <Form.Field>
                  <Form.Input 
                      fluid
                      icon='users' 
                      iconPosition='left' 
                      required
                      type='text'
                      name='username'
                      value={username}
                      placeholder='Enter a username'
                      onChange={e => setUsername(e.target.value)}

                  />
              </Form.Field>
              <br />
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
                      placeholder='Confirm Password'
                      required
                      name='passwordConfirmation'
                      value={passwordConfirmation}
                      type='password'
                      onChange={e => setPasswordConfirmation(e.target.value)}
                      
                  />
              </Form.Field>
              <br />
              <Form.Field>
                  <Form.Input 
                      fluid
                      icon='calendar alternate outline'
                      // placeholder='current date'
                      iconPosition='left'
                      required
                      name='createdDate'
                      value={createdDate}
                      defaultValue='today'
                      type='date'
                      onChange={e => setCreatedDate(e.target.value)}

   
                  />
              </Form.Field>
              <br />


              < AvatarSelection avatar={avatar} setAvatar={setAvatar} />


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
          </Container>
      
  
<Divider horizontal>Or</Divider>


		  <Segment raised inverted color='yellow' verticalAlign='middle' id="segment">
            <Grid columns={2} stackable textAlign='center'>
                <Grid.Column centered>
                    {/* <Button secondary inverted color='yellow' class="signButton" href='sign-in'>Sign in</Button> */}
                <Message fluid attached='bottom' color='yellow' stretched size='huge'>
      <Icon name='help' />
      Already signed up?&nbsp;<Link to='/sign-in'>Login here</Link>&nbsp;instead.
    </Message> 
    </Grid.Column>
            </Grid>
		  </Segment>

</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)}

export default LoginPage