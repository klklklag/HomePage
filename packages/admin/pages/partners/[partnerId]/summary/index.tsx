import type { NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { PartnerHeader } from '@containers';
import { COLORS } from '@resources';

const Component: NextPage = () => {
  return (
    <PartnerScreen>
      <MenuBar />
      <Body>
        <PartnerHeader />
        
      </Body>
    </PartnerScreen>
  );
};

const Body = styled.div`
  width: 100%;
  padding: 0px 100px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

export default Component