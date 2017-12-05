import React from 'react';
import Filter from './Filter';
import FilterCreator from './FilterCreator';

export default ({ filters, addFilter, removeFilter, clearFilters }) => (
  <div>
    <b>Filters</b>
    <ul style={{ flex: '0 0 auto', border: '1px solid black', padding: '8px' }}>
      {filters.map(
        filter => (
          <Filter
            key={filter.id}
            type={filter.type}
            value={filter.value}
            onRemove={() => removeFilter(filter.id)}
          />
        )
      )}
    </ul>
    <FilterCreator onCreate={(type, value) => addFilter({ type, value })} />
    <br />
    <a href="#" onClick={clearFilters}>Clear all</a>
  </div>
);
