import React, { Component } from 'react';

import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { res } from '../styles';

import * as colors from '../constants/colors';

import _ from 'lodash';

import scheduleData from '../EPICData/GetScheduleDaysForProvider.json';

const ITEM_HEIGHT = 40;


class ProviderAvailability extends Component {
        constructor(props){
        super(props);
        this.state = {
            schedule: [],
            stickyHeaderIndices: [],
            refreshing: true,
        };
    }

    componentDidMount(){

        let options = [];
        let headerIndices = [];
        for (let i =0; i < scheduleData.ScheduleDays.length; i++){
            const date = new Date(scheduleData.ScheduleDays[i].Date).toUTCString();
            const dateString = date.split(' ').slice(0, 4).join(' ');
            if (scheduleData.ScheduleDays[i].Slots.length === 0 ){
                // options.push({type: "day", date: dateString, key: Math.random()});
                // options.push({type: "slot", time: 'No Availability', key: Math.random()});
            } else {
                options.push({type: "day", date: dateString, key: Math.random()});
            }
            for (let k = 0; k < scheduleData.ScheduleDays[i].Slots.length; k++){

                let firstParsed = parseInt(scheduleData.ScheduleDays[i].Slots[k].Time.slice(0,2));
                let secondParsed = scheduleData.ScheduleDays[i].Slots[k].Time.slice(3,5);
                let AM_PM = ''
                if (firstParsed < 12) {
                    AM_PM = 'AM';
                } else{
                    AM_PM = 'PM';
                    firstParsed = firstParsed - 12;
                }
                const timeString = `${firstParsed.toString()}:${secondParsed} ${AM_PM}`;
                options.push({type: 'slot', time: timeString, key: Math.random()});
            }
        }
        for (let i = 0; i < options.length; i ++){
            if (options[i].type === 'day'){
                headerIndices.push(i);
            }
        }
        // console.log("options length ", options.length );
        // console.log("indices", headerIndices );

        this.setState({
            refreshing: false,
            schedule: options,
            stickyHeaderIndices: headerIndices
        });

    }

    pressed = (item) =>{
        this.props.navigation.navigate('Reason', {
            time: item.time
        });
    }

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              padding: 1,
              width: "100%",
              backgroundColor: '#eee',
            }}
          />
        );
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.pressed(item)}>
                {item.type === 'day' ? <View style={styles.date}><Text style={styles.dateText}>{item.date}</Text></View>: <View style={styles.slot}><Text style={styles.slotText}>{item.time}</Text></View>}
            </TouchableOpacity>
        );
    }

    render() {
        return (
                <FlatList 
                    refreshing={this.state.refreshing}
                    onRefresh={() => console.log("refresh fired")}
                    data={this.state.schedule} 
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    style={styles.scrollContainer} 
                    alwaysBounceVertical={false}
                    disableVirtualization={false}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key.toString()}
                    stickyHeaderIndices={this.state.stickyHeaderIndices}
                    // getItemLayout={(data, index)=> (
                    //     {length: ( ITEM_HEIGHT +2), offset: (ITEM_HEIGHT+2) * index, index}
                    // )}
                />
        );
    }
}

export default ProviderAvailability;


const styles = StyleSheet.create({
    pcpTextStyle:{
        width: 220,
        margin: 10,
        fontSize: res.scaleFont(36)
    },
    nameImageWrapper:{
        margin: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },  
    date:{
        justifyContent: 'center',
        alignItems: "flex-start",
        backgroundColor: colors.THEME_GREEN,
        height: ITEM_HEIGHT,
    },
    dateText:{
        color: 'white',
        fontSize: res.scaleFont(24),
        marginLeft: res.scaleX(12),
    },
    slot:{
        backgroundColor: colors.TEXT_LIGHT_GREY,
        height: ITEM_HEIGHT,
        justifyContent:'center',
        alignItems:'center',
        margin: 6,
        borderRadius: 8,
    },
    slotText:{
        fontSize: res.scaleFont(24)
    },
    scrollContainer:{
        flex: 1,
        width: res.DEVICE_WIDTH - 20,
        height: res.scaleY(300),
        overflow: 'scroll',
        marginTop: 0,
        paddingTop: 0,
        paddingLeft: 0,
    },
})
