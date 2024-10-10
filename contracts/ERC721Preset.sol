// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";

/**
 * @title ERC721Preset
 * @dev ERC721 token with additional functionality for setting base URI and minting tokens.
 */
contract ERC721Preset is ERC721A {
    // State variable to store the owner's address
    address private _owner;

    // Base URI for token metadata
    string private _baseTokenURI;

    /**
     * @dev Emitted when ownership is transferred from `previousOwner` to `newOwner`.
     */
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Modifier to restrict functions to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == _owner, "ERC721Preset: Caller is not the owner");
        _;
    }

    /**
     * @dev Initializes the contract by setting a `name`, `symbol`, and `baseURI` for the token collection.
     * Sets the deployer as the initial owner.
     * @param name The name of the NFT collection.
     * @param symbol The symbol of the NFT collection.
     * @param baseURI The base URI for token metadata.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721A(name, symbol) {
        _owner = msg.sender;
        _baseTokenURI = baseURI;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Returns the address of the current owner.
     * @return The owner's address.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     * @param newOwner The address of the new owner.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "ERC721Preset: New owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    /**
     * @dev Mints `quantity` tokens and transfers them to `to`.
     * Can only be called by the contract owner.
     * @param to The address to receive the minted tokens.
     * @param quantity The number of tokens to mint.
     */
    function mint(address to, uint256 quantity) external onlyOwner {
        _mint(to, quantity);
    }

    /**
     * @dev Sets a new base URI for all token IDs.
     * Can only be called by the contract owner.
     * @param baseURI The new base URI to be set.
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Overrides the base URI function to return the custom base URI.
     * @return The base URI string.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}