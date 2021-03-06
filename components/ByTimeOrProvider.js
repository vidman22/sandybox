import React from 'react';

import { View, Linking, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';
import { BUTTON_THEME, headerLeftHitSlop, chevronHitSlop } from '../constants/props';
import * as colors from '../constants/colors';

var Doctor = require('../assets/doctors_1500w.jpg');

const ByTimeOrProvider = ({navigation}) => {
    return (
        <View style={styles.container}>
                <Image
                    source={require('../assets/doctors_1500w.jpg')}
                    style={styles.doctorsImageStyle}
                    resizeMode="contain"
                />
            <TouchableOpacity  style={styles.scheduleButton} onPress={() => navigation.navigate('Open Slots')}>
                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>See first available</Text>
                    <Text style={styles.buttonSubText}>Our next available appointments</Text>
                </View>
                <Feather style={styles.iconStyle} name="chevron-right" />
                </TouchableOpacity>
            <TouchableOpacity style={styles.scheduleButton}  onPress={() => navigation.navigate('Provider Schedule')}>
                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>Schedule by provider</Text>
                    <Text style={styles.buttonSubText}>Schedule with your preferred provider</Text>
                </View>
                <Feather style={styles.iconStyle} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.scheduleButton}  onPress={() => navigation.navigate('Book Appointment', {checkIn: true})}>
                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>Check-in for appointment</Text>
                    <Text style={styles.buttonSubText}>Let us know you're ready</Text>
                </View>
                <Feather style={styles.iconStyle} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+18586170528')} hitSlop={headerLeftHitSlop}>
                <Text numberOfLines={1} style={styles.footerText}>Questions? Call (858) 617-0528</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ByTimeOrProvider;

const buttonTextCommon = {
    marginLeft: res.scaleX(18),
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    doctorsImageStyle: {
        height: res.DEVICE_HEIGHT * 0.30,
        width: res.DEVICE_WIDTH,
        margin: 10
    },
    scheduleButton:{
        height: res.scaleY(80),
        width: res.DEVICE_WIDTH*.90,
        margin: res.scaleX(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderWidth: .8,
        borderColor: colors.TEXT_LIGHT_GREY,
    },  
    buttonText: {
        ...buttonTextCommon,
        color: colors.THEME_GREEN,
        fontSize: res.scaleFont(30),
        fontFamily: 'brandon-bold',
        
    },
    buttonSubText: {
        ...buttonTextCommon,
        color: colors.TEXT_GREY,
        fontSize: res.scaleFont(20),
        fontFamily: 'brandon',
    },
    iconStyle:{
        fontSize: res.scaleFont(26),
        marginRight: res.scaleX(12),
        color: colors.TEXT_GREY_2,
    },
    footerText: {
        fontFamily: 'brandon',
        marginTop: res.scaleY(10),
        marginBottom: - res.scaleY(8),
        fontSize: res.scaleFont(18),
        color: colors.TEXT_GREY,
    },
})