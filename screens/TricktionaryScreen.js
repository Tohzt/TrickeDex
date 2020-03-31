import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	ScrollView 
} from 'react-native';

// Redux Imports
import { TRICK_LIST } from '../data/data';
import TrickData from '../components/TrickData';

export default class TricktionaryScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = { _trickArray: [ <Text>Test</Text>] }
	}

	componentDidMount() {
		var _array = [
		];

		this.setState(() => ({ _trickArray: _array}));

		for (var i = 0; i < TRICK_LIST.length; i++) {
			_array.push(
				<TrickData trick={TRICK_LIST[i]}/>
			);
		}
	}

	_trickInfo_Handler() {
		alert('pop');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.dataContainer}>
					<Text>Trick: </Text>
					<Text>Takeoff: </Text>
					<Text>Landing: </Text>
				</View>
				<ScrollView>
					<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
						{this.state._trickArray}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3c3838',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dataContainer: {
		width: '100%',
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#444',
		borderWidth: 4,
	},
});
