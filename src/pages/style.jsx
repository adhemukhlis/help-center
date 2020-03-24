const containerPaddingSize = '6vw';
const backgroundWhite = '#fbfbfb'
export const mainColor = '#009965'
export const Container = {
	minHeight: '-webkit-fill-available',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	padding: containerPaddingSize
};
export const ContainerHome = {
	...Container,
	backgroundColor: backgroundWhite,
	justifyContent: 'space-evenly'
};
export const ContainerLapor = {
	...Container,
	backgroundColor: backgroundWhite
};
export const ContainerPantau = {
	...Container,
	backgroundColor: backgroundWhite
};
export const ContainerInfo = {
	...Container,
	backgroundColor: backgroundWhite
};
export const StyleLogo = {
	width: '40vw',
	marginTop: '10vw',
	marginBottom: 'calc( 10vw + ' + containerPaddingSize + ' )'
};
export const StyleFooter = {
	position: 'absolute',
	bottom: '1vh'
};
export const GGrid = {
	width: '100%',
	display: 'flex',
	flexFlow: 'wrap',
	flexDirection: 'row',
	justifyContent: 'space-between'
};
export const GGridItem = {
	backgroundColor: '#fff',
	padding: '4vw',
	width: '24vw',
	height: '24vw',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly'
};