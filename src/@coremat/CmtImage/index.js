import React from 'react';

const CmtImage = ({ src, alt, ...rest }) => {
  return <img src={src}  className='logo' style={{width:"50px", marginTop:"5px"}}  alt={alt} {...rest} />;
};

export default CmtImage;
