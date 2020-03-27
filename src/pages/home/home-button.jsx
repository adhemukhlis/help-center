import React, { Component } from 'react';
import { IcDuotoneHospitals, IcDuotoneChartPie, IcDuotoneHospitalUser } from "../../icons/react-icon-svg";
import Button3d from "../../3d-button/3d-button";
import { GGridItem, mainColor } from "../style";
import DelayLink from 'react-delay-link';
import PATH from "../../route/path";
const iconStyle = {
	style: {
		marginBottom: '2vw'
	},
	fill: mainColor
};
const menuButton = [
	{
		label: 'Lapor',
		icon: <IcDuotoneHospitalUser style={iconStyle.style} fill={iconStyle.fill}/>,
		to: PATH.lapor,
		action: ( ) => console.log( "to /lapor" )
	}, {
		label: 'Pantau',
		icon: <IcDuotoneChartPie style={iconStyle.style} fill={iconStyle.fill}/>,
		to: PATH.pantau,
		action: ( ) => console.log( "to /pantau" )
	}, {
		label: 'Info',
		icon: <IcDuotoneHospitals style={iconStyle.style} fill={iconStyle.fill}/>,
		to: PATH.info,
		action: ( ) => console.log( "to /info" )
	}
];
export default class HomeButton extends Component {
	render( ) {
		return (menuButton.map(( data, i ) => {
			return (
				<DelayLink key={i} delay={400} to={data.to} clickAction={data.action} replace={false}>
					<Button3d style={GGridItem}>{data.icon}{data.label}</Button3d>
				</DelayLink>
			)
		}))
	}
}