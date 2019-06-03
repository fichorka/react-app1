import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '../Components/List';
import PageLayout from '../Layouts/PageLayout';

@inject(stores => ({
	dataStore: stores.rootStore.employeeStore
}))
@observer
class EmployeeList extends Component {
	render() {
		const { dataStore } = this.props;
		return (
			<PageLayout pageTitle="Employee List" >
				<List dataStore={dataStore} />
			</PageLayout>
		);
	}
}

export default EmployeeList;