import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";
import { withErrorHandling } from "../middlewares/handlerError";

export async function createUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { firstname, lastname, email } = JSON.parse(await request.text());
  const user = await db.user.create({
    data: {
      firstname,
      lastname,
      email,
    },
  });
  return {
    body: JSON.stringify({
      error: false,
      message: "Create one user",
      user,
    }),
  };
}

app.http("createUser", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: withErrorHandling(createUser),
});
