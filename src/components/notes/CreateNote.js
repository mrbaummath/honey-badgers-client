import React, { useState } from 'react'
import { createNote } from '../../api/note'
import { Modal } from 'semantic-ui-react'

import NoteForm from '../shared/NoteForm'


const CreateNote = ({ user, activity, handleClose, msgAlert, triggerRefresh }) => {

    const defaultNote = {
        text: '',
        private: false
    }

    const [note, setNote] = useState({defaultNote})
    const [noteModalShow, setNoteModalShow] = useState(false)

    const handleChange = (e) => {
        setNote(prevNote => {
            const name = e.target.name
            let value = e.target.value

            //handle the checkbox
            if (name === 'private' && e.target.checked) {
                value = true
            } else if (name === 'private' && !e.target.checked) {
                value = false
            }

            const updatedNote = { [name]: value }

            return {
                ...prevNote, ...updatedNote
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createNote(user, activity._id, note)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Nice!',
                    message: 'Your note has been submitted',
                    variant: 'success'
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
            show={ noteModalShow }
            note={ note }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading='Leave a note!'
            handleClose={() => setNoteModalShow (false)}
        />
    )
}

export default CreateNote