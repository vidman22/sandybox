import * as colors from '../constants/colors';

import values from './values';

export const res = values;
export const fonts = res.fonts;

export const flex1BgWhite = {
	flex: 1,
	backgroundColor: 'white'
};

export const displayNone = {
	display: 'none',
	// fix for android, absolute positioning breaks display:none
	// https://github.com/facebook/react-native/issues/18415
	position: 'relative'
};

export const inputStyle = {
	color: colors.TEXT_GREY_2,
	fontFamily: fonts['brandon'],
	fontSize: res.scaleFont(22),
	borderBottomColor: '#e7ecec',
	borderBottomWidth: 0.8
};

export const headerStyle = {
	backgroundColor: 'white',
	borderBottomWidth: 0
};

export const hideHeaderStyle = {
	shadowColor: 'transparent',
	borderBottomWidth: 0,
	elevation: 0
};

export const headerTitle = {
	fontFamily: fonts['brandon-med'],
	fontSize: res.FONT_SIZE_TITLE,
	color: colors.NAVY
};

export const backIconStyle = {
	marginLeft: 15,
	width: 22,
	height: 15
};

export const addIconStyle = {
	marginRight: 15,
	width: 22,
	height: 15
};

export const fontMed = {
	fontFamily: fonts['brandon-med']
};

export const fontBold = {
	fontFamily: fonts['brandon-bold']
};

export const welcomeTextStyle = {
	color: colors.NAVY,
	textAlign: 'center',
	fontFamily: fonts['brandon-bold'],
	fontSize: res.scaleFont(24),
	marginBottom: 20
};

export const descriptionTextStyle = {
	color: colors.TEXT_GREY,
	textAlign: 'center',
	fontFamily: fonts['brandon-med'],
	fontSize: 18
};

export const footerText = {
	textAlign: 'center',
	fontFamily: fonts['brandon'],
	color: colors.TEXT_GREY,
	fontSize: res.scaleFont(18)
};

export const errorTextStyle = {
	textAlign: 'center',
	fontFamily: fonts['brandon'],
	color: colors.TEXT_ERROR,
	fontSize: 16
};

export const noHeaderPadding = {
	paddingTop: res.scaleY(44)
};

export const hasHeaderStyle = {
	paddingTop: 44
};
