import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'
import PageLayout from '../Layouts/PageLayout';
import List from '../Components/List';
import Form from '../Components/Forms/Form'

@inject(stores => ({
	dataStore: stores.rootStore.employeeStore
}))
@observer
class NewEmployee extends Component {

	render() {
		const {dataStore} = this.props;
		return (
			<PageLayout pageTitle="New Employee" >
				<Form dataStore={dataStore} />
				<List dataStore={dataStore} />
			</PageLayout>
		)
	}
}

export default NewEmployee;