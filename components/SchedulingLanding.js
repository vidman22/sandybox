import React, { Component } from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/PCPs';

const DEVICE_WIDTH = Dimensions.get('window').width;
const statusBarHeight = Constants.statusBarHeight;

const ITEM_HEIGHT = 80;

function PCPInList({firstName, lastName, img, press, title}) {

    return (
        <View style={styles.pcpView}>
            <View style={styles.nameImgWrapper}>
                {img ? <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 6, marginRight: 12 }} source={{ uri: img }} /> : <MaterialCommunityIcons style={{ marginLeft: 12, fontSize: 40, }} name="doctor" color="grey" />}
                <Text>{firstName + ' ' + lastName + ', ' + title}</Text>
            </View>
            <TouchableOpacity style={styles.bookTouchableOpacity} onPress={() => press(firstName, lastName, img, title)}><Text style={styles.bookText}>Book</Text></TouchableOpacity>
        </View>
    )
}

class SchedulingLanding extends Component {
    
    RenderFlatListStickyHeader = () => {
        return <View style={{ width: "100%",  height: 0, alignItems: 'center', backgroundColor: 'white' }}></View>
    }
    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              paddingTop: 10,
              width: "100%",
              backgroundColor: "white",
            }}
          />
        );
      }

      pressed = (firstName, lastName, img, title) =>{
          console.log("pressed params", firstName, lastName, img, title);
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
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    style={styles.scrollContainer} 
                    renderItem={({item}) => <PCPInList firstName={item.firstName} lastName={item.lastName} title={item.title} press={this.pressed} img={item.img} getSchedule={this.props.getSchedule}/>}
                    keyExtractor={item => item.DEA}
                    ListHeaderComponent={this.RenderFlatListStickyHeader}
                    // stickyHeaderIndices={[1, 8]}
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
    pcpView: {
        flex: 1,
        // marginTop: -Constants.statusBarHeight,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    bookTouchableOpacity:{
        padding: 12,
        backgroundColor: colors.THEME_GREEN,
        borderRadius: 4,
        marginRight: 18,
    },
    bookText:{
        fontSize: res.scaleFont(18),
        color: 'white',
    }
})

