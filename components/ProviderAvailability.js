import React, { Component } from 'react';

import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ProviderModal from './Modal';

import { headerStyle, fonts, hideHeaderStyle, res } from '../styles';

import * as colors from '../constants/colors';

import _ from 'lodash';

import scheduleData from '../EPICData/GetScheduleDaysForProvider.json';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        this.props.navigation.navigate('Book Appointment', {
            time: item.time
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
            <TouchableOpacity onPress={() => this.pressed(item)}>
                {item.type === 'day' ? <View style={styles.date}><Text style={styles.dateText}>{item.date}</Text></View>: <View style={styles.slot}><Text style={styles.slotText}>{item.time}</Text></View>}
            </TouchableOpacity>
        );
    }

    render() {
        console.log("index in availability ", this.props.route.params.index);
        return (
            <SafeAreaView style={styles.scrollContainer}>
                <Provider index={this.props.route.params.index} route={this.props.route} toggleModal={this.toggleModal}/>
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
                <ProviderModal modalOpen={this.state.modalOpen} providerIndex={this.props.route.params.index} toggleModal={this.toggleModal} />
            </SafeAreaView>
        );
    }
}

export default ProviderAvailability;



const Provider = ({route, toggleModal}) => {
    // console.log("route params ",  route.params);
    const { name, img,} = route.params;
    return (
        <TouchableOpacity onPress={() => toggleModal()}>

            <View style={styles.nameImageWrapper}>
                <Image style={{ width: 90, height: 90, borderRadius: 45 }} source={{ uri: img }} /> 
                <Text style={styles.pcpTextStyle}>{ name }</Text>
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
