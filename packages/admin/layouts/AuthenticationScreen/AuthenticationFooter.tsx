import styled from 'styled-components';

const _AuthenticationFooter = () => {
  return (
    <Text>Copyright © Givingdays. All rights reserved.</Text>
  );
};

const Text = styled.div`
  margin: auto 0px 0px;
  width: 100%;
  height: 60px;
  min-height: 60px;

  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1px;
  color: #A0A5BA;
  text-align: center;
`;

export const AuthenticationFooter = _AuthenticationFooter;