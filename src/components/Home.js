import HomeFeed from "./HomeFeed/HomeFeed"
import LoginPage from "./LoginPage/LoginPage"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>

			<h2>Welcome to HoneyBadges</h2>
			{/* < HomeFeed /> */}
			< LoginPage />
		</>
	)
}

export default Home
