import React, { Component } from 'react';
import {View} from 'react-native';

class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError (error) {
      return { hasError: true }
    }
  
    componentDidCatch (error, info) {
      logErrorToService(error, info.componentStack)
    }
  
    render () {
      return this.state.hasError
        ? <View>Oops</View>
        : this.props.children
    }
  }

export default ErrorBoundary;
