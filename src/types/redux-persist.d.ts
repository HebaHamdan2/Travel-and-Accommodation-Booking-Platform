declare module "redux-persist/integration/react" {
  import * as React from "react";
  import { Persistor } from "redux-persist";

  export interface PersistGateProps {
    persistor: Persistor;
    loading?: React.ReactNode;
    onBeforeLift?: () => void | Promise<void>;
    children?: React.ReactNode;
  }

  export class PersistGate extends React.Component<PersistGateProps> {}
}
