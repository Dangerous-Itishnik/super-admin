import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Avatar = {
  __typename?: 'Avatar';
  fileSize?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type FollowPaginationModel = {
  __typename?: 'FollowPaginationModel';
  items: Array<Follow>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type ImagePost = {
  __typename?: 'ImagePost';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileSize?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type LoginAdmin = {
  __typename?: 'LoginAdmin';
  logged: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  banUser: Scalars['Boolean']['output'];
  loginAdmin: LoginAdmin;
  removeUser: Scalars['Boolean']['output'];
  unbanUser: Scalars['Boolean']['output'];
};


export type MutationBanUserArgs = {
  banReason: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUnbanUserArgs = {
  userId: Scalars['Int']['input'];
};

export type PaginationModel = {
  __typename?: 'PaginationModel';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  type?: Maybe<SubscriptionType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum PaymentMethod {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE'
}

export type PaymentPaginationModel = {
  __typename?: 'PaymentPaginationModel';
  items: Array<SubscriptionByPaymentModel>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaymentsPaginationModel = {
  __typename?: 'PaymentsPaginationModel';
  items: Array<SubscriptionPaymentsModel>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<ImagePost>>;
  ownerId: Scalars['Int']['output'];
  postOwner: PostOwnerModel;
  updatedAt: Scalars['DateTime']['output'];
  userBan?: Maybe<UserBan>;
};

export type PostOwnerModel = {
  __typename?: 'PostOwnerModel';
  avatars?: Maybe<Array<Avatar>>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  userName: Scalars['String']['output'];
};

export type PostsByUserModel = {
  __typename?: 'PostsByUserModel';
  items?: Maybe<Array<ImagePost>>;
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PostsPaginationModel = {
  __typename?: 'PostsPaginationModel';
  items: Array<Post>;
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  aboutMe?: Maybe<Scalars['String']['output']>;
  avatars?: Maybe<Array<Avatar>>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getFollowers: FollowPaginationModel;
  getFollowing: FollowPaginationModel;
  getPayments: PaymentsPaginationModel;
  getPaymentsByUser: PaymentPaginationModel;
  getPosts: PostsPaginationModel;
  getPostsByUser: PostsByUserModel;
  getUser: User;
  getUsers: UsersPaginationModel;
};


export type QueryGetFollowersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetFollowingArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPaymentsByUserArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetPostsArgs = {
  endCursorPostId?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPostsByUserArgs = {
  endCursorId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  statusFilter?: InputMaybe<UserBlockStatus>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum StatusSubscriptionType {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Finished = 'FINISHED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  postAdded: Post;
};

export type SubscriptionByPaymentModel = {
  __typename?: 'SubscriptionByPaymentModel';
  businessAccountId: Scalars['Int']['output'];
  dateOfPayment?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  paymentType?: Maybe<PaymentMethod>;
  payments: Array<Payment>;
  price: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: StatusSubscriptionType;
  type: SubscriptionType;
};

export type SubscriptionPaymentsModel = {
  __typename?: 'SubscriptionPaymentsModel';
  amount?: Maybe<Scalars['Int']['output']>;
  avatars?: Maybe<Array<Avatar>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  paymentMethod: PaymentMethod;
  type: SubscriptionType;
  userId?: Maybe<Scalars['Int']['output']>;
  userName: Scalars['String']['output'];
};

export enum SubscriptionType {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  profile: Profile;
  userBan?: Maybe<UserBan>;
  userName: Scalars['String']['output'];
};

export type UserBan = {
  __typename?: 'UserBan';
  createdAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
};

export enum UserBlockStatus {
  All = 'ALL',
  Blocked = 'BLOCKED',
  Unblocked = 'UNBLOCKED'
}

export type UsersPaginationModel = {
  __typename?: 'UsersPaginationModel';
  pagination: PaginationModel;
  users: Array<User>;
};

export type BanUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  banReason: Scalars['String']['input'];
}>;


export type BanUserMutation = { __typename?: 'Mutation', banUser: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'LoginAdmin', logged: boolean } };

export type RemoveUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: boolean };

export type UnBanUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UnBanUserMutation = { __typename?: 'Mutation', unbanUser: boolean };

export type GetFollowersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy: Scalars['String']['input'];
  sortDirection?: InputMaybe<SortDirection>;
  pageNumber: Scalars['Int']['input'];
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'FollowPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, createdAt: any }> } };

export type GetFollowingQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy: Scalars['String']['input'];
  sortDirection?: InputMaybe<SortDirection>;
  pageNumber: Scalars['Int']['input'];
}>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowing: { __typename?: 'FollowPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, createdAt: any }> } };

export type GetPaymentsByUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  pageNumber: Scalars['Int']['input'];
  sortBy: Scalars['String']['input'];
  sortDirection?: InputMaybe<SortDirection>;
}>;


export type GetPaymentsByUserQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, status: StatusSubscriptionType, dateOfPayment?: any | null, startDate?: any | null, endDate?: any | null, type: SubscriptionType, price: number, paymentType?: PaymentMethod | null, payments: Array<{ __typename?: 'Payment', id?: number | null, userId?: number | null, paymentMethod?: PaymentMethod | null, amount?: number | null, currency?: CurrencyType | null, createdAt?: any | null, endDate?: any | null, type?: SubscriptionType | null }> }> } };

export type GetPostsByUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  endCursorId: Scalars['Int']['input'];
}>;


export type GetPostsByUserQuery = { __typename?: 'Query', getPostsByUser: { __typename?: 'PostsByUserModel', pageSize: number, pagesCount: number, totalCount: number, items?: Array<{ __typename?: 'ImagePost', id?: number | null, createdAt?: any | null, url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', id: number, userName?: string | null, firstName?: string | null, lastName?: string | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null } };

export type GetUsersQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortBy: Scalars['String']['input'];
  sortDirection: SortDirection;
  searchTerm: Scalars['String']['input'];
  statusFilter: UserBlockStatus;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, email: string, userName: string, createdAt: any, profile: { __typename?: 'Profile', id: number, createdAt: any, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null }>, pagination: { __typename?: 'PaginationModel', page: number, pagesCount: number, pageSize: number, totalCount: number } } };


export const BanUserDocument = gql`
    mutation BanUser($userId: Int!, $banReason: String!) {
  banUser(userId: $userId, banReason: $banReason)
}
    `;
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      banReason: // value for 'banReason'
 *   },
 * });
 */
