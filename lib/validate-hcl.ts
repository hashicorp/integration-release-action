import * as path from "path";

import * as core from "@actions/core";
import LoadFilesystemIntegration from "@hashicorp/integrations-hcl";

import { getApiBaseUrl } from "./get-api-base-url";

export async function main() {
  core.info("[validate-hcl]: Running");

  // action inputs
  const integrationIdentifier = core.getInput("integration_identifier", {
    required: true,
  });
  const releaseVersion = core.getInput("release_version", { required: true });

  // by default, assume the repo will be checked out under $GITHUB_WORKSPACE
  let repoPath = core.getInput("repo_path", {}) || "";
  repoPath = path.join(process.env.GITHUB_WORKSPACE!, repoPath);

  // This env var is set by GitHub Actions
  let repo = process.env.GITHUB_REPOSITORY;
  let orgSlug = repo?.split("/")[0];

  // exporting this ENV VAR because LoadFilesystemIntegration internally depends on this.
  process.env.INPUT_INTEGRATIONS_API_BASE_URL = getApiBaseUrl();
  try {
    const fsIntegration = await LoadFilesystemIntegration({
      identifier: integrationIdentifier,
      repo_path: repoPath,
      version: releaseVersion,
      organization_id: orgSlug,
    });

    core.info(JSON.stringify(fsIntegration, null, 2));
  } catch (err: any) {
    core.setFailed(`[validate-hcl] Error: ${err.message}`);
    throw err;
  }
  core.info("[validate-hcl]: Finished");
}
