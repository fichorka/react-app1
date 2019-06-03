import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PageLayout from '../Layouts/PageLayout';
import List from '../Components/List';
import Form from '../Components/Forms/Form'
import Card from '../Components/Card';
import SideBar from '../Components/SideBar'
import ItemsLayout from '../Layouts/ItemsLayout';

@inject(stores => ({
	dataStore: stores.rootStore.employeeStore,
	sideBarStore: stores.rootStore.sideBarStore,
}))
@observer
class Employees extends Component {
	constructor(props) {
		super(props);
		props.sideBarStore.initializeStore([{ name: 'form', label: 'Add new employee' }, { name: 'list', label: 'Show list' }]);
	}

	render() {
		const { dataStore, match } = this.props;
		const { data } = dataStore;
		return (
			<PageLayout pageTitle="Employees" >
				<ItemsLayout itemName="employee" dataLength={data.length} dataStore={dataStore} match={match} />
			</PageLayout>
		)
	}
}

export default Employees;