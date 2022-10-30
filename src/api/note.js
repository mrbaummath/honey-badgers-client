import apiUrl from '../apiConfig'
import axios from 'axios'



//create note
export const createNote = (user, activityId, newNote) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        url: `${apiUrl}/notes/${activityId}`,
        data: {
            note: newNote
        }
    })
}

//update a note
export const updateActivity = (user, updatesToNote, activityId, noteId) => {
	return axios({
		method: 'PATCH',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/notes/${activityId}/${noteId}`,
		data: {
			note: updatesToNote
		}
	})
}

//delete an activity
export const deleteActivity = (user, activityId, noteId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/notes/${activityId}/${noteId}`
	})
}