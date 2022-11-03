import LoginPage from "./LoginPage/LoginPage"



const Home = ( {user, msgAlert, setUser, ...props }) => {

	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>


			<h2>Welcome to HoneyBadges</h2> 


			< LoginPage setUser={setUser} msgAlert={msgAlert}/>
			
			
			

		</>
	)
}

export default Home
