export const addCombo = (combo) => {
	return {
		type: 'ADD_COMBO',
		payload: combo
	}
};

export const clearComboList = () => {
	return {
		type: 'DEL_ALL'
	}
};

