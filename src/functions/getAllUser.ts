import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { db } from "../services/database";
import { withErrorHandling } from "../middlewares/handlerError";

export async function getAllUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const search = request.query.get("search");
  const whereQuery = {};
  if (search) {
    whereQuery["OR"] = [
      {
        firstname: {
          contains: search,
        },
      },
      {
        lastname: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
    ];
  }
  const users = await db.user.findMany({
    where: whereQuery,
  });
  return {
    body: JSON.stringify({
      users,
    }),
  };
}

app.http("getAllUser", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: withErrorHandling(getAllUser),
});
