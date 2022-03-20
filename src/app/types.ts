export type PathsType = "/" | "today" | "tomorrow" | "week" | "*";

export type Routs = Array<{
  path: PathsType;
  element: JSX.Element;
}>;
