import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import ListFilter from '../Components/ListFilter';
import Card from '../Components/Card';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class ListLayout extends Component {
	render() {
		console.log(this.props.children)
		const { listStore, listState, title, isListEmpty } = this.props;
		const { page, totalItems, itemsPerPage, totalPages, displayedItems } = this.props.listState;
		const { startIndex, lastIndex } = this.props.listStore;
		const pageControl = <div className="dib mv1"><span className="dib mh1">Page:</span><button onClick={() => listStore.listState.page--}>Prev</button><span className="dib ph1">{page} / {totalPages}</span><button onClick={() => listStore.listState.page++}>Next</button></div>
		const quantityControl = <div>Items per page:<select value={listState.itemsPerPage} onChange={e => listState.itemsPerPage = e.target.value}><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option><option value={30}>30</option><option value={50}>50</option></select></div>
		return (
			<Card componentWidth="w-100" componentTitle={title}>
				<div className="pa3 mb3" >
					{!isListEmpty &&
						<Fragment>
							<ListFilter />
							<div>Index range: {startIndex} / {lastIndex}<br />displaying {displayedItems} items out of {totalItems}</div>
							<div>
								Items per Page: {quantityControl}
							</div>
							{pageControl}
							{this.props.children}
							{pageControl}
						</Fragment>
					}
					{isListEmpty &&
						<span className="db f4-l f5 border-box v-mid black-80 tc">The list is empty</span>
					}
				</div>
			</Card>
		);
	}
}

export default ListLayout;