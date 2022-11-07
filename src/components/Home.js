import IndexActivity from "./activities/IndexActivity"
import LoginPage from "./LoginPage/LoginPage"



const Home = ( { msgAlert, setUser}) => {


	return (
		<>
			< LoginPage setUser={setUser} msgAlert={msgAlert}/>
			
		</>
	)
}

export default Home
