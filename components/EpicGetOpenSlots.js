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
import { ScrollView } from 'react-native-gesture-handler';

const DEVICE_WIDTH = Dimensions.get('window').width;
const statusBarHeight = Constants.statusBarHeight;

class EpicGetOpenSlots extends Component {
    constructor(props){
        super(props);
        this.state = {
            schedule: {},
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

        console.log("options again", flatOptions);

        this.setState({schedule: flatOptions});

    }


    render() {
        // console.log("redux schedule", this.props.schedule);
        console.log("schedule", this.state.schedule);

        return (
            <ScrollView>
                {this.state.schedule.length ? this.state.schedule.map(opt => {
                    return (
                        <View key={Math.random()}>
                            <Text>{opt.Provider.ID}</Text>
                            <Text>{opt.Duration}</Text>
                            <Text>{opt.Time}</Text>
                        </View>
                    )
                }): null}
                {/* {this.state.schedule.ScheduleDays ? this.state.schedule.ScheduleDays.map(day => {
                    return (
                        <View key={Math.random()}>
                            <Text>{day.Date}</Text>
                            {day.Slots.map(slot => {
                                return <Text key={Math.random()}>{slot.Time}</Text>
                            })}
                        </View>
                    )
                }): null} */}
            </ScrollView>
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
