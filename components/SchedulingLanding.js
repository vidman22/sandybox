import React, { Component } from 'react';
import {KeyboardAvoidingView, View, FlatList, TextInput, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import ProviderModal from './Modal';

import { res, fonts } from '../styles';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/providers.json';

import PCPInList from './PCPInList';

import { MaterialCommunityIcons } from '@expo/vector-icons';
// import PCPInListInLineSchedule from './PCPInListInLineSchedule';

const ITEM_HEIGHT = 80;


const getSuggestions = value => {
    let updatedPCPs = {...PCPs};
    let updatedResolver = [...updatedPCPs.resolver];
    let suggestions = [];
        // console.log('search value', this.state.searchValue);
    const inputValue = value.trim().toLowerCase().split(" ");
    const inputLength = inputValue.length;
        for (let i = 0; i < inputLength; i++){
          for (let j = 0; j < updatedResolver.length; j++ ){
              if (updatedResolver[j].name.toLowerCase().indexOf(inputValue[i]) !== -1){
                  suggestions.push(updatedResolver[j]);
              }
          }   
        }
    return suggestions = suggestions.filter((a, b) => suggestions.indexOf(a) === b );
}

class SchedulingLanding extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             modalOpen: false,
             providerIndex: 0,
             searchValue: '',
             suggestions: PCPs.resolver,
        }
    }

    pressed = (name , img, title, booktext, index) =>{
        console.log("schedule landing", index);
        this.props.navigation.navigate('Provider Availability', {
            name,
            img,
            index,
        });
    }

    toggleModal = (providerIndex) => {

        this.setState( prevState => {
            return {
                modalOpen: !prevState.modalOpen,
                providerIndex,
            }
        })
    }

    onChange = (text) => {
        this.setState({
            searchValue: text,
            suggestions: getSuggestions(text),
        })
    }

    render() {


        return (
            <KeyboardAvoidingView style={styles.scrollContainer}>
                <View style={styles.searchIconTextWrapper}>
                    <MaterialCommunityIcons style={styles.magnifyIcon} name="magnify" />
                    <TextInput 
                        onChangeText={searchValue => this.onChange(searchValue)}
                        value={this.state.searchValue}
                        style={styles.textInput}
                        placeholder='Search Provider'
                    />
                </View>
                <FlatList 
                    data={this.state.suggestions } 
                    style={styles.flatListContainer} 
                    renderItem={({item}) => <PCPInList index={item.index} toggleModal={this.toggleModal} navigation={this.props.navigation} name={item.name} press={this.pressed} img={item.image} getSchedule={this.props.getSchedule} bookText={'Book'}/>}
                    keyExtractor={item => item.index.toString()}
                    getItemLayout={(data, index) => (
                        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                      )}
                />
                <ProviderModal modalOpen={this.state.modalOpen} providerIndex={this.state.providerIndex} toggleModal={this.toggleModal} />
            </KeyboardAvoidingView>

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
    searchIconTextWrapper: {
        flex: .1, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    magnifyIcon: {
        fontSize: res.scaleFont(30),
        padding: 10,
        color: colors.TEXT_LIGHT_GREY,
    },
    nameImgWrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },  
    scrollContainer:{
        flex: 1,
    },
    flatListContainer:{
        flex: 1,
    },
    pcpText:{
        fontSize: res.scaleFont(18),
    },
    textInput: {
        marginVertical: res.scaleY(10),
        paddingHorizontal: res.scaleX(0),
        fontSize: res.scaleFont(30),
        height: res.scaleY(36),
        fontFamily: 'brandon',
        // margin: 4,
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

