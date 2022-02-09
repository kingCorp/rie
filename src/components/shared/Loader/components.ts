import styled from 'styled-components';
import { number } from 'prop-types';

import LoaderGif from '../../../assets/img/Loader.gif';

type Props = {
  size?: number;
};

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const LoaderImage = styled.img.attrs(() => ({
  src: LoaderGif,
}))<Props>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

LoaderImage.propTypes = {
  size: number,
};

LoaderImage.defaultProps = {
  size: 30,
};
