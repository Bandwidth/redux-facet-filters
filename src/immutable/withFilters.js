import createWithFilters from '../factories/createWithFilters';
import selectors from './selectors';
import facet, { withFacetData } from '@bandwidth/redux-facet/immutable';

export default createWithFilters(selectors, facet, withFacetData);
