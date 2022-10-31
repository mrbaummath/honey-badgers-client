import React, { Component } from 'react'
import {  Button, Segment, Grid, Divider, Container } from 'semantic-ui-react'


export default class SignPage extends Component {
  
	render() {
  
	  return (
		<div >
        <Container id="container">
		  <Segment raised  padded='very'  inverted color='yellow' verticalAlign='middle' id="segment">
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>
                <Grid.Column>
                    <Button secondary inverted color='yellow' class="signButton" href='sign-in'>Sign in</Button>
                </Grid.Column>
                <Grid.Column>
                    <Button secondary inverted color='yellow' class="signButton" href='sign-up'>Sign up</Button>
                </Grid.Column>
            </Grid>
		  </Segment>
          </Container>
		</div>
	  )
	}
  }