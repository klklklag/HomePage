import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectProps } from "@components";
import { fetchWorkTypeList, RootState } from "@shared-state";

const _InputSelectWorkType = (props: Omit<SelectProps, 'children'>) => {
  const dispatch = useDispatch();

  const workTypeList = useSelector(({ content: { workTypeList }}: RootState) => workTypeList);

  useEffect(() => {
    dispatch(fetchWorkTypeList());
  }, []);

  return (
    <Select
      {...props}
      name="workType"
    >
      {
        workTypeList.map(({ workType, workTypeName }) => <option key={workType} value={workType}>{workTypeName}</option>)
      }
    </Select>
  );
};

export const InputSelectWorkType = _InputSelectWorkType;