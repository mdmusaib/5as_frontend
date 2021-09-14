import React from 'react';
import { Box } from '@material-ui/core';

export const MyPointer = () => {
  return (
    <Box
      style={{
        transform: 'translate(-50%, -10px)',
        cursor: 'pointer',
        fontSize: 32,
      }}>
      🔥
    </Box>
  );
};

export default MyPointer;
