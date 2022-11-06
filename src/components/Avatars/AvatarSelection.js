import React, { useState, Component }from 'react'
import { Button, Container, Header, Image, Modal, Radio, Segment, Form, Checkbox } from 'semantic-ui-react'
import ActivityBadgeGroup from '../activities/ActivityBadgeGroup'
import imgSrc from '../shared/ImgSrc'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

const AvatarSelection = ({avatar, setAvatar}) => {
   
//   const [open, setOpen] = React.useState(false)
  const avatars = imgSrc.avatarImages 
  


  return (
    <>
    <Form.Group inline floated='left'> 

      <Container fluid >        
        <Form.Field>
        <b><Image size='mini' src={avatars.badger}  wrapped /></b>
          <Checkbox
            radio
            label='Badger'
            name='checkbox'
            value= {avatars.badger}
            checked={avatar === avatars.badger}
            onChange={(e, data) => setAvatar(data.value)}
            inline='false'
            />
          </Form.Field>
      </Container>
      <Container fluid>
        <Form.Field spaced>
        <b><Image size='mini' src={avatars.giraffe} wrapped spaced/></b>
          <Checkbox
            radio
            label='Giraffe'
            name='checkbox'
            value={avatars.giraffe}
            src={avatars.giraffe}
            checked={avatar === avatars.giraffe}
            onChange={(e, data) => setAvatar(data.value)}          />
          </Form.Field>
      </Container>
      <Container fluid>
      <Form.Field spaced>
      <b><Image size='mini' src={avatars.bear}  wrapped /></b>
        <Checkbox
          radio
          label='Bear'
          name='checkbox'
          value={avatars.bear}
          checked={avatar === avatars.bear}
          onChange={(e, data) => setAvatar(data.value)}        />
        </Form.Field>
      </Container>
      <Container fluid>
        <Form.Field spaced>
        <b><Image size='mini' src={avatars.raccoon}  wrapped spaced/></b>
          <Checkbox
            radio
            label='Raccoon'
            name='checkbox'
            value={avatars.raccoon}
            checked={avatar === avatars.raccoon}
            onChange={(e,data) => setAvatar(data.value)}        />
          </Form.Field>
        </Container>
      </Form.Group>
      </>
  )
}


export default AvatarSelection



