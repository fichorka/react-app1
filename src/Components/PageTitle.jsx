import React, {Component, Fragment} from 'react';

export default class PageTitle extends Component {
	render() {
		const {title} = this.props;
		return (
			<Fragment>
			<h1 className="f4 f3-l ph4 pv4-l pv3 ma0 tracked bt-0-l bt bw1">{title}</h1>
			{/* <hr /> */}
			</Fragment>
		);
	}
}