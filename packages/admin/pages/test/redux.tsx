import type { NextPage } from 'next'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, RootState } from '@shared-state';

const ReduxTest: NextPage = () => {
  const count = useSelector(({ test }: RootState) => test);
  const dispatch = useDispatch();
  return (
    <>
      <Count>{count}</Count>
      <Wrapper>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Count = styled.div`
  font-weight: bold;
  font-size: 10rem;
`;

const Button = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export default ReduxTest;