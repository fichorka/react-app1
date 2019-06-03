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
			<span className="dib link black br-100 bg-white b--black-50 bg-light-gray ph1 pv1 mh2">{children}</span>
		);
	}
}

export default UIButton;