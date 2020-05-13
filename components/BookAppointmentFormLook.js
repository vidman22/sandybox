import React from 'react'
import {View, Text, Linking, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { BUTTON_THEME, headerLeftHitSlop, chevronHitSlop } from '../constants/props';

import * as colors from '../constants/colors';
import { headerStyle, res, } from '../styles';

import { FontAwesome, Feather } from '@expo/vector-icons';

export default function BookAppointment() {
    const [value, onChangeText] = React.useState('');
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
        
        <KeyboardAvoidingView enabled behavior="position" keyboardVerticalOffset={40} contentContainerStyle={{height: res.DEVICE_HEIGHT * .9}} style={styles.container}>
            
            <View style={styles.header}>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>Visit Information</Text>
                </View>
            </View>
            <RenderPaymentRow leftText={'Patient'} rightText={'Add Patient'} />
            <RenderPaymentRow leftText={'Pharmacy'} rightText={'Add Pharmacy'} />
            <RenderPaymentRow leftText={'Payment'} rightText={'Add Payment'} last={true}/>
                
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
        <View style={styles.labelInputWrapper}>
        <View style={styles.labelStyleWrapper}>
        {/* <FontAwesome name="circle" color={colors.TEXT_GREY_2} style={{marginLeft: res.scaleX(10)}} size={9} /> */}

            <Text allowFontScaling={false} style={styles.labelStyle}>{props.leftText}</Text>
        </View>
        <View style={styles.inputContainerOuter}>
            <TouchableOpacity
                hitSlop={chevronHitSlop}
                style={styles.inputContainerInner}
            >
                <Feather style={styles.chevronStyle} name="square" size={22} />
                <Text allowFontScaling={false} style={styles.inputStyle}>{props.rightText}</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: res.scaleX(15),
        paddingVertical: res.scaleY(10),
    },
    header: {
        flexGrow: .5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#eee',
        // width: res.DEVICE_WIDTH,

    },
    headerText: {
        fontSize: res.scaleFont(24),
        fontFamily: 'brandon-med',
        color: colors.TEXT_GREY_2,
        // backgroundColor: '#ccc',
        textAlign: 'center',
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
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    footerText: {
        fontFamily: 'brandon',
        marginBottom: res.scaleY(20),
        fontSize: res.scaleFont(18),
        color: colors.TEXT_GREY,
    },
    labelStyleWrapper:{
        flex:1.5, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderBottomColor: colors.TEXT_GREY_2,
        width: res.DEVICE_WIDTH * .9,
    },
    labelStyle: {
        // paddingVertical: res.scaleY(5),
        fontFamily: 'brandon-med',
        color: colors.TEXT_GREY_2,
        fontSize: res.scaleFont(28),
        marginLeft: res.scaleX(12),
        
    },
    inputContainerOuter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        padding: 10,
    },
    inputContainerInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputStyle: {
        fontFamily:'brandon-bold',
        color: colors.THEME_GREEN,
        fontSize: res.scaleFont(22),
    },
    chevronStyle: {
        marginRight: 10,
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
        marginBottom: res.scaleY(22),
        alignItems: 'center',
    },
    textInput: { 
        height: res.scaleY(100), 
        width: res.DEVICE_WIDTH * .85,
        backgroundColor: '#fff',
        borderColor: '#ccc', 
        shadowColor: '#ccc',
        fontFamily: 'brandon',
        borderWidth: .1,
        padding: 12,
        marginTop: res.scaleY(25),
        borderRadius: 2,
        lineHeight: res.scaleFont(36),
        fontSize: res.scaleFont(24),
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 12,
        shadowOpacity: 1,
        shadowColor: '#ccc',
    }
});