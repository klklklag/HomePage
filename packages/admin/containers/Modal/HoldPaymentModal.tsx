import styled from 'styled-components';
import { BottomButton, InputCheckbox, InputRadio, InputText, Modal, Warning } from '@components';
import { COLORS, decrypt, getObjectFromForm, refreshPage } from '@resources';
import { ModalInstanceProps } from './base';
import { useForm } from '@hooks';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { adminAPI, AdminAPI_UpdateWorkerState_Params } from '@api';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString(10).padStart(2, '0');
  const date = today.getDate().toString(10).padStart(2, '0');

  return `${year}.${month}.${date}`;
};

const formId = 'holdPaymentForm';

const _HoldPaymentModal = ({
  workerName,
  ...props
}: {
  workerName?: string;
} & ModalInstanceProps) => {
  const { query } = useRouter();
  const { isSubmitting, handleSubmit } = useForm();

  const [checked, setChecked] = useState<boolean>(false);
  const getCheckState = useCallback((checked: boolean | undefined) => setChecked(checked || false), [setChecked]);

  const onSubmit = useCallback(async () => {
    const data: AdminAPI_UpdateWorkerState_Params = getObjectFromForm(document.getElementById(formId));
    const result = await adminAPI.updateWorkerState(data);
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    refreshPage();
  }, []);

  useEffect(() => {
    if (!props.visible) setChecked(false);
  }, [props.visible]);
  return (
    <Modal {...props} type="plain">
      <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="workerEmail" value={decrypt(String(query.workerId))} />
        <input type="hidden" name="isBlack" value="1" />
        <Title>지급정지 신청</Title>
        <Warning style={warningStyle}>지급정지 신청 후에는 탄력급여를 이용할 수 없습니다.</Warning>
        <RadioRow>
          <Text>지급 정지 종류</Text>
          <InputRadio name="state" value="1" text="단순정지" defaultChecked />
          <InputRadio name="state" value="2" text="퇴사" />
        </RadioRow>
        <InputText inputTitle="근로자" defaultValue={workerName} disabled />
        <InputText inputTitle="정지일" defaultValue={getToday()} disabled />

        <NoticeArea>
          <NoticeAreaTitle>유의사항</NoticeAreaTitle>
          <NoticeAreaDesc>
            - 퇴사 신청 후에는 회원정보를 복구할 수 없습니다.{'\n'}
            - 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.
          </NoticeAreaDesc>
          <InputCheckbox text="안내 사항에 모두 확인하였으며, 이에 동의합니다." getCheckState={getCheckState} />
        </NoticeArea>
        <ButtonRow>
          <BottomButton type="button" text="취소" style={cancleButtonStyle} onClick={props.closeFunc} />
          <BottomButton type="submit" text="확인" style={bottomButtonStyle} isSubmitting={isSubmitting} disabled={!checked} />
        </ButtonRow>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  width: 600px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.96px;
  color: ${COLORS.black};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const RadioRow = styled(Row)`
  margin: 10px 0px 0px;

  gap: 40px;
`;

const ButtonRow = styled(Row)`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Text = styled.div`
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};
`;

const warningStyle = `
  font-size: 18px;
  letter-spacing: -0.54px;
`;

const NoticeArea = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: ${COLORS.box};
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const NoticeAreaTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray};
`;

const NoticeAreaDesc = styled.div`
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  line-height: 22px;
  color: ${COLORS.gray};

  white-space: pre-wrap;
`;

const bottomButtonStyle = `
  height: 50px;
`;

const cancleButtonStyle = bottomButtonStyle + `
  background-color: ${COLORS.gray}
`

export const HoldPaymentModal = _HoldPaymentModal;