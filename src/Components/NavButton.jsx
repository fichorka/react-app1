import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@observer
class NavBar extends Component {
	render() {
		const { linkPath, text } = this.props;
		const exact = this.props.exact ? true : false;
		return (
			<li className="db di-l mr3-l bb bb-0-l"><NavLink activeClassName="near-white bg-black-70" exact={exact} to={linkPath} className="black pr3-l pl3-l pb2-l pt2-l pb3 pt3 w-auto-l w-100 link hover-near-white dib hover-bg-black-70">{text}</NavLink></li>
		);
	}
}


export default NavBar;