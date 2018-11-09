/* eslint-disable jsx-a11y/alt-text */
import imageError from '~/assets/img/noImage.png';
import React from 'react';

function onError(e) {
  e.target.onerror = null;
  e.target.src = imageError;
}

const Image = (props) => (
  <img
    {...props}
    onError={onError}
  />
);

export default Image;
