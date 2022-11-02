import ShowActivity from "./activities/ShowActivity"


import HomeFeed from "./HomeFeed/HomeFeed"
import LoginPage from "./LoginPage/LoginPage"

import IndexActivity from "./activities/IndexActivity"


const Home = ( {user, ...props }) => {

	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>

			
			< LoginPage />

		</>
	)
}

export default Home
