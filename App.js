import React, { Component }  from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Provider } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ErrorBoundary from './components/ErrorBoundary';
import SchedulingLanding from './components/SchedulingLanding';
import EpicGetOpenSlots from './components/EpicGetOpenSlots';
import ByTimeOrProvider from './components/ByTimeOrProvider';
import ProviderAvailability from './components/ProviderAvailability';
import Team from './components/Team';
import Profile from './components/Profile';
import ReasonForVisit from './components/ReasonForVisit';
import WaitingRoom from './components/WaitingRoom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookAppointment from './components/BookAppointment';
import BookAppointmentFormLook from './components/BookAppointmentFormLook';


const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

const Stack = createStackNavigator();



export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loaded: false,
    }
  }
  

  async componentDidMount(){
    try{
      await Font.loadAsync({
        'brandon-black': require('./assets/fonts/Brandon_blk.ttf'),
        'brandon-bold': require('./assets/fonts/Brandon_bld.ttf'),
        'brandon-bold-italic': require('./assets/fonts/Brandon_bld_it.ttf'),
        'brandon-med': require('./assets/fonts/Brandon_med.ttf'),
        'brandon': require('./assets/fonts/Brandon_reg.ttf'),
        'brandon-grotesque-med': require('./assets/fonts/BrandonGrotesque-Medium.ttf'),
        'brandon-grotesque-bold': require('./assets/fonts/BrandonGrotesque-Bold.ttf'),
        'brandon-grotesque-reg': require('./assets/fonts/BrandonGrotesque-Regular.ttf'),
      });
    }
    catch(error) {
      console.error(error);
    } finally{
      // const isloaded = Font.isLoaded('brandon-med');
      // const isBrandonloaded = Font.isLoaded('brandon');
      // const inBrandonBoldLoaded = Font.isLoaded('brandon-bold');
      // const isBrandonGrotesqueloaded = Font.isLoaded('brandon-grotesque-bold');

      // console.log("is it loaded", isloaded, isBrandonloaded, isBrandonGrotesqueloaded, inBrandonBoldLoaded);
      this.setState({
        loaded: true,
      })
    }

    
  }

  render() {
    return (
      
      <Provider store={store}>
        {this.state.loaded ? (
          <NavigationContainer>
            <Stack.Navigator>

            <Stack.Screen 
              name="Schedule" 
              component={ByTimeOrProvider} 
              options={{ 
                headerTitle:() => <Image style={styles.logoStyle} resizeMode='contain' source={require('./assets/logo-pink.png')} />,
                headerLeft: () => <Image  style={styles.menuIconStyle} source={require('./assets/menu.png')} resizeMode='contain' /> 
            }} />
            <Stack.Screen name="Open Slots" component={EpicGetOpenSlots}
              options={{ 
                headerTitle: () => <Image style={styles.logoStyle} resizeMode='contain' source={require('./assets/logo-pink.png')} />,
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="Provider Schedule" component={SchedulingLanding} 
              options={{ 
                headerTitle: () =>  <Image style={styles.logoStyle} resizeMode='contain' source={require('./assets/logo-pink.png')} />,
                headerBackTitleVisible: false,
              }} />
            <Stack.Screen name="Provider Availability" component={ProviderAvailability} 
              options={{ 
                headerTitle: () =>  <Image style={styles.logoStyle} resizeMode='contain' source={require('./assets/logo-pink.png')} />,
                headerBackTitleVisible: false,
            }} />
            <Stack.Screen name="Waiting Room" component={WaitingRoom} />
            <Stack.Screen name="Book Appointment"  component={BookAppointment} 
              options={{ 
                headerTitle: () =>  <Image style={styles.logoStyle} resizeMode='contain' source={require('./assets/logo-pink.png')} />,
              headerBackTitleVisible: false,
            }} />
            
            <Stack.Screen name="Our Team" component={Team} />
            <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        ): null}
        </Provider>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    marginTop: 5,
    alignSelf: 'center',
    width: 140,
    height: 35,
},
menuIconStyle: {
  marginLeft: 15,
  width: 22,
  height: 15,
  marginRight: 15
},
});
