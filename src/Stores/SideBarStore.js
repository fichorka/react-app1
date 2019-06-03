import { observable, action, computed } from 'mobx';

class SideBarStore {
	@observable items = {};

	@action initializeStore = (items) => {
		this.items = {};
		items.forEach(item => {
			this.items[item.name] = {label: item.label, show: item.show || false}
		})
	}
}

const sideBarStore = new SideBarStore();
export default sideBarStore;