function readPackage(pkg, context) {
    // Force "socket.io" version to 4.2.0 because of https://github.com/socketio/socket.io/issues/4121
    // Remove later if issue is closed
    if (pkg.dependencies["socket.io"]) {
        pkg.dependencies["socket.io"] = '4.2.0';
    }
    return pkg;
}

/**
 * Hooks of pnpm when installing a package
 */
module.exports = { hooks: { readPackage } };