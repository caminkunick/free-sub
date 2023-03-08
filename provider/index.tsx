import {
  BoxProps,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { FirebaseApp } from "firebase/app";
import {
  createContext,
  Dispatch,
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

export type StoreAction =
  | { type: "dark"; value: boolean }
  | { type: "app"; value: FirebaseApp }
  | { type: "auth"; value: User | null; claims?: ParsedToken };
export class Store {
  dark: boolean;

  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;

  userloading: boolean;
  user: User | null;
  claims: ParsedToken | null;

  constructor(data?: Partial<Store>) {
    this.dark = data?.dark ?? false;

    this.app = data?.app ?? null;
    this.db = data?.db ?? null;
    this.auth = data?.auth ?? null;

    this.userloading = data?.userloading ?? true;
    this.user = data?.user ?? null;
    this.claims = data?.claims ?? null;
  }

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
      default:
        return store;
    }
  }
}

const MainContext = createContext<{
  store: Store;
  dispatch: Dispatch<StoreAction>;
}>({
  store: new Store(),
  dispatch: () => {},
});

export const useStore = () => useContext(MainContext);

export type ProviderProps = Pick<BoxProps, "children"> & { app: FirebaseApp };
export const Provider = (props: ProviderProps) => {
  const [store, dispatch] = useReducer(Store.reducer, new Store());

  useEffect(() => {
    dispatch({ type: "app", value: props.app });
  }, [props.app]);

  useEffect(() => {
    if (store.auth) {
      return onAuthStateChanged(store.auth, async (value) => {
        const claims = (await value?.getIdTokenResult())?.claims;
        console.log((claims?.level ?? 0) === 9);
        dispatch({ type: "auth", value, claims });
      });
    }
  }, [store.auth]);

  return (
    <MainContext.Provider value={{ store, dispatch }}>
      <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </MainContext.Provider>
  );
};
