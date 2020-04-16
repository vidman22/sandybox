import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';
import * as colors from '../constants/colors';

const ByTimeOrProvider = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity  style={styles.scheduleButton} onPress={() => navigation.navigate('Open Slots')}>
                <Text style={styles.buttonText}>By Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scheduleButton}  onPress={() => navigation.navigate('Provider Schedule')}>
                <Text style={styles.buttonText}>By Provider</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ByTimeOrProvider;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    scheduleButton:{
        height: res.scaleFont(60),
        width: res.scaleX(200),
        backgroundColor: colors.THEME_GREEN,
        margin: res.scaleX(18),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },  
    buttonText: {
        color: 'white',
        fontSize: res.scaleFont(24),
    }
})