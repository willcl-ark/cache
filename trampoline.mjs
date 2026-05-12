import { access } from "node:fs/promises";

async function hasWarpCache() {
    try {
        await access(new URL("./warp-index.js", import.meta.url));
        return true;
    } catch {
        return false;
    }
}

async function tryOverrideCache() {
    if (process.env["WARPBUILD_RUNNER_VERIFICATION_TOKEN"] && await hasWarpCache()) {
        console.log("Using WarpBuild cache service...");
        await import("./warp-index.js");
        return true;
    }

    // Do not change anything, thus falling back to GitHub-provided cache servers.
    return false;
}

if (!await tryOverrideCache()) {
    import("./index.js")
}
