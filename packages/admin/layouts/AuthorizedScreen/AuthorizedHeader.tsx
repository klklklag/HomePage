import styled from 'styled-components';
import Image from 'next/image';
import { COLORS, IMAGES } from '@resources';

const _AuthorizedHeader = () => {
  return (
    <Root>
      <LogoWrapper>
        <Image src={IMAGES.LOGO_ADMIN} layout="fill" />
      </LogoWrapper>
      <Button>
        <Text>로그아웃</Text>
      </Button>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  padding: 0px 40px;
  background-color: ${COLORS.white};

  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 45px;
  height: 24px;
`;

const Button = styled.div`
  margin: 0px 0px 0px auto;
  padding: 4px 10px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;

const Text = styled.div`
  height: 16px;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.black};
`;

export const AuthorizedHeader = _AuthorizedHeader;