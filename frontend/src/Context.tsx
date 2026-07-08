import { createContext } from "react";

export interface AppContext {
  isAuthorized: boolean;
  setIsAuthorized: (isAuthorized: boolean) => void;
  user: any;
  setUser: (user: any) => void;
}

export const Context = createContext<AppContext>({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: {},
  setUser: () => {},
});
