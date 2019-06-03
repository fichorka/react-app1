import { startBatch } from "mobx/lib/internal";


list = [
	{
		firstName: value,
		lastName: value,
		age: value,
		employeeRole: value
	},
	{
		firstName: value,
		lastName: value,
		age: value,
		employeeRole: value
	}
];

dataStore;

listState = {
	page: value,
	itemsPerPage: value,
	totalItems: this.totalItems,
	totalPages: this.totalPages,
}

function sortState() {
	return this.dataStore.currentSortState
}

function totalPages() {
	return Math.ceil(this.dataStore.length / this.itemsPerPage)
}

function totalItems() {
	return this.dataStore.length;
}

function startIndex() {
	return (this.listState.page * this.listState.itemsPerPage) - this.listState.itemsPerPage;
}

function lastIndex() {
	return (this.listState.page * this.listState.itemsPerPage);
}

function extractItems(start, end) {
	return this.dataStore.data.slice(start, end).forEach(item => {
		const temp = {};
		Object.keys(item).forEach(key => {
			if ((typeof item[key]) == 'object') {
				temp[key] = {
					value: item[key].getValue
				}
			}
		});
		return temp;
	});
}

function initializeListState(dataStore, options) {
	this.dataStore = dataStore;
	this.list = this.extractItems(this.startIndex, this.lastIndex);
	this.listState = {
		page: options.page || 1,
		itemsPerPage: options.itemsPerPage || 10,
	}
}