import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { generateList } from '../Common/Common';
import ListLayout from '../Layouts/ListLayout';
import { get } from 'mobx';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class List extends Component {
	constructor(props) {
		super(props);
		this.props.listStore.initializeListStore(this.props.dataStore);
	}

	render() {
		const { listStore, dataStore, title, match } = this.props;
		const { fields, getFieldByName } = dataStore;
		var getField = getFieldByName.bind(dataStore);
		let { listState } = listStore;
		const { sortKey, sortOrder } = listState;
		const items = listStore.extractItems();
		const sortState = { sortKey: sortKey, sortOrder: sortOrder };
		const isListEmpty = !Boolean(dataStore.data.length)
		return (
			<Fragment>
				<ListLayout listState={listState} title={title} isListEmpty={isListEmpty} >
					{
						generateList(listStore, match.url)
					}
				</ListLayout>
			</Fragment>
		);
	}
}

export default List;