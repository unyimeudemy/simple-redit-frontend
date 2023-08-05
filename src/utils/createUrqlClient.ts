// import { Post } from "./../../../redit-server/src/entities/post";
import { Resolver, cacheExchange, Cache } from "@urql/exchange-graphcache";
import { fetchExchange, stringifyVariables } from "urql";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

//******************* create error exchange ***************************************** */
import { gql } from "@urql/core";
import router from "next/router";
import { Exchange } from "urql";
import { pipe, tap } from "wonka";
import { isServer } from "./isServer";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          // the error is a CombinedError with networkError and graphqlErrors properties
          if (error?.message.includes("you are not authenticated")) {
            router.replace("/login");
          }
        }
      })
    );
  };
//********************************************************************************* */
const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;

    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolveFieldByKey(entityKey, fieldKey);
    info.partial = !isItInTheCache;
    const result: String[] = [];
    fieldInfos.forEach((fi) => {
      const data = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string[];
      result.push(...data);
    });
    return result;
  };
};

//********************************************************************************** */

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    // cookie = ctx.req.headers.cookie;
  }

  function invalidateAllPost(cache: Cache) {
    cache.invalidate("Query", "posts", {
      limit: 10,
    });
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },

    exchanges: [
      // debugExchange,
      cacheExchange({
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                _id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache, info) => {
              const { postID, value } = args as VoteMutationVariables;
              // cache.invalidate({ __typename: 'Post', id: postID });
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    _id
                    points
                    voteStatus
                  }
                `,
                { _id: postID } as any
              ); // Data or null
              if (!!data) {
                if (data.voteStatus == value) {
                  return;
                }
                const newPoint =
                  parseInt(data.points) + (!data.voteStatus ? 1 : 2) * value;
                const data2 = cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { _id: postID, points: newPoint, voteStatus: value } as any
                );
              }
            },
            createPost: (_result, args, cache, info) => {
              //   cache.invalidate("Query", "posts", {
              //     limit: 10,
              //   });
              invalidateAllPost(cache);
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return { me: result.login.user };
                  }
                }
              );
              invalidateAllPost(cache);
            },

            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return { me: result.register.user };
                  }
                }
              );
            },

            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, query) => {
                  if (!result.logout) {
                    return query;
                  } else {
                    return { me: null };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      errorExchange,
      fetchExchange,
    ],
  };
};
