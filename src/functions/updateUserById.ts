import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";

export async function updateUserById(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const { userId } = request.params;
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
  handler: updateUserById,
});
