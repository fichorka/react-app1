import { observable, action } from 'mobx';
import {observer} from 'mobx-react'
import employeeStore from './EmployeeStore';
import roleStore from './RoleStore';
import formStore from './FormStore';
import listStore from './ListStore';
import headerStore from './HeaderStore';
import pageStore from './PageStore';
import sideBarStore from './SideBarStore';


class RootStore {
	@observable roleStore = roleStore;
	@observable employeeStore = employeeStore;
	@observable formStore = formStore;
	@observable listStore = listStore;
	@observable headerStore = headerStore;
	@observable pageStore = pageStore;
	@observable sideBarStore = sideBarStore;
}

const rootStore = new RootStore();
export default rootStore;