import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

@observer
class Card extends Component {
	render() {
		const { componentWidth, componentTitle, children } = this.props;
		return (
			<div className={`db ${componentWidth} center mb4-l mb3 bg-light-gray br3 br--bottom`}>
				<span className="db tc bb bw1 black f6-l f7 pa2 b--white tracked">{componentTitle}</span>
				{children}
			</div>
		);
	}
}

export default Card;