import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Form from '../Components/Forms/Form';
import PageLayout from '../Layouts/PageLayout';
import List from '../Components/List';

@inject(stores => ({
	dataStore: stores.rootStore.roleStore
}))
@observer
class NewRole extends Component {

	render() {
		console.log(this.props);
		const {dataStore} = this.props;
		return (
			<PageLayout pageTitle="New Role" >
				<Form dataStore={dataStore} />
				<List dataStore={dataStore} match={this.props.match} />
			</PageLayout>
		)
	}
}

export default NewRole;