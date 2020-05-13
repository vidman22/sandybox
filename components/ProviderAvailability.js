import React, { Component } from 'react';

import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ProviderModal from './Modal';

import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';

import moment from 'moment';

import * as colors from '../constants/colors';

import _ from 'lodash';

import scheduleData from '../EPICData/GetScheduleDaysForProvider.json';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import PCPs from '../Lists/providers.json';

const ITEM_HEIGHT = 80;


class ProviderAvailability extends Component {
        constructor(props){
        super(props);
        this.state = {
            schedule: [],
            stickyHeaderIndices: [],
            refreshing: true,
            providerIndex: null,
            modalOpen: false,
        };
    }

    componentDidMount(){

        let options = [];
        let headerIndices = [];
        for (let i =0; i < scheduleData.ScheduleDays.length; i++){
            const date = new Date(scheduleData.ScheduleDays[i].Date).toUTCString();
            const dateString = date.split(' ').slice(0, 4).join(' ');
            if (scheduleData.ScheduleDays[i].Slots.length === 0 ){
                //return nothing if there are no slots for that day
            } else {
                options.push({type: "day", date: dateString, key: Math.random()});
            }
            for (let k = 0; k < scheduleData.ScheduleDays[i].Slots.length; k++){
                const time = scheduleData.ScheduleDays[i].Slots[k].Time.toString();
                //Add fifteen minutes to create a start time range
                const secondTime = moment(time, 'hh:mm:ss A').add(15, 'minutes').format('h:mm A');
                // console.log("second time ", secondTime);
           
                const momentTime = moment(time, 'hh:mm:ss A').format('h:mm A');
                const secondMomentTime =  secondTime;

                options.push({type: 'slot', firstBeginTime: momentTime, secondBeginTime: secondMomentTime, key: Math.random(), date: dateString});
            }
        }
        for (let i = 0; i < options.length; i ++){
            if (options[i].type === 'day'){
                headerIndices.push(i);
            }
        }

        this.setState({
            refreshing: false,
            schedule: options,
            stickyHeaderIndices: headerIndices
        });

    }

    pressed = (item) =>{
        this.props.navigation.navigate('Book Appointment', {
            index: this.props.route.params.index,
            firstBeginTime: item.firstBeginTime,
            secondBeginTime: item.secondBeginTime,
            date: item.date,
        });
    }

    toggleModal = (providerIndex) => {
        this.setState(prevState => {
            return {
                providerIndex,
                modalOpen: !prevState.modalOpen,
            }
        })
    }

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              padding: 2,
              width: "100%",
              backgroundColor: '#eee',
            }}
          />
        );
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity disabled={item.type === 'day'} onPress={() => this.pressed(item)}>
                {item.type === 'day' ? <View style={styles.date}><Text style={styles.dateText}>{item.date}</Text></View>: <View style={styles.slot}><Text style={styles.slotText}>{item.firstBeginTime}</Text></View>}
            </TouchableOpacity>
        );
    }

    render() {
        const {index}  = this.props.route.params;
        return (
            <SafeAreaView style={styles.scrollContainer}>
                <Provider index={index} toggleModal={this.toggleModal}/>
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
                <ProviderModal modalOpen={this.state.modalOpen} providerIndex={index} toggleModal={this.toggleModal} />
            </SafeAreaView>
        );
    }
}

export default ProviderAvailability;



const Provider = ({index, toggleModal}) => {

    return (
        <TouchableOpacity onPress={() => toggleModal()}>

            <View style={styles.nameImageWrapper}>
                <Image style={{ width: 90, height: 90, borderRadius: 45 }} source={{ uri: PCPs.resolver[index].image }} /> 
                <Text style={styles.pcpTextStyle}>{ PCPs.resolver[index].name }</Text>
            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    pcpTextStyle:{
        width: 220,
        fontFamily: 'brandon-med',
        margin: 10,
        fontSize: res.scaleFont(26)
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
        backgroundColor: colors.TEXT_GREY,
        height: ITEM_HEIGHT/2,
    },
    dateText:{
        color: 'white',
        fontFamily: 'brandon',
        fontSize: res.scaleFont(24),
        marginLeft: res.scaleX(12),
    },
    slot:{
        backgroundColor: colors.THEME_GREEN,
        height: ITEM_HEIGHT,
        justifyContent:'center',
        alignItems:'center',
        margin: 8,
        borderRadius: 8,
    },
    slotText:{
        fontSize: res.scaleFont(24),
        fontFamily: 'brandon',
        color: '#fff',
    },
    scrollContainer:{
        flex: 1,
        marginTop: 0,
        paddingTop: 0,
        paddingLeft: 0,
    },
})
