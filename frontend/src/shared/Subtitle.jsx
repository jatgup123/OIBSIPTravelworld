import React from 'react';
import '../App.css';

const Subtitle = ({subtitle}) => {
  return (
    <h3 className='section__subtitle'>
      {subtitle}
    </h3>
  );
};

export default Subtitle;
