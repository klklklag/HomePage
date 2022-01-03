import styled from 'styled-components';
import { Divider, ModalProps } from "@components";
import { COLORS, getCommaString } from "@resources";

// export type ModalInstanceProps = Omit<ModalProps, 'children' | 'title' | 'type'>;
export type ModalInstanceProps = Pick<ModalProps, 'visible' | 'closeFunc'>;
type CustomStyle = { customStyle?: string; };

export const PropertyAreaTitle = styled.div<CustomStyle>`
  height: 20px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.72px;
  color: ${COLORS.main};

  ${({ customStyle }) => customStyle}
`;

export const PropertyNameRoot = styled.div<CustomStyle>`
  position: relative;

  height: 20px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.72px;
  color: ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;

export const Sign = styled.div`
  position: absolute;
  right: 100%;
`;

export const PropertyName = ({
  customStyle,
  children,
  sign
}: {
  customStyle?: string;
  children?: any;
  sign?: string;
}) => {
  return (
    <PropertyNameRoot customStyle={customStyle}>
      {sign && <Sign>{sign}&nbsp;</Sign>}
      {children}
    </PropertyNameRoot>
  )
}

export const PropertyValue = styled.div<CustomStyle>`
  height: 18px;
  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.black};

  ${({ customStyle }) => customStyle}
`;

export const DataGrid = styled.div<CustomStyle>`
  margin: 30px 0px 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 90px;

  ${({ customStyle }) => customStyle}
`;

export const DataGridItem = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
`;

export const NumberWithUnitWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 11px 0px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const NumberWithUnit = ({
  value,
  unit = "원",
  bold = false,
}: {
  value: number;
  unit?: string;
  bold?: boolean;
}) => {
  return (
    <NumberWithUnitWrapper>
      <PropertyValue customStyle={bold ? "font-weight: 700;" : undefined}>{getCommaString(value)}</PropertyValue>
      <PropertyValue>{unit}</PropertyValue>
    </NumberWithUnitWrapper>
  );
}

export const AreaDivider = styled(Divider)`
  margin: 40px 0px;
`;

export const CalculationDivider = styled(Divider)`
  background-color: ${COLORS.main};
`;