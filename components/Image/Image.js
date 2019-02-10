import React, { PureComponent } from 'react';

import { Wrapper, Img } from './Image.styles';

type Props = {
  src: string,
  alt: string,
};

class Image extends PureComponent<Props> {
  render() {
    const { alt, src } = this.props;
    return (
      <Wrapper>
        <Img className="img" src={src} alt={alt} />
      </Wrapper>
    );
  }
}

Image.displayName = 'Image';

export default Image;
