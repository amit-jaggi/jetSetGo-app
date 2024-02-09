import React from 'react';
import { LOGO_NAME, OPTION_LINKS, wordLowercase } from '../utils/constant';
import { Paper, Box, Typography } from '@mui/material';
import AeroplaneIcon from '../assets/aeroplane-logo.png';
import { AccountCircleOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Header = () => {
	return (
		<Paper elevation={8} className='header-container'>
			<LeftHeader />
			<RightHeader />
		</Paper>
	)
};

const LeftHeader = () => {
	return (
		<Link to='/' className='link'>
			<Box className='left-header'>
				<Typography className='header-logo'>{LOGO_NAME}</Typography>
				<img src={AeroplaneIcon} alt='aeroplane-icon' className='header-logo-icon' height={60} />
			</Box>
		</Link>
	)
}

const RightHeader = () => {
	return (
		<Box className='right-header'>
			{
				OPTION_LINKS.map(
					(el, index) => el === OPTION_LINKS[OPTION_LINKS.length - 1]
						? <AccountCircleOutlined key={index} className='user-account' />
						: <Link key={index} to={`/${wordLowercase(el)}`} className='otherlink'>
							<Typography	className='option-link'>{el}</Typography>
						</Link>
				)
			}
		</Box>
	)
}

export default Header;
