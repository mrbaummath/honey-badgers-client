import React, { Component } from 'react'
import { Menu, Icon, Sticky, Modal } from 'semantic-ui-react'
import CreateActivity from '../activities/CreateActivity'
import UserPublicPage from '../user/UserPublicPage'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}

export default class Header extends Component {
	state = { 
		activeItem: 'home',
		setOpen: false 
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	handleClose = () => { this.setState({setOpen: false})}
  
	render() {
	  const { activeItem } = this.state
	  const linkStyle = {
		color: 'black',
		textDecoration: 'none'
	  }
  
	  return (
		<div>
		<Sticky>
		  <Menu inverted pointing secondary  size='massive' id='header' >
 					
				<Menu.Item
					name='honey badges'
					active={activeItem === 'honey badges'}
					onClick={this.handleItemClick}
				>
					<Link 
						to='/' 
					>
						<Icon name='certificate'/>
						Honey badges
					</Link>
				</Menu.Item>
			
			{this.props.user ? 
			
			// AUTHINTICATED OPTIONS 
			<Menu.Menu position='right'>
				
				 <Modal
					onClose={() => this.handleClose()}
					onOpen={() => this.setState({setOpen: true})}
					open={this.state.setOpen}
					trigger={
						<Menu.Item 
							name='New Activity'
							active={activeItem === 'new activities'}
							onClick={this.handleItemClick}
						>
							<Link
								to='user-page'>
								New Activity
							</Link>
						</Menu.Item>}
       			 >
					<Modal.Content>
						<CreateActivity user={this.props.user} msgAlert={this.props.msgAlert} handleClose={this.handleClose}  />
					</Modal.Content>
        		</Modal>
				<Menu.Item
					name='feed page'
					active={activeItem === 'feed page'}
					onClick={this.handleItemClick}
				>
					<Link 
						to={`feed-page/${this.props.user._id}`}  
					>
						Feed
					</Link>
				</Menu.Item>
				<Menu.Item
					name='my public profile'
					active={activeItem === 'my public profile'}
					onClick={this.handleItemClick}
				>
					<Link 
						to={`user-public-page/${this.props.user._id}`} 
					>
						Public Profile
					</Link>
				</Menu.Item>
				<Menu.Item
					name='private profile'
					active={activeItem === 'private profile'}
					onClick={this.handleItemClick}

				>
					<Link 
						to='user-page' 
					>
						Private Profile
					</Link>
				</Menu.Item>
				<Menu.Item
					name='sign out'
					active={activeItem === 'sign out'}
					onClick={this.handleItemClick}
				>
					<Link 
						to='sign-out' 
					>
						Sign Out
					</Link>
				</Menu.Item>
				<Menu.Item
					name='change password'
					active={activeItem === 'change password'}
					onClick={this.handleItemClick}
				>
					<Link 
						to='change-password' 
					>
						Change Password
					</Link>
				</Menu.Item>
			</Menu.Menu>

			: 
			// UNAUTHINTICATED OPTIONS
			null

			// <Menu.Menu position='right'>	
			// 	<>
			// 		<Menu.Item
			// 			name='user access'
			// 			active={activeItem === 'user access'}
			// 			onClick={this.handleItemClick}
			// 			href='sign-page'
			// 		></Menu.Item>
			// 	</>
			// </Menu.Menu>
			}
		  </Menu>
		  </Sticky>
		</div>
	  )
	}
  }