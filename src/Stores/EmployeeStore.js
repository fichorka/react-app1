import { observable } from 'mobx';
import rootStore from './RootStore';
import DataHandling from './DataHandling';

class EmployeeStore extends DataHandling {
	@observable data = [];

	@observable relStores = {
		roleStore: rootStore.roleStore
	}

	@observable fields = [
		{
			name: 'firstName',
			label: 'First name',
			width: 25,
			rules: 'required|max:20'
		}, {
			name: 'lastName',
			label: 'Last name',
			width: 25,
			rules: 'required|max:20'
		}, {
			name: 'employeeRole',
			label: 'Employee role',
			type: 'select',
			relStore: this.relStores.roleStore,
			relName: 'roleName',
			width: 25,
			rules: 'required'
		}, {
			name: 'salary',
			label: 'Salary',
			width: 25,
			rules: 'required|number|max:9'
		}
	];

	@observable currentSortState = {
		isOrderAsc: true,
		sortKey: 'lastName',
		get sortOrder() {
			if (this.isOrderAsc) return 'asc';
			else return 'desc';
		}
	};
}

const employeeStore = new EmployeeStore();
export default employeeStore;