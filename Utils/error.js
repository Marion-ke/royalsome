export const errorHandler = (statusCode, message) => {
  const error = new Error(); //This is the error constructor from javaScript.
  error.statusCode = statusCode;
  error.message = message;

  return error;
};