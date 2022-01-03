import styled from 'styled-components';
import { AuthorizedHeader } from './AuthorizedHeader';
import { AuthorizedFooter } from './AuthorizedFooter';
import { AdminNavigator } from './Navigator';
import { COLORS } from '@resources';

const _AdminScreen = ({ children }: { children?: any }) => {
  return (
    <>
      <AuthorizedHeader />
      <Body>
        <AdminNavigator />
        <Wrapper>
          <AdminMain>
            {children}
          </AdminMain>
        </Wrapper>
      </Body>
      <AuthorizedFooter />
    </>
  );
};

const _PartnerScreen = ({ children }: { children?: any }) => {
  return (
    <>
      <AuthorizedHeader />
      <Body>
        <AdminNavigator />
        <Wrapper>
          <PartnerMain>
            {children}
          </PartnerMain>
        </Wrapper>
      </Body>
      <AuthorizedFooter />
    </>
  );
};

const Body = styled.div`
  flex: 1;
  display: flex;
`;

const Wrapper = styled.div`
  flex: 1;
  background-color: ${COLORS.background};
  padding: 40px 100px;
  
  display: flex;
  justify-content: center;
`;

const AdminMain = styled.div`
  min-width: 1500px;
  width: 100%;
  padding: 0px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

const PartnerMain = styled.div`
  min-width: 1500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AdminScreen = _AdminScreen;
export const PartnerScreen = _PartnerScreen;