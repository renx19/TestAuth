// src/utils/handleError.js
export function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}
