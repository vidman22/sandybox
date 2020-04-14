import React, { Component } from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as actions from '../store/actions';

import PCPs from '../Lists/PCPs';

const DEVICE_WIDTH = Dimensions.get('window').width;
const statusBarHeight = Constants.statusBarHeight;

function PCPInList({firstName, lastName, img, getSchedule}) {

    return (
        <View style={styles.pcpView}>
            <View style={styles.nameImgWrapper}>
                {img ? <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 6, marginRight: 12 }} source={{ uri: img }} /> : <MaterialCommunityIcons style={{ marginLeft: 12, fontSize: 40, }} name="doctor" color="grey" />}
                <Text>{firstName + ' ' + lastName}</Text>
            </View>
            <TouchableOpacity style={styles.bookTouchableOpacity} onPress={() => getSchedule("here")}><Text style={styles.bookText}>Book</Text></TouchableOpacity>
        </View>
    )
}

class SchedulingLanding extends Component {
    
    RenderFlatListStickyHeader = () => {
        return <View style={{ width: "100%",  height: 30, alignItems: 'center', backgroundColor: 'white' }}><Text>Header</Text></View>
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

    render() {
        console.log("redux schedule", this.props.schedule)
        return (
            <SafeAreaView style={styles.scrollContainer}>

                <FlatList 
                    data={PCPs} 
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    style={styles.scrollContainer} 
                    renderItem={({item}) => <PCPInList firstName={item.firstName} lastName={item.lastName} img={item.img} getSchedule={this.props.getSchedule}/>}
                    keyExtractor={item => item.DEA}
                    ListHeaderComponent={this.RenderFlatListStickyHeader}
                    stickyHeaderIndices={[0, 8, 20]}
                    getItemLayout={(data, index)=> (
                        {length: 80, offset:80 * index  , index}
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
        height: 12,
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
        marginTop: statusBarHeight,
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
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    bookTouchableOpacity:{
        padding: 8,
        backgroundColor: '#3BC6A0',
        borderRadius: 4,
        marginRight: 12,
    },
    bookText:{
        color: 'white',
    }
})

