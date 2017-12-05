import createWithFilteredData from '../factories/createWithFilteredData';
import selectors from './selectors';
import createSelectors from './createSelectors';

export default createWithFilteredData(selectors, createSelectors);
