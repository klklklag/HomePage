import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { COLORS } from '@resources';
import {
  NavBarRouteListItem,
  routes_admin,
  routes_partner,
  routes_partner_optional,
} from './Routes';

const regex = /\[.+\]/;

const NavLink = ({
  data: {
    Icon,
    text,
    path,
  },
}: {
  data: NavBarRouteListItem;
}) => {
  const { pathname, query } = useRouter();
  const isSelected = useMemo(() => pathname.includes(path), [pathname, path]);
  const href = useMemo(() => {
    const stringMatched = path.match(regex);

    if (!stringMatched) return path;
    else {
      const queryItem = stringMatched[0].replace(/\[|\]/g, '');
      return {
        pathname: path,
        query: { [queryItem]: query[queryItem] },
      }
    }
  }, [query, path]);
  return (
    <Link href={href} passHref>
      <CustomLink isSelected={isSelected}>
        <IconWrapper className="svg-wrapper">
          <Icon />
        </IconWrapper>
        <ButtonText className="nav-text">{text}</ButtonText>
      </CustomLink>
    </Link>
  );
};

const NavContainer = ({
  data: {
    Icon,
    text,
    path,
    subRoutes,
  },
}: {
  data: NavBarRouteListItem;
}) => {
  const { pathname } = useRouter();
  const linkSelected = useMemo(() => pathname.includes(path), [pathname, path]);
  return (
    <>
      <CustomContainer isSelected={linkSelected}>
        <IconWrapper className="svg-wrapper">
          <Icon />
        </IconWrapper>
        <ButtonText className="nav-text">{text}</ButtonText>
      </CustomContainer>

      {
        subRoutes?.map((subRoute) =>
          <Link key={`${text}-${subRoute.text}`} href={path + subRoute.path} passHref>
            <CustomSubLink isSelected={linkSelected && pathname.includes(subRoute.path)}>{subRoute.text}</CustomSubLink>
          </Link>
        )
      }
    </>
  )
}

const selectedLinkStyle = `
  background-color: ${COLORS.main};
  > .svg-wrapper > svg {
    fill: ${COLORS.white};
  }
  > .nav-text {
    font-weight: 600;
    color: ${COLORS.white};
  }
`;

const CustomLink = styled.a<{ isSelected: boolean; }>`
  width: 180px;
  height: 48px;
  border-radius: 4px;

  cursor: pointer;

  display: flex;
  align-items: center;

  overflow: hidden;

  ${({ isSelected }) => isSelected && selectedLinkStyle}
  &:hover { ${selectedLinkStyle} }
`;

const CustomContainer = styled(CustomLink)`
  cursor: default;

  &:hover {}
`;

const selectedSubLinkStyle = `
  color: ${COLORS.main};
`;

const CustomSubLink = styled.a<{ isSelected: boolean; }>`
  padding: 0px 0px 0px 68px;

  cursor: pointer;

  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.39px;
  color: ${COLORS.gray};

  ${({ isSelected }) => isSelected && selectedSubLinkStyle}
  &:hover { ${selectedSubLinkStyle} }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.div`
  margin: 0px 0px 0px 20px;
  height: 18px;

  font-weight: 300;
  font-size: 15px;
  letter-spacing: -0.45px;
  color: ${COLORS.gray};
`;

const _AdminNavigator = () => {
  const routes = useMemo(() => true ? routes_admin : routes_partner.concat(routes_partner_optional), []);
  return (
    <Root>
      {
        routes.map((route) => {
          if ('subRoutes' in route) return <NavContainer key={route.text} data={route} />;
          else return <NavLink key={route.text} data={route} />;
        })
      }
    </Root>
  );
};

const Root = styled.div`
  width: 220px;
  min-height: calc(100vh - 64px - 80px);
  padding: 24px 20px;
  background-color: ${COLORS.bar};

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AdminNavigator = _AdminNavigator;