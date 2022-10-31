import apiUrl from '../apiConfig'
import axios from 'axios'


// USING API FOR HOME PAGE FEED!
export const HomeFeed = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/'
	})
}