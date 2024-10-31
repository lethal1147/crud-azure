import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";
import { withErrorHandling } from "../middlewares/handlerError";
import { createError } from "../utils/createError";

export async function updateUserById(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { userId } = request.params;
  if (!userId) createError("Userid is missing!", 400);
  if (isNaN(+userId)) createError("Userid must be number!", 400);
  const { firstname, lastname, email } = JSON.parse(await request.text());
  const user = await db.user.update({
    where: {
      id: +userId,
    },
    data: {
      firstname,
      lastname,
      email,
    },
  });

  return {
    body: JSON.stringify({
      error: false,
      message: "Update user",
      user,
    }),
  };
}

app.http("updateUserById", {
  methods: ["PATCH"],
  authLevel: "anonymous",
  route: "updateUserById/{userId}",
  handler: withErrorHandling(updateUserById),
});
