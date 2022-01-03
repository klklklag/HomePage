import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { COLORS, SVGS } from '@resources';
import {
  BodyHeader,
  InputText,
  InputTextarea,
  ScreenSubtitle,
  ScreenTitle,
  Switch,
} from '@components';
import { contentAPI, TermListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const termsCode = Number(query.termId);
  const result = await contentAPI.readTermItem({ termsCode });
  if ('errors' in result) {
    return { props: { data: {} } };
  }
  return { props: { data: result } };
}

const Component = ({ data }: { data: TermListItem; }) => {
  const router = useRouter();
  const cancelUpdate = useCallback(() => {
    const { pathname, push, query } = router;
    push({
      pathname: pathname.replace('/update', ''),
      query: { termId: query.termId },
    })
  }, [router]);
  return (
    <AdminScreen>
      <BodyHeader>
        <SVGS.NAV_BAR_ICON_SELIS fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">약관 관리 {'>'} 수정하기</ScreenTitle>
        <ScreenSubtitle>기업</ScreenSubtitle>
      </BodyHeader>

      <form>
        <InputArea>
          <InputText inputTitle="제목" defaultValue={data.termsName} />
          <InputTextarea inputTitle="본문" height={575} defaultValue={data.termsContent} />
        </InputArea>

        <SwitchArea>
          <Switch
            inputTitle="전시 상태"
            labelStyle="width: 90px;"
            labelPosition="left"
            labelTexts={{ on: '・ 공개', off: '・ 비공개' }}
            defaultValue={data.isUsed}
          />
        </SwitchArea>

        <ButtonArea>
          <CancelButton type="button" onClick={cancelUpdate}>취소</CancelButton>
          <ConfirmButton type="submit">등록하기</ConfirmButton>
        </ButtonArea>
      </form>
    </AdminScreen>
  );
};

const InputArea = styled.div`
  margin: 40px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SwitchArea = styled.div`
  margin: 40px 0px 0px;
`;

const ButtonArea = styled.div`
  margin: 80px 0px 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  width: 150px;
  height: 60px;
  border: 0px solid;
  border-radius: 60px;
  background-color: ${COLORS.gray};
  padding: 0px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.white};

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.5; }
`;

const ConfirmButton = styled(CancelButton)`
  width: 300px;
  background-color: ${COLORS.main};
`;

export default Component