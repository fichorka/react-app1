import { observable, action, computed } from 'mobx';

class HeaderStore {
	@observable header = {
		text: 'Header'
	}
	@observable navigation = {
		text: {
			link1: 'Home',
			link2: 'Employees',
			link3: 'Roles',
			link4: 'Role list',
			link5: 'Employee list'
		},
		paths: {
			link1: '/',
			link2: '/employees',
			link3: '/roles',
			link4: '/role-list',
			link5: '/employee-list'
		}
	};
}

const headerStore = new HeaderStore();
export default headerStore;