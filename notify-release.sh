#!/usr/bin/env bash

# Config
BASE_URL="https://5nw9rm117f.execute-api.us-east-1.amazonaws.com"

# Break up the product & integration slugs
PRODUCT="$(echo "$INPUT_INTEGRATION_IDENTIFIER" | sed 's/^\([^/]*\)\/\(.*\)$/\1/')"
INTEGRATION="$(echo "$INPUT_INTEGRATION_IDENTIFIER" | sed 's/^\([^/]*\)\/\(.*\)$/\2/')"

# Send the release notification to the API
curl --request POST \
  --url "$BASE_URL/products/$PRODUCT/integrations/$INTEGRATION/notify-release" \
  --header "Authorization: Bearer $INPUT_GITHUB_TOKEN" \
  --header "content-type: application/json" \
  --data "{
    \"version\": \"$INPUT_RELEASE_VERSION\",
    \"sha\": \"$INPUT_RELEASE_SHA\"
  }"
