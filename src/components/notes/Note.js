import { useNavigate } from "react-router-dom"
import {List, Image} from "semantic-ui-react"

const Note = ({note, user, activity}) => {

    const noteOwner = note.owner
    const activityOwnerId = activity.owner._id
    const userId = user._id
    const navigate = useNavigate()

    const handle = noteOwner.username ? noteOwner.username : noteOwner.email

    console.log(note)

    return (
        <List.Item>
            {noteOwner.avatar && <Image avatar src={noteOwner.avatar} />}
            <List.Content>
                <List.Header
                    as='a'
                    onClick={() => navigate(`/user-public-page/${noteOwner._id}`)}>{handle}
                </List.Header>
                <List.Description padded>
                   <p>{note.text}</p> 
                </List.Description>

            </List.Content>

            </List.Item>
    )
}

export default Note