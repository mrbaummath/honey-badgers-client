import apiUrl from '../apiConfig'
import axios from 'axios'

//function to get a user's information from db.
//returns res.data.user (has email)
export const getUserInfo = (currentUser, userId) => {
    return axios({
        method:'GET',
        headers: {
            Authorization: `Token token=${currentUser.token}`
        },
        url: `${apiUrl}/user/${userId}`

   })
}

export const createBuddy = (user, buddyId) => {
	return axios({
		url: `${apiUrl}/user/addbuddy`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			buddyId:  buddyId
		}
	})
}

export const deleteBuddy = (user, buddyId) => {
    return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token token=${user.token}`
		},
		url: `${apiUrl}/user/removebuddy`,
        data: {
            buddyId:buddyId
        }

	})
}

export const getMyBuddies = (user) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/user/buddies`
    })
}