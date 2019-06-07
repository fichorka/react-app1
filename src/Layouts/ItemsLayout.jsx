import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import SideBar from '../Components/SideBar';
import List from '../Components/List';
import Form from '../Components/Forms/Form';
import ItemEdit from '../Components/ItemEdit';
import NoMatch from '../Pages/NoMatch';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

@inject(stores => ({
	sideBarStore: stores.rootStore.sideBarStore
}))
@observer
class ItemsLayout extends Component {
	constructor(props) {
		super(props);
		props.sideBarStore.initializeStore([{ name: 'form', label: `Add new ${props.itemName}` }, { name: 'list', label: 'Show list' }]);
	}

	render() {
		const { dataStore, sideBarStore, itemName, dataLength, match } = this.props;
		const { items } = sideBarStore;
		const form = items.form ? items.form.show : false;
		const list = items.list ? items.list.show : false;
		return (
			<Fragment>
				<div className="bg-light-gray mb3-l mb0"><span className="dib pa2">Total {itemName}s: {dataLength}</span></div>
				<Switch>
					<Route exact path={match.path} render={() => (
						<Fragment>
							<SideBar />
							<div className="dib w-80-l w-100">
								{form &&
									<Form dataStore={dataStore} title={`NEW ${itemName.toUpperCase()}`} basePath={match.path} />
								}
								{list &&
									<List dataStore={dataStore} match={this.props.match} title={`LIST OF ${itemName.toUpperCase()}S`} />
								}
							</div>
						</Fragment>
					)} />
					<Route path={`${match.path}/id/:itemId`} render={(props) => (
						<ItemEdit title="EDIT FORM" basePath={match.path} dataStore={dataStore} {...props} />
					)} />
					<Route render={(props) => (
						<NoMatch {...props} />
					)} />
				</Switch>
			</Fragment>
		);
	}
}

export default ItemsLayout;