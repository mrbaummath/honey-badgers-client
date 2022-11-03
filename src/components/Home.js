import ShowActivity from "./activities/ShowActivity"


// import HomeFeed from "./HomeFeed/HomeFeed"
import LoginPage from "./LoginPage/LoginPage"

import IndexActivity from "./activities/IndexActivity"


const Home = ( {user, msgAlert, setUser, ...props }) => {

	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>


			<h2>Welcome to HoneyBadges</h2> 


			< LoginPage />
			{/* < ShowActivity msgAlert={msgAlert} setUser={setUser} user={user}/> */}
			

		</>
	)
}

export default Home
