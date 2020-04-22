import React, { Component }  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import ErrorBoundary from './components/ErrorBoundary';
import SchedulingLanding from './components/SchedulingLanding';
import EpicGetOpenSlots from './components/EpicGetOpenSlots';
import ByTimeOrProvider from './components/ByTimeOrProvider';
import ProviderAvailability from './components/ProviderAvailability';
import Team from './components/Team';
import Profile from './components/Profile';
import ReasonForVisit from './components/ReasonForVisit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

const Stack = createStackNavigator();



export default class App extends Component {

  async componentDidMount(){
    try{
      await Font.loadAsync({
        'brandon-black': require('./assets/fonts/Brandon_blk.ttf'),
        'brandon-bold': require('./assets/fonts/Brandon_bld.ttf'),
        'brandon-bold-italic': require('./assets/fonts/Brandon_bld_it.ttf'),
        'brandon-med': require('./assets/fonts/Brandon_med.ttf'),
        'brandon': require('./assets/fonts/Brandon_reg.ttf')
      });
    }
    catch(error) {
      console.error(error);
    } finally{
      const isloaded = Font.isLoaded('brandon-med');
      const isBrandonloaded = Font.isLoaded('brandon');

      console.log("is it loaded", isloaded, isBrandonloaded);
    }

    
  }

  render() {
    return (
      <Provider store={store}>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Schedule" component={ByTimeOrProvider} />
            <Stack.Screen name="Open Slots" component={EpicGetOpenSlots} />
            <Stack.Screen name="Provider Schedule" component={SchedulingLanding} />
            <Stack.Screen name="Provider Availability" component={ProviderAvailability} />
            <Stack.Screen name="Reason" component={ReasonForVisit} />
            <Stack.Screen name="Our Team" component={Team} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
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
});
