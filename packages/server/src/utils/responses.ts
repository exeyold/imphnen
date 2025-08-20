export function getNotFoundResponse({
  method,
  path,
}: {
  method: string;
  path: string;
}) {
  return { error: "Endpoint not found", method, path };
}

export function getInternalServerErrorResponse({
  method,
  path,
}: {
  method: string;
  path: string;
}) {
  return {
    error: "Something went wrong, please try again later",
    method,
    path,
  };
}
