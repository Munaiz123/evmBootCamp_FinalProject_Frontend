# Onchain MegaBets 
## EVM Final Project
### Group 1 & 6 - 


## Game Overview:
Built on Scaffold-Eth2, Onchain MegaBets is an on chain casino that uses ERC20 LuckyTokens to spin the wheel in order to bet on one of two colors: red and white. 

## Terminology:
House – the owner of the game and contract

Kitty – an account holding the tokens that the house has available for a specific game. Bets cannot exceed this amount.

Master Funds Account – the owner/house’s account holding the house’s tokens

Stash – an account each user has that holds their tokens in the game. After obtaining LuckyTokens from the faucet, the user can move as many of those as they want from their wallet into their stash.


## Game Tokens:

An ERC20 contract token called LuckyToken will be used for all betting. Users obtain tokens by going to the Faucet Page and hitting the Send Tokens button, which will move a predetermined number of tokens from the Master Funds Account into the user’s stash.

When the contract is deployed, a specified number of tokens will be minted (e.g., 1 billion) and placed into the master funds account. New tokens cannot be minted after that. The owner can transfer as many of these tokens as they wish to the game’s kitty.

## Frontend Pages:
- Game Page
- Admin Page
- User Page
- Faucet Page

## Smart Contracts:



## Running the Project:

To get started with Onchain MegaBets, follow the steps below:

1. Clone the repository
```
cd finalProject_Group1
yarn install
```
2. Install dependencies:

```
cd finalProject_Group1
yarn install
```

3. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

4. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

5. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
