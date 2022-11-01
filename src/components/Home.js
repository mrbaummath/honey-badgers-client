import ShowActivity from "./activities/ShowActivity"


import HomeFeed from "./HomeFeed/HomeFeed"
import LoginPage from "./LoginPage/LoginPage"

import IndexActivity from "./activities/IndexActivity"


const Home = ( {user, ...props }) => {

	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>

			<h2>Welcome to HoneyBadges</h2> 

			{/* < LoginPage /> */}
			< LoginPage />

		</>
	)
}

export default Home
