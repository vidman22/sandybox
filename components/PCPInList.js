import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native';

import { res } from '../styles';

import * as colors from '../constants/colors';

import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const ITEM_HEIGHT = 80;

const PCPInList = ({name, img, press, title, bookText, toggleModal, index}) => {
    return (
            <View style={styles.pcpView}>
                <View style={styles.nameImgWrapper}>
                    {img ? <Image style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 6, marginRight: 12 }} source={{ uri: img }} /> : <MaterialCommunityIcons style={{ marginLeft: 12, fontSize: 40, }} name="doctor" color="grey" />}
                    <View style={styles.nameButtonWrapper}>
                        <Text style={styles.pcpText}>{name}</Text>
                        <TouchableOpacity style={styles.viewProfileButton} onPress={() => toggleModal(index)}>
                            <Text style={styles.pcpViewProfileText}>View Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={bookText === 'Book' ? styles.bookTouchableOpacity : styles.bookTimeTouchableOpacity} onPress={() => press(name, img, title, bookText)}>{bookText === 'Book' ? <Feather style={{ marginLeft: 52, fontSize: 28, color: colors.TEXT_GREY }} name="chevron-right" /> : <Text style={styles.bookText}>{bookText}</Text>}</TouchableOpacity>
            </View>
        )
}

export default PCPInList;


const styles = StyleSheet.create({
    nameImgWrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },  
    pcpText:{
        fontSize: res.scaleFont(18),
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
        height: res.scaleY(45),
        width: res.scaleX(90),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginRight: 18,
    },
    bookTimeTouchableOpacity:{
        height: res.scaleY(45),
        width: res.scaleX(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.THEME_GREEN,
        borderRadius: 4,
        marginRight: 18,
    },
    bookText:{
        fontSize: res.scaleFont(20),
        color: 'white',
    },
    nameButtonWrapper:{
        flex: 1,
        marginTop: res.scaleY(20),
        flexDirection: 'column',
        alignContent: 'flex-end',
    },
    viewProfileButton:{
        fontSize: res.scaleFont(16),
    },
    pcpViewProfileText:{
        color: colors.TEXT_GREY,
        marginTop: res.scaleY(3),
        marginLeft: res.scaleX(3),
    }
})
