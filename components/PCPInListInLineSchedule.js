import React, { Component} from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, Animated} from 'react-native';

import { fonts, res } from '../styles';

import * as colors from '../constants/colors';

import { Feather } from '@expo/vector-icons';
import ProviderAvailabilityInline from './ProviderAvailabilityInline';

const ITEM_HEIGHT = res.scaleY(80)

class PCPInListInLineSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: false,
            height: new Animated.Value(ITEM_HEIGHT),
        }
    }
    
    toggleAnimation = () =>{
        this.setState(prevState => {
            return { toggled: !prevState.toggled}
        }, () => {
            Animated.timing(
                this.state.height,
                {
                    toValue: !this.state.toggled ? ITEM_HEIGHT : res.scaleY(350),
                    duration: !this.state.toggled ? 20 : 800,
                }
            ).start();
        })
            
    }                    

    render() {

        return (

            <Animated.View style={{...styles.pcpView, height: this.state.height }}>
                <View style={styles.nameImgIconWrapper}>
                    <View style={styles.nameImgWrapper}>
                        <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 6, marginRight: 12 }} source={{ uri: this.props.img }} />
                        <Text style={styles.pcpText}>{this.props.firstName + ' ' + this.props.lastName + ', ' + this.props.title}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.bookTouchableOpacity} 
                        onPress={() => this.toggleAnimation()}
                        >
                        <Feather style={{ marginLeft: 28, fontSize: res.scaleFont(30), color: colors.TEXT_GREY }} name={this.state.toggled ? "chevron-down" : "chevron-right"} />
                    </TouchableOpacity>
                </View>
                {this.state.toggled && <ProviderAvailabilityInline navigation={this.props.navigation} />}
            </Animated.View>

        )
    }
}

export default PCPInListInLineSchedule;


const styles = StyleSheet.create({
    nameImgWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingVertical: 10,
        height: ITEM_HEIGHT,
    },  
    nameImgIconWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingVertical: 10,
        width: res.DEVICE_WIDTH,
        height: ITEM_HEIGHT,
    },  
    pcpText:{
        fontSize: res.scaleFont(18),
    },
    pcpView: {
        flex: 1,
        width: res.DEVICE_WIDTH,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: .5,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    bookTouchableOpacity:{
        height: res.scaleY(79),
        paddingVertical: res.scaleY(0),
        width: res.scaleX(90),
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
})
