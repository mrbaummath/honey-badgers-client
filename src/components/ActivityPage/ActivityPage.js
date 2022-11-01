import React from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal } from 'semantic-ui-react'

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


    {/* <Item.Content columns={1} verticalAlign='center'>
    <Item.Header as='a'>Activity Name</Item.Header>
    <Item.Meta>
      <span className='cinema'>Category: </span>
    </Item.Meta>
    <Item.Extra>
      <Button primary floated='right'>
        View Activity
      </Button>
      <Label>Hard/Medium/Easy</Label>
    </Item.Extra>
  </Item.Content> */}
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
    
{/* </div> */} </Segment>
        </Grid.Row>
     
      
  





    
    
        <Grid.Row >
     <Segment  
          padded='very'  
          inverted color='yellow' 
          verticalAlign='middle' 
          id="segment"
      >
     <Comment.Actions active>
        </Comment.Actions>
        <Form reply>
          <Form.TextArea />
          <Button
            content='Add Note'
            labelPosition='center'
            icon='edit'
            primary
          />
        </Form>
        </Segment>
       </Grid.Row>
        
    
    </Grid> 
    </Segment>
</div>



)

export default ActivityPage