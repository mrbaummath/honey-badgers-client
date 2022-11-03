import IndexActivity from "./activities/IndexActivity"
import LoginPage from "./LoginPage/LoginPage"



const Home = ( {user, msgAlert, setUser, ...props }) => {

	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>


			<h2>Welcome to HoneyBadges</h2> 


			< LoginPage setUser={setUser} msgAlert={msgAlert}/>
			< IndexActivity setUser={setUser} user={user} msgAlert={msgAlert}/>
			
			
			

		</>
	)
}

export default Home
