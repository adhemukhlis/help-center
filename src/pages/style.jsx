const containerPaddingSize = '2vw';
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
	justifyContent: 'start'
};
export const ContainerLapor = {
	...Container,
	justifyContent: 'start',
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
	width: '20vh',
	marginTop: 'calc( 4vw + 10vh )',
	marginBottom: 'calc( 4vw + ' + containerPaddingSize + ' + 10vh )'
};
export const StyleTitle = {
	marginTop: '4vh',
	marginBottom: '4vh',
}
export const PowerLogo = {
	width: '16vh',
	marginBottom: '4vh'
};
export const StyleFooter = {
	textAlign:'center',
	position: 'absolute',
	bottom: '1vh',
	fontSize:'calc( 1vh + .5vw )',
	padding:'2vh'
};
export const GGrid = {
	marginTop: '4vh',
	width: '100%',
	display: 'flex',
	flexFlow: 'wrap',
	flexDirection: 'row',
	justifyContent: 'space-evenly'
};
export const GGridItem = {
	backgroundColor: '#fff',
	padding: '1.5vh',
	width: 'calc( 8vh + 8vw )',
	height: 'calc( 8vh + 8vw )',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly'
};