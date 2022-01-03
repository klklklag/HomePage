import { Modal } from '@components';
import styled from 'styled-components';
import { ModalInstanceProps } from './base';

const _CopyForm = (props: ModalInstanceProps) => {
  return (
    <Modal {...props} type={undefined}>

    </Modal>
  )
};

export const CopyForm = _CopyForm;