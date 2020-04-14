import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import SchedulingLanding from './components/SchedulingLanding';
import Team from './components/Team';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers/reducers';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)


export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Team />
        {/* <SchedulingLanding /> */}
      </ErrorBoundary>
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
