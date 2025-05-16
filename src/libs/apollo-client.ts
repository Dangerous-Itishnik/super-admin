import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include'
})

const authLink = setContext((_, { headers }) => {

    const auth = btoa('igorgrim@gmail.com');

    return {
        headers: {
            ...headers,
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
})