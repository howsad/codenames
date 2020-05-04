class CardState {
	constructor (role, popup = false) {
		this.role = role;
		this.popup = popup;
	}

	togglePopup() {
		return new CardState(this.role, !this.popup);
	}

	toggleable() {
		return this.role === 0;
	}

	resetPopup() {
		this.popup = false;
	}

	setRole(role) {
		this.role = role;
		this.popup = false;
	}

	pickFormVisible(capabilities) {
		if (!this.popup) {
			return false;
		}
		return capabilities.includes('pick');
	}
}

export default CardState;
