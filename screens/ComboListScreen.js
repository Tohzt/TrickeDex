import React from 'react';
import { 
	View,
	Text, 
	StyleSheet, 
	ScrollView,
	Button 
} from 'react-native';

// Custom Import
import TrickInSaved from '../components/TrickInSaved';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { clearComboList, addCombo } from '../actions/index';


export default function ComboListScreen(props) {

	const { navigate } = props.navigation;

	const comboList = useSelector(state => state.comboList);
	const dispatch = useDispatch();

	function _comboList() {
		var _combo = [];
		for (var i = 0; i < comboList.length; i++){
			_combo.push(<Text>-----------------------</Text>);
			var newCombo = comboList[i];
			for (var tr in newCombo){
				const trick = newCombo[tr].props.trick;
				const tr_pos = newCombo[tr].props.position;
				const tr_type = newCombo[tr].props.position;
				_combo.push(_trickButton(trick, tr_pos, tr_type))
			}
		}
		return (_combo)
	}

	function _trickButton(tr, tr_pos, tr_type) {
		return(
			<TrickInSaved 
				key={Math.random()*1000}
				trick={tr} 
				position={tr_pos}
				type={tr_type}
				tapTrick={_tapTrick}
			/>
		)
	}

	function _tapTrick() {
		alert('Edit Trick')
	}

	return (
		<View style={styles.container}>
			<View style={styles.scrollContainer}>
				<ScrollView 
					style={{width: '80%'}}
					contentContainerStyle={{alignItems: 'center'}}
				>
					{ _comboList() }
				</ScrollView>
			</View>
			<View style={styles.buttonContainer}>
				<Button title="Clear" onPress={() => dispatch(clearComboList())}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#888',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	scrollContainer: {
		height: '90%',
		width: '80%',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderColor: 'green',
		borderWidth: 2
	},
	buttonContainer: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	}
});
