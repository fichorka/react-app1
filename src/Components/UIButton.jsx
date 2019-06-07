import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { generateList } from '../Common/Common';
import ListLayout from '../Layouts/ListLayout';
import { get } from 'mobx';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class UIButton extends Component {
	render() {
		const {children} = this.props;
		return (
			<span className="dib pointer br1 bg-white b--black-50 ph3 pv1">{children}</span>
		);
	}
}

export default UIButton;