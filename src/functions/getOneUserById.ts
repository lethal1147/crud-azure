import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";

export async function getUserById(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { userId } = request.params;
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
  handler: getUserById,
});
