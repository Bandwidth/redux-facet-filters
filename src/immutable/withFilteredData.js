import createWithFilteredData from '../factories/createWithFilteredData';
import selectors from './selectors';
import createSelectors from './createSelectors';
import withFilters from './withFilters';
import { withFacetData } from '@bandwidth/redux-facet/immutable';

export default createWithFilteredData(selectors, createSelectors, withFilters, withFacetData);
