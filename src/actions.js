import { createActions } from 'redux-actions';
import uuid from 'uuid';

const NAMESPACE = '@@redux-facet-filters';

const generateFilterId = timestamp =>
  `filter-${timestamp}-${uuid().substring(0, 18)}`;
const createTimestamp = () => new Date().getTime();

const actions = createActions({
  [NAMESPACE]: {
    SET_FILTER: (filter) => {
      const timestamp = createTimestamp();
      return { filter: { id: generateFilterId(timestamp), ...filter } };
    },
    REMOVE_FILTER: (id) => ({ id }),
    CLEAR_FILTERS: () => ({}),
  },
});

export default actions.reduxFacetFilters;
