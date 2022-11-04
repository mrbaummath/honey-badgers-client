import React, { useState } from 'react'
import { createNote } from '../../api/note'


const CreateNote = ({ user, activity, handleClose, msgAlert, triggerRefresh }) => {

    const defaultNote = {
        text: '',
        private: false
    }

    const [note, setNote] = useState(defaultNote)

    const handleChange = (e) => {
        setNote(prevNote => {
            const { name, value } = target
            const updatedName = name
            let updatedValue = value

            //handle the checkbox
            if (updatedName === 'private' && target.checked) {
                updatedValue = true
            } else if (updatedName === 'private' && !target.checked) {
                updatedValue = false
            }

            const updatedNote = { [name]: value }

            return {
                ...prevNote, ...updatedNote
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createNote(user, activity._id, activity)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: 'Your note has been submitted',
                    varuant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Whoops!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <NoteForm
            activity= {activity}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Leave a note!'
        />
    )
}

export default CreateNote