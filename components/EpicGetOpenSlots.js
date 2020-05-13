import React, { Component } from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, Animated} from 'react-native';
import Constants from 'expo-constants';
import {connect} from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import moment from 'moment';

import ProviderModal from './Modal';

import scheduleData from '../EPICData/GetOpenSlots2019.json';
// import scheduleData from '../EPICData/GetScheduleDaysForProvider.json';

import _ from 'lodash';

// import API from '../utils/API';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/providers.json';

import PCPInList from './PCPInList';

const ITEM_HEIGHT = 80;

class EpicGetOpenSlots extends Component {
    constructor(props){
        super(props);
        this.state = {
            schedule: [],
            refreshing: true,
            modalOpen: false,
            providerIndex: 0,
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


       
        let flatOptions = _.flattenDeep(options);

        this.setState({
            schedule: flatOptions,
            refreshing: false,
        });

    }

    pressed = (index, firstBeginTime, secondBeginTime) =>{
        this.props.navigation.navigate('Book Appointment', {
            index,
            firstBeginTime,
            secondBeginTime,
        });
    }

    renderItem = ({item}) => {
        let time = item.Time;
        //Add fifteen minutes to create a start time range
        // console.log("second time ", secondTime);
        
        const firstBeginTime = moment(time, 'hh:mm:ss A').format('h:mm A');
        const secondBeginTime = moment(time, 'hh:mm:ss A').add(15, 'minutes').format('h:mm A');
        const index = 3; //Math.floor(Math.random()* Math.floor(43));
        return (
            <View key={Math.random()}>
                {item.Provider.ID ? (
                    <PCPInList name={PCPs.resolver[index].name} index={PCPs.resolver[index].index} toggleModal={this.toggleModal} press={this.pressed} img={PCPs.resolver[index].image} firstBeginTime={firstBeginTime} secondBeginTime={secondBeginTime}/>
                ) : null}
            </View>
            )
    };

    toggleModal = (providerIndex) => {
        this.setState( prevState => {
            return {
                modalOpen: !prevState.modalOpen,
                providerIndex,
            }
        })
    }

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
                    getItemLayout={(data, index) => (
                        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                      )}
                        />
                <ProviderModal modalOpen={this.state.modalOpen} providerIndex={this.state.providerIndex} toggleModal={this.toggleModal} />
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
