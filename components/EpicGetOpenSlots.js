import React, { Component } from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import scheduleData from '../EPICData/GetOpenSlots2019.json';
// import scheduleData from '../EPICData/GetScheduleDaysForProvider.json';

import _ from 'lodash';

// import API from '../utils/API';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/PCPs';

import PCPInList from './PCPInList';


class EpicGetOpenSlots extends Component {
    constructor(props){
        super(props);
        this.state = {
            schedule: [],
            refreshing: true,
        };
    }


    componentDidMount(){

        // this is implementation fro GetOpenSlots2019 json response
        const options = scheduleData.Slots.map(slot => {
            
           return slot.AppointmentInfo.Appts.map(appt =>{
                // console.log("appt", appt);
                return appt.Pools.map(pool => {
                    // console.log(Array.isArray(pool.Options));
                    return pool.Options.map(opt =>{
                        // console.log(opt);
                        return opt;
                    });
                });
            });
        });


        console.log("schedule days for provider", options )
        let flatOptions = _.flattenDeep(options);

        this.setState({
            schedule: flatOptions,
            refreshing: false,
        });

    }

    pressed = (a, b, c, d, bookText) =>{
        console.log("pressed", bookText);
    }

    renderItem = ({item}) => {
        let firstParsed = parseInt(item.Time.slice(0,2));
        let secondParsed = item.Time.slice(3,5);
        let AM_PM = ''
        if (firstParsed < 12) {
            AM_PM = 'AM';
        } else{
            AM_PM = 'PM';
            firstParsed = firstParsed - 12;
        }
        const timeString = `${firstParsed.toString()}:${secondParsed} ${AM_PM}`;
        return (
            <View key={Math.random()}>
                {item.Provider.ID ? (
                    <PCPInList firstName={PCPs[0].firstName} lastName={PCPs[0].lastName} title={PCPs[0].title} press={this.pressed} img={PCPs[0].img} bookText={timeString}/>
                ) : null}
            </View>
            )
    };


    render() {


        return (

            <SafeAreaView>

                <FlatList 
                    refreshing={this.state.refreshing}
                    onRefresh={() => console.log("refresh fired")}
                    data={this.state.schedule} 
                    // ItemSeparatorComponent={this.FlatListItemSeparator}
                    style={styles.scrollContainer} 
                    alwaysBounceVertical={false}
                    disableVirtualization={false}
                    renderItem={this.renderItem}
                    keyExtractor={() => Math.random().toString()}
                    // stickyHeaderIndices={this.state.stickyHeaderIndices}
                    // getItemLayout={(data, index)=> (
                        //     {length: ( ITEM_HEIGHT +2), offset: (ITEM_HEIGHT+2) * index, index}
                        // )}
                        />
            </SafeAreaView>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(EpicGetOpenSlots);


const styles = StyleSheet.create({

});
