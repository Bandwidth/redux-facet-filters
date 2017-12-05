import React from 'react';

const SIZE = 64;

const getColor = color => {
  switch(color) {
    case 'orange':
      return '#DE703B';
    case 'yellow':
      return '#FCB040';
    case 'blue':
      return '#506E86';
    default:
      return 'transparent';
  }
}

export default ({ color, number }) => (
  <div
    style={{
      borderRadius: '100%',
      width: SIZE + 'px',
      height: SIZE + 'px',
      backgroundColor: getColor(color),
      padding: (SIZE / 2) - 7 + 'px',
      fontSize: '14px',
      textAlign: 'center',
      margin: '4px',
    }}
  >
    {number}
  </div>
);
