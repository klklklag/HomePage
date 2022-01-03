import type { NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { COLORS } from '@resources';
import {  } from '@containers';

const Component: NextPage = () => {
  return (
    <AdminScreen>
      <Root>
        <Body>
          <div>임시 페이지</div>
        </Body>
      </Root>
    </AdminScreen>
  );
};

const Root = styled.div`
  width: 100%;
  padding: 40px;
  
  display: flex;
  justify-content: center;
`;

const Body = styled.div`
  width: 100%;
  padding: 0px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

export default Component