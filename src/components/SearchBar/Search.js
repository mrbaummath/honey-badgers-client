// import _ from 'lodash'
// import React,{ useReducer, useEffect, useRef } from 'react'
// import { Search, Grid, Header, Segment } from 'semantic-ui-react'
// import { getAllActivities } from '../../api/activity' 
// import messages from '../shared/AutoDismissAlert/messages'



// const source = _.times(5, () => ({
//   activity: '',
// }))

// const initialState = {
//   loading: false,
//   results: [],
//   value: '',
// }

// function Reducer(state, props) {
//   switch (props.type) {
//     case 'CLEAN_QUERY':
//       return initialState
//     case 'START_SEARCH':
//       return { ...state, loading: true, value: props.query }
//     case 'FINISH_SEARCH':
//       return { ...state, loading: false, results: props.results }
//     case 'UPDATE_SELECTION':
//       return { ...state, value: props.selection }

//     default:
//       throw new Error()
//   }
// }

// function SearchBar(props) {
// const activities = props.activities
// const user = props.activity
// const msgAlert = props.msgAlert


//   const [state, dispatch] = React.useReducer(Reducer, initialState)
//   const { loading, results, value } = state

//   useEffect(() => {
//     getAllActivities(user, activities)
//       .then((res) => {
//           dispatch(res.data.activities)
//       })
//       .catch((error) => {
//           msgAlert({
//               heading: 'Failure',
//               message: 'Index Activities failed' + error,
//               variant: 'danger'
//           })
//       })
//   },[])

//   const timeoutRef = React.useRef()
//   const handleSearchChange = React.useCallback((e, props) => {
//     clearTimeout(timeoutRef.current)
//     dispatch({ type: 'START_SEARCH', query: props.activity })

//     timeoutRef.current = setTimeout(() => {
//       if (props.value.length === 0) {
//         dispatch({ type: 'CLEAN_QUERY' })
//         return
//       }

//       const re = new RegExp(_.escapeRegExp(props.activity), 'i')
//       const isMatch = (result) => re.test(result.activity)

//       dispatch({
//         type: 'FINISH_SEARCH',
//         results: _.filter(source, isMatch),
//       })
//     }, 300)
//   }, [])
//   React.useEffect(() => {
//     return () => {
//       clearTimeout(timeoutRef.current)
//     }
//   }, [])

//   return (
//     <Grid>
//       <Grid.Column width={6}>
//         <Search
//           loading={loading}
//           placeholder='Search...'
//           onResultSelect={(e, props) =>
//             dispatch({ type: 'UPDATE_SELECTION', selection: props.result.activity })
//           }
//           onSearchChange={handleSearchChange}
//           results={results}
//           value={value}
//         />
//       </Grid.Column>

//       <Grid.Column width={10}>
//         <Segment>
//           <Header>State</Header>
//           <pre style={{ overflowX: 'auto' }}>
//             {JSON.stringify({ loading, results, value }, null, 2)}
//           </pre>
//           <Header>Options</Header>
//           <pre style={{ overflowX: 'auto' }}>
//             {JSON.stringify(source, null, 2)}
//           </pre>
//         </Segment>
//       </Grid.Column>
//     </Grid>
//   )
// }

// export default SearchBar
// // import React, { Component } from "react";
// // import { render } from "react-dom";
// // import { Search } from "semantic-ui-react";

// // const results = [
// //   {
// //     name: "John",
// //     age: 14
// //   },
// //   {
// //     name: "Mary",
// //     age: 92
// //   }
// // ];
// // const Search = ({name, age}) => {


// //     const resRender = ({ name, age }) => (
// //       <span key="name">
// //         {name} is {age} yo
// //       </span>
// //     );
// //     return (
// //       <Searchbar
// //         fluid
// //         icon="search"
// //         placeholder="Search..."
// //         results={results}
// //         resultRenderer={resRender}
// //       />
// //     );
// //   }}


// // export default Search
