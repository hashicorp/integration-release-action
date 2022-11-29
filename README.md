# Integration Release Action

Todo

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
      # Checkout private repo
      - name: Checkout integration-release-action
        uses: actions/checkout@v2
        with:
          repository: hashicorp/integration-release-action
          path: ./integration-release-action
      - name: Notify Release
        # reference the path from above
        uses: ./integration-release-action
        with:
          integration_identifier: "waypoint/brandoncorp-waypoint-plugin"
          release_version: ${{ github.ref_name }}
          release_sha: ${{ github.ref }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
