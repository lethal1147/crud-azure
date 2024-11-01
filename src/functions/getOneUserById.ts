import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";
import { createError } from "../utils/createError";
import { withErrorHandling } from "../middlewares/handlerError";

export async function getUserById(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { userId } = request.params;
  if (!userId) createError("Userid is missing!", 400);
  if (isNaN(+userId)) createError("Userid must be number!", 400);
  const user = await db.user.findUnique({
    where: {
      id: +userId,
    },
  });

  return {
    body: JSON.stringify({
      error: false,
      message: "Get one user.",
      user: user,
    }),
  };
}

app.http("getUserById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "getUserById/{userId}",
  handler: withErrorHandling(getUserById),
});
