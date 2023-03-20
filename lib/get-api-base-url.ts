/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const URLS = {
  production: "https://wg5pym9sch.us-east-1.awsapprunner.com",
  staging: "https://uvvuveeuha.us-east-1.awsapprunner.com",
};

export function getApiBaseUrl(): string {
  // default to production; override with:
  // ```
  // env:
  //   ENVIRONMENT: staging
  // ```
  const env =
    (process.env.ENVIRONMENT as "production" | "staging") || "production";
  const baseURL = URLS[env];

  return baseURL;
}
