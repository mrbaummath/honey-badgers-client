import React from 'react'
import {  Container, Image, Form, Checkbox } from 'semantic-ui-react'
import imgSrc from '../shared/ImgSrc'


const AvatarSelection = ({avatar, setAvatar}) => {
   
//   const [open, setOpen] = React.useState(false)
  const avatars = imgSrc.avatarImages 
  


  return (
    <>
    <Form.Group inline floated='left'> 

      <Container fluid >        
        <Form.Field >
        <b><Image size='mini' src={avatars.badger}  wrapped /></b>
          <Checkbox
            radio
            label='Badger'
            name='checkbox'
            value= {avatars.badger}
            checked={avatar === avatars.badger}
            onChange={(e, data) => setAvatar(data.value)}
            />
          </Form.Field>
      </Container>
      <Container fluid>
        <Form.Field >
        <b><Image size='mini' src={avatars.giraffe} wrapped /></b>
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
      <Form.Field >
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
        <Form.Field >
        <b><Image size='mini' src={avatars.raccoon}  wrapped /></b>
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



