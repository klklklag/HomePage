import type { NextPage } from 'next'
import styled from 'styled-components';

const Components: NextPage = () => {
  return (
    <Root>
      <div>페이지 기본 틀입니다.{'\n'}이 파일을 복사해서 새로운 페이지를 만드세요.</div>
    </Root>
  );
};

const Root = styled.div``;

export default Components;