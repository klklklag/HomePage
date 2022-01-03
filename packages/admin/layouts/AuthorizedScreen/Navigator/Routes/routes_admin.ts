import { baseRoute_admin, SVGS } from "@resources";
import { NavBarRouteListItem } from "./type";

const partnerOrWorker: NavBarRouteListItem[] = [
  {
    Icon: null,
    text: '기업',
    path: '/partner',
  },
  {
    Icon: null,
    text: '근로자',
    path: '/worker',
  },
];

export const routes_admin: NavBarRouteListItem[] = [
  {
    Icon: SVGS.NAV_BAR_ICON_HOME,
    text: '메인 홈',
    path: baseRoute_admin + '/home',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_MAGAZINE,
    text: '현황 조회',
    path: baseRoute_admin + '/history',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_BOARD,
    text: '제휴 관리',
    path: baseRoute_admin + '/affiliation',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_WORKER,
    text: '유저 관리',
    path: baseRoute_admin + '/users',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_QNA,
    text: 'QnA 관리',
    path: baseRoute_admin + '/qna',
    subRoutes: partnerOrWorker,
  },
  {
    Icon: SVGS.NAV_BAR_ICON_SELIS,
    text: '약관 관리',
    path: baseRoute_admin + '/terms',
    subRoutes: partnerOrWorker,
  },
  {
    Icon: SVGS.NAV_BAR_ICON_HELP,
    text: 'FAQ 관리',
    path: baseRoute_admin + '/faq',
    subRoutes: partnerOrWorker,
  },
];