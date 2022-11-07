import { useNavigate, useParams } from 'react-router-dom'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { getTheirActivities } from '../../api/activity'
import ActivityFeedSegment from '../activities/ActivityFeedSegment'
import { getAllActivities } from '../../api/activity'
import LoadingScreen from '../shared/LoadingPage'


const FeedPage  = ({currentUser, msgAlert, mine}) => {

      //grab requested user's id from params
      const { otherUserId } = useParams()

      //piece of state for badges modal --> should be abstracte into it's own component
      const [open, setOpen] = React.useState(false)

  const [publicActivities, setPublicActivities] = useState(null)
  const [completedCounts, setCompletedCounts] = useState({})
  

  const activitiesJSX = publicActivities ? 
  publicActivities.map((activity) => (
      <ActivityFeedSegment key={activity.id} activity={activity} user={currentUser} msgAlert={msgAlert} mine={false} />
  ))
  :
  <LoadingScreen />


      //after initial render, make axios call to grab activity/count data and set the state variables 
      useEffect(() => {
      getAllActivities()
          .then(res => {
              setPublicActivities(res.data.activities.filter(activity => activity.owner))
              setCompletedCounts(res.data.completedCounts)
              //set badges when that virtual is done
          })
          .catch(error => {
            msgAlert({
              'heading': 'Error',
              'message': 'Could not get activities',
              'variant': 'danger'
            })
          })
  },[])
 
    return(
      <>
  <div>
    <Segment
      color='yellow'
      inverted
    >
      <Segment raised textAlign='center'>
      <h1>Activity Feed</h1>
      <h2>sdfsdf</h2>
          {activitiesJSX} 
          
      </Segment>

    </Segment>

  </div>


  

	</>	
	)
}

export default FeedPage