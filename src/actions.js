import { createActions } from 'redux-actions';

const NAMESPACE = '@@redux-facet-filters';

const actions = createActions({
  [NAMESPACE]: {
    ADD_FILTER: (filter) => ({ filter }),
    INSERT_FILTER: (index, filter) => ({ index, filter }),
    UPDATE_FILTER: (index, filter) => ({ index, filter }),

    REMOVE_FILTER: (index) => ({ index }),
    CLEAR_FILTERS: () => ({}),
  },
});

export default actions.reduxFacetFilters;
