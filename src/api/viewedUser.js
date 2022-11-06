import apiUrl from '../apiConfig'
import axios from 'axios'

//function to get a user's information from db.
//returns res.data.user (has email)
const getViewedUserInfo = (currentUser, viewedUserId) => {
    return axios({
        method:'GET',
        headers: {
            Authorization: `Token token=${currentUser.token}`
        },
        url: `${apiUrl}/user-public-page/${viewedUserId}`

   })
}

export default getViewedUserInfo 