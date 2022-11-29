import createFetch from "@vercel/fetch";
import * as fetchImpl from "node-fetch";
const fetch = createFetch(fetchImpl);

import * as core from "@actions/core";

export async function main() {
  // action inputs
  const githubToken = core.getInput("github_token", { required: true });
  const integrationIdentifier = core.getInput("integration_identifier", {
    required: true,
  });
  const releaseVersion = core.getInput("release_version", { required: true });
  const releaseSha = core.getInput("release_sha", { required: true });

  // do we hardcode this? How do we toggle between staging/production?
  const baseURL = process.env.BASE_URL;

  // parse slugs from identifier
  const [productSlug, integrationSlug] = integrationIdentifier.split("/");

  const url = new URL(
    `products/${productSlug}/integrations/${integrationSlug}/notify-release`,
    baseURL
  );

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${githubToken}`);

  const result = await fetch(url.toString(), {
    method: "POST",
    // @ts-expect-error: This is valid fetch usage
    headers: headers,
    body: JSON.stringify({
      version: releaseVersion,
      sha: releaseSha,
    }),
  });

  if (result.status < 300) {
    core.info("Successfully notified release");
  } else {
    core.error(
      `Failed to notify release: API responded with [${result.status}]`
    );
  }
}
