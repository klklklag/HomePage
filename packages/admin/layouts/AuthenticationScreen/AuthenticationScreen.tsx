import styled from 'styled-components';
import { IMAGES } from '@resources';
import { AuthenticationHeader } from './AuthenticationHeader';
import { AuthenticationFooter } from './AuthenticationFooter';

const _AuthenticationScreen = ({
  children,
}: {
  children?: any;
}) => {
  return (
    <Root>
      <AuthenticationHeader />
      <ContentArea>
        {children}
      </ContentArea>
      <AuthenticationFooter />
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${IMAGES.AUTHENTICATION_BACKGROUND});
  background-size: cover;
`;

const ContentArea = styled.div`
  width: 100%;
  height: calc(100% - 64px - 60px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthenticationScreen = _AuthenticationScreen;