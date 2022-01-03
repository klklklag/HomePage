import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLORS } from '@resources';
import { routes_partner } from './Routes';

const Pass = ({ children }: { children: any; }) => children;

const _MenuBar = () => {
  const { pathname, query } = useRouter();

  return (
    <Root>
      {
        routes_partner.map(route =>
          <Pass key={route.text}>
            <Link
              passHref
              href={{
                pathname: route.path,
                query: { partnerId: query.partnerId },
              }}
            >
              <Button isActive={pathname.includes(route.path)}>
                {route.text}
              </Button>
            </Link>
          </Pass>
        )
      }
    </Root>
  );
}

const Root = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background-color: ${COLORS.white};
  padding: 0px 20px;

  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styled.a<{ isActive: boolean; }>`
  padding: 10px;

  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray_pale};

  cursor: pointer;

  &:hover {
    color: ${COLORS.gray};
  }
  &:active {
    opacity: 0.5;
  }

  ${({ isActive }) => isActive && `
    color: ${COLORS.black};
    &:hover {
      color: ${COLORS.black};
    }
  `}
`;

export const MenuBar = _MenuBar;