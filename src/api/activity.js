import apiUrl from '../apiConfig'
import axios from 'axios'

//get all activities

//get the logged-in user's activities
export const indexMine = (user) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/activities/mine`
    })
}