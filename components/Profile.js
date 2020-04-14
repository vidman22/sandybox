import * as React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import * as colors from '../constants/colors';
const DEVICE_WIDTH = Dimensions.get('window').width;

const Profile = ({route, navigation}) => {
    const {bio, image, name, index} = route.params;
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.nameImageWrapper}>
                <Image style={{ width: 190, height: 190, borderRadius: 95 }} source={{ uri: image }} /> 

            </View>
            <View style={styles.bioWrapper}>

            {bio.map((line, index) => {
                return <Text style={line.indexOf('Advocate') !== -1 ? styles.firstLine : styles.line} key={Math.random()}>{line}</Text>
            })}
            </View>
        </ScrollView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nameImageWrapper: {
        flex: 1,
        flexDirection: 'row',
        height: 200,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 24,
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginBottom: 12,
        width: DEVICE_WIDTH,
        textAlign: 'center',
        color: colors.THEME_GREEN,
        fontWeight: "700",
    },
    bioWrapper: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        padding: 20,
    },
    firstLine: {
        textAlign: 'center',
        padding: 4,
        fontSize: 18,
        lineHeight: 26,
        fontWeight: "500",
        marginBottom: 5,
    },  
    line:{
        padding: 4,
        fontSize: 18,
        lineHeight: 26,
    }

})