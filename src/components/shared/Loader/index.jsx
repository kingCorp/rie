import { number, string } from 'prop-types';

import { LoaderContainer, LoaderImage } from './components';

export const Loader = ({ size, height }) => {
  return (
    <LoaderContainer height={height}>
      <LoaderImage size={size} />
    </LoaderContainer>
  );
};

Loader.propTypes = {
  size: number,
  height: string,
};

Loader.defaultProps = {
  size: 30,
  height: 'auto',
};
