import rootStore from './RootStore';

data = [
	{
		id: '_fadd4s12',
		firstName: {
			get getValue() { return this.value; },
			value: value
		},
		lastName: {
			get getValue() { return this.value; },
			value: value
		},
		age: {
			get getValue() { return this.value; },
			value: value
		},
		employeeRole: {
			get getValue() { return this.relStore.getById(relId, relName); },
			value: relId,
			relStore: value,
			relName: value
		}
	}
]

fields = [
	{
		name: 'firstName',
		width: 25,
		rules: ['required', 'max:20']
	},
	{
		name: 'lastName',
		width: 25,
		rules: ['required', 'max:20']
	},
	{
		name: 'age',
		width: 15,
		rules: ['required', 'maxValue:20', 'minValue:5']
	},
	{
		name: 'employeeRole',
		type: 'select',
		relStore: dataStore.relStores.roleStore,
		relName: 'roleName',
		width: 35,
		rules: ['required']
	}
]


relStores = {
	roleStore: rootStore.roleStore
}

currentSortState = {
	isOrderAsc: value,
	sortKey: this.fields[0].name,
	sortOrder() {
		if (isOrderAsc) return 'asc';
		else return 'desc';
	}
}

function sortData(newSortKey = null) {
	const { currentSortState } = this;
	let isNewOrderAsc;

	if (newSortKey) {
		isNewOrderAsc = newSortKey == currentSortState.sortKey ? !currentSortState.isOrderAsc : true;
	} else {
		newSortKey = currentSortState.sortKey;
		isNewOrderAsc = currentSortState.isOrderAsc;
	}
	const controlVar = isNewOrderAsc ? 1 : -1;
	this.data.replace(this.data.slice().sort((a, b) => {
		a = a[newSortKey].getValue;
		b = b[newSortKey].getValue;

		if (a > b) return (1 * controlVar);
		else if (a < b) return (-1 * controlVar);
		else return 0;
	}));
}

function submitData(newItem) {
	newItem.id = generateId();
	this.data.push(newItem);
	if (this.data.length > 1) this.sortData();
}