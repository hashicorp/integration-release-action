# Integration Release Action

This custom action notifies the HashiCorp `integration-api` that
a release for the consuming integration repository has occurred.

## Inputs

### `github_token`

**Required**

We recommend using a repository's default `GITHUB_TOKEN`, which are [read-only](https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/) by default.

### `integration_identifier`

**Required**

### `release_version`

**Required**

### `release_sha`

**Required**

## Outputs

None

## Example usage

### A Single Integration

```yaml
jobs:
  notify-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout this repo
        uses: actions/checkout@v3
      - name: Checkout integration-release-action
        uses: actions/checkout@v3
        with:
          repository: hashicorp/integration-release-action
          path: ./integration-release-action
      - name: Notify Release
        uses: ./integration-release-action
        with:
          integration_identifier: "waypoint/hashicorp/brandoncorp-waypoint-plugin"
          release_version: ${{ github.ref_name }}
          release_sha: ${{ github.ref }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

### Multiple Integrations

> **Note**: This leverages [GitHub actions matrix strategies](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)

```yaml
jobs:
  notify-release:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        integration_identifier:
          - "vault/hashicorp/first-plugin"
          - "vault/hashicorp/second-plugin"
          # - add more integrations as needed. Limit 256
    steps:
      - name: Checkout this repo
        uses: actions/checkout@v3
      - name: Checkout integration-release-action
        uses: actions/checkout@v3
        with:
          repository: hashicorp/integration-release-action
          path: ./integration-release-action
      - name: Notify Release
        uses: ./integration-release-action
        with:
          integration_identifier: ${{ matrix.integration_identifier }}
          release_version: ${{ github.ref_name }}
          release_sha: ${{ github.ref }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
