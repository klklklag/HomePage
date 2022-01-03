import { Select, SelectProps } from "@components";

const dateList = Array.from({ length: 29 }, (_, index) => index + 1);

const _InputSelectSalaryDay = (props: Omit<SelectProps, 'children'>) => {
  return (
    <Select
      name="salaryDay"
      {...props}
    >
      {dateList.map(date => <option key={String(date)} value={date}>{date}일</option>)}
      <option key={String(99)} value={99}>말일</option>
    </Select>
  );
};

export const InputSelectSalaryDay = _InputSelectSalaryDay;