## Introduction
Honey Badges is an application where users can keep a running list of tasks to complete and earn "badges" for completing multiple tasks of the same type. Together, users form a community of badge-earners who can opt to share their accomplishments and use eachother's tasks for inspiration. We hope the social aspect of creating and sharing tasks will motivate users in a positive way. At the same time, users will have the option to make specific tasks on their tasklist private. Users who need some help getting started can also choose to radnomly generate a task within specified parameters.

## General Approach
The application will consist of a backend API using Express and a client-side interface built mostly with React components. We will use MongoDB for to store data and our server will use mongoose to interact with the database. Our "task" schema follows a pattern for defining activities from the Bored API for purposes of consistency. The decision here is practical and should contribute to user experience: we want to make tasks easily searchable/filterable and hope that the user community can develop a common vocabulary for sharing/talking about their tasks and accomplishments. 

## Technologies Used
- Backend API
    - Node/Express
    - Mongoose
    - axios 
    - [Bored API](https://www.boredapi.com/documentation)

 - Data Management
    - MongoDB

- Client Application
    - React
    - axios (primarily for calls to our own backend API)


## Entity Relationships
The two main objects the app tracks are users and tasks. Users create tasks within pre-specified categories and can track their progress. 

#### Tasks
Tasks will be defined using the schema outlined in the ERD. In addition, we will implement virtuals which process completeness levels and activity types. These methods wiil assist the front-end client in displaying a UI which allows users to quickly see their progress. 

![ERD](https://drawsql.app/teams/honey-badgers/diagrams/erd)