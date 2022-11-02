import { useNavigate, useParams } from 'react-router-dom'
import {  Button, Segment, Grid, Label, Icon, Image, Modal, Header, List } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { getTheirActivities } from '../../api/activity'
import ActivitySegment from '../activities/ActivitySegment'
import LoadingScreen from '../shared/LoadingPage'

const UserPublicPage = ({currentUser, msgAlert}) => {

    //grab requested user's id from params
    const { otherUserId } = useParams()

    //piece of state for badges modal --> should be abstracte into it's own component
    const [open, setOpen] = React.useState(false)

    //set state variables for activities which are public for this user's public profile and completed counts
    const [publicActivities, setPublicActivities] = useState(null)
    const [completedCounts, setCompletedCounts] = useState({})
    //TBD: once their is a badges virtual, set that state

     //after initial render, make axios call to grab activity/count data and set the state variables 
     useEffect(() => {
        getTheirActivities(currentUser, otherUserId)
            .then(res => {
                console.log(res)
                setPublicActivities(res.data.activities)
                setCompletedCounts(res.data.completedCounts)
                //set badges when that virtual is done
            })
            .catch(console.log('oops'))
    },[])


     //set JSX for activities w/ MyActivity component --> will show loading screen until call to get data is completed and page re-renders 
     const activitiesJSX = publicActivities ? 
        publicActivities.map((activity) => (
            <ActivitySegment key={activity.id} activity={activity} user={currentUser} msgAlert={msgAlert} mine={false} />
        ))
        :
        <LoadingScreen />

    
    const images = [
        'https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg',
        'https://i.etsystatic.com/10536084/r/il/83f1d3/4011356412/il_1140xN.4011356412_e62z.jpg',
        'https://i.etsystatic.com/10536084/r/il/3aac0c/4011244316/il_1140xN.4011244316_9ffm.jpg',
        'https://i.etsystatic.com/10536084/r/il/b67424/4058937747/il_1140xN.4058937747_esbp.jpg',
        'https://i.etsystatic.com/10536084/r/il/3f03d0/4011213950/il_1140xN.4011213950_h2pg.jpg',
        'https://i.etsystatic.com/10536084/r/il/fa6529/4011242016/il_1140xN.4011242016_fdd1.jpg',
        'https://i.etsystatic.com/13215769/r/il/c4241b/2849297993/il_1140xN.2849297993_2n4t.jpg',
        'https://i.etsystatic.com/7578666/r/il/cff814/1735209273/il_1140xN.1735209273_ecbc.jpg',
        'https://i.etsystatic.com/10536084/r/il/83f1d3/4011356412/il_1140xN.4011356412_e62z.jpg',
        'https://i.etsystatic.com/10536084/r/il/3aac0c/4011244316/il_1140xN.4011244316_9ffm.jpg',
        'https://i.etsystatic.com/10536084/r/il/b67424/4058937747/il_1140xN.4058937747_esbp.jpg',
        'https://i.etsystatic.com/10536084/r/il/3f03d0/4011213950/il_1140xN.4011213950_h2pg.jpg',
        'https://i.etsystatic.com/10536084/r/il/fa6529/4011242016/il_1140xN.4011242016_fdd1.jpg',
        // 'https://i.etsystatic.com/13215769/r/il/c4241b/2849297993/il_1140xN.2849297993_2n4t.jpg',
    ]
	return (
        
		<>
        <div >
		    <Segment 
                raised
                inverted 
                color='yellow' 
                // verticalAlign='middle' 
                fluid
            >
                <Grid columns={2} verticalAlign='center' padded>
                    <Grid.Row>
                        <Segment>
                            <Grid columns={2}>
                                <Grid.Column width={8} verticalAlign='middle'>
                                    <Grid columns={2}>
                                        <Grid.Column width={4}>
                                            <Image 
                                                src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
                                                size='small' 
                                                circular 
                                                alt='A picture of the user'
                                            /> 
                                        </Grid.Column>
                                        <Grid.Column>
                                            <h1>Super Active Guy</h1> 
                                            <h2>member since 10/31/2022</h2>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Grid padded textAlign='center'>
                                            <Grid.Row>
                                                <h2 id="bestBuds">(USERNAME)'s Best Buds</h2>
                                            </Grid.Row>

                                            <Grid.Row >
                                                <Grid columns={4}>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                                            Joe
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                                                            Elliot
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
                                                            Stevie
                                                        </Label>
                                                    </Grid.Column>
                                                    <Grid.Column textAlign='center'>
                                                        <Label as='a' image size='big'>
                                                            <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                                            Jenny
                                                        </Label>
                                                    </Grid.Column>
                                                    
                                                </Grid>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <div id='viewBudsButton'>
                                                <Button verticalAlign='middle' size='medium'> 
                                                        <Icon size='large'name='user' />
                                                    View (USERNAME)'s Buddies
                                                </Button>
                                                </div>
                                            </Grid.Row>
                                        </Grid>
                                        
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <br/>
                    <Grid.Column width={8}>
                        
                        <Grid.Row>
                            <Grid columns={2} padded width={5}>
                                <Segment>
                                    <Grid.Row>
                                        <h1>(Username)'s earned badges</h1>
                                    </Grid.Row>
                                    <Grid columns={2}>
                                        {images.map((src) => (
                                            <Grid.Column verticalAlign='middle'  width={5}>
                                                <Modal
                                                    onClose={() => setOpen(false)}
                                                    onOpen={() => setOpen(true)}
                                                    open={open}
                                                    dimmer='blurring'
                                                    centered
                                                    trigger={
                                                        <Image 
                                                            src={(src)} 
                                                            size='small' 
                                                            circular 
                                                            centered
                                                            alt='A picture of a badge'
                                                        /> 
                                                    }
                                                >
                                                    <Modal.Header>Completed Activities</Modal.Header>
                                                    <Modal.Content image>
                                                        <Image 
                                                            src={(src)} 
                                                            size='medium' 
                                                            circular 
                                                            alt='A picture of a badge'
                                                        /> 
                                                        <Modal.Description>
                                                        <Header><h1>The Most Selfless</h1></Header>
                                                        <List size='massive'>
                                                            <List.Item>
                                                                <List.Icon name='certificate' />
                                                                <List.Content><a href='http://www.semantic-ui.com'>Catch up on world news</a></List.Content>
                                                            </List.Item>
                                                            <List.Item>
                                                                <List.Icon name='certificate' />
                                                                <List.Content><a href='http://www.semantic-ui.com'>Buy a new house decoration</a></List.Content>
                                                            </List.Item>
                                                            <List.Item>
                                                                <List.Icon name='certificate' />
                                                                <List.Content>
                                                                <a href='http://www.semantic-ui.com'>Repaint a room in your house</a>
                                                                </List.Content>
                                                            </List.Item>
                                                            <List.Item>
                                                                <List.Icon name='certificate' />
                                                                <List.Content>
                                                                    <a href='http://www.semantic-ui.com'>Draw something interesting</a>
                                                                </List.Content>
                                                            </List.Item>
                                                        </List>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                        <Button color='green' onClick={() => setOpen(false)}>
                                                            Done
                                                        </Button>
                                                    </Modal.Actions>
                                                </Modal>                                            
                                                (Badge Name)
                                            </Grid.Column>
                                        ))}
                                    </Grid>
                                </Segment>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column >
                        <Grid.Row>
                            <Segment raised >
                                <h1>Activity Timeline</h1>
                                {activitiesJSX} 
                            </Segment>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
	</>	
	)
}

export default UserPublicPage 


{/* <Grid.Column fluid width={11}>
                                        <Segment padded>
                                            <Grid columns={4}>
                                                <Grid.Row>  
                                                    <h2 id='ranksHeader'>Ranks</h2>
                                                </Grid.Row> 
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>Relaxed Mstr General</h3>
                                                        <h3><Icon name='certificate'/>Sooooo Educated</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>The Most Selfless</h3>
                                                    <   h3><Icon name='certificate'/>Captain Popularity</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>BusyBodyBee</h3>
                                                        <h3><Icon name='certificate'/>Oui Chef</h3>
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <h3><Icon name='certificate'/>Sounds Good</h3>
                                                        <h3><Icon name='certificate'/>I Did It</h3>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>  */}