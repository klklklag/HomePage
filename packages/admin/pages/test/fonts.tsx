import type { NextPage } from 'next'
import styled from 'styled-components';

const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Components: NextPage = () => {
  return (
    <Root>
      <Text>{lorem_ipsum}</Text>
      <Text>다람쥐 헌 쳇바퀴에 타고파</Text>
    </Root>
  );
};

const Root = styled.div``;
const Text = styled.div`
  font-weight: 400;
  font-size: 1rem;
  border: 1px solid red;
`;

export default Components;