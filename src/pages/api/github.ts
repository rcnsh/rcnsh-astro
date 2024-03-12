import type { APIRoute } from "astro";
import { Octokit } from "@octokit/core";


const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN,
  })

  export const GET: APIRoute = async () => {
    const response = await octokit.request('GET /users/RCNOverwatcher/repos', {
        username: 'RCNOverwatcher',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    return new Response(JSON.stringify(response.data), {
      headers: {
        "content-type": "application/json",
      },
    });
  }