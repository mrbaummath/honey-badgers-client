import React, { useState, Component} from 'react'
import { Grid, Segment, Feed, Icon, Button, Divider, Form, Container, Input, Message, Header, List, Image } from 'semantic-ui-react'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'




const LoginPage = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')
  // const [createdDate, setCreatedDate] = useState('')
  const navigate = useNavigate()

  const onSignUp = (event) => {
  event.preventDefault()

  const { msgAlert, setUser } = props

      const credentials = {email, username, password, passwordConfirmation }

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
              // setCreatedDate('')
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


    <Grid.Column verticalAlign='middle' width={7}>

      <Image 
          src='https://i.etsystatic.com/10536084/r/il/b67424/4058937747/il_1140xN.4058937747_esbp.jpg' 
          size='small' 
          circular 
          centered
          alt='A picture of a badge'
      />

      </Grid.Column>
      <Grid.Column>
      <Header><h1>The Most Selfless</h1></Header>
            <List size='big' >
                <List.Item>
                    <List.Icon name='certificate' verticalAlign='middle'/>
                    <List.Content><p>Catch up on world news</p></List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='certificate' verticalAlign='middle' />
                    <List.Content  verticalAlign='middle'><p>Buy a new house decoration</p></List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='certificate'  verticalAlign='middle'/>
                    <List.Content  verticalAlign='middle'>
                    <p>Repaint a room in your house</p>
                    </List.Content>
                </List.Item>
                <List.Item >
                    <List.Icon name='certificate'  verticalAlign='middle'/>
                    <List.Content  verticalAlign='middle'>
                        <p>Draw something interesting</p>
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
  <Segment >
<Feed>
    <Feed.Event>
      <Feed.Label>
        <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a buddy
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
          <a>Helen Troy</a> completed <a>2 new activities</a>
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
          content='earned a new badge'
        />

<Image 
          src='https://i.etsystatic.com/10536084/r/il/83f1d3/4011356412/il_1140xN.4011356412_e62z.jpg' 
          size='tiny' 
          circular 
          alt='A picture of a badge'
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
          <a>Joe Henderson</a> added a note to his activity
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          Does anyone want to have a paper airplane contest with me? I'm trying to earn my next level social badge.
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
          <a>Justen Kitsune</a> added <a>2 new photos</a> "cooking seconding risotto, yum!"
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
  
  
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment 
    raised
  inverted
  color='yellow'
  verticalAlign='middle'>
 
      <Segment   
          inverted color='yellow' 
          verticalAlign='middle' 
          id="segment"
      >
        <Header size='huge'>Welcome to HoneyBadges</Header>
          <h3>Sign Up</h3>
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
              {/* <Form.Field>
                  <Form.Input 
                      fluid
                      icon='lock'
                      iconPosition='left'
                      required
                      name='createdDate'
                      type='text'
                      class="form-control"
   
                  />
              </Form.Field> */}
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
  
<Divider horizontal>Or</Divider>


		  <Segment raised inverted color='yellow' verticalAlign='middle' id="segment">
            <Grid columns={2} stackable textAlign='center'>
                <Grid.Column centered>
                    {/* <Button secondary inverted color='yellow' class="signButton" href='sign-in'>Sign in</Button> */}
                <Message fluid attached='bottom' color='yellow' stretched size='huge'>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='sign-in'>Login here</a>&nbsp;instead.
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