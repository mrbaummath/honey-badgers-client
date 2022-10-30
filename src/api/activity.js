import apiUrl from '../apiConfig'
import axios from 'axios'

//get all activities (unless marked private)
export const getAllActivities = () => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/activities`
    })
}

//get the logged-in user's activities
export const getMyActivities = (user) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/activities/mine`
    })
}

//get a user's public activities
export const getTheirActivities = (currentUser, requestedUserId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token token=${currentUser.token}`
        },
        url: `${apiUrl}/activities/user/${requestedUserId}`
    })
}

//get a single activity 
export const getActivity = (user, activityId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/activities//${activityId}`
    })
}
//create an activity 
export const createActivity = (user, newActivity) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/activities`,
        data: {
            activity: newActivity
        }
    })
}

//update an activity
export const updateActivity = (user, updatesToActivity, activityId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/activities/${activityId}`,
		data: {
			activity: updatesToActivity
		}
	})
}

//delete an activity
export const deleteActivity = (user, activityId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/activities/${activityId}`
	})
}

