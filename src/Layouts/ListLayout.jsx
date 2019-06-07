import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import ListFilter from '../Components/ListFilter';
import Card from '../Components/Card';
import UIButton from '../Components/UIButton';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class ListLayout extends Component {
	render() {
		const { listStore, listState, title, isListEmpty } = this.props;
		const { page, totalItems, itemsPerPage, startIndex, lastIndex, totalPages, displayedItems } = this.props.listState;
		const pageControl = <div className="mv2 f6-l f7 nowrap tc"><button className="pa0 ma0 bn" disabled={page == 1} onClick={() => listStore.listState.page--}><UIButton>Prev</UIButton></button><span className="dib ph1">{page} / {totalPages}</span><button className="pa0 ma0 bn" disabled={page == totalPages} onClick={() => listStore.listState.page++}><UIButton>Next</UIButton></button></div>
		const quantityControl = <div className="mv1">Items per page: <select className="bn br1" value={listState.itemsPerPage} onChange={e => { listState.itemsPerPage = parseInt(e.target.value, 10); listState.pageCorrect(); }}><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option><option value={30}>30</option><option value={50}>50</option></select></div>
		return (
			<Card componentWidth="w-100" componentTitle={title}>
				<div className="pa3 mb3" >
					{!isListEmpty &&
						<Fragment>
							<div className="mb3" >
								<ListFilter />
								<span className="db mv1">Index range: {startIndex} - {lastIndex}</span><span className="db mv1">displaying {displayedItems} item{displayedItems > 1 ? 's' : ''} out of {totalItems}</span>
								{quantityControl}
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