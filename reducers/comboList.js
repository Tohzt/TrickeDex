const comboListReducer = (state = ["First ", "second "], action) => {
	switch(action.type){
		case 'SAVE_COMBO':
			return state;
		default:
			return state;
	}
};

export default comboListReducer;
