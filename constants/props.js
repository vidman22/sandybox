import * as colors from './colors';
import { res, fonts } from '../styles';

export const chevronHitSlop = {
	right: 20,
	left: 0,
	top: 0,
	bottom: 0
};

export const headerLeftHitSlop = {
	top: 30,
	bottom: 30,
	left: 30,
	right: 50
};

export const INPUT_PROPS = {
	// inputStyle: {
	// 	color: colors.TEXT_GREY_2,
	// 	fontFamily: fonts['brandon'],
	// 	fontSize: 18,
	// 	width: '100%'
	// },
	// containerStyle: {
	// 	flex: 1,
	// 	borderBottomColor: '#e7ecec',
	// 	borderBottomWidth: 0.8
	// },
	// style: {
	// 	color: colors.TEXT_GREY_2,
	// 	fontFamily: fonts['brandon'],
	// 	fontSize: res.scaleFont(22),
	// 	// width: '100%',
	// 	flex: 1,
	// 	borderBottomColor: '#e7ecec',
	// 	borderBottomWidth: 0.8
	// },
	placeholderTextColor: colors.TEXT_PLACEHOLDER,
	autoCorrect: false
};

export const BUTTON_DEFAULT = {
	backgroundColor: 'white',
	borderRadius: 5,
	buttonStyle: {
		borderColor: colors.TEXT_GREY,
		borderWidth: 1
	},
	textStyle: {
		fontFamily: fonts['brandon-bold'],
		fontSize: res.scaleFont(20),
		color: colors.TEXT_GREY
	},
	containerViewStyle: {
		borderRadius: 5
	}
};

export const BUTTON_THEME = {
	backgroundColor: colors.THEME_GREEN,
	borderRadius: 5,
	buttonStyle: {
		backgroundColor: colors.THEME_GREEN,
		borderRadius: 5
	},
	textStyle: {
		fontFamily: fonts['brandon-bold'],
		fontSize: res.scaleFont(20),
		paddingLeft: 0,
		paddingRight: 0,
		textAlign: 'center',
		flex: 1
	},
	containerViewStyle: {
		borderRadius: 5,
		// Need to explicitly define marginLeft and marginRight to override library styles
		marginLeft: 0,
		marginRight: 0
	}
};

export const BUTTON_GHOST = {
	backgroundColor: 'transparent',
	borderRadius: 5,
	buttonStyle: {
		borderColor: 'white',
		borderWidth: 2
	},
	textStyle: {
		fontFamily: fonts['brandon-bold'],
		fontSize: 20,
		color: 'white'
	},
	containerViewStyle: {
		borderRadius: 5
	}
};
