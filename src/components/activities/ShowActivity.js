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
import NotesModal from "../notes/NotesModal"



const ShowActivity = ({ user, msgAlert }) => {
    const [activity, setActivity] = useState({})
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [percent, setPercent] = useState(null)
    const [percentChangeSaving, setPercentChangeSaving] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [noteModalShow, setNoteModalShow] = useState(false)
   

    const { activityId } = useParams()
    // const navigate = useNavigate()

    useEffect(() => {
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
          <Grid columns={2} padded>
            <Grid.Column verticalAlign="middle" >
              <h2>{activity.activity} </h2>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="center"
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
        <Segment inverted color='yellow' class="capitalize-me">
            <Grid centered stretched>
                <Grid.Row padded>
                    <Segment fluid>
                        <Grid columns={5}>
                            <Grid.Column>
                            {
                            activity.owner 
                            ?
                            <h3>Activity Owner: 
                                <Link to={`/user-public-page/${activity.owner._id}`}> 
                                    <h2>{activity.owner.email}</h2>
                                </Link>
                            </h3>
                            : 
                            <h3>Activity Owner: 
                                <h3>None</h3>
                            </h3>
                            }
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Category: </h3>
                                <h3>
                                    { activity.catagoryIcon
                                        ?
                                        <Icon size='large' name={activity.catagoryIcon}></Icon>
                                        :
                                        null
                                    }

                                    {activity.type}
                                </h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Accessibility: </h3>
                                <h3>{activity.accessibility}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Participants: </h3>
                                <h3>{activity.participants}</h3>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>Price: </h3>
                                <h3>{activity.price}</h3>
                            </Grid.Column>

                        </Grid>
                        
                    </Segment>
                </Grid.Row>
            </Grid>
        </Segment>
        <Grid 
          padded 
          centered
          columns={4}
        >
          <Grid.Row>
            <Grid.Column>
            <Modal
              onClose={() => setNoteModalShow(false)}
              onOpen={() => setNoteModalShow(true)}
              open={noteModalShow}
              trigger={
                <Button size='large' variant="warning">Leave a Note</Button>
              }
            >
					<Modal.Content>
            <Segment  
              padded='very'  
              inverted color='yellow' 
              verticalAlign='middle' 
              id="segment"
            >
                <CreateNote user={user} msgAlert={msgAlert} activity={activity} triggerRefresh={()=>setUpdated(prev => !prev)} setNoteModalShow={setNoteModalShow} />
            </ Segment>
            
            <Modal.Actions>
              <Button color='black' onClick={() => setNoteModalShow(false)}>
                Go Back
              </Button>
            </Modal.Actions>
					</Modal.Content>
        		</Modal>
             
            </Grid.Column>
            <Grid.Column>
              <NotesModal user={user} msgAlert={msgAlert} activity={activity} />
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