export function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options);
      }
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    logged
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($userId: Int!) {
  removeUser(userId: $userId)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UnBanUserDocument = gql`
    mutation UnBanUser($userId: Int!) {
  unbanUser(userId: $userId)
}
    `;
export type UnBanUserMutationFn = Apollo.MutationFunction<UnBanUserMutation, UnBanUserMutationVariables>;

/**
 * __useUnBanUserMutation__
 *
 * To run a mutation, you first call `useUnBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unBanUserMutation, { data, loading, error }] = useUnBanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnBanUserMutation(baseOptions?: Apollo.MutationHookOptions<UnBanUserMutation, UnBanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnBanUserMutation, UnBanUserMutationVariables>(UnBanUserDocument, options);
      }
export type UnBanUserMutationHookResult = ReturnType<typeof useUnBanUserMutation>;
export type UnBanUserMutationResult = Apollo.MutationResult<UnBanUserMutation>;
export type UnBanUserMutationOptions = Apollo.BaseMutationOptions<UnBanUserMutation, UnBanUserMutationVariables>;
export const GetFollowersDocument = gql`
    query getFollowers($userId: Int!, $pageSize: Int!, $sortBy: String!, $sortDirection: SortDirection, $pageNumber: Int!) {
  getFollowers(
    userId: $userId
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
    pageNumber: $pageNumber
  ) {
    items {
      id
      userId
      userName
      createdAt
    }
    pagesCount
    page
    pageSize
    totalCount
  }
}
    `;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions: Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables> & ({ variables: GetFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export function useGetFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersSuspenseQueryHookResult = ReturnType<typeof useGetFollowersSuspenseQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetFollowingDocument = gql`
    query getFollowing($userId: Int!, $pageSize: Int!, $sortBy: String!, $sortDirection: SortDirection, $pageNumber: Int!) {
  getFollowing(
    userId: $userId
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
    pageNumber: $pageNumber
  ) {
    items {
      id
      userId
      userName
      createdAt
    }
    pagesCount
    page
    pageSize
    totalCount
  }
}
    `;

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a React component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useGetFollowingQuery(baseOptions: Apollo.QueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables> & ({ variables: GetFollowingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
      }
export function useGetFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export function useGetFollowingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFollowingQuery, GetFollowingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, options);
        }
export type GetFollowingQueryHookResult = ReturnType<typeof useGetFollowingQuery>;
export type GetFollowingLazyQueryHookResult = ReturnType<typeof useGetFollowingLazyQuery>;
export type GetFollowingSuspenseQueryHookResult = ReturnType<typeof useGetFollowingSuspenseQuery>;
export type GetFollowingQueryResult = Apollo.QueryResult<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetPaymentsByUserDocument = gql`
    query getPaymentsByUser($userId: Int!, $pageSize: Int!, $pageNumber: Int!, $sortBy: String!, $sortDirection: SortDirection) {
  getPaymentsByUser(
    userId: $userId
    pageSize: $pageSize
    sortBy: $sortBy
    pageNumber: $pageNumber
    sortDirection: $sortDirection
  ) {
    items {
      id
      businessAccountId
      status
      dateOfPayment
      startDate
      endDate
      type
      price
      paymentType
      payments {
        id
        userId
        paymentMethod
        amount
        currency
        createdAt
        endDate
        type
      }
    }
    pagesCount
    page
    pageSize
    totalCount
  }
}
    `;

/**
 * __useGetPaymentsByUserQuery__
 *
 * To run a query within a React component, call `useGetPaymentsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPaymentsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables> & ({ variables: GetPaymentsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(GetPaymentsByUserDocument, options);
      }
export function useGetPaymentsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(GetPaymentsByUserDocument, options);
        }
export function useGetPaymentsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(GetPaymentsByUserDocument, options);
        }
export type GetPaymentsByUserQueryHookResult = ReturnType<typeof useGetPaymentsByUserQuery>;
export type GetPaymentsByUserLazyQueryHookResult = ReturnType<typeof useGetPaymentsByUserLazyQuery>;
export type GetPaymentsByUserSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsByUserSuspenseQuery>;
export type GetPaymentsByUserQueryResult = Apollo.QueryResult<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>;
export const GetPostsByUserDocument = gql`
    query getPostsByUser($userId: Int!, $endCursorId: Int!) {
  getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
    items {
      id
      createdAt
      url
      width
      height
      fileSize
    }
    pageSize
    pagesCount
    totalCount
  }
}
    `;

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetPostsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables> & ({ variables: GetPostsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, options);
      }
export function useGetPostsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, options);
        }
export function useGetPostsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, options);
        }
export type GetPostsByUserQueryHookResult = ReturnType<typeof useGetPostsByUserQuery>;
export type GetPostsByUserLazyQueryHookResult = ReturnType<typeof useGetPostsByUserLazyQuery>;
export type GetPostsByUserSuspenseQueryHookResult = ReturnType<typeof useGetPostsByUserSuspenseQuery>;
export type GetPostsByUserQueryResult = Apollo.QueryResult<GetPostsByUserQuery, GetPostsByUserQueryVariables>;
export const GetUserDocument = gql`
    query getUser($userId: Int!) {
  getUser(userId: $userId) {
    id
    userName
    email
    createdAt
    profile {
      id
      userName
      firstName
      lastName
      avatars {
        url
      }
    }
    userBan {
      reason
      createdAt
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($pageSize: Int, $pageNumber: Int, $sortBy: String!, $sortDirection: SortDirection!, $searchTerm: String!, $statusFilter: UserBlockStatus!) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    searchTerm: $searchTerm
    statusFilter: $statusFilter
  ) {
    users {
      id
      email
      userName
      profile {
        id
        avatars {
          url
        }
        createdAt
      }
      createdAt
      userBan {
        reason
        createdAt
      }
    }
    pagination {
      page
      pagesCount
      pageSize
      totalCount
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *      statusFilter: // value for 'statusFilter'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables> & ({ variables: GetUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;