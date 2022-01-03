import type { GetServerSidePropsContext, NextPage } from 'next'
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { COLORS, getFormattedDateString, SVGS } from '@resources';
import {
  BodyHeader,
  DeleteButton,
  ScreenSubtitle,
  ScreenTitle,
  UpdateButton
} from '@components';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { contentAPI, TermListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const termsCode = Number(query.termId);
  const result = await contentAPI.readTermItem({ termsCode });
  if ('errors' in result) {
    return { props: { data: {} } };
  }
  return { props: { data: result } };
}

const Component = ({ data }: { data: Partial<TermListItem> }) => {
  const router = useRouter();

  const goToList = useCallback(() => {
    router.push(`/admin/terms/${data.termsFlag === 1 ? 'partner' : 'worker'}`);
  }, [router, data.termsFlag]);

  const goToUpdatePage = useCallback(() => {
    const { push, query, pathname } = router;
    push({
      pathname: pathname + '/update',
      query: { termId: query.termId },
    });
  }, [router]);
  
  return (
    <AdminScreen>
      <BodyHeader style="border-color: transparent">
        <SVGS.NAV_BAR_ICON_SELIS fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">약관 관리 {'>'} 상세보기</ScreenTitle>
        <ScreenSubtitle>{data.termsFlag === 1 ? '기업' : '근로자'}</ScreenSubtitle>
      </BodyHeader>

      <BodyHeader>
        <TermTitleText>{data.termsName}</TermTitleText>
        <ButtonsWrapper>
          <UpdateButton onClick={goToUpdatePage} />
          <DeleteButton />
        </ButtonsWrapper>
      </BodyHeader>

      <MetadataArea>
        <MetadataText>작성일 {getFormattedDateString(data.registerDate)}</MetadataText>
      </MetadataArea>

      <DescArea>{data.termsContent}</DescArea>

      <GoToListButton onClick={goToList}>목록</GoToListButton>
    </AdminScreen>
  );
};

const TermTitleText = styled.div`
  font-weight: 600;
  font-size: 21px;
  color: ${COLORS.black_pale};
  letter-spacing: -0.84px;
`;

const ButtonsWrapper = styled.div`
  margin: 0px 0px 0px auto;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const MetadataArea = styled.div`
  margin: 20px 0px 0px;
  
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MetadataText = styled.div`
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};
`;

const DescArea = styled.div`
  margin: 20px 0px 0px;

  width: 100%;
  height: 575px;

  overflow: scroll;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  line-height: 22px;
  white-space: pre-wrap;
`;

const GoToListButton = styled.button`
  margin: 40px auto 0px;
  width: 150px;
  height: 60px;
  border-radius: 60px;
  border: 0px solid;
  background-color: ${COLORS.blue_dark};
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

export default Component