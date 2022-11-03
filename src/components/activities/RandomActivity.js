import React, { useState } from 'react'

import { randomActivity } from '../../api/activity'
import ActivityForm from '../shared/ActivityForm'


const RandomActivity = ({ user, msgAlert }) => {
    const defaultActivity = {
                activity: '',
                type: '',
                accessibility: '',
                participants: '',
                price: '',
                progress: 0,
                private: false
            }
    
    const [activity, setActivity] = useState(defaultActivity)

    // const handleChange = (e , target) => {
        
        //         setActivity(prevActivity => {
                   
        //             const { name, value } = target
        //             const updatedName = name
        //             let updatedValue = value
        //             // handle number type
        //             if(target.type === 'number') {
        //                 // change from string to actual number
        //                 updatedValue = parseInt(e.target.value)
        //             }
    
    const handleRandomActivity = (e) => {
        
        e.preventDefault()

        randomActivity(user, activity)

        .then(res => res.json())
        .then(jsonData => {
            setActivity({
                activity: jsonData
            })
            console.log(jsonData,'~~~~~~~~~')
        })

    }
    
    return(
        <ActivityForm
        activity={ activity }
        // handleChange= { handleChange }
        handleActivity= {handleRandomActivity}

    />
    )
}



// const RandomActivity = ({ user, msgAlert, triggerRefresh }) => {
//     const defaultActivity = {
//         activity: '',
//         type: '',
//         accessibility: '',
//         participants: '',
//         price: '',
//         progress: 0,
//         private: false
//     }


//     const [activity, setActivity] = useState(defaultActivity)

//     const handleChange = (e , target) => {
        
//         setActivity(prevActivity => {
           
//             const { name, value } = target
//             const updatedName = name
//             let updatedValue = value
//             // handle number type
//             if(target.type === 'number') {
//                 // change from string to actual number
//                 updatedValue = parseInt(e.target.value)
//             }

//             const updatedActivity = { [updatedName]: updatedValue }

//             // const updatedActivity = {  
//             //     activity: activity.activity,
//             //     accessibility: activity.accessibility,
//             //     type: activity.type,
//             //     participants: activity.participants,
//             //     price: activity.price
//             // }

//             return { ...prevActivity, ...updatedActivity}
//         })
//     }
//     const handleRandomActivity = (e) => {
//         e.preventDefault()

//         randomActivity(user, activity)
//         .then(res => {
//             const random = res.data
//             setActivity({
//                 activity: random.activity,
//                 type: random.type,
//                 accessibility: random.accessibility,
//                 participants: random.participants,
//                 price: random.price,
//             })
//         })
//         .then(() => {
           
//             msgAlert({
//                 heading: 'Success',
//                 message: 'Created Activity',
//                 variant: 'success'
//             })
//         })
//         .then(() => triggerRefresh())
//         .catch((error) => {
//             msgAlert({
//                 heading: 'Failure',
//                 message: 'Create Activity Failure' + error,
//                 variant: 'danger'
//             })
//         })
//     } 

//     return (
//         <ActivityForm
//             activity={ activity }
//             handleChange= { handleChange }
//             handleSubmit= {handleRandomActivity}
//         />
//     )
// }

export default RandomActivity
