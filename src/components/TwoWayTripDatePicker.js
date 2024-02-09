import { useState } from 'react';
import {
	Box,
	TextField,
	Typography,
	InputAdornment,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Tooltip,
} from '@mui/material';
import { CalendarMonthOutlined, HighlightOff } from '@mui/icons-material';
import { DateRangePicker } from 'react-date-range';
import moment from "moment";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const TwoWayTripDatePicker = ({ handleSecondTripChange }) => {
	const [calendar, setCalendar] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	const [open, setOpen] = useState(false);

	const handleDateChange = (ranges) => {
		handleSecondTripChange('firstTripDateFrom', ranges.selection.startDate);
		handleSecondTripChange('firstTripDateTo', ranges.selection.endDate);
		setCalendar(ranges.selection);
		setOpen(prevState => !prevState);
	};

	const handleClose = () => setOpen(prevState => !prevState);

	return (
		<>
			<Box className='date-picker-container'>
				<TextField
					className='calendar'
					value={moment(calendar.startDate).format("MMM D")}
					readOnly
					InputProps={{
						style: {
							fontFamily: 'Poppins',
							fontWeight: 500,
							fontStyle: 'italic',
							color: 'grey',
						},
						startAdornment: (
							<InputAdornment position="start">
								<CalendarMonthOutlined />
							</InputAdornment>
						),
					}}
					onClick={handleClose}
				/>
				<TextField
					className='calendar'
					value={moment(calendar.endDate).format("MMM D")}
					readOnly
					InputProps={{
						style: {
							fontFamily: 'Poppins',
							fontWeight: 500,
							fontStyle: 'italic',
							color: 'grey',
						},
						startAdornment: (
							<InputAdornment position="start">
								<CalendarMonthOutlined />
							</InputAdornment>
						),
					}}
					sx={{ ml: .3, }}
					onClick={handleClose}
				/>
			</Box>

			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						maxWidth: 650,
						width: 1,
						"& .MuiInputBase-root": {
							fontSize: 14,
							borderRadius: 1,
							p: "5px 5px",
						},
					},
				}}
			>
				<DialogTitle
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography
						sx={{
							fontFamily: 'Poppins',
							fontWeight: 500,
							fontSize: '24px',
						}}
					>Select Travelling Dates</Typography>
					<Tooltip title='Close' sx={{ fontFamily: 'Poppins', fontWeight: 500 }}>
						<IconButton
							children={<HighlightOff />}
							color="inherit"
							onClick={handleClose}
							sx={{ transform: "translate(2px, -2px)" }}
						/>
					</Tooltip>
				</DialogTitle>
				<DialogContent
					sx={{
						width: '100%',
						height: 420,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',

					}}
				>
					<DateRangePicker
						ranges={[calendar]}
						onChange={handleDateChange}
						minDate={new Date()}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default TwoWayTripDatePicker;

