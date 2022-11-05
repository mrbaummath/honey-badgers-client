import React, { useState, useEffect } from 'react'
import { Modal, Header } from 'semantic-ui-react'
import ActivityForm from '../shared/ActivityForm'



const NewBadgeModal = (props) => {
    const {badgeUpdate} = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen((badgeUpdate.change != 'none'))
    },[badgeUpdate])

    return(
        <Modal
            closeIcon
            onClose={() => {
                setOpen(false)
            }}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>Change</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>There was a change in your badge status</Header>
                    <p>This is the change</p>
                </Modal.Description>
            </Modal.Content>
      </Modal>
    )
}

export default NewBadgeModal