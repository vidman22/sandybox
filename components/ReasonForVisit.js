import React from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

import {res} from '../styles';
import * as colors from '../constants/colors';


export default function ReasonForVisit({navigation, route}){
    const [value, onChangeText] = React.useState('');


    return (
        <View style={styles.container}>
            {/* <Text>{route.params.time}</Text> */}
            <TextInput 
                style={styles.textInput} 
                onChangeText={text => onChangeText(text)} 
                value={value} 
                multiline
                placeholder='What is your reason for visit?'
                placeholderTextColor="grey"
                maxLength={144}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    placeholderText: {
        color: '#ccc',
        fontSize: res.scaleFont(16)
    },
    buttonWrapper:{
        alignItems: 'flex-end',
    },
    nextButton:{
        backgroundColor: colors.THEME_GREEN,
        color: '#fff',
        height: res.scaleY(45),
        width: res.scaleX(90),
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: res.scaleY(22),
        marginHorizontal: res.scaleX(22),
        
    },
    nextButtonText:{
        color: '#fff',
        fontSize: res.scaleFont(24),
    },
    textInput: { 
        height: 90, 
        backgroundColor: '#fff',
        borderColor: 'gray', 
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 12,
        shadowOpacity: 1,
        borderWidth: .2,
        padding: 12,
        marginTop: res.scaleY(90),
        marginHorizontal: res.scaleX(12),
        borderRadius: 4,
        lineHeight: res.scaleFont(30),
        fontSize: res.scaleFont(20)
    }
})