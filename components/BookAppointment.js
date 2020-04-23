import React from 'react'
import {View, Text, Linking, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { BUTTON_THEME, headerLeftHitSlop, chevronHitSlop } from '../constants/props';

import * as colors from '../constants/colors';
import { headerStyle, res, } from '../styles';

import { FontAwesome } from '@expo/vector-icons';

export default function BookAppointment() {
    const [value, onChangeText] = React.useState('');
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        
        <KeyboardAvoidingView enabled behavior="position" keyboardVerticalOffset={20} contentContainerStyle={{height: res.DEVICE_HEIGHT * .9}} style={styles.container}>
            
            
            <RenderPaymentRow leftText={'Patient'} rightText={'Add Patient'} />
            <RenderPaymentRow leftText={'Pharmacy'} rightText={'Add Pharmacy'} />
            <RenderPaymentRow leftText={'Payment'} rightText={'Add Payment'} last={true}/>
            
            <View style={styles.labelWrapper}>
                {/* <Text allowFontScaling={false} style={styles.labelStyle}>Reason</Text> */}
                <View style={styles.reasonInputContainer}>
                    <TextInput 
                        style={styles.textInput} 
                        onChangeText={text => onChangeText(text)} 
                        value={value} 
                        multiline
                        placeholder='Type reason for your visit.'
                        placeholderTextColor="grey"
                        maxLength={144}
                        />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.bookButton} onPress={() => console.log('pressed')}>
                    <Text style={styles.bookButtonText}>Book My Appointment</Text>
                </TouchableOpacity>
                <Text onPress={() => Linking.openURL('tel:+18586170528')} numberOfLines={1} style={styles.footerText}>Questions? Call (858) 617-0528</Text>
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const RenderPaymentRow = (props) => {
    return (
        <View style={[styles.labelInputWrapper]}>
        <Text allowFontScaling={false} style={styles.labelStyle}>{props.leftText}</Text>
        <View style={styles.inputContainer}>
            <TouchableOpacity
                hitSlop={chevronHitSlop}
                style={styles.inputContainer}
            >
                <Text allowFontScaling={false} style={styles.inputStyle}>{props.rightText}</Text>
                <FontAwesome
                    style={styles.chevronStyle} name="angle-right" size={28} color="white"/>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        backgroundColor: '#fff',
        padding: 8,
    },
    logoContainer: {
        flex: 1
    },
    logoStyle: {
        marginTop: 5,
        alignSelf: 'center',
        width: 140,
        height: 30
    },
    labelInputWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.TEXT_LIGHT_GREY,
        borderBottomWidth: 1,
    },
    labelLastInputWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelWrapper:{
        flexGrow: .1,
        paddingVertical: res.scaleY(32),
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    footerText: {
        fontFamily: 'brandon',
        marginBottom: res.scaleY(20),
        fontSize: res.scaleFont(18),
        color: colors.TEXT_GREY,
    },
    labelStyle: {
        fontFamily: 'brandon-med',
        color: colors.TEXT_GREY,
        fontSize: res.scaleFont(22),
        marginLeft: res.scaleX(8),
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5,
    },
    inputStyle: {
        fontFamily:'brandon-bold',
        color: colors.THEME_GREEN,
        fontSize: res.scaleFont(24),
        marginLeft: 30,


    },
    chevronStyle: {
        marginLeft: 15,
        color: colors.THEME_GREEN,
    },
    // placeholderText: {
    //     color: '#ccc',
    //     fontSize: res.scaleFont(16)
    // },
    buttonWrapper:{
        alignItems: 'center',
    },
    bookButton:{
        backgroundColor: colors.THEME_GREEN,
        height: res.scaleY(45),
        width: res.DEVICE_WIDTH * .8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: res.scaleY(20),
        marginHorizontal: res.scaleX(12),
        
    },
    bookButtonText:{
        color: '#fff',
        fontFamily: 'brandon',
        fontSize: res.scaleFont(24),
    },
    reasonInputContainer:{
        // flex: 1,
        marginTop: - res.scaleY(20),
        flexDirection: 'row',
        justifyContent: 'center',
        width: res.DEVICE_WIDTH,
        // alignItems: 'center',

    },
    textInput: { 
        height: 100, 
        width: res.DEVICE_WIDTH * .93,
        backgroundColor: '#fff',
        borderColor: '#ccc', 
        shadowColor: '#ccc',
        fontFamily: 'brandon',
        borderWidth: .1,
        padding: 12,
        marginTop: res.scaleY(25),
        marginLeft: - res.scaleX(16),
        borderRadius: 2,
        lineHeight: res.scaleFont(36),
        fontSize: res.scaleFont(24),
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 12,
        shadowOpacity: 1,
        shadowColor: '#ccc',
    }
});