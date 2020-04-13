import React from 'react';
import {
	Button
} from 'react-native';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { addCombo } from '../actions/index';

const SaveCombo = (props) => {

	// Redux Variables
	const comboList = useSelector((state) => state.comboList)
	const dispatch = useDispatch();

	function _saveNewCombo() {
		if (props.combo.length > 0){
			if (comboList.includes(props.combo))
				alert('Error\nDuplicate Combo!');
			else
				dispatch(addCombo(props.combo));
		}
		else
			alert('No Combo')
	}

	return (
		<Button 
			title={"Save"} 
			onPress={() => _saveNewCombo()}
		/>
	);
}

export default SaveCombo;
