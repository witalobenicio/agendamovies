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
    src={props.src ? `https://image.tmdb.org/t/p/${props.size}/${props.src}` : undefined}
    onError={onError}
  />
);

Image.defaultProps = {
  size: 'w300',
};

export default Image;
