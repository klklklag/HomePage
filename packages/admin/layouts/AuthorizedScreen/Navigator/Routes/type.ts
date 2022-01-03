type NavBarRouteListItem_Common = {
  Icon: any;
  text: string;
};

export type NavBarRouteListItem_Path = NavBarRouteListItem_Common & { path: string; };
export type NavBarRouteListItem_SubRoute = NavBarRouteListItem_Common & { subRoutes: NavBarRouteListItem_Path[]; }

export type NavBarRouteListItem = {
  Icon: any;
  text: string;
  path: string;
  subRoutes?: NavBarRouteListItem[];
}