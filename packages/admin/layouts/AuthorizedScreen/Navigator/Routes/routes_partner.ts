import { baseRoute_partner, SVGS } from "@resources";
import { NavBarRouteListItem } from "./type";

export const routes_partner: NavBarRouteListItem[] = [
  // {
  //   Icon: SVGS.NAV_BAR_ICON_SUMMARY,
  //   text: '요약',
  //   path: baseRoute_partner + '/summary',
  // },
  {
    Icon: SVGS.NAV_BAR_ICON_INVOICE,
    text: '인보이스',
    path: baseRoute_partner + '/invoice',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_HISTORY,
    text: '내역 조회',
    path: baseRoute_partner + '/history',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_DEPOSIT,
    text: '보증금',
    path: baseRoute_partner + '/deposit',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_PARTNER,
    text: '기업 정보',
    path: baseRoute_partner + '/info',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_PARTNER_WORKER,
    text: '근로자 관리',
    path: baseRoute_partner + '/workers',
  },
];

export const routes_partner_optional: NavBarRouteListItem[] = [
  {
    Icon: SVGS.NAV_BAR_ICON_QNA,
    text: 'QnA',
    path: baseRoute_partner + '/temp',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_HELP,
    text: 'FAQ',
    path: baseRoute_partner + '/temp',
  },
  {
    Icon: SVGS.NAV_BAR_ICON_SELIS,
    text: '약관 보기',
    path: baseRoute_partner + '/temp',
  },
]