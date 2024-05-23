import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";

const client = new S3Client({
  endpoint: "https://31e51704ff7169c03d7014c3a1e5f110.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: import.meta.env.S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY,
  },
  region: "auto",
});
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  try {
    const url = await getSignedUrl(
      client,
      new GetObjectCommand({ Bucket: "rcn", Key: body.fileKey }),
      { expiresIn: 3600 },
    );
    return new Response(JSON.stringify({ url }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
