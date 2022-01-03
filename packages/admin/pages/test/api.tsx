import type { NextPage } from 'next'
import { useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { adminAPI, contentAPI, ContentTargetTypeFlag, partnerAPI } from '@api';
import { COLORS } from '@resources';

const APIButtonComponent = ({
  text,
  onClick,
  complete,
}: {
  text: string;
  onClick: (() => any) | (() => Promise<any>);
  complete?: boolean;
}) => {
  const [onCall, setOnCall] = useState<boolean>(false);
  const callAPI = useCallback(async () => {
    setOnCall(true);
    await onClick();
    setOnCall(false);
  }, [onClick]);

  return (
    <APIButton onClick={callAPI} complete={complete}>
      {onCall ? <Spinner /> : text}
    </APIButton>
  );
}

const APIButton = styled.div<{ complete?: boolean }>`
  width: 200px;
  height: 100px;
  border: 1px solid;
  background-color: ${({ complete }) => complete ? 'aqua' : 'white'};

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  white-space: pre;
  text-align: center;

  &:hover { opacity: 0.8 };
  &:active { opacity: 0.5 };
`;

const spinAnimation = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  height: 70%;
  aspect-ratio: 1;
  border-radius: 100vw;
  border: 6px solid;
  border-color: transparent ${COLORS.white} ${COLORS.white} ${COLORS.white};
  animation: ${spinAnimation} 2s infinite linear;
`;

const testPLI = '5100856026';
const testPrefix = '[API 테스트]';

const Components: NextPage = () => {

  return (
    <Root>
      <Row>
        <APIButtonComponent text="파트너 목록조회" onClick={() => adminAPI.readPartnerAll()} complete />
        <APIButtonComponent text="파트너 상세조회" onClick={() => adminAPI.readPartner({ partnerLicenseId: testPLI })} complete />
        {/* <APIButtonComponent text="파트너 인보이스 상세조회" onClick={() => adminAPI.readWorkerInfo({ partnerLicenseId: '7883423212', workerEmail: 'klklklag@gmail.com' })} /> */}
        <APIButtonComponent text="FAQ 목록조회" onClick={() => adminAPI.readFAQList()} complete />
        <APIButtonComponent text="파트너 땡쓰페이 목록조회" onClick={() => adminAPI.readPartnerThanksPayAll({ yearMonth: '2021.09' })} complete />
        <APIButtonComponent text="근로자 땡스페이 목록조회" onClick={() => adminAPI.readWorkerThanksPayAll({ workerEmail: 'klklklad@hanmail.net' })} complete />
        <APIButtonComponent text="제휴관리 목록조회" onClick={() => adminAPI.readAffiliationDataAll()} complete />
        <APIButtonComponent text="유저관리 목록조회" onClick={() => adminAPI.readWorkerDataAll()} complete />
        <APIButtonComponent text="파트너 인보이스 목록조회" onClick={() => adminAPI.readPartnerInvoiceList({ partnerLicenseId: testPLI, year: '2021' })} complete />
        <APIButtonComponent text="파트너 인보이스 상세조회" onClick={() => adminAPI.readPartnerInvoiceDetail({ partnerLicenseId: testPLI, yearMonth: '2021.09' })} complete />
        <APIButtonComponent text="파트너 보증금 목록조회" onClick={() => adminAPI.readPartnerDepositList({ partnerLicenseId: testPLI, year: '2021' })} complete />
      </Row>

      <Row>
        <APIButtonComponent text="땡스페이 송금" onClick={() => adminAPI.sendThanksPayToWorker({
          workerEmail: 'klklklad@hanmail.net',
          advancedPay: 100000,
          payReqDate: '20210517',
        })} />
        <APIButtonComponent text="보증금 송금" onClick={() => adminAPI.sendDepositFromPartner({
          // partnerLicenseId: "6952500932",
          // deposit: 100000,
          // virtualBankAccount: '62669673318932',
          // bankCode: '020',
          // accountHolder: '이상우',
        } as any)} />
        <APIButtonComponent text="근로자 연체 등록" onClick={() => adminAPI.setWorkerOverdue({
          workerEmail: 'klklklad@hanmail.net',
          overdueDate: '20210517',
        })} />
        <APIButtonComponent text="QNA 답변 등록" onClick={() => adminAPI.createQNAReply({
          qnaId: 0,
          qnaReplyManagerId: '테스트 매니저 ID',
          qnaReplyContent: '테스트 답변',
        })} />
      </Row>
      
      <Row>
        <APIButtonComponent text={`근로자 비밀번호\n실패횟수 수정`} onClick={() => adminAPI.updateWorkerPasswordFailureCount({
          workerEmail: 'klklklad@hanmail.net',
          failureCount: 0,
        })} complete />
      </Row>

      <Row>
        <APIButtonComponent text="파트너사 목록 조회" onClick={() => partnerAPI.readPartnerAll()} complete />
        <APIButtonComponent text="파트너사 상세조회" onClick={() => partnerAPI.readPartnerData({ partnerLicenseId: testPLI })} complete />
        <APIButtonComponent text="파트너사 매니저 조회" onClick={() => partnerAPI.readPartnerManagerData({ partnerLicenseId: testPLI })} complete />
        <APIButtonComponent text="파트너사 근로자 전체조회" onClick={() => partnerAPI.readPartnerWorkersAll({ partnerLicenseId: testPLI})} complete />
        <APIButtonComponent text="파트너사 상태조회" onClick={() => partnerAPI.readPartnerState({ partnerLicenseId: testPLI})} />
      </Row>

      <Row>
        {/* <APIButtonComponent text="파트너사 등록" onClick={() => partnerAPI.signup()} complete />
        <APIButtonComponent text="파트너사 로그인" onClick={() => partnerAPI.login()} complete /> */}
      </Row>

      <Row>
        {/* <APIButtonComponent text="파트너사 정보 변경" onClick={() => partnerAPI.updatePartnerData()} />
        <APIButtonComponent text="파트너사 계정정보 변경" onClick={() => partnerAPI.updatePartnerManagerData()} />
        <APIButtonComponent text="파트너사 계좌정보 변경" onClick={() => partnerAPI.updatePartnerBankData()} /> */}
      </Row>

      <Row>
        <APIButtonComponent text="QnA - 파트너 목록조회" onClick={() => contentAPI.readQnAList({ targetType: 'partner' })} complete />
        <APIButtonComponent text="QnA - 근로자 목록조회" onClick={() => contentAPI.readQnAList({ targetType: 'worker' })} complete />
        <APIButtonComponent text="QnA - id로 조회" onClick={() => contentAPI.readQnAItem({ qnaId: 35 })} complete />
        <APIButtonComponent text="QnA - 생성" onClick={() => contentAPI.createQnAItem({ userEmail: 'test@email.com', qnaTitle: `${testPrefix} 문의 제목`, qnaContent: `${testPrefix} 문의 본문`, qnaCategory: ContentTargetTypeFlag.partner, isSecret: false })} complete />
        <APIButtonComponent text="QnA - 수정" onClick={() => contentAPI.updateQnAItem({ qnaId: 47, userEmail: 'test@email.com', qnaTitle: `${testPrefix} 문의 제목 수정`, qnaContent: `${testPrefix} 문의 본문 수정`, qnaCategory: ContentTargetTypeFlag.worker, isSecret: false })} complete />
        <APIButtonComponent text="QnA - 삭제" onClick={() => contentAPI.deleteQnAItem({ qnaId: 47 })} complete />
      </Row>
      <Row>
        <APIButtonComponent text="약관 - 파트너 목록조회" onClick={() => contentAPI.readTermList({ targetType: 'partner', type: 'all' })} complete />
        <APIButtonComponent text="약관 - 근로자 목록조회" onClick={() => contentAPI.readTermList({ targetType: 'worker', type: 'all' })} complete />
        <APIButtonComponent text="약관 - id로 조회" onClick={() => contentAPI.readTermItem({ termsCode: 8 })} complete />
        <APIButtonComponent text="약관 - 생성" onClick={() => contentAPI.createTermItem({ termsName: `${testPrefix} 약관 0001`, termsContent: `${testPrefix} 약관 0001 본문`, termsFlag: ContentTargetTypeFlag.partner, required: 1, isUsed: true, registerId: '관리자 ㅎㅎㅎ' })} complete />
        <APIButtonComponent text="약관 - 수정" onClick={() => contentAPI.updateTermItem({ termsCode: 13, termsName: `${testPrefix} 약관 0001 수정`, termsContent: `${testPrefix} 약관 0001 본문 수정`, termsFlag: ContentTargetTypeFlag.worker, required: 0, isUsed: false, modiId: '관리자 ㅠㅠㅠ' })} complete />
        <APIButtonComponent text="약관 - 삭제" onClick={() => contentAPI.deleteTermItem({ termsCode: 13 })} complete />
      </Row>
      <Row>
        <APIButtonComponent text="FAQ - 생성" onClick={() => contentAPI.createFAQItem({ faqTitle: '테스트 faq', faqReply: '테스트 faq 답변', faqCategory: ContentTargetTypeFlag.partner })} complete />
        <APIButtonComponent text="FAQ - 파트너 목록조회" onClick={() => contentAPI.readFAQList({ targetType: 'partner' })} complete />
        <APIButtonComponent text="FAQ - 근로자 목록조회" onClick={() => contentAPI.readFAQList({ targetType: 'worker' })} complete />
        <APIButtonComponent text="FAQ - 수정" onClick={() => contentAPI.updateFAQItem({ faqId: 31, faqTitle: '수정전: 테스트 faq       수정후: 테스트 FAQ', faqReply: '수정전: 테스트 faq 답변\n수정후: 테스트 FAQ', faqCategory: ContentTargetTypeFlag.worker })} complete />
        <APIButtonComponent text="FAQ - 삭제" onClick={() => contentAPI.deleteFAQItem({ faqId: 31 })} complete />
      </Row>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Row = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default Components;