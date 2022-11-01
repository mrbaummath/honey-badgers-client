import React, {useState} from 'react'
import { Modal } from 'semantic-ui-react'
import ActivityForm from '../shared/ActivityForm'
import { updateActivity } from '../../api/activity'

const UpdateActivity = (props) => {
    const {
        user, show, handleClose,
        msgAlert, triggerRefresh
    } = props

    const [activity, setActivity] = useState(props.activity)

    const handleChange = (e) => {
        setActivity(prevActivity => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            } 

            if (updatedName === 'private' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'private' && !e.target.checked) {
                updatedValue = false
            }

            const updatedActivity = { [updatedName]: updatedValue }

            return { ...prevActivity, ...updatedActivity }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updateActivity(activity, user, props.activity._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Activity',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Activity Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <ActivityForm 
                        activity={activity}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        heading="Update Activity"
                    />
                </Modal.Body>
            </Modal>
    )
}

export default UpdateActivity

