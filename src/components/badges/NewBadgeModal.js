import React, { useState, useEffect } from 'react'
import { Modal, Header } from 'semantic-ui-react'




const NewBadgeModal = (props) => {
    const {badgeUpdate} = props
    const [open, setOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState(null) 

    useEffect(() => {
        if (badgeUpdate) {
            if (badgeUpdate.change) {
                setOpen((badgeUpdate.change != 'none'))
            }
            if (badgeUpdate.change === 'lost') {
                setModalMessage({
                    'heading': "Badge Lost",
                    'description': "Keep at it!",
                    'content': `You lost your ${badgeUpdate.type} badge but you'll earn it back as soon as you complete enough activities`
                })
            } else if (badgeUpdate.change === 'up' && badgeUpdate.level === 'novice') {
                setModalMessage({
                    'heading': "A Brand New Badge!",
                    'description': `You've completed enough ${badgeUpdate.type} activities to earn a new badge.`,
                    'content': `Congratulations, you are now a ${badgeUpdate.level} in ${badgeUpdate.type}`
                })
            } else if (badgeUpdate.change === 'up' && badgeUpdate.level !== 'novice') {
                setModalMessage({
                    'heading': "Upgraded!",
                    'description': `You've completed enough ${badgeUpdate.type} activities to earn a new badge level.`,
                    'content': `Congratulations, you are now a ${badgeUpdate.level} in ${badgeUpdate.type}`
                })
            } else if (badgeUpdate.change === 'down') {
                setModalMessage({
                    'heading': "That's OK!",
                    'description': `It's just a temporary setback `,
                    'content': `You're back to being a ${badgeUpdate.level} in ${badgeUpdate.type} but everything is a learning process. Keep at it.`
                })
            }
        }
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
            <Modal.Header>{modalMessage && modalMessage.heading}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>{modalMessage && modalMessage.description}</Header>
                    {modalMessage && <p>{modalMessage.content}</p>}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
  
}

export default NewBadgeModal