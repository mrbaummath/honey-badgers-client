import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Header } from 'semantic-ui-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getActivity, updateActivity, deleteActivity } from '../../api/activity'



const ShowActivity = ({ user, msgAlert, activityId }) => {
    console.log(msgAlert)
    // const [noteName, setNoteName] = useState("");
    // const [noteContent, setNoteContent] = ("");
  
    // const addNote = (event) => {
    //   event.preventDefault();
  
    //   if (!noteContent) {
    //     alert("You must add note content");
    //     return;
    //   }
  
    //   const newNote = {
    //     noteName,
    //     noteContent,
    //     editing: false,
    //     addingComment: false,
    //     viewingComments: false,
    //     comments: []
    //   };
  
    //   setNoteList([...notes, newNote]);
    //   setId(id + 1);
    //   setNoteContent("");
    //   setNoteName("");
    // };
    const [allActivities, setGetAllActivities] = useState([])
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    
    // const { activityId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      getActivity(user, activityId)
        .then((res) => {
            setGetAllActivities(res.data.activity)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Activities failed' + error,
                variant: 'danger'
            })
        })
    },[updated])


    const handleDeleteActivity = () => {
      deleteActivity(user, activityId)
      .then(() => {
          setDeleted(true)
          msgAlert({
              heading: 'Success',
              message: 'Deleting a Activity',
              variant: 'success'
          })
          
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Activity Failure' + error,
              variant: 'danger'
          })
      })
  }
  if (deleted) navigate('/activities')


    const allActivitiesJSX = allActivities.map(activity => {
        return (
            <Link to={`/activities/${activity._id}`} key={activity._id}>
                <li>
                activity: {activity.name} accessibility: {activity.accessibility} 
                type: {activity.type} participants: {activity.participants} 
                price: {activity.price} progress: {activity.progress} 
                </li>
            </Link>
        )
    })
    const show = allActivities.map(activities => (
      <div> 
    <Segment    
          inverted color='yellow'
          verticalAlign='middle' 
          id="segment"
          key={ activities.id }
      >
    <Grid centered stretched columns={4}>
        <Grid.Row padded>
            <h1>Activity Name</h1>
            <Segment fluid textAlign="left">
        <h3>Category:</h3>
        <h3>Accessibility:</h3>
        <h3>Type:</h3>
        <h3>Participants:</h3>
        <h3>Price:</h3>

  </Segment>
  </Grid.Row>
        <Grid.Row padded>
            <Segment     
          verticalAlign='middle' 
          id="segment"
      >
 {/* <div class="buttonActivityPage"> */}
<Grid columns={3}>
 <Grid.Column>
        <Button size='large'>Mark as Complete</Button>
</Grid.Column>
        {/* Notes Modal Button */}
        
<Grid.Column>
        <Button size='large' onClick={() => setUpdated(true)} variant="warning">Edit</Button>
</Grid.Column>
<Grid.Column>
        <Button size='large' onClick={() => handleDeleteActivity()} >Delete</Button>
</Grid.Column> 
</Grid> 
    
 </Segment>
        </Grid.Row>
        <Grid.Row >
            <Segment  
            padded='very'  
            inverted color='yellow' 
            verticalAlign='middle' 
            id="segment"
             >
            <Comment.Actions active 
            type="text"
            value= 'noteName'
            placeholder="Note name"
            required>
            </Comment.Actions>
            <Form reply 
            placeholder="Note content"
            value='noteContent'
            >
            <Form.TextArea />
            <Button
                content='Add Note'
                labelPosition='center'
                icon='edit'
                primary
                type="submit"
            />
            </Form>
            </Segment>
            <Segment>
            <Comment.Group minimal>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <span>Today at 5:42PM</span>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group>
        <Comment>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <span>Just now</span>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <span>5 days ago</span>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Comment.Group>
            </Segment>
       </Grid.Row>
    </Grid> 
    </Segment>
</div>
    ))

return (
      
      <>
      {show}
      </>

 
)
}


export default ShowActivity;