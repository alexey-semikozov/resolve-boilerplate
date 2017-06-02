import React from 'react';
import { Provider, connect } from 'react-redux';

let memoizedStore;

export default (
  createStore,
  mapStateToProps,
  mapDispatchToProps
) => Component => {
  function getStoreInstance(initialState) {
    if (typeof window === 'undefined') {
      return createStore(initialState);
    }
    if (!memoizedStore) {
      memoizedStore = createStore(initialState);
    }
    return memoizedStore;
  }

  function ResolveWrapper({ initialState, ...initialProps }) {
    const WrapComponent = connect(mapStateToProps, mapDispatchToProps)(
      Component
    );
    return (
      <Provider store={getStoreInstance(initialState)}>
        <WrapComponent {...initialProps} />
      </Provider>
    );
  }

  ResolveWrapper.getInitialProps = async context => {
    const initialState = context.req ? context.req.initialState : undefined;
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps(context)
      : {};

    return {
      initialState,
      ...initialProps
    };
  };

  return ResolveWrapper;
};
