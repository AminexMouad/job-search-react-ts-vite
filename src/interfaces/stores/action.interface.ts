import { Dispatch } from 'react';

export default interface IAction {
  type: string;
  payload?: any;
}

export interface IDispatchContext {
  dispatch: Dispatch<IAction>;
}
