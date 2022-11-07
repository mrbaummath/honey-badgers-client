import React, { useEffect, useState } from "react"
import { List, Modal, Button } from "semantic-ui-react"
import { getActivity } from "../../api/activity"
import LoadingScreen from "../shared/LoadingPage"
import Note from "./Note"

const NotesModal = ({activity, user, msgAlert}) => {

    const [open, setOpen] = useState(false)
    const [notes, setNotes] =useState(null)
    const [anUpdate, setAnUpdate] = useState(false)

    //grab notes for activity
    useEffect(()=> {
        if (open) {
        getActivity(user, activity.id)
            .then(res => setNotes(res.data.activity.notes))
            .catch(error => {
                msgAlert({
                    heading: 'Error',
                    message: 'Could not get notes',
                    variant: 'danger'
                })
            })
        }
    }, [open, anUpdate])
    
    let modalContent
    if (!notes) {
        modalContent = <LoadingScreen />
    } else if (notes.length === 0) {
        modalContent = <p>There are no notes for this activity</p>
    } else {
        modalContent = 
        <List>
            {notes.map(note => (
                <Note key={note._id} user={user} activity={activity} note={note} triggerRefresh={()=>setAnUpdate(prev =>!prev)} msgAlert={msgAlert} />
            ))}
        </List>
    }
    
    
    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Notes</Button>}
            size='large'
        >
            <Modal.Header>Notes for {activity.activity}</Modal.Header>
            <Modal.Content scrolling>
                {modalContent}
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )


}

export default NotesModal