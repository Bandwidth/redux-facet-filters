import createWithFilteredData from '../factories/createWithFilteredData';
import selectors from './selectors';
import createSelectors from './createSelectors';
import withFilters from './withFilters';

export default createWithFilteredData(selectors, createSelectors, withFilters);
