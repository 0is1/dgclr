// @flow
import React, { Component } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import initApollo from 'lib/initApollo';
import { isBrowser } from 'helpers/utils';

type Props = {
  serverState: {
    apollo: {
      data: {},
    },
  },
};
// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Unknown';
}
// $FlowFixMe
export default ComposedComponent => class WithApollo extends Component<Props> {
    static displayName = `WithApollo(${getComponentDisplayName(ComposedComponent)})`;

    apollo = null;

    static async getInitialProps(ctx: any) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {},
        },
      };

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!isBrowser) {
        const apollo = initApollo();

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent {...composedInitialProps} />
            </ApolloProvider>,
            {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query,
              },
            },
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the store
        const state = {};

        // Extract query data from the Apollo store
        serverState = Object.assign(state, { apollo: { data: apollo.cache.extract() } });
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    constructor(props: Props) {
      super(props);
      this.apollo = initApollo(props.serverState.apollo.data);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
};
