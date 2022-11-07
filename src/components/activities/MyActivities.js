import ActivitySegment from "./ActivitySegment"
import LoadingScreen from "../shared/LoadingPage"
import { Container } from "semantic-ui-react"


const MyActivities = ({allMyActivities, msgAlert, user, setCompletedCounts,completedCounts,setBadgeUpdate, addActivity}) => {


    const myActivitiesJSX = allMyActivities ? 
    allMyActivities.map((activity) => (
            <ActivitySegment 
            key={activity.id} 
            activity={activity} 
            user={user} 
            msgAlert={msgAlert} 
            mine={true} 
            setCompletedCounts={setCompletedCounts}
            completedCounts={completedCounts}
            setBadgeUpdate={setBadgeUpdate}
            addActivity={(type)=>addActivity(type)}
            />
        ))
        :
        <LoadingScreen />

    return(
        <div className='scrolling-group'>
            {myActivitiesJSX}
        </div>
    )
}

export default MyActivities