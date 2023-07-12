import { QueryInput, Cache } from "@urql/exchange-graphcache";

// import Cookies from "js-cookie";
export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
