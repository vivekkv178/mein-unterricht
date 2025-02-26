export const ENV_VARIABLES = {
  MEIN_BE_BASE_URL: process?.env?.NEXT_PUBLIC_MEIN_BE_BASE_URL,
};

export const BE_ROUTES = {
  GET_MOVIES: "/get-movies",
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}
