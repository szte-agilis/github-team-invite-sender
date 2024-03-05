"use server";

import { Octokit } from "@octokit/rest";

export async function addUser(
  prevState: {
    message: string;
    ok: boolean;
  } | null,
  formData: FormData
) {
  const GITHUB_ORG = process.env["GITHUB_ORG"]!;
  const GITHUB_TOKEN = process.env["GITHUB_TOKEN"]!;

  if (!GITHUB_ORG) {
    return {
      message: "GITHUB_ORG is not set",
      ok: false,
    };
  }

  if (!GITHUB_TOKEN) {
    return {
      message: "GITHUB_TOKEN is not set",
      ok: false,
    };
  }

  const username = formData.get("username") as string;

  if (!username) {
    return { message: "Missing username", ok: false };
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  try {
    const user = await octokit.users.getByUsername({ username });

    try {
      const result = await octokit.orgs.createInvitation({
        org: GITHUB_ORG,
        invitee_id: user.data.id,
        role: "direct_member",
      });
      const e = result.data.failed_reason;
      if (e) {
        return { message: `Failed to send the invite: ${e}`, ok: false };
      }
    } catch (err) {
      console.error(err);
      return { message: "Failed to send the invite.", ok: false };
    }
  } catch (err) {
    console.error(err);
    return { message: "GitHub user not found", ok: false };
  }

  return { message: `Sent invitation to ${username} via email`, ok: true };
}
