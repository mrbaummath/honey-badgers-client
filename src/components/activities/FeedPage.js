import { useNavigate, useParams } from 'react-router-dom'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { getTheirActivities } from '../../api/activity'
import ActivityFeedSegment from '../activities/ActivityFeedSegment'
import { getAllActivities } from '../../api/activity'
import LoadingScreen from '../shared/LoadingPage'
import ActivityFeed from './ActivityFeed'


const FeedPage  = ({currentUser, msgAlert}) => {

  const [publicActivities, setPublicActivities] = useState(null)

  
      //after initial render, make axios call to grab activities. The backend route used here only returns acitivites not marked as private
      useEffect(() => {
      getAllActivities()
          .then(res => {
              setPublicActivities(res.data.activities.filter(activity => activity.owner))
          })
          .catch((error) => {
            msgAlert({
                'heading': 'Error',
                'message': 'Could not get Activities',
                'variant': 'danger'
            })
          })
  },[])
  
  return(
    <ActivityFeed currentUser={currentUser} msgAlert={msgAlert} publicActivities={publicActivities} />   
	)
}

export default FeedPage