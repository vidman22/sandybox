import React from 'react';

import {View, Text, StyleSheet, Image, Modal, TouchableOpacity, Linking} from 'react-native';

import {Feather} from '@expo/vector-icons';

import { res, welcomeTextStyle, fonts, hasHeaderStyle } from '../styles';
import * as colors from '../constants/colors';
import { headerLeftHitSlop } from '../constants/props';

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
                    <Image source={require('../assets/logo-white.png')} style={styles.logoImage} resizeMode="contain" />
                    {/* <Feather style={styles.closeButtonX} name="x" /> */}
                </TouchableOpacity>
            </View>
        <View style={[styles.containerStyle, { backgroundColor: props.transparent ? colors.BG_GREEN_SOLID : colors.BG_GREEN_OVERLAY }]}>

            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>
                    Samanatha, you're all set!
                </Text>
            </View>
            <View style={styles.doctorsImageContainer}>
                <Image source={require('../assets/doctors_no_bg_trimmed_resized.png')} style={styles.doctorsImage} resizeMode="contain" />
            </View>
            <View style={styles.appointmentTitleWrapper}>
                <Text style={[styles.messageLabel, { fontFamily: 'brandon-med'}]}>Appointment Details</Text>
            </View>
            <View style={styles.messageContainer}>
                <View style={styles.labelMessageWrapper}>
                    <Text style={styles.messageLabel}>Provider:</Text>
                    <Text style={styles.message}>{props.name ? props.name : 'Monica Perlman, M.D.'}</Text>
                </View>
                {/* <View style={styles.labelMessageWrapper}>
                    <Text style={styles.messageLabel}>Patient:</Text>
                    <Text style={styles.message}>Ian Perlman</Text>
                </View> */}
                <View style={styles.labelMessageWrapper}>
                    <Text style={styles.messageLabel}>Date:</Text>
                    <Text style={styles.message}>{props.date ? props.date : 'Thu, Apr. 28, 2020'}</Text>
                </View>
                <View style={[styles.labelMessageWrapper]}>
                    <Text style={[styles.messageLabel, ]}>Start Time:</Text>
                    <Text style={styles.message}>{props.firstBeginTime ? props.firstBeginTime + ' - ' + props.secondBeginTime + '*' : '8:00 AM - 8:15 AM*'}</Text>
                </View>

                {/* <View>
                    <Text style={[styles.message, {fontSize: res.scaleFont(20), marginLeft: res.scaleX(12)}]}>{props.secondBeginTime ? `*Expect a text between ${props.firstBeginTime} and ${props.secondBeginTime}` : '*Please allow for up to 15 minutes'}</Text>
                </View> */}

                <View style={[styles.labelMessageWrapper, {borderBottomWidth: 0, borderBottomColor: colors.THEME_GREEN}]}>
                    {/* <Text style={styles.messageLabel}>Instructions</Text> */}
                    <Text style={[styles.message, {fontFamily: 'brandon', textAlign: 'center'}]}>
                        {props.secondBeginTime ? (
                            `*We'll text you between ${props.firstBeginTime} and ${props.secondBeginTime} to start the visit.` )
                            : "*We'll text you between 8:00 AM and 8:15 AM to start the visit."
                        } Until then, feel free to exit the app.
                        </Text>
                        {/* <Text style={[styles.message, {fontFamily: 'brandon', textAlign: 'center'}]}>Until then, feel free to exit the app.</Text> */}
                </View>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+18586170528')} hitSlop={headerLeftHitSlop}>
                <Text numberOfLines={1} style={styles.footerText}>Questions? Call (858) 617-0528</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: colors.THEME_GREEN,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    appointmentTitleWrapper:{
        padding: 10,
        width: res.DEVICE_WIDTH * .9,
        alignItems: 'center',
        borderBottomWidth: 1,
		borderBottomColor: '#d0e3df',
    },
    buttonView:{
        paddingTop: 28,
        width: res.DEVICE_WIDTH,
        backgroundColor: colors.THEME_GREEN,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonX: {
        fontSize: res.scaleFont(36),
        color: '#fff',
    },
    footerText: {
        fontFamily: 'brandon',
        marginBottom: res.scaleY(20),
        fontSize: res.scaleFont(18),
        color: '#fff',
    },
    closeButton: {
        borderRadius: 20,
        height: 25,
        backgroundColor: colors.THEME_GREEN,
    },
    titleTextContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: res.DEVICE_WIDTH * .8,
    },
	titleText: {
		// flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
		fontSize: res.scaleFont(36),
		color: 'white',
        fontFamily: 'brandon-bold',
	},
	doctorsImageContainer: {
		alignSelf: 'center',
		width: res.DEVICE_WIDTH,
		height: null,
		// borderBottomWidth: 1,
        // borderBottomColor: '#d0e3df',
        marginTop: 20,
	},
	doctorsImage: {
		alignSelf: 'center',
		// width: res.DEVICE_WIDTH * 0.73,
		height: res.DEVICE_HEIGHT * 0.20,
	},
	logoImage: {
		alignSelf: 'center',
		width: 140,
		height: 25,
	},
	messageContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: res.DEVICE_WIDTH * .9,
	},
	message: {
		color: 'white',
		fontFamily: 'brandon-bold',
        fontSize: res.scaleFont(25),
        marginLeft: 8,
        textAlign: 'left',
    },
	messageLabel: {
		color: 'white',
		fontFamily: 'brandon-med',
		textAlign: 'left',
        fontSize: res.scaleFont(25),

    },
    labelMessageWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: res.DEVICE_WIDTH * .9,
        borderBottomWidth: .5,
        borderBottomColor: '#fff',
        padding: 14,
    },
});
