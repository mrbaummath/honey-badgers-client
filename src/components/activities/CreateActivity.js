import React, { useState } from 'react'
import { createActivity, randomActivity } from '../../api/activity'

import ActivityForm from '../shared/ActivityForm'

const CreateActivity = ({ user,  msgAlert, handleClose, setNewActivity }) => {

    const defaultActivity = {
        activity: '',
        type: '',
        accessibility: '',
        participants: '',
        price: '',
        progress: 0,
        private: false
    }


    const [activity, setActivity] = useState(defaultActivity)
    const [activityModalShow, setActivityModalShow] = useState(false)

    const handleChange = (e , target) => {
        setActivity(prevActivity => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value
            // handle number type
            if(target.type === 'number') {
                // change from string to actual number
                updatedValue = parseInt(e.target.value)
            }

            //handle the checkbox
            if (updatedName === 'private' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'private' && !target.checked) {
                updatedValue = false
            }

            const updatedActivity = { [updatedName]: updatedValue }

            return { ...prevActivity, ...updatedActivity}
        })
    }
    const handleCreateActivity = (e) => {
        e.preventDefault()

        createActivity(user, activity)
            .then(() => handleClose())
            .then(() => {
               
                msgAlert({
                    heading: 'Success',
                    message: 'Created Activity',
                    variant: 'success'
                })
            })
            .then(() => setNewActivity(prev => !prev))
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Activity Failure' + error,
                    variant: 'danger'
                })
            })
    }

    const handleRandomActivity = (e) => {
        
        e.preventDefault()

        randomActivity(user, activity)

        .then(jsonData => {
            setActivity((prevActivity) => {
                return { ...prevActivity, activity: jsonData.data.activity, type: jsonData.data.type, accessibility: jsonData.data.accessibility, participants: jsonData.data.participants, price: jsonData.data.price}
            } ) 
        })

    }

    return (
        <ActivityForm
            show={activityModalShow}
            activity={ activity }
            handleChange={ handleChange }
            heading="Create a new Activity!"
            handleSubmit={ handleCreateActivity }
            handleActivity= { handleRandomActivity }
            handleClose={() => setActivityModalShow(false)}
        />
    
    )
}

export default CreateActivity