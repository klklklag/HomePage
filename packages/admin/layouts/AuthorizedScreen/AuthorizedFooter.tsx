import styled from 'styled-components';
import { COLORS } from '@resources';

const _AuthorizedFooter = () => {
  return (
    <Root>
      <Text>Copyright 2021 (주)기빙데이즈 Inc. All Right Reserved</Text>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  background-color: ${COLORS.bar};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  height: 16px;
  font-size: 14px;
  color: ${COLORS.white};
`;

export const AuthorizedFooter = _AuthorizedFooter;