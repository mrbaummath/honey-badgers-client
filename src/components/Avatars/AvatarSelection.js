import React, { useState, Component }from 'react'
import { Button, Header, Image, Modal, Radio, Segment, Form, Checkbox } from 'semantic-ui-react'
import ActivityBadgeGroup from '../activities/ActivityBadgeGroup'
import imgSrc from '../shared/ImgSrc'
import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

const AvatarSelection = (props, event) => {
   
//   const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('this')
  const avatar = imgSrc.avatarImages 
  const { handleChange, handleSubmit, msgAlert, setUser } = props

  const [createdAvatar, setAvatar] = useState('')
  const navigate = useNavigate()

const onSignUp = (event) => {
 event.preventDefault()

      const credentials = { avatar }

  signUp(credentials)
    .then(() => signIn(credentials))
    .then((res) => setUser(res.data.user))
    .then(() =>
      msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success',
      })
    )
    .then(() => navigate('/user-page'))
    .catch((error) => {
              setAvatar('')
      msgAlert({
        heading: 'Sign Up Failed with error: ' + error.message,
        message: messages.signUpFailure,
        variant: 'danger',
      })
    })
}
  

  return (
    <>
    <Form  onSubmit= {onSignUp}>
        <Form.Field spaced>
        <b><Image size='tiny' src={avatar.badger} value={avatar}  wrapped /></b>
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Badger'
          name='checkbox'
          value='https://i.imgur.com/uEW4fPX.png'
          checked={value === 'https://i.imgur.com/uEW4fPX.png'}
          onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
        <Form.Field spaced>
        <b><Image size='tiny' src={avatar.giraffe} value={avatar} wrapped spaced/></b>
      </Form.Field>
      <Form.Field spaced>
        <Checkbox
          radio
          label='Giraffe'
          name='checkbox'
          value='https://i.imgur.com/ncojeOX.png'
          src={avatar.giraffe}
          checked={value === 'https://i.imgur.com/ncojeOX.png'}
          onChange={(e, data) => setValue(data.value)}          />
        </Form.Field>
        <Form.Field>
        <b><Image size='tiny' src={avatar.bear} value={avatar}  wrapped /></b>
      </Form.Field>
      <Form.Field spaced>
        <Checkbox
          radio
          label='Bear'
          name='checkbox'
          value='https://i.imgur.com/4fQ9L5r.png'
          checked={value === 'https://i.imgur.com/4fQ9L5r.png'}
          onChange={(e, data) => setValue(data.value)}        />
        </Form.Field>
        <Form.Field spaced>
        <b><Image size='tiny' src={avatar.raccoon} value={avatar}  wrapped spaced/></b>
      </Form.Field>
      <Form.Field spaced>
        <Checkbox
          radio
          label='Raccoon'
          name='checkbox'
          value='https://i.imgur.com/h3RxyAQ.png'
          checked={value === 'https://i.imgur.com/h3RxyAQ.png'}
          onChange={(e, data) => setValue(data.value)}        />
        </Form.Field>
         
      </Form>
      </>
  )
}


export default AvatarSelection



