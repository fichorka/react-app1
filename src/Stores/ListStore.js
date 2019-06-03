import { observable, action, computed } from 'mobx';

class ListStore {
	@observable list = [];

	@observable dataStore = {};

	@observable listState = {};

	@action initializeListStore(dataStore, options = {}) {
		this.dataStore = dataStore;
		this.listState = {
			page: options.page || 1,
			itemsPerPage: options.itemsPerPage || 10,
			filter: '',
			get totalPages() { return Math.ceil(this.totalItems / this.itemsPerPage) },
			get totalItems() { return listStore.dataStore.data.length; },
			get sortOrder() { return listStore.dataStore.currentSortState.sortOrder },
			get sortKey() { return listStore.dataStore.currentSortState.sortKey },
			get displayedItems() { return listStore.extractItems().length }
		};
	}

	filterData() {
		let { filter } = this.listState;
		filter = filter.toLowerCase();
		if (filter.length) {
			// debugger;
			return this.dataStore.data.slice().filter(item => {
				var checkFilter = false;
				Object.keys(item).forEach(name => {
					var entry = item[name]
					if ((typeof entry == 'object') && entry.getValue.toLowerCase().indexOf(filter) != -1) {
						console.log('filter: ' + name);
						checkFilter = true;
					}
				});
				if (checkFilter) {
					return item;
				}
			})
		} else {
			// debugger;
			return this.dataStore.data.slice();
		}
	}

	extractItems(start, end) {
		start = start || this.startIndex;
		end = end || this.lastIndex;
		const items = this.filterData();
		// alert(items.length);
		if (items.length) {
			return items.slice(start, end);
		} else {
			return [];
		}

	}

	// @computed get totalPages() {
	// 	debugger;
	// 	return Math.ceil(this.totalItems / this.listState.itemsPerPage);
	// }

	// @computed get totalItems() {
	// 	debugger;
	// 	return this.dataStore.data.length;
	// }

	@computed get startIndex() {
		return (this.listState.page * this.listState.itemsPerPage) - this.listState.itemsPerPage;
	}

	@computed get lastIndex() {
		return (this.listState.page * this.listState.itemsPerPage);
	}
}

const listStore = new ListStore();
export default listStore;