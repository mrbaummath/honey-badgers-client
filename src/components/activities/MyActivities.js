import ActivitySegment from "./ActivitySegment"
import LoadingScreen from "../shared/LoadingPage"


const MyActivities = ({allMyActivities, msgAlert, user}) => {


    const myActivitiesJSX = allMyActivities ? 
    allMyActivities.map((activity) => (
            <ActivitySegment 
            key={activity.id} 
            activity={activity} 
            user={user} 
            msgAlert={msgAlert} 
            mine={true} 
            />
        ))
        :
        <LoadingScreen />

    return(
        <>
            {myActivitiesJSX}
        </>
    )
}

export default MyActivities