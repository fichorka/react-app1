import { action } from 'mobx';
import { generateId } from '../Common/Common';

class DataHandling {
	deleteItem(id) {
		this.data.splice(this.data.indexOf(this.getById(id)), 1);
	}

	getById(id, fieldName) {
		for (let i=0; i<this.data.length; i++) {
			if (this.data[i].id == id) {
				if (fieldName) return this.data[i][fieldName].value;
				else return this.data[i];
			}
		}
		return false;
	}

	getFieldByName(name) {
		for (let i=0; i < this.fields.length; i++) {
			if (name == this.fields[i].name) return this.fields[i];
		}
		return false;
	}

	isValueUnique(value, name, skipId) {
		console.log(skipId)
		for (let i=0; i < this.data.length; i++) {
			if (this.data[i][name].value.toLowerCase() == value.toLowerCase() && this.data[i].id != skipId) {
				return true
			}
		}
		return false;
	}

	@action sortData(newSortKey = null) {
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
			a = a[newSortKey].getValue.toLowerCase();
			b = b[newSortKey].getValue.toLowerCase();
	
			if (a > b) return (1 * controlVar);
			else if (a < b) return (-1 * controlVar);
			else return 0;
		}));
		this.currentSortState.sortKey = newSortKey;
		this.currentSortState.isOrderAsc = isNewOrderAsc;
	}

	@action submitData(newItem) {
		if (newItem.id) {
			this.data[this.data.indexOf(this.getById(newItem.id))] = newItem;
		} else {
			newItem.id = generateId();
			this.data.push(newItem);
		}
		if (this.data.length > 1) this.sortData();
	}
}

export default DataHandling;

// const dataHandling = new DataHandling();
// export default dataHandling;