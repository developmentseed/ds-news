import * as auth from "./auth/auth.actions";
import * as query from "./query/query.actions";

// In this object, we declare any actions that could possibly pass through our
// application.
export const rootActions = {
  auth,
  query
};
