import React, { useState } from 'react'
import { createNote } from '../../api/note'
import { Modal } from 'semantic-ui-react'

import NoteForm from '../shared/NoteForm'


const CreateNote = ({ user, activity, msgAlert, triggerRefresh, setNoteModalShow }) => {

    const defaultNote = {
        text: '',
        private: false
    }

    const [note, setNote] = useState(defaultNote)
    

    const handleChange = (e, target) => {
        setNote(prevNote => {
            let { name, value } = target
            
            //handle the checkbox
            if (name === 'private' && target.checked) {
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
            .then(() => {
                setNoteModalShow(false)
                triggerRefresh()
                msgAlert({
                    heading: 'Nice!',
                    message: 'Your note has been submitted',
                    variant: 'success'
                })
            })
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
            note={ note }
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading='Leave a note!'
        />
    )
}

export default CreateNote