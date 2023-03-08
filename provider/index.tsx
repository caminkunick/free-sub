import {
  BoxProps,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import { FirebaseApp } from "firebase/app";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  ParsedToken,
  User,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { defaultTheme } from "./default.theme";
import { watchDarkmode } from "./watch.darkmode";

//SECTION - Store
//ANCHOR - StoreAction
export type StoreAction =
  | { type: "dark"; value: boolean }
  | { type: "app"; value: FirebaseApp }
  | { type: "auth"; value: User | null; claims?: ParsedToken }
  | { type: "sign-menu"; value: Store["signedMenu"] };
//ANCHOR - Store
export class Store {
  dark: boolean;

  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;

  userloading: boolean;
  user: User | null;
  claims: ParsedToken | null;

  signedMenu: ReactNode | ((claims: ParsedToken | null) => ReactNode);

  //ANCHOR - constructor
  constructor(data?: Partial<Store>) {
    this.dark = data?.dark ?? false;

    this.app = data?.app ?? null;
    this.db = data?.db ?? null;
    this.auth = data?.auth ?? null;

    this.userloading = data?.userloading ?? true;
    this.user = data?.user ?? null;
    this.claims = data?.claims ?? null;

    this.signedMenu = data?.signedMenu ?? <></>;
  }

  //ANCHOR - reducer
  static reducer(store: Store, action: StoreAction): Store {
    switch (action.type) {
      case "dark":
        return new Store({ ...store, dark: action.value });
      case "app":
        return new Store({
          ...store,
          app: action.value,
          db: getFirestore(action.value),
          auth: getAuth(action.value),
        });
      case "auth":
        return new Store({
          ...store,
          userloading: false,
          user: action.value,
          claims: action.claims,
        });
      case "sign-menu":
        return new Store({ ...store, signedMenu: action.value });
      default:
        return store;
    }
  }
}
//!SECTION

//ANCHOR - MainContext
const MainContext = createContext<{
  store: Store;
  dispatch: Dispatch<StoreAction>;
  mobile: boolean
}>({
  store: new Store(),
  dispatch: () => {},
  mobile: false
});

//ANCHOR - useStore
export const useStore = () => useContext(MainContext);

//ANCHOR - ProviderProps
export type ProviderProps = Pick<BoxProps, "children"> & {
  app: FirebaseApp;
  signedMenu?: Store["signedMenu"];
};

//SECTION - Provider
export const Provider = (props: ProviderProps) => {
  const [store, dispatch] = useReducer(Store.reducer, new Store());
  const mobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    dispatch({ type: "app", value: props.app });
  }, [props.app]);

  useEffect(() => {
    const unwatchDarkmode = watchDarkmode(window.matchMedia, (value) =>
      dispatch({ type: "dark", value })
    );
    const unwatchUser = store.auth
      ? onAuthStateChanged(store.auth, async (value) => {
          const claims = (await value?.getIdTokenResult())?.claims;
          dispatch({ type: "auth", value, claims });
        })
      : () => {};
    return () => {
      unwatchDarkmode();
      unwatchUser();
    };
  }, [store.auth]);

  useEffect(() => {
    if (props.signedMenu) {
      dispatch({ type: "sign-menu", value: props.signedMenu });
    }
  }, [props]);

  return (
    <MainContext.Provider value={{ store, dispatch, mobile }}>
      <ThemeProvider theme={createTheme(defaultTheme(store.dark))}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </MainContext.Provider>
  );
};
//!SECTION
