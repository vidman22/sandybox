import React, { Component } from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/PCPs';

import PCPInList from './PCPInList';

const ITEM_HEIGHT = 80;

{/* <PCPInList firstName={} lastName={} img={} press={} title={} />

function PCPInList({firstName, lastName, img, press, title}) {

    return (
        <View style={styles.pcpView}>
            <View style={styles.nameImgWrapper}>
                {img ? <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 6, marginRight: 12 }} source={{ uri: img }} /> : <MaterialCommunityIcons style={{ marginLeft: 12, fontSize: 40, }} name="doctor" color="grey" />}
                <Text style={styles.pcpText}>{firstName + ' ' + lastName + ', ' + title}</Text>
            </View>
            <TouchableOpacity style={styles.bookTouchableOpacity} onPress={() => press(firstName, lastName, img, title)}><Text style={styles.bookText}>Book</Text></TouchableOpacity>
        </View>
    )
} */}

class SchedulingLanding extends Component {
    
    RenderFlatListStickyHeader = () => {
        return <View style={{ width: "100%",  height: 0, alignItems: 'center', backgroundColor: 'white' }}></View>
    }

      pressed = (firstName, lastName, img, title) =>{
        //   console.log("pressed params", firstName, lastName, img, title);
        this.props.navigation.navigate('Provider Availability', {
            firstName,
            lastName,
            img,
            title,
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.scrollContainer}>

                <FlatList 
                    data={PCPs} 
                    style={styles.scrollContainer} 
                    renderItem={({item}) => <PCPInList firstName={item.firstName} lastName={item.lastName} title={item.title} press={this.pressed} img={item.img} getSchedule={this.props.getSchedule} bookText={'Book'}/>}
                    keyExtractor={item => item.DEA}
                    // ListHeaderComponent={this.RenderFlatListStickyHeader}
                    getItemLayout={(data, index)=> (
                        {length: ITEM_HEIGHT, offset:ITEM_HEIGHT * index  , index}
                    )}
                />
            </SafeAreaView>

        )
    }
}

function mapStateToProps(state) {
    return { schedule: state}
}

const mapDispatchToProps = dispatch =>{
    return {
        getSchedule: (dummy) => dispatch( actions.getOpenSlots(dummy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulingLanding);


const styles = StyleSheet.create({
    timeHeader:{
        height: 0,
        color: "#eee",
    },
    nameImgWrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },  
    scrollContainer:{
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingLeft: 0,
    },
    pcpText:{
        fontSize: res.scaleFont(18),
    },
    pcpView: {
        flex: 1,
        // marginTop: -Constants.statusBarHeight,
        width: res.DEVICE_WIDTH,
        flexDirection: 'row',
        paddingVertical: res.scaleY(14),
        paddingLeft: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: .5,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    bookTouchableOpacity:{
        paddingVertical: res.scaleY(12),
        paddingHorizontal: res.scaleX(16),
        backgroundColor: colors.THEME_GREEN,
        borderRadius: 4,
        marginRight: 18,
    },
    bookText:{
        fontSize: res.scaleFont(18),
        color: 'white',
    }
})

