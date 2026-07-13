import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { handleApiError, jsonError, jsonOk, withCors } from "@/lib/api-utils";

const schema = z.object({
  title: z.string().min(2, "标题太短").max(80),
  tagline: z.string().min(4, "一句话介绍太短").max(120),
  description: z.string().min(10, "描述太短").max(2000),
  category: z.string().min(1),
  price: z.number().int().min(0).max(9999).optional().default(0),
});

export async function OPTIONS(req: Request) {
  return withCors(new Response(null, { status: 204 }), req);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return withCors(jsonError("请先登录后再发布技能", 401), req);
    }

    const body = schema.parse(await req.json());
    const submission = await db.skillSubmission.create({
      data: {
        userId: session.user.id,
        title: body.title.trim(),
        tagline: body.tagline.trim(),
        description: body.description.trim(),
        category: body.category,
        price: body.price,
        status: "pending",
      },
    });

    return withCors(
      jsonOk(
        {
          submission: {
            id: submission.id,
            title: submission.title,
            status: submission.status,
            createdAt: submission.createdAt,
          },
          message: "提交成功，我们将在 1-3 个工作日内审核",
        },
        201
      ),
      req
    );
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}