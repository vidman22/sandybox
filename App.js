import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import SchedulingLanding from './components/SchedulingLanding';
import Team from './components/Team';
import Profile from './components/Profile';
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


export default function App() {

  return (
    <Provider store={store}>
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Our Team" component={Team} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
        {/* <SchedulingLanding /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
