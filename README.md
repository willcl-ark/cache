# Cache action

This utility repository periodically pulls the latest
[actions/cache](https://github.com/actions/cache) release branches and wraps
their action entrypoints.

On WarpBuild runners, the wrapper detects `WARPBUILD_RUNNER_VERIFICATION_TOKEN`
and loads WarpBuild's cache implementation. Everywhere else, it leaves the
environment untouched and falls back to the standard GitHub Actions cache.

```ts
if (process.env["WARPBUILD_RUNNER_VERIFICATION_TOKEN"]) {
    await import("./warp-index.js");
    return;
}

await import("./index.js");
```

This lets workflows use one cache action without provider-specific `if:`
conditions.

## Usage

```diff
-- uses: actions/cache@v5
+- uses: willcl-ark/cache@v5
   with:
     path: node_modules
     key: node_modules
```

The same replacement works for the split restore and save actions:

```diff
-- uses: actions/cache/restore@v5
+- uses: willcl-ark/cache/restore@v5

-- uses: actions/cache/save@v5
+- uses: willcl-ark/cache/save@v5
```
