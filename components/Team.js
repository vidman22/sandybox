import React, { Component } from 'react';
import {FlatList, View, Text, StyleSheet, Image, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PCPs from '../Lists/providers.json';

const DEVICE_WIDTH = Dimensions.get('window').width;
const statusBarHeight = Constants.statusBarHeight;

function PCPInList({name, img, index, bio, press}) {

    return (
        <View style={styles.pcpView}>
            <TouchableOpacity style={styles.nameImgWrapper} onPress={() => press(index, img, name, bio)}>
                {img ? <Image style={{ width: 120, height: 120, borderRadius: 60, marginLeft: 12, marginRight: 12 }} source={{ uri: img }} /> : <MaterialCommunityIcons style={{ fontSize: 110, }} name="doctor" color="grey" />}
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

class Team extends Component {

    // FlatListItemSeparator = () => {
    //     return (
    //       <View
    //         style={{
    //           width: "100%",
    //         }}
    //       />
    //     );
    // }

    pressed = (index, image, name, bio) =>{
        this.props.navigation.navigate('Profile', {
            index,
            image,
            name, 
            bio
        })
    }

    render() {

        return (

            <SafeAreaView style={styles.scrollContainer}>
                <FlatList 
                    data={PCPs.resolver} 
                    style={styles.scrollContainer} 
                    renderItem={({item}) => <PCPInList name={item.name} index={item.index} press={this.pressed} bio={item.bio} img={item.image} getSchedule={this.props.getSchedule}/> }
                    keyExtractor={item => item.index}
                    numColumns={2}
                    horizontal={false}
                    getItemLayout={(data, index)=> (
                        {length: 80, offset:80 * index  , index}
                    )}
                />
            </SafeAreaView>

        )
    }
}


export default Team;

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
    },
    name:{
        fontSize: 16,
        marginTop: 14,
        color: colors.THEME_GREEN,
    },  
    teamTitle:{
        fontSize: 22,
        marginTop: 12,
        color: colors.THEME_GREEN,
        textAlign: 'center',
    },
    nameImgWrapper:{
        flex: 1,
        alignItems: 'center',
    },  
    listWrapper:{
        flex: 1,
        height: 1000,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    pcpView: {
        // marginTop: -Constants.statusBarHeight,
        width: DEVICE_WIDTH/2,
        height: 200,
        flexDirection: 'column',
        paddingTop: 10,
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        // backgroundColor: '#fff'
    }
})

