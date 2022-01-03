import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import styled from 'styled-components';
import { PartnerScreen, MenuBar } from '@layouts';
import { AddDepositModal, DepositTable, PartnerHeader, VirtualBankAccountModal } from '@containers';
import { addIdIndexToTableData, COLORS, decrypt, getCurrentYear, getCurrentYearMonth } from '@resources';
import { adminAPI } from '@api';
import { RectButton, DepositAccountLabel, useModal } from '@components';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const result = await adminAPI.readPartnerDepositList({
    partnerLicenseId: decrypt(String(query.partnerId)),
    year: String(query.year || getCurrentYear()),
  });

  if ('errors' in result) return {
    props: {
      data: [],
      virtualAccountBankName: '',
      virtualBankAccount: '',
      realtimeDeposit: 0,
      realtimeUsedDeposit: 0,
      totalRealtimeUsedDeposit: 0,
    },
  };

  const {
    virtualAccountBankName,
    virtualBankAccount,
    realtimeDeposit,
    realtimeUsedDeposit,
    totalRealtimeUsedDeposit,
    depositListByYear,
  } = result.getDepositList;
  return {
    props: {
      data: addIdIndexToTableData(depositListByYear),
      virtualAccountBankName,
      virtualBankAccount: virtualBankAccount || '',
      realtimeDeposit,
      realtimeUsedDeposit,
      totalRealtimeUsedDeposit: totalRealtimeUsedDeposit || null,
    },
  };
};

const Component = ({
  virtualAccountBankName,
  virtualBankAccount,
  ...props
}: {
  data: any[];
  virtualAccountBankName: string;
  virtualBankAccount: string;
  realtimeDeposit: number;
  realtimeUsedDeposit: number;
  totalRealtimeUsedDeposit: number;
}) => {
  const router = useRouter();
  const [visibleAccountModal, showAccountModal, hideAccountModal] = useModal();
  const [visibleAddDepositModal, showAddDepositModal, hideAddDepositModal] = useModal();

  const [data, setData] = useState<any>();
  const openVirtualBankAccountModal = useCallback(async () => {
    const { partnerId } = router.query;
    const partnerLicenseId = decrypt(String(partnerId));

    const result = await adminAPI.readPartnerDepositDetail({ partnerLicenseId, yearMonth: getCurrentYearMonth() });
    if ('errors' in result) {
      alert(result.errors.errMsg);
      return;
    }

    console.log(result);
    setData(result.getDepositListByYearMonth);

    showAccountModal();
  }, [showAccountModal]);
  return (
    <>
      <PartnerScreen>
        <MenuBar />
        <Body>
          <PartnerHeader>
            <DepositAccountLabel bankName={virtualAccountBankName} bankAccount={virtualBankAccount} />
            <RectButton customStyle="margin: 0px 0px 0px 20px;" onClick={openVirtualBankAccountModal}>가상계좌 관리</RectButton>
            <RectButton customStyle="margin: 0px 0px 0px 20px;" onClick={showAddDepositModal}>보증금 입금</RectButton>
          </PartnerHeader>
          
          <DepositTable {...props} />
        </Body>
      </PartnerScreen>

      <VirtualBankAccountModal visible={visibleAccountModal} closeFunc={hideAccountModal} data={data} />
      <AddDepositModal visible={visibleAddDepositModal} closeFunc={hideAddDepositModal} bankAccount={virtualBankAccount} />
    </>
  );
};

const Body = styled.div`
  width: 100%;
  padding: 0px 40px 40px;
  border-radius: 4px;
  background-color: ${COLORS.white};
`;

export default Component