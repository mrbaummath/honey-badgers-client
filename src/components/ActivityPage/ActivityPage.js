import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Header } from 'semantic-ui-react'
import { getActivity } from '../../api/activity'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

const ActivityPage = ({ notes, setNoteList, id, setId }) => {
    const [noteName, setNoteName] = useState("");
    const [noteContent, setNoteContent] = useState("");
  
    const addNote = (event) => {
      event.preventDefault();
  
      if (!noteContent) {
        alert("You must add note content");
        return;
      }
  
      const newNote = {
        noteName,
        noteContent,
        editing: false,
        addingComment: false,
        viewingComments: false,
        comments: []
      };
  
      setNoteList([...notes, newNote]);
      setId(id + 1);
      setNoteContent("");
      setNoteName("");
    };

// const ActivityPage = ({ user, msgAlert}) => (
return (



const ActivityPage = ({user, msAlert}) => (
    
    // [open, setOpen] = React.useState(false)
    

    // Activity Section
   
   <div> 
    <Segment    
          inverted color='yellow'
          verticalAlign='middle' 
          id="segment"
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
        <Button size='large'>Edit</Button>
</Grid.Column>
<Grid.Column>
        <Button size='large'>Delete</Button>
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
            nSubmit={addNote}
             >
            <Comment.Actions active 
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Note name"
            required>
            </Comment.Actions>
            <Form reply 
            placeholder="Note content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}>
            <Form.TextArea />
            <Button
                content='Add Note'
                labelPosition='center'
                icon='edit'
                primary
                type="submit"
                onClick
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



);
}


export default ActivityPage;