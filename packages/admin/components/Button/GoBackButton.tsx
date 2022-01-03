import Link from 'next/link';
import styled from 'styled-components';
import { SVGS } from '@resources';

const _GoBackButton = ({ href }: { href: string; }) => {
  return (
    <Root>
      <Link href={href}>
        <Button>
          <SVGS.ICON_GO_BACK />
        </Button>
      </Link>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;

export const GoBackButton = _GoBackButton;