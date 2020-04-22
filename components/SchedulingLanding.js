import React, { Component } from 'react';
import {KeyboardAvoidingView, View, FlatList, TextInput, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import ProviderModal from './Modal';

import { res, fonts } from '../styles';

import * as actions from '../store/actions';

import * as colors from '../constants/colors';

import PCPs from '../Lists/providers.json';

import PCPInList from './PCPInList';
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

    pressed = (name , img) =>{
        this.props.navigation.navigate('Provider Availability', {
            name,
            img,
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
                <TextInput 
                    onChangeText={searchValue => this.onChange(searchValue)}
                    value={this.state.searchValue}
                    style={styles.textInput}
                    placeholder="Search"
                />
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
        paddingVertical: res.scaleY(5),
        paddingHorizontal: res.scaleX(12),
        fontSize: res.scaleFont(26), 
        lineHeight: res.scaleFont(30),
        fontFamily: 'brandon',
        // borderColor: '#ccc',
        // borderRadius: 4,
        // borderWidth: 0.5,
        margin: 4,
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

