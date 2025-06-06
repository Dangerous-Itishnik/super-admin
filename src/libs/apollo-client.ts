import {ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";


const httpLink = createHttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    const Auth = btoa('admin@gmail.com:admin');

    return {
        headers: {
            ...headers,
            Authorization: `Basic ${Auth}`,
            'Content-Type': 'application/json',
        },
    };
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://inctagram.work/api/v1/graphql',
    connectionParams: {
        headers: {
            Authorization: `Basic ${btoa('admin@gmail.com:admin')}`,
        },
    },
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink) // für Queries/Mutations
);
export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
})

