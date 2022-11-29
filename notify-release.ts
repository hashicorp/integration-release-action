import createFetch from "@vercel/fetch";
import * as fetchImpl from "node-fetch";
const fetch = createFetch(fetchImpl);

import * as core from "@actions/core";

const URLS = {
  production: "https://wg5pym9sch.us-east-1.awsapprunner.com",
  staging: "https://uvvuveeuha.us-east-1.awsapprunner.com",
};

export async function main() {
  // action inputs
  const githubToken = core.getInput("github_token", { required: true });
  const integrationIdentifier = core.getInput("integration_identifier", {
    required: true,
  });
  const releaseVersion = core.getInput("release_version", { required: true });
  const releaseSha = core.getInput("release_sha", { required: true });

  // default to production; override with:
  // ```
  // env:
  //   ENVIRONMENT: staging
  // ```
  const env =
    (process.env.ENVIRONMENT as "production" | "staging") || "production";
  const baseURL = URLS[env];

  // parse slugs from identifier
  const [productSlug, integrationSlug] = integrationIdentifier.split("/");

  const url = new URL(
    `products/${productSlug}/integrations/${integrationSlug}/notify-release`,
    baseURL
  );

  const result = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${githubToken}`,
    },
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
