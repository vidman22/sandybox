import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image
} from "react-native";

import { Feather } from '@expo/vector-icons';
import { fonts, res , hasHeaderStyle} from '../styles';

import {headerLeftHitSlop} from '../constants/props';
import * as colors from '../constants/colors';
import PCPs from '../Lists/providers.json';
import { TouchableOpacity } from "react-native-gesture-handler";

const ProviderModal = (props) => {
    // console.log("index in provider", props.providerIndex)
    const PCP = PCPs.resolver[props.providerIndex];
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalOpen}
        style={styles.centeredView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.closeButton}
                    hitSlop={{
                      top: 30,
                      bottom: 30,
                      left: 50,
                      right: 30
                    }}
                    onPress={() => {
                        props.toggleModal(props.providerIndex);
                    }}
                >
                    <Feather style={styles.closeButtonX} name="x" />
                </TouchableOpacity>
              </View>
            {PCP && <Profile bio={PCP.bio} image={PCP.image} name={PCP.name}  />}
          </View>
        </View>
      </Modal>
    )
}

const Profile = (props) => {
    const {bio, image, name, index} = props;
    return (
        <ScrollView style={styles.container}>
                <View style={styles.banner}>
                </View>
                
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{ uri: image }} /> 
                </View>
                    <Text style={styles.name}>{name}</Text>

                <View style={styles.bioWrapper}>

                {bio.map((line, index) => {
                    return <Text style={line.indexOf('Advocate') !== -1 ? styles.firstLine : styles.line} key={Math.random()}>{line}</Text>
                })}
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: colors.THEME_GREEN,
      overflow: 'hidden',
    },
    buttonView:{
        width: res.DEVICE_WIDTH,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    closeButtonX: {
        fontSize: res.scaleFont(36),
    },
    closeButton: {
        borderRadius: 20,
        padding: 20,
        paddingTop: 26,
        backgroundColor: '#fff',
      },
    modalView: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 2,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    container: {
      flex: 1,
      // backgroundColor: colors.THEME_GREEN,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    backgoundImage:{
        flex: 1,
        flexDirection: 'row',
        height: 152,
        width: res.DEVICE_WIDTH,
        paddingTop: res.scaleY(40),
    },
    banner: {
        flex: 1,
        flexDirection: 'row',
        height: 150,
        padding: 10,
        paddingTop: res.scaleY(40),
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.THEME_GREEN

    },
    imageWrapper:{
        flex: 1,
        alignItems:'center',
    },
    image:{
        marginTop: -100,
        height: 200,
        width: 200, 
        borderRadius: 100,
    },
    name: {
        fontSize: res.scaleFont(30),
        flex: 1,
        marginTop: res.scaleY(12),
        width: res.DEVICE_WIDTH,
        textAlign: 'center',
        color: colors.THEME_GREEN,
        fontWeight: "700",
        fontFamily: 'brandon-med',
    },
    bioWrapper: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        paddingTop: res.scaleY(10),
        paddingBottom: res.scaleY(30),
        paddingHorizontal: res.scaleX(24),
        backgroundColor: '#fff',
    },
    firstLine: {
        textAlign: 'center',
        fontSize: res.scaleFont(26),
        lineHeight: res.scaleFont(36),
        fontWeight: "500",
        marginBottom: 5,
        fontFamily: 'brandon-med',
    },  
    line:{
        paddingTop: 6,
        paddingHorizontal: 4,
        fontSize: res.scaleFont(24),
        lineHeight: res.scaleFont(36),
        fontFamily: 'brandon'
    }

  });

export default ProviderModal;