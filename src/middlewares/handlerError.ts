import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export function withErrorHandling(handler: Function) {
  return async function (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> {
    try {
      return await handler(request, context);
    } catch (error) {
      const statusCode = error.status || 500;
      const errorMessage = error.message || "Internal Server Error";
      return {
        status: statusCode,
        body: JSON.stringify({
          error: true,
          message: errorMessage,
        }),
      };
    }
  };
}
