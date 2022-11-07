import { useNavigate } from "react-router-dom"
import {List, Image, Icon} from "semantic-ui-react"
import { deleteNote } from "../../api/note"

const Note = ({note, user, activity, triggerRefresh, msgAlert}) => {

    const noteOwner = note.owner
    const activityOwnerId = activity.owner._id
    const userId = user._id
    const navigate = useNavigate()

    const handle = noteOwner.username ? noteOwner.username : noteOwner.email

   const handleDelete = (e) => {
    deleteNote(user, activity._id, note._id)
        .then(()=>triggerRefresh())
        .catch((error) => {
            msgAlert({
                heading:'Error',
                message: 'Could note delete' + error,
                variant: 'danger'
            })
        })
   }

   const showDeleteIcon = (noteOwner._id === user._id || activityOwnerId === user._id)

    return (
        <List.Item>
            {noteOwner.avatar && <Image avatar src={noteOwner.avatar} />}
            <List.Content>
                <List.Header
                    as='a'
                    onClick={() => navigate(`/user-public-page/${noteOwner._id}`)}>{handle}
                </List.Header>
                <List.Description padded>
                   <p>
                    {note.text}
                    { showDeleteIcon && <Icon link onClick={handleDelete} name='dont' color='red'
                        /> }
                        
            
                    </p> 
                </List.Description>

            </List.Content>

            </List.Item>
    )
}

export default Note