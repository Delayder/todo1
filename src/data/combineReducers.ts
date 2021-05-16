export function combineReducers<R extends any>(reducers: any) {
  type keys = keyof typeof reducers;
  type returnType = { [K in keys]: ReturnType<typeof reducers[K]> }
  const combinedReducer = (state: any, action: any) => {
    const newState: returnType = {} as any;
    const keys = Object.keys(reducers);
    keys.forEach((key: any) => {
      const result = reducers[key](state[key], action);
      newState[key as any] = result || state[key];
    });
    return newState;
  }
  return combinedReducer;
};
