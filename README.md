# Integration Release Action

This custom action notifies the HashiCorp `integration-api` that
a release for the consuming integration repository has occurred.

## Inputs

### `github_token`

**Required**

### `integration_identifier`

**Required**

### `release_version`

**Required**

### `release_sha`

**Required**

## Outputs

None

## Example usage

```yaml
jobs:
  notify-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout integration-release-action
        uses: actions/checkout@v2
        with:
          repository: hashicorp/integration-release-action
          path: ./integration-release-action
      - name: Notify Release
        uses: ./integration-release-action
        with:
          integration_identifier: "waypoint/brandoncorp-waypoint-plugin"
          release_version: ${{ github.ref_name }}
          release_sha: ${{ github.ref }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
