import React, { useState } from 'react'
import { Modal, Header } from 'semantic-ui-react'
import ActivityForm from '../shared/ActivityForm'



const NewBadgeModal = (props) => {
    const {badge, setNewBadge} = props
    const open = props.showNewBadgeModal
    const setOpen = props.setShowNewBadgeModal
    return(
        <Modal
            closeIcon
            onClose={() => {
                setOpen(false)
                setNewBadge(prev => !prev)
            }}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>Congratulations!!!</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>You've Earned a New Honey Badge!</Header>
                    <p>You are a {badge.level} in {badge.name}</p>
                </Modal.Description>
            </Modal.Content>
      </Modal>
    )
}

export default NewBadgeModal