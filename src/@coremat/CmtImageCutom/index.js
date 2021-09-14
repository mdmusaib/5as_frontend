import React from 'react';

const CmtImage = ({ src, alt, ...rest }) => {
  return <img src={src} style={{ marginTop: '5px' }} alt={alt} {...rest} />;
};

export default CmtImage;
