/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import createFetch from "@vercel/fetch";
import * as fetchImpl from "node-fetch";
const fetch = createFetch(fetchImpl);

import { getApiBaseUrl } from "./get-api-base-url";

import * as core from "@actions/core";

export async function main() {
  core.info("[notify-release]: Running");
  // action inputs
  const githubToken = core.getInput("github_token", { required: true });
  const integrationIdentifier = core.getInput("integration_identifier", {
    required: true,
  });
  const integrationStrategy = core.getInput("integration_strategy", {
    required: false,
  });
  const releaseVersion = core.getInput("release_version", { required: true });
  const releaseSha = core.getInput("release_sha", { required: true });

  // parse slugs from identifier
  const [productSlug, orgSlug, integrationSlug] =
    integrationIdentifier.split("/");

  // [POST] /products/:product/organizations/:organization/integrations/:integration/notify-release
  const url = new URL(
    `products/${productSlug}/organizations/${orgSlug}/integrations/${integrationSlug}/notify-release`,
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
      strategy: integrationStrategy,
    }),
  });

  if (result.status < 300) {
    core.info("Successfully notified release");
  } else {
    core.error(await result.text());
    core.setFailed(
      `Failed to notify release: API responded with [${result.status}]}`
    );
  }

  core.info("[notify-release]: Finished");
}
