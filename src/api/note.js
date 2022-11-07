import apiUrl from '../apiConfig'
import axios from 'axios'



//create note
//data returned: res.data.activity is the activity to which the note has been appended
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
//nothing returned
export const updateNote = (user, updatesToNote, activityId, noteId) => {
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

//delete a note
//nothing returned 
export const deleteNote = (user, activityId, noteId) => {
	return axios({
		method: 'DELETE',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
		url: `${apiUrl}/notes/${activityId}/${noteId}`
	})
}