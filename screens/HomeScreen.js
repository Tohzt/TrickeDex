import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ScreenOrientation } from 'expo';


export default class Home extends React.Component {
	constructor(props){
		super(props);
	}

	render () {
		const { navigate } = this.props.navigation; 

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('ComboGen')}
				>
					<Text style={styles.btnText}>To Combo Gen</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('ComboList')}
				>
					<Text style={styles.btnText}>To Combo List</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('TrickList')}
				>
					<Text style={styles.btnText}>To Tricktionary</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ebebeb'
	},
	buttonContainer: {
		backgroundColor: '#222',
		borderRadius: 5,
		padding: 10,
		margin: 20
	},
	btnText: {
		fontSize: 20,
		color: '#fff'
	}
})

