import { observable, action, computed } from 'mobx';

class PageStore {
	@observable pageState = {};
	@observable states = {};
}

const pageStore = new PageStore();
export default pageStore;