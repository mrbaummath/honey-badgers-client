import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'


export default class Header extends Component {
	state = { activeItem: 'home' }
  
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
	render() {
	  const { activeItem } = this.state
	  const linkStyle = {
		color: 'black',
		textDecoration: 'none'
	  }
  
	  return (
		<div>
		  <Menu pointing secondary>
 			{/* {this.props.user && (
				<span>Welcome, {this.props.user.email}</span>
			)} */}
			{			
				<Menu.Item
				name='home'
				active={activeItem === 'home'}
				onClick={this.handleItemClick}
				href='/'
				/>
			}
			{this.props.user ? 
			
			// AUTHINTICATED OPTIONS 
			<Menu.Menu position='right'>
				<Menu.Item
				name='my activities'
				active={activeItem === 'my activities'}
				onClick={this.handleItemClick}
				></Menu.Item>
				<Menu.Item
				name='new activities'
				active={activeItem === 'new activities'}
				onClick={this.handleItemClick}
				></Menu.Item>
				<Menu.Item
					name='sign out'
					active={activeItem === 'sign out'}
					onClick={this.handleItemClick}
					href='sign-out'
				></Menu.Item>
			</Menu.Menu>

			: 
			// UNAUTHINTICATED OPTIONS
			<Menu.Menu position='right'>	
				<>
				<Menu.Item
					name='sign in'
					active={activeItem === 'sign in'}
					onClick={this.handleItemClick}
					href='sign-in'
				></Menu.Item>
				<Menu.Item
					name='sign up'
					active={activeItem === 'sign up'}
					onClick={this.handleItemClick}
					href='sign-up'
				></Menu.Item>
				</>
	
			</Menu.Menu>
			}
		  </Menu>
  
		  <Segment>
			<img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
		  </Segment>
		</div>
	  )
	}
  }