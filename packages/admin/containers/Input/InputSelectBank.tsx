import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectProps } from "@components";
import { fetchBankList, RootState } from "@shared-state";

const _InputSelectBank = (props: Omit<SelectProps, 'children'>) => {
  const dispatch = useDispatch();

  const bankList = useSelector(({ content: { bankList }}: RootState) => bankList);

  useEffect(() => {
    dispatch(fetchBankList());
  }, []);

  return (
    <Select
      name="bankCode"
      {...props}
    >
      {
        bankList.map(({ bankCode, bankName }) => <option key={bankCode} value={bankCode}>{bankName}</option>)
      }
    </Select>
  );
};

export const InputSelectBank = _InputSelectBank;