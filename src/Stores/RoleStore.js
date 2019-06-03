import { observable } from 'mobx';
import DataHandling from './DataHandling';

class RoleStore extends DataHandling {
	@observable data = [];

	@observable fields = [
		{
			name: 'roleName',
			label: 'Role name',
			width: 100,
			rules: 'required|unique|max:10'
		},
	];

	@observable currentSortState = {
		isOrderAsc: true,
		sortKey: 'roleName',
		get sortOrder() {
			if (this.isOrderAsc) return 'asc';
			else return 'desc';
		}
	};
}

const roleStore = new RoleStore();
export default roleStore;