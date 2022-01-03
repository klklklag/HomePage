import { useCallback, useMemo } from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AuthenticationScreen } from '@layouts';
import { COLORS, SVGS } from '@resources';
import {
  BottomButton,
  GoBackButton,
} from '@components';

const useResultUI = (result: string) => {
  switch (result) {
    case 'in-progress':
      return {
        Svg: SVGS.USER_STATE_ICON_SIGN_UP_IN_PROGRESS,
        TextComponent:
          <MainText>
            <MintBoldText>제휴</MintBoldText>{' '}
            <BoldText>심사중 입니다...</BoldText>{'\n'}
            잠시만, 기다려주세요.
          </MainText>,
        NoticeComponent: <Notice>기업 제휴는 승인이 필요한 서비스입니다.{'\n'}(서류 검토 후 영업일 기준 3일 내 처리됩니다.)</Notice>,
      }
    case 'rejected':
      return {
        Svg: SVGS.USER_STATE_ICON_SIGN_UP_REJECTED,
        TextComponent:
          <MainText>
            <BoldText>제휴 신청이 반려되었습니다.</BoldText>{'\n'}
            아래 반려 사유를 확인해 주세요.
          </MainText>,
        NoticeComponent: <ReasonBox>첨부해주신 서류가 잘못 등록되었습니다.{'\n'}서류를 재업로드 해주세요.</ReasonBox>,
      }
    default:
      return {
        Svg: SVGS.USER_STATE_ICON_SIGN_UP_COMPLETE,
        TextComponent:
          <MainText>
            <BoldText>신청 완료!</BoldText>{'\n'}
            잠시만, 기다려주세요.
          </MainText>,
        NoticeComponent: <Notice>기업 제휴는 승인이 필요한 서비스입니다.{'\n'}(서류 검토 후 영업일 기준 3일 내 처리됩니다.)</Notice>,
      }
  }
}

const Component: NextPage = () => {
  const { replace, query } = useRouter();
  const handlePressNext = useCallback(() => {
    replace('/login');
  }, [replace]);

  const { Svg, TextComponent, NoticeComponent } = useResultUI(String(query.result));
  
  return (
    <AuthenticationScreen>
      <Root>
        <GoBackButton href="/login" />

        <IconWrapper>
          <Svg />
        </IconWrapper>

        {TextComponent}
        {NoticeComponent}

        <Box>
          <BoxText>회원가입/입점 관련 문의 사항은 <Email>contact@thankspay.co.kr</Email>로 문의 부탁드립니다.</BoxText>
        </Box>

        <BottomButton type="button" style={bottomButtonStyle} text="확인" onClick={handlePressNext} />
      </Root>
    </AuthenticationScreen>
  );
};

const Root = styled.div`
  width: 80vw;
  max-width: 600px;
  max-height: 100%;
  padding: 30px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};

  overflow: scroll;
  overflow: overlay;
`;

const IconWrapper = styled.div`
  margin: 24px 0px 0px 0px;
  display: flex;
  justify-content: center;
`;

const MainText = styled.div`
  margin: 30px 0px 0px 0px;
  height: 64px;
  font-weight: 300;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};
  
  white-space: pre;
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const MintBoldText = styled(BoldText)`
  color: ${COLORS.main};
`;

const Notice = styled.div`
  margin: 20px 0px 0px 0px;
  height: 40px;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  
  white-space: pre;
  text-align: center;
`;

const Box = styled.div`
  margin: 30px 0px 0px;
  width: 100%;
  height: 53px;
  border-radius: 4px;
  padding: 0px 20px;
  background-color: ${COLORS.box_pale};

  display: flex;
  align-items: center;
`;

const BoxText = styled.div`
  width: 100%;
  height: 16px;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};
  text-align: center;
`;

const ReasonBox = styled.div`
  margin: 20px 0px 0px 0px;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  border: 1px solid ${COLORS.border};

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
  line-height: 22px;
  white-space: pre-wrap;
  text-align: center;
`;

const Email = styled.span`
  color: ${COLORS.blue};
`;

const bottomButtonStyle = `
  margin: 40px 0px 0px;
`;

export default Component;