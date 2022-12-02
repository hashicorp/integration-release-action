import createFetch from "@vercel/fetch";
import * as fetchImpl from "node-fetch";
const fetch = createFetch(fetchImpl);

import { getApiBaseUrl } from "./get-api-base-url";

import * as core from "@actions/core";

export async function main() {
  console.log("[notify-release]: Running");
  // action inputs
  const githubToken = core.getInput("github_token", { required: true });
  const integrationIdentifier = core.getInput("integration_identifier", {
    required: true,
  });
  const releaseVersion = core.getInput("release_version", { required: true });
  const releaseSha = core.getInput("release_sha", { required: true });

  // parse slugs from identifier
  const [productSlug, integrationSlug] = integrationIdentifier.split("/");

  // [POST] /products/:product/integrations/:integration/notify-release
  const url = new URL(
    `products/${productSlug}/integrations/${integrationSlug}/notify-release`,
    getApiBaseUrl()
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
    core.setFailed(
      `Failed to notify release: API responded with [${result.status}]`
    );
  }

  console.log("[notify-release]: Finished");
}
