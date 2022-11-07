import React, { useEffect, useState } from "react";
import { Icon, Item, Button, Grid, Comment, Form, Modal, Search, Header, Segment, Label } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingPage'
import ActivityFeedSegment from '../activities/ActivityFeedSegment'

const ActivityFeed = ({ currentUser, msgAlert, publicActivities}) => {
    const activitiesJSX = publicActivities ? 
        publicActivities.slice(0).reverse().filter((activity, idx) => idx < 40).map((activity) => (
            <ActivityFeedSegment key={activity.id} activity={activity} user={currentUser} msgAlert={msgAlert} mine={currentUser._id === activity.owner._id} />
  ))
  :
  <LoadingScreen />

    return (
        <div>
            <Segment
                color='yellow'
                inverted
            >
                <Segment raised textAlign='center'>
                <h1>Activity Feed</h1>
                {activitiesJSX} 
            
                </Segment>

            </Segment>

        </div>
    )
}

export default ActivityFeed