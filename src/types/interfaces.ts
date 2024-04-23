export interface RouteCrumb {
  title: string;
  route: string;
  onClick?: (...args) => void | any;
}