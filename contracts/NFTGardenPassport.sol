// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title NFTGardenPassport
/// @notice Stores off-chain generated sprite CIDs and lightweight health check-ins for Monad NFT Garden.
contract NFTGardenPassport {
    struct CheckIn {
        uint64 updatedAt;
        uint16 healthScore;
        string spriteCid;
        string dataCid;
    }

    address public owner;
    mapping(bytes32 => CheckIn) public checkIns;

    event GardenCheckedIn(
        address indexed collection,
        uint256 indexed tokenId,
        uint16 healthScore,
        string spriteCid,
        string dataCid
    );

    error NotOwner();
    error InvalidScore();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function checkIn(
        address collection,
        uint256 tokenId,
        uint16 healthScore,
        string calldata spriteCid,
        string calldata dataCid
    ) external onlyOwner {
        if (healthScore > 100) revert InvalidScore();

        bytes32 key = keccak256(abi.encode(collection, tokenId));
        checkIns[key] = CheckIn({
            updatedAt: uint64(block.timestamp),
            healthScore: healthScore,
            spriteCid: spriteCid,
            dataCid: dataCid
        });

        emit GardenCheckedIn(collection, tokenId, healthScore, spriteCid, dataCid);
    }

    function transferOwnership(address nextOwner) external onlyOwner {
        owner = nextOwner;
    }
}
