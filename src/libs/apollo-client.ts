import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include'
})

const authLink = setContext((_, { headers }) => {
    const Auth = btoa('igorgrime@gmail.com:Ex4mple!');

    return {
        headers: {
            ...headers,
            Authorization: `Basic ${Auth}`,
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


