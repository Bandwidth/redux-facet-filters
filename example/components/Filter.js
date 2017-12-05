import React from 'react';

const getTypeName = type => {
  switch(type) {
    case 'numberGreater':
      return 'number >';
    case 'numberLess':
      return 'number <';
    default:
      return `${type}: `;
  }
}

export default ({ type, value, onRemove }) => (
  <li style={{ listStyle: 'none', margin: '4px 0', padding: '4px', border: '1px solid gray' }}>
    {getTypeName(type)} {value} (<a onClick={onRemove} href="#">x</a>)
  </li>
);
