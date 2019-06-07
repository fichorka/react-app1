import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PageLayout from '../Layouts/PageLayout';
import ItemsLayout from '../Layouts/ItemsLayout';

@inject(stores => ({
	dataStore: stores.rootStore.employeeStore,
	sideBarStore: stores.rootStore.sideBarStore,
}))
@observer
class Employees extends Component {
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