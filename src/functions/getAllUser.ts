import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";

export async function getAllUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const users = await db.user.findMany();
  return {
    body: JSON.stringify({
      users,
    }),
  };
}

app.http("getAllUser", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAllUser,
});
