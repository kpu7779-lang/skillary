import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getSkillBySlug } from "@/lib/skills-data";
import { handleApiError, jsonError, jsonOk, withCors } from "@/lib/api-utils";

const postSchema = z.object({
  skillSlug: z.string().min(1),
});

export async function OPTIONS(req: Request) {
  return withCors(new Response(null, { status: 204 }), req);
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return withCors(jsonError("未登录", 401), req);
    }

    const favorites = await db.favorite.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: { skillSlug: true, createdAt: true },
    });

    return withCors(jsonOk({ favorites }), req);
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return withCors(jsonError("请先登录", 401), req);
    }

    const { skillSlug } = postSchema.parse(await req.json());
    if (!getSkillBySlug(skillSlug)) {
      return withCors(jsonError("技能不存在", 404), req);
    }

    const favorite = await db.favorite.upsert({
      where: {
        userId_skillSlug: {
          userId: session.user.id,
          skillSlug,
        },
      },
      create: { userId: session.user.id, skillSlug },
      update: {},
    });

    return withCors(jsonOk({ favorite }, 201), req);
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return withCors(jsonError("未登录", 401), req);
    }

    const slug = new URL(req.url).searchParams.get("slug");
    if (!slug) return withCors(jsonError("缺少 slug 参数", 400), req);

    await db.favorite.deleteMany({
      where: { userId: session.user.id, skillSlug: slug },
    });

    return withCors(jsonOk({ removed: slug }), req);
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}