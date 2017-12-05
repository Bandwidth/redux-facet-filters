import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'row',
};

export default ({ children }) => (<div style={styles}>{children}</div>);
