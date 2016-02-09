contract DappHubRegistry {
    struct IPFSHash {
        bytes data;
    }
    struct package_descriptor {
        address owner;
        bytes32 name;
        // semver logic used in set
        bytes4 major_version;
        bytes4 minor_version;
        bytes4 patch_version;
        bytes package_ipfs_hash;
    }
}
