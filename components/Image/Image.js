// @flow

import React from 'react';

import { Wrapper, Img } from './Image.styles';

type Props = {|
  src: string,
  alt: string,
|};

function Image(props: Props) {
  const { alt, src } = props;
  return (
    <Wrapper>
      <Img className="img" src={src} alt={alt} />
    </Wrapper>
  );
}

Image.displayName = 'Image';

export default Image;
