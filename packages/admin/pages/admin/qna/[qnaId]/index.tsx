import { useCallback, useMemo } from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AdminScreen } from '@layouts';
import { COLORS, getFormattedDateString, SVGS } from '@resources';
import {
  BodyHeader,
  DeleteButton,
  RectButton,
  ScreenSubtitle,
  ScreenTitle,
  UpdateButton
} from '@components';
import { contentAPI, QnAListItem } from '@api';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const qnaId = Number(query.qnaId);
  const result = await contentAPI.readQnAItem({ qnaId });
  if ('errors' in result) {
    return { props: { data: {} } };
  }
  return { props: { data: result } };
}

const Component = ({ data }: { data: Partial<QnAListItem>; }) => {
  const router = useRouter();

  const goToList = useCallback(() => {
    router.push(`/admin/qna/${data.qnaCategory === 1 ? 'partner' : 'worker'}`);
  }, [router, data.qnaCategory]);

  const goToUpdatePage = useCallback(() => {
    const { push, query, pathname } = router;
    push({
      pathname: pathname + '/update',
      query: { qnaId: query.qnaId },
    });
  }, [router]);
  return (
    <AdminScreen>
      <BodyHeader style="border-color: transparent">
        <SVGS.NAV_BAR_ICON_QNA fill={COLORS.main} />
        <ScreenTitle customStyle="margin: 0px 0px 0px 10px;">QnA 관리 {'>'} 상세보기</ScreenTitle>
        <ScreenSubtitle>{data.qnaCategory === 1 ? '기업' : '근로자'}</ScreenSubtitle>
      </BodyHeader>

      <BodyHeader>
        <TermTitleText>{data.qnaTitle}</TermTitleText>
        <ButtonsWrapper>
          <UpdateButton onClick={goToUpdatePage} />
          <DeleteButton onClick={() => alert('콜 테스트')} />
        </ButtonsWrapper>
      </BodyHeader>

      <MetadataArea>
        <MetadataText>작성일 {getFormattedDateString(data.qnaDatetime)}</MetadataText>
      </MetadataArea>

      <DescArea>{data.qnaContent}</DescArea>

      {
        data.qnaReplyContent ?
          <ReplyStatusText>답변 완료</ReplyStatusText> :
          <NoReplyStatusText>답변 대기중</NoReplyStatusText>
      }
      <ReplyBox>{data.qnaReplyContent || "답변이 작성되지 않았습니다. 잠시만 기다려주세요!"}</ReplyBox>
      <RectButton customStyle="margin: 20px 0px 0px auto;">확인</RectButton>

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
  height: 431px;

  overflow: scroll;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  line-height: 22px;
  white-space: pre-wrap;
`;

const NoReplyStatusText = styled.div`
  margin: 100px 0px 0px 0px;

  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.63px;
  color: ${COLORS.gray};
`;

const ReplyStatusText = styled(NoReplyStatusText)`
  color: ${COLORS.main};
`;

const ReplyBox = styled.div`
  margin: 20px 0px 0px 0px;

  width: 100%;
  height: 200px;
  border-radius: 6px;
  border: 1px solid ${COLORS.border};
  padding: 10px;

  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.5px;
  color: ${COLORS.gray};
`;

const GoToListButton = styled.button`
  margin: 0px auto;
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