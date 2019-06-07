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
			pageCorrect() { if (this.startIndex > this.totalItems) { this.page = this.totalPages; } },
			get startIndex() { return (this.page * this.itemsPerPage) - this.itemsPerPage; },
			get lastIndex() { return (this.page * this.itemsPerPage); },
			get totalPages() { return Math.ceil(this.totalItems / this.itemsPerPage) || 1 },
			get totalItems() { return listStore.getData().length; },
			get sortOrder() { return listStore.dataStore.currentSortState.sortOrder; },
			get sortKey() { return listStore.dataStore.currentSortState.sortKey; },
			get displayedItems() { return listStore.extractItems().length; }
		};
	}

	getData() {
		let { filter } = this.listState;
		var {data} = this.dataStore;
		filter = filter.toLowerCase();
		let dataResult;
		if (filter.length) {
			dataResult = data.slice().filter(item => {
				var checkFilter = false;
				Object.keys(item).forEach(name => {
					var entry = item[name]
					if ((typeof entry == 'object') && entry.getValue.toLowerCase().indexOf(filter) != -1) {
						checkFilter = true;
					}
				});
				if (checkFilter) {
					return item;
				}
			})
		} else {
			dataResult = data.slice();
		}
		
		return dataResult;
	}

	extractItems(start, end) {
		start = start || this.listState.startIndex;
		end = end || this.listState.lastIndex;
		const items = this.getData();
		if (items.length) {
			return items.slice(start, end);
		} else {
			return [];
		}

	}
}

const listStore = new ListStore();
export default listStore;