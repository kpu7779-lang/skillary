import { z } from "zod";
import { searchSkills } from "@/lib/skills-data";
import { handleApiError, jsonOk, withCors } from "@/lib/api-utils";

const querySchema = z.object({
  q: z.string().optional(),
  type: z.enum(["all", "free", "paid"]).optional().default("all"),
  sort: z.enum(["popular", "newest", "rating"]).optional().default("popular"),
});

export async function OPTIONS(req: Request) {
  return withCors(new Response(null, { status: 204 }), req);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = querySchema.parse({
      q: searchParams.get("q") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
    });

    const results = searchSkills({
      query: params.q,
      type: params.type,
      sort: params.sort,
    }).map((s) => ({
      slug: s.slug,
      title: s.title,
      tagline: s.tagline,
      category: s.category,
      price: s.price,
      rating: s.rating,
      downloads: s.downloads,
      platforms: s.platforms,
      featured: s.featured,
      trending: s.trending,
      isNew: s.isNew,
    }));

    return withCors(jsonOk({ skills: results, total: results.length }), req);
  } catch (err) {
    return withCors(handleApiError(err), req);
  }
}