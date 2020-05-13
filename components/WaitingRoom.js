import React from 'react';

import {View, Text, StyleSheet, Image, Modal, TouchableOpacity} from 'react-native';

import {Feather} from '@expo/vector-icons';

import { res, welcomeTextStyle, fonts } from '../styles';
import * as colors from '../constants/colors';

export default function WaitingRoom(props) {
    return (
        <Modal
            visible={!!props.visible}
            transparent={!!props.transparent}
            animationType="fade"
            onRequestClose={() => {}}
        >
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                        props.toggleModal(false);
                    }}
                >
                    <Feather style={styles.closeButtonX} name="x" />
                </TouchableOpacity>
            </View>
        <View style={[styles.containerStyle, { backgroundColor: props.transparent ? colors.BG_GREEN_SOLID : colors.BG_GREEN_OVERLAY }]}>

            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Waiting Room</Text>
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.message}>Hi Ian,</Text>
                <Text style={styles.message}>We have you booked for {props.time}.</Text>
                <Text style={styles.message}>We'll send you a text you when your provider, {props.name}, is ready.</Text>
                <View style={styles.doctorsImageContainer}>
                    <Image source={require('../assets/doctors_no_bg_trimmed_resized.png')} style={styles.doctorsImage} resizeMode="contain" />
                </View>

                <Text style={styles.message}>Until then, feel free to leave the PocketDoc app.</Text>
            </View>

            <Image source={require('../assets/logo-white.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: colors.THEME_GREEN,
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		padding: 30
	},
	titleTextContainer: {
		top: 40,
		left: 0,
		right: 0,
		position: 'absolute',
		backgroundColor: 'transparent'

    },
    buttonView:{
        width: res.DEVICE_WIDTH,
        backgroundColor: colors.THEME_GREEN,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    closeButtonX: {
        fontSize: res.scaleFont(36),
    },
    closeButton: {
        borderRadius: 20,
        paddingTop: 20,
        paddingRight: 15,
        paddingBottom: 5,
        backgroundColor: colors.THEME_GREEN,
      },
	titleText: {
		...welcomeTextStyle,
		fontSize: res.scaleFont(24),
		color: 'white',
        backgroundColor: 'transparent',
        fontFamily: 'brandon-bold',
		// flex: 1
	},
	cancelTextContainer: {
		position: 'absolute',
		top: 30,
		right: 30
	},
	cancelText: {
		color: 'white',
		fontFamily: 'brandon-med',
		fontSize: res.scaleFont(18)
	},
	doctorsImageContainer: {
		alignSelf: 'center',
		width: res.DEVICE_WIDTH,
		height: null,
		borderBottomWidth: 1,
		borderBottomColor: '#d0e3df',
		marginVertical: 30
	},
	doctorsImage: {
		alignSelf: 'center',
		width: res.DEVICE_WIDTH * 0.73,
		height: res.DEVICE_HEIGHT * 0.30,
		maxHeight: 400
	},
	logoImage: {
		alignSelf: 'center',
		width: 140,
		height: 30,
		position: 'absolute',
		bottom: 40
	},
	messageContainer: {

	},
	message: {
		color: 'white',
		fontFamily: 'brandon-bold',
		textAlign: 'center',
		fontSize: res.scaleFont(22)
	}
});
