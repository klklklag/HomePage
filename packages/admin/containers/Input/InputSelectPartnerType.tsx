import { Select, SelectProps } from "@components";

const _InputSelectPartnerType = (props: Omit<SelectProps, 'children'>) => {
  return (
    <Select
      {...props}
      name="partnerType"
    >
      <option value="1">개인 사업자</option>
      <option value="2">법인 사업자</option>
    </Select>
  );
};

export const InputSelectPartnerType = _InputSelectPartnerType;