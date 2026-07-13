import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { jsonError, jsonOk, withCors } from "@/lib/api-utils";

export async function OPTIONS(req: Request) {
  return withCors(new Response(null, { status: 204 }), req);
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return withCors(jsonError("未登录", 401), req);
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      _count: { select: { favorites: true, submissions: true } },
    },
  });

  if (!user) return withCors(jsonError("用户不存在", 404), req);

  return withCors(
    jsonOk({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        favoritesCount: user._count.favorites,
        submissionsCount: user._count.submissions,
      },
    }),
    req
  );
}