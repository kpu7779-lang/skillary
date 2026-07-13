import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { handleApiError, jsonError, jsonOk, withCors } from "@/lib/api-utils";

const schema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少 6 位"),
  name: z.string().min(1, "请填写昵称").max(32).optional(),
});

export async function OPTIONS(req: Request) {
  return withCors(new Response(null, { status: 204 }), req);
}

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const email = body.email.trim().toLowerCase();

    const exists = await db.user.findUnique({ where: { email } });
    if (exists) return withCors(jsonError("该邮箱已注册", 409), req);

    const passwordHash = await hashPassword(body.password);
    const user = await db.user.create({
      data: {
        email,
        name: body.name?.trim() || email.split("@")[0],
        passwordHash,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return withCors(jsonOk({ user, message: "注册成功，请登录" }, 201), req);
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}