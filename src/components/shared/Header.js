import React, { Component } from 'react'
import { Menu, Segment, Sticky } from 'semantic-ui-react'


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
		<Sticky>
		  <Menu inverted pointing secondary  size='massive' id='header'>
 			{/* {this.props.user && (
				<span>Welcome, {this.props.user.email}</span>
			)} */}
			{			
				<Menu.Item
					name='honey badges'
					active={activeItem === 'honey badges'}
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
					name='my profile'
					active={activeItem === 'my profile'}
					onClick={this.handleItemClick}
					href='user-page'
				></Menu.Item>
				<Menu.Item
					name='sign out'
					active={activeItem === 'sign out'}
					onClick={this.handleItemClick}
					href='sign-out'
				></Menu.Item>
				<Menu.Item
					name='change password'
					active={activeItem === 'change password'}
					onClick={this.handleItemClick}
					href='change-password'
				></Menu.Item>
			</Menu.Menu>

			: 
			// UNAUTHINTICATED OPTIONS
			<Menu.Menu position='right'>	
				<>
					<Menu.Item
						name='user access'
						active={activeItem === 'user access'}
						onClick={this.handleItemClick}
						href='sign-page'
					></Menu.Item>
				</>
			</Menu.Menu>
			}
		  </Menu>
		  </Sticky>
		</div>
	  )
	}
  }