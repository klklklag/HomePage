import styled from 'styled-components';
import Image from 'next/image';
import { IMAGES } from '@resources';

const _AuthenticationHeader = () => {
  return (
    <Root>
      <LogoWrapper>
        <Image src={IMAGES.LOGO_INTEGRATED} width="77" height="24" />
      </LogoWrapper>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 64px;
  min-height: 64px;
  padding: 0px 40px;

  display: flex;
`;

const LogoWrapper = styled.div`
  margin: auto 0px 0px;
`;

export const AuthenticationHeader = _AuthenticationHeader;