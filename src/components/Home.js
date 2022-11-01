import ActivityPage from "./ActivityPage/ActivityPage"


import HomeFeed from "./HomeFeed/HomeFeed"
import LoginPage from "./LoginPage/LoginPage"
import NotesApp from "./Notes/NoteApp"
import IndexActivity from "./ActivityPage/IndexActivity"


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
