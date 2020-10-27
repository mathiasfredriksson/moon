import * as React from 'react'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const style = ({ palette, spacing }: Theme) => createStyles({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		width: '450px'
	},
	header: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: '20px'
	},
	cell: {
		width: '60px',
		padding: 10,
		"&:last-child": {
          	paddingRight: 0
        }
	},
	cellLabel: {
		width: '60px',
		padding: 0,
		paddingBottom: '20px',
		"&:last-child": {
          	paddingRight: 0
        }
	},
	cellToday: {
		backgroundColor:'#222',
   		borderRadius: 60,
		width: '60px',
		padding: 10,
		"&:last-child": {
          	paddingRight: 0
        }
	},
	table: {
		paddingBotton: '2px'
	},
	mobileStepper: {
		paddingTop: '0px'
	}
});

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MUITableCell);

const daysInMonth = (iMonth:number, iYear:number) => {

    return 32 - new Date(iYear, iMonth, 32).getDate();
}

const Moon = (year:number, month:number, day:number) => {

	const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

	let c:number = 0;
	let e:number = 0;
	let jd:number = 0;
	let b:number = 0;

	if (month < 3) {

		year--;
		month += 12;
	}

	++month;

	c = 365.25 * year;
	e = 30.6 * month;
	jd = c + e + day - 694039.09; // jd is total days elapsed
	jd /= 29.5305882; // divide by the moon cycle
	b = Math.floor(jd); // int(jd) -> b, take integer part of jd
	jd -= b; // subtract integer part to leave fractional part of original jd
	b = Math.round(jd * 8); // scale fraction from 0-8 and round

	if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

	return { phase: b, emoji: phases[b] };
}

interface Day {
	label: String,
	date: number
}

interface IProps {
	classes: any,
	theme: any
}

const MoonComponent = (props:IProps) => {

	const today = new Date();
	const [activeStep, setActiveStep] = React.useState(today.getMonth());
	const {
		classes,
		theme
	} = props;

	const monthLabels = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
	const weekDayLabels = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

	let year:number = today.getFullYear();
	let row:Array<Day> = [];
	let rows:Array<Array<Day>> = [];

	const months:Array<Array<Array<Day>>> = [];

	for (let month:number = 0; month <= 11; month++) {

		rows = [];

		let firstDay = (new Date(year, month)).getDay();
		let date:number = 1;

		for (let i:number = 0; i < 5; i++) {

			row = [];

			for (let j:number = 0; j < 7; j++) {

				if (i === 0 && j < firstDay) {

					row.push({ label: '', date: -1 });

				} else if (date > daysInMonth(month, year)) {

					break;

				} else {

					row.push({ label: Moon(year, month, date).emoji, date });

					date++;
				}
			}

			rows.push(row);
		}

		months.push(rows);
	}

	const maxSteps = 12;

	const handleNext = () => {

		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {

		setActiveStep(activeStep - 1);
	};

	return <div className={ classes.root }>
		<div className={ classes.container }>
			<Paper square elevation={ 0 } className={ classes.header }>
				<Typography>{ monthLabels[activeStep] }</Typography>
			</Paper>
			<SwipeableViews
				axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
				index={ activeStep }
				onChangeIndex={ setActiveStep }
				className={ classes.swipeable }
				enableMouseEvents>
				{ months.map((aMonth, monthIndex) => {
					return <TableContainer
						component={ Paper }
						key={ 'month_' + monthIndex }>
						<Table
							aria-label="simple table">
							<TableHead>
								<TableRow>
									{ weekDayLabels.map(aWeekDay => {

										return <TableCell
											key={ 'row_0' }
											className={ classes.cellLabel }
											align="center">
											{ aWeekDay }
										</TableCell>
									}) }
								</TableRow>
							</TableHead>
							<TableBody>
								{ aMonth.map((row, dateIndex) => {

									const days = row.map(day => {

										if (day.date === -1) {

											return <TableCell
												key={ monthIndex + '_' + dateIndex + '_' + Math.random() * 10 }
												align="center"
												className={ classes.cell }
												size='small' />
										}

										if (day.date === today.getDate() && monthIndex === today.getMonth()) {

											return <TableCell
												key={ monthIndex + '_' + day.date }
												align="center"
												className={ classes.cellToday }
												size='small'>
												{ day.date }
												{ day.label }
											</TableCell>
										}

										return <TableCell
											key={ monthIndex + '_' + day.date }
											align="center"
											className={ classes.cell }
											size='small'>
											{ day.date } { day.label }
										</TableCell>
									})

									return <TableRow key={ monthIndex + '_' + dateIndex + '_row' }>
										{ days }
									</TableRow>
								})}
							</TableBody>
						</Table>
					</TableContainer>
				}) }
			</SwipeableViews>
			<MobileStepper
				steps={ maxSteps }
				position="static"
				variant="text"
				activeStep={ activeStep }
				className={ classes.mobileStepper }
				nextButton={
					<Button
						size="small"
						onClick={() => { handleNext() }}
						disabled={ activeStep === maxSteps - 1 }>
						Next
						{ theme.direction === 'rtl' ?
							<KeyboardArrowLeft />:
							<KeyboardArrowRight /> }
					</Button>
				}
				backButton={
					<Button
						size="small"
						onClick={() => { handleBack() }}
						disabled={ activeStep === 0 }>
						{ theme.direction === 'rtl' ?
							<KeyboardArrowRight />:
							<KeyboardArrowLeft /> }
						Back
					</Button>
				}
			/>
		</div>

	</div>
}

export default withStyles(style, { withTheme: true })(MoonComponent);
