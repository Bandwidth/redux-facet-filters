import React from 'react';
import Split from './Split';
import Filters from './Filters';
import Shape from './Shape';

export default ({ shapes, filters, addFilter, removeFilter, clearFilters }) => (
  <Split>
    <Filters filters={filters} addFilter={addFilter} removeFilter={removeFilter} clearFilters={clearFilters} />
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', flex: '6 1 0', margin: '0 16px' }}>
      {shapes.map(shape => <Shape {...shape} />)}
    </div>
  </Split>
);
