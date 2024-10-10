// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./ERC721Preset.sol";

/**
 * @title NFTFactory
 * @dev Factory contract to deploy ERC721Preset contracts and keep track of deployed instances.
 */
contract NFTFactory {
    // Array to store addresses of deployed ERC721Preset contracts
    address[] public deployedContracts;

    // Event emitted when a new ERC721Preset contract is deployed
    event ContractDeployed(address indexed contractAddress);

    /**
     * @dev Deploys a new ERC721Preset contract with the given parameters.
     * @param name The name of the NFT collection.
     * @param symbol The symbol of the NFT collection.
     * @param baseURI The base URI for token metadata.
     */
    function createNFTContract(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) external {
        ERC721Preset newContract = new ERC721Preset(name, symbol, baseURI);
        deployedContracts.push(address(newContract));
        emit ContractDeployed(address(newContract));
    }

    /**
     * @dev Returns the list of all deployed ERC721Preset contract addresses.
     * @return An array of contract addresses.
     */
    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}