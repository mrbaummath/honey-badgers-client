import React, { useEffect, useState } from "react"
import { Label, Icon, Item, Button, Segment, Grid, Comment, Form, Modal, Progress, Divider } from 'semantic-ui-react'
import { useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getActivity, updateActivity, deleteActivity } from '../../api/activity'
import UpdateActivityModal from "./UpdateActivityModal"
import ActivityForm from "../shared/ActivityForm"
import LoadingScreen from "../shared/LoadingPage"
import NoteForm from "../shared/NoteForm"
import CreateNote from "../notes/CreateNote"
import ShowNote from "../notes/ShowNote"



const ShowActivity = ({ user, msgAlert }) => {
    const [activity, setActivity] = useState({})
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [percent, setPercent] = useState(null)
    const [percentChangeSaving, setPercentChangeSaving] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
   

    const { activityId } = useParams()
    // const navigate = useNavigate()

    useEffect(() => {
      console.log('change to updated')
      getActivity(user, activityId)
        .then((res) => {
            setActivity(res.data.activity)
            setPercent(res.data.activity.progress)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Activities failed' + error,
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
              message: 'Deleting an Activity',
              variant: 'success'
          })
      })
      .then(() => {
        navigate(`/feed-page/${user._id}`)
      })
      .catch((error) => {
          msgAlert({
              heading: 'Failure',
              message: 'Deleting a Activity Failure' + error,
              variant: 'danger'
          })
      })
  }

  const increaseProgress = (e) => {
    setPercent(prevPercent => {
        if (prevPercent >= 100) {
            msgAlert({
                heading:'Whoa There!',
                message: "You're already done!",
                variant: 'success'
            })
            return prevPercent
        } else {
            return Math.min(100, (prevPercent + 20))
        }
    })  
}

  const decreaseProgress = (e) => {
      setPercent(prevPercent => {
          if (prevPercent <= 0) {
              msgAlert({
                  heading:'Hey now',
                  message: "You can't do less than nothing! ",
                  variant: 'success'
              })
              return prevPercent
          } else {
              return Math.max(0, (prevPercent - 20))
          }
      })  
  }

const handleSaveProgress = (e) => {
    //set percentChangeSaving to true so that save button will show as loading
    setPercentChangeSaving(true)
    //make axios call
    activity.progress = percent
    updateActivity(user, activity, activity.id )
        //set 'saving' state to false so save button is no longer loading
        .then(() => {
          setPercentChangeSaving(false)
          setShowSaveButton(false)
        })
        .catch(error => {
            msgAlert({
                heading:'Something went wrong',
                message: "Update progress failed " + error,
                variant: 'danger'
            })
        })
}

//function to determine whether to show save button or not 
useEffect (()=> {
    setShowSaveButton((percent != activity.progress))
}, [percent])

// let noteCards
//     if (activity) {
//         if (activity.notes.length > 0) {
//             noteCards = activity.notes.map(note => (
//                 <ShowNote
//                     key={note._id}
//                     note={note}
//                     activity={activity}
//                     user={user}
//                     msgAlert={msgAlert}
//                     triggerRefresh={() => setUpdated(prev => !prev)}
//                 />
//             ))
//         }
//     }


// if (deleted) navigate('/activities')
// const allActivitiesJSX = allActivities.map(activity => {

  if (!activity) {
    return (
      <LoadingScreen />
    )
  }

  return(
    <>  
      <Segment    
          inverted color='yellow'
          verticalAlign='middle' 
          id="segment"
          
          // key={ activities.id }
      >
        <Segment>
          <Grid columns={2}>
            <Grid.Column verticalAlign="middle">
              <h2>activity: {activity.activity} </h2>
            </Grid.Column>
            <Grid.Column verticalAlign="middle"
              centered>
              <Progress 
                percent={percent} 
                indicating 
                verticalAlign='middle'
                centered
              />
                { 
                user && activity.owner && user._id == activity.owner._id
                ? 
                <>
                <Button onClick={decreaseProgress}  negative circular icon='minus'/>
                <Button onClick={increaseProgress} positive circular icon='plus'/>
                {
                    showSaveButton ?
                    <>
                        <Divider hidden />
                        <Button onClick={handleSaveProgress} loading={percentChangeSaving}>Save</Button>
                    </>
                    :
                    null
                }
                </>
                :
                null
                } 
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <h2>type: {activity.type}</h2>
          <h2>accessibility: {activity.accessibility} </h2> 
          <h2>participants: {activity.participants}</h2>
          <h2>price: {activity.price}</h2> 
        </Segment>
        <Grid 
          padded 
          centered
          columns={3}
        >
          <Grid.Row>
            <Grid.Column  textAlign='middle'>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button size='large' variant="warning">Notes</Button>
              }
            >
					<Modal.Content>
            <Segment  
              padded='very'  
              inverted color='yellow' 
              verticalAlign='middle' 
              id="segment"
            >
                <CreateNote user={user} msgAlert={msgAlert} />
            </ Segment>
               <Grid 
                  centered
                >
                  <Comment>
                      <Comment.Avatar as='a' src='https://imgur.com/uEW4fPX.png' style={{width: '20px', height: '20px'}} />
                        <Comment.Content>
                          <Comment.Author 
                            as='a'>Matt
                          </Comment.Author>
                          <Comment.Metadata>
                            <span>Today at 5:42PM</span>
                          </Comment.Metadata>
                          <Comment.Text>
                            How artistic!
                          </Comment.Text>
                        </Comment.Content>
                  </Comment>
                </Grid>
            <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>
                Go Back
              </Button>
            </Modal.Actions>
					</Modal.Content>
        		</Modal>
              {/* <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Button size='large' variant="warning">Notes</Button>
                  }
              >
                  <Modal.Header>Notes</Modal.Header>
                  <Modal.Content>
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
                      < NoteForm 
                        note={ note }
                        handleChange={ handleChange }
                        heading="Create a new Note!"
                        handleSubmit={ handleSubmit }
                      />
                      <Segment 
                        textAlign = 'centered'
                      >
                        <Grid 
                          centered
                        >
                          { noteCards }
                          <Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                              <Comment.Author 
                                as='a'>Matt
                              </Comment.Author>
                              <Comment.Metadata>
                                <span>Today at 5:42PM</span>
                              </Comment.Metadata>
                              <Comment.Text>
                                How artistic!
                              </Comment.Text>
                              <Comment.Actions>
                                <a>Reply</a>
                              </Comment.Actions>
                            </Comment.Content>
                          </Comment>
                        </Grid>
                      </Segment>
                    </Segment>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                      Go Back
                    </Button>
                    <Button
                      content='Add Note'
                      labelPosition='right'
                      icon='edit'
                      primary
                      type="submit"
                    />
                  </Modal.Actions>
              </Modal> */}
            </Grid.Column>
            <Grid.Column textAlign='middle'>
                  <UpdateActivityModal 
                    activity={activity}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={()=>setUpdated(prev=>!prev)}
                    />
                    

          
            </Grid.Column>
            <Grid.Column  textAlign='middle'>
              
              
              <Button onClick={() => handleDeleteActivity()} >Delete</Button>
                
             
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  )
}

{/* <Link to={`/activities/`} >
                 

//     const show = allActivities.map(activities => (

//         <Grid.Row padded>
//             <Segment     
//           verticalAlign='middle' 
//           id="segment"
//       >
//  {/* <div class="buttonActivityPage"> */}
// <Grid columns={3}>
//  <Grid.Column>
//         <Button size='large'>Mark as Complete</Button>
// </Grid.Column>
//         {/* Notes Modal Button */}
        
// <Grid.Column>
        
// </Grid.Column>

// <Grid.Column>
//         <Button size='large' onClick={() => setUpdated(true)} variant="warning">Edit</Button>
// </Grid.Column>

// <Grid.Column>
//         <Button size='large' onClick={() => handleDeleteActivity()} >Delete</Button>
// </Grid.Column> 
// </Grid> 
    
//  </Segment>
//         </Grid.Row>
//         <Grid.Row >

// 
//             <Form reply 
//             placeholder="Note content"
//             value='noteContent'
//             >
//             <Form.TextArea />
//             <Button
//                 content='Add Note'
//                 labelPosition='center'
//                 icon='edit'
//                 primary
//                 type="submit"
//             />
//             </Form>
//             </Segment>
//             <Segment>
//             
//     <Header as='h3' dividing>
//       Comments
//     </Header>
      
      // <>
      // {show}
      // </>


export default ShowActivity