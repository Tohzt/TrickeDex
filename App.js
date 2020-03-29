import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Navigation Imports
import { AppLoading } from 'expo';
import AppNavigator from './AppNavigator';
// Redux Imports
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';

const store = createStore(allReducers);

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigator/>
		</Provider>
	)
}
