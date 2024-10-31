import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";
import { withErrorHandling } from "../middlewares/handlerError";
import { createError } from "../utils/createError";

export async function deleteUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { userId } = request.params;
  if (!userId) createError("Userid is missing!", 400);
  if (isNaN(+userId)) createError("Userid must be number!", 400);
  await db.user.delete({
    where: {
      id: +userId,
    },
  });
  return { body: `Hello, World!` };
}

app.http("deleteUser", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "deleteUser/{userId}",
  handler: withErrorHandling(deleteUser),
});
