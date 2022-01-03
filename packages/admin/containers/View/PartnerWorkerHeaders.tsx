import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { COLORS, decrypt } from '@resources';
import { BodyHeader, LeftWorkLabel, OnHoldLabel, OnWorkLabel } from '@components';
import { fetchPartnerData, RootState } from '@shared-state';

type DefaultDivProps = Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'>;

const getFormattedSalaryDay = (salaryDay: string | number) => {
  const salaryDayString = String(salaryDay)
  if (salaryDayString === '99') return '말'
  else return salaryDayString;
};

const _PartnerHeader = ({ children, ...props }: DefaultDivProps) => {
  const { query: { partnerId }} = useRouter();
  const dispatch = useDispatch();

  const {
    partnerName,
    salaryDay,
  } = useSelector(({
    partner: {
      partnerName,
      salaryDay,
    }
  }: RootState) => ({
    partnerName,
    salaryDay,
  }));

  useEffect(() => {
    partnerId && dispatch(fetchPartnerData({ partnerLicenseId: decrypt(String(partnerId)) }));
  }, [partnerId]);

  return (
    <BodyHeader>
      <PartnerName>{partnerName}</PartnerName>
      {children}
      <PaydayText>기준 급여일 <Payday>{getFormattedSalaryDay(salaryDay)}</Payday> 일</PaydayText>
    </BodyHeader>
  );
};

const _WorkerHeader = ({
  workerName = '김땡쓰',
  salaryDay = 0,
  blackState,
  isEmployee = false,
  ...props
}: {
  workerName?: string;
  salaryDay?: number;
  blackState?: any;
  isEmployee?: boolean;
} & DefaultDivProps) => {
  return (
    <BodyHeader>
      <PartnerName>{workerName}</PartnerName>
      {
        isEmployee ? 
          <OnWorkLabel /> :
          <LeftWorkLabel />
      }
      {
        blackState ? 
          <OnHoldLabel /> :
          null
      }
      <PaydayText>기준 급여일 <Payday>{getFormattedSalaryDay(salaryDay)}</Payday> 일</PaydayText>
    </BodyHeader>
  );
}

const PartnerName = styled.span`
  font-weight: 600;
  font-size: 21px;
  letter-spacing: -0.84px;
  color: ${COLORS.main};
`;

const PaydayText = styled(PartnerName)`
  margin: 0px 0px 0px auto;
  color: ${COLORS.black};
`;

const Payday = styled(PartnerName)``;

export const PartnerHeader = _PartnerHeader;
export const WorkerHeader = _WorkerHeader;