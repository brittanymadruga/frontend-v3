import { CHAIN_IDs } from "@across-protocol/constants";
import { utils as sdkUtils } from "@across-protocol/sdk";
import { utils } from "ethers";
import { writeFileSync } from "fs";
import * as prettier from "prettier";

import { TOKEN_SYMBOLS_MAP } from "../api/_constants";

const { getDeployedAddress } = sdkUtils;

type Route = typeof enabledRoutes[keyof typeof enabledRoutes]["routes"][number];
type ToChain = Route["toChains"][number];
type ToToken = ToChain["tokens"][number];
type SwapToken = ToChain["swapTokens"][number];
type ValidTokenSymbol = keyof typeof TOKEN_SYMBOLS_MAP;

const enabledRoutes = {
  [CHAIN_IDs.MAINNET]: {
    hubPoolChain: CHAIN_IDs.MAINNET,
    hubPoolAddress: getDeployedAddress("HubPool", CHAIN_IDs.MAINNET),
    hubPoolWethAddress: TOKEN_SYMBOLS_MAP.WETH.addresses[CHAIN_IDs.MAINNET],
    acrossConfigStoreAddress: getDeployedAddress(
      "AcrossConfigStore",
      CHAIN_IDs.MAINNET
    ),
    acrossTokenAddress: TOKEN_SYMBOLS_MAP.ACX.addresses[CHAIN_IDs.MAINNET],
    acceleratingDistributorAddress:
      "0x9040e41eF5E8b281535a96D9a48aCb8cfaBD9a48",
    merkleDistributorAddress: "0xE50b2cEAC4f60E840Ae513924033E753e2366487",
    claimAndStakeAddress: "0x985e8A89Dd6Af8896Ef075c8dd93512433dc5829",
    pools: [
      {
        tokenSymbol: "BOBA",
        isNative: false,
      },
    ],
    spokePoolVerifier: {
      address: "0xB4A8d45647445EA9FC3E1058096142390683dBC2",
      enabledChains: [
        CHAIN_IDs.MAINNET,
        CHAIN_IDs.OPTIMISM,
        CHAIN_IDs.POLYGON,
        CHAIN_IDs.BASE,
        CHAIN_IDs.ARBITRUM,
        CHAIN_IDs.LINEA,
        CHAIN_IDs.MODE,
      ],
    },
    swapAndBridgeAddresses: {
      "1inch": {
        [CHAIN_IDs.POLYGON]: "0xaBa0F11D55C5dDC52cD0Cb2cd052B621d45159d5",
        [CHAIN_IDs.OPTIMISM]: "0x3E7448657409278C9d6E192b92F2b69B234FCc42",
        [CHAIN_IDs.ARBITRUM]: "0xC456398D5eE3B93828252e48beDEDbc39e03368E",
        [CHAIN_IDs.BASE]: "0x7CFaBF2eA327009B39f40078011B0Fb714b65926",
      },
      uniswap: {
        [CHAIN_IDs.POLYGON]: "0x9220Fa27ae680E4e8D9733932128FA73362E0393",
        [CHAIN_IDs.OPTIMISM]: "0x6f4A733c7889f038D77D4f540182Dda17423CcbF",
        [CHAIN_IDs.ARBITRUM]: "0xF633b72A4C2Fb73b77A379bf72864A825aD35b6D",
        // [CHAIN_IDs.BASE]: "0xbcfbCE9D92A516e3e7b0762AE218B4194adE34b4",
      },
    },
    routes: [
      {
        fromChain: CHAIN_IDs.MAINNET,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.MAINNET),
        toChains: [
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "SNX",
              "POOL",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "WBTC",
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "DAI",
              "USDT",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "WBTC",
            ],
            swapTokens: [],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.OPTIMISM,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.OPTIMISM),
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "SNX",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "WETH",
              "ETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDbC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "WBTC",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.POLYGON,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.POLYGON),
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "DAI",
              "UMA",
              "WETH",
              "USDC",
              "WBTC",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "DAI",
              "UMA",
              "WETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "UMA",
              "DAI",
              "WETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: [
              "WETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "DAI",
              "WETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDbC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: [
              "WETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: [
              "WETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "WBTC",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.ARBITRUM,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.ARBITRUM),
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "WBTC",
              "USDC",
              "WETH",
              "ETH",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "WBTC",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WBTC",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "UMA",
              "DAI",
              "BAL",
              "ACX",
              "USDT",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: [
              "WBTC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "USDT",
              "DAI",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
              "WETH",
              "ETH",
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDbC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: [
              "WETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "USDT",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.ZK_SYNC,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.ZK_SYNC),
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WETH",
              "USDC.e",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "WBTC",
              "USDT",
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDbC" },
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: ["WETH", "ETH", "USDC.e", "USDT", "DAI", "WBTC"],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: ["WETH", "ETH", "USDC.e", "USDT", "WBTC"],
            swapTokens: [],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.BASE,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.BASE),
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: ["USDC", "WETH", "ETH", "DAI", "BAL", "POOL"],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "DAI",
              "BAL",
              "POOL",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: [
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "WETH",
              "ETH",
              "DAI",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
              "DAI",
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.LINEA,
        fromSpokeAddress: "0x7E63A5f1a8F0B4d0934B2f2327DAED3F6bb2ee75",
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WETH",
              "ETH",
              "USDC.e",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "USDT",
              "DAI",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: ["USDC.e", "WETH", "ETH", "DAI"],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDbC" },
              "DAI",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.MODE,
            tokens: ["WETH", "ETH", "USDC.e", "USDT", "WBTC"],
            swapTokens: [],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.MODE,
        fromSpokeAddress: "0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96",
        toChains: [
          {
            chainId: CHAIN_IDs.MAINNET,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDT",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "USDT",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.POLYGON,
            tokens: [
              "WETH",
              "ETH",
              "USDC.e",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDT",
              "WBTC",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              "USDC.e",
              "USDT",
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ZK_SYNC,
            tokens: ["WETH", "ETH", "USDC.e"],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.BASE,
            tokens: [
              "WETH",
              "ETH",
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDC" },
              { inputTokenSymbol: "USDC.e", outputTokenSymbol: "USDbC" },
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.LINEA,
            tokens: ["WETH", "ETH", "USDC.e", "WBTC"],
            swapTokens: [],
          },
        ],
      },
    ],
  },
  [CHAIN_IDs.SEPOLIA]: {
    hubPoolChain: CHAIN_IDs.SEPOLIA,
    hubPoolAddress: getDeployedAddress("HubPool", CHAIN_IDs.SEPOLIA),
    hubPoolWethAddress: TOKEN_SYMBOLS_MAP.WETH.addresses[CHAIN_IDs.SEPOLIA],
    acrossConfigStoreAddress: getDeployedAddress(
      "AcrossConfigStore",
      CHAIN_IDs.SEPOLIA
    ),
    acrossTokenAddress: "0x49fCaC04AE71dbD074304Fb12071bD771e0E927A",
    acceleratingDistributorAddress:
      "0x3a202A5F5941b8b6b56EE24f8503aD31Fba18b05",
    merkleDistributorAddress: "0x711615993FD2b9D22b598f7b36B762eA89E9EC2b",
    claimAndStakeAddress: "0x765904d00BaAEF371ea1f6cfd41af19BbA644766",
    pools: [],
    spokePoolVerifier: {
      address: sdkUtils.AddressZero,
      enabledChains: [],
    },
    swapAndBridgeAddresses: {
      uniswap: {
        [CHAIN_IDs.BASE_SEPOLIA]: "0xf81C7cbC1196FACb327BD5B7021f9C1c220D0328", // Mocked
        [CHAIN_IDs.OPTIMISM_SEPOLIA]:
          "0x17496824Ba574A4e9De80110A91207c4c63e552a", // Mocked
      },
    },
    routes: [
      {
        fromChain: CHAIN_IDs.SEPOLIA,
        fromSpokeAddress: getDeployedAddress("SpokePool", CHAIN_IDs.SEPOLIA),
        toChains: [
          {
            chainId: CHAIN_IDs.BASE_SEPOLIA,
            tokens: [
              "WETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM_SEPOLIA,
            tokens: [
              "WETH",
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
            ],
            swapTokens: [],
          },
          {
            chainId: CHAIN_IDs.ARBITRUM_SEPOLIA,
            swapTokens: [],
            tokens: ["WETH"],
          },
          {
            chainId: CHAIN_IDs.MODE_SEPOLIA,
            tokens: ["WETH"],
            swapTokens: [],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.BASE_SEPOLIA,
        fromSpokeAddress: "0x82B564983aE7274c86695917BBf8C99ECb6F0F8F",
        toChains: [
          {
            chainId: CHAIN_IDs.SEPOLIA,
            tokens: ["WETH", "USDC"],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.OPTIMISM_SEPOLIA,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDC.e" },
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDbC",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC.e",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.MODE_SEPOLIA,
            tokens: ["WETH"],
            swapTokens: [],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.OPTIMISM_SEPOLIA,
        fromSpokeAddress: getDeployedAddress(
          "SpokePool",
          CHAIN_IDs.OPTIMISM_SEPOLIA
        ),
        toChains: [
          {
            chainId: CHAIN_IDs.SEPOLIA,
            tokens: ["WETH", "USDC"],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
            ],
          },
          {
            chainId: CHAIN_IDs.BASE_SEPOLIA,
            tokens: [
              "USDC",
              { inputTokenSymbol: "USDC", outputTokenSymbol: "USDbC" },
            ],
            swapTokens: [
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDC",
              },
              {
                swapInputTokenSymbol: "USDC.e",
                acrossInputTokenSymbol: "USDC",
                acrossOutputTokenSymbol: "USDbC",
              },
            ],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.ARBITRUM_SEPOLIA,
        fromSpokeAddress: getDeployedAddress(
          "SpokePool",
          CHAIN_IDs.ARBITRUM_SEPOLIA
        ),
        toChains: [
          {
            chainId: CHAIN_IDs.SEPOLIA,
            swapTokens: [],
            tokens: ["WETH"],
          },
        ],
      },
      {
        fromChain: CHAIN_IDs.MODE_SEPOLIA,
        fromSpokeAddress: "0xbd886FC0725Cc459b55BbFEb3E4278610331f83b",
        toChains: [
          {
            chainId: CHAIN_IDs.SEPOLIA,
            swapTokens: [],
            tokens: ["WETH"],
          },
          {
            chainId: CHAIN_IDs.BASE_SEPOLIA,
            swapTokens: [],
            tokens: ["WETH"],
          },
        ],
      },
    ],
  },
} as const;

function generateRoutes(hubPoolChainId = 1) {
  const config = enabledRoutes[hubPoolChainId];

  if (!config) {
    throw new Error("Hub pool chain not supported");
  }

  const routeFileContent = {
    hubPoolChain: config.hubPoolChain,
    hubPoolAddress: utils.getAddress(config.hubPoolAddress),
    hubPoolWethAddress: utils.getAddress(config.hubPoolWethAddress),
    acrossConfigStoreAddress: utils.getAddress(config.acrossConfigStoreAddress),
    acrossTokenAddress: utils.getAddress(config.acrossTokenAddress),
    acceleratingDistributorAddress: utils.getAddress(
      config.acceleratingDistributorAddress
    ),
    merkleDistributorAddress: utils.getAddress(config.merkleDistributorAddress),
    claimAndStakeAddress: utils.getAddress(config.claimAndStakeAddress),
    swapAndBridgeAddresses: Object.entries(
      config.swapAndBridgeAddresses
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: Object.entries(value).reduce(
          (acc, [chainId, address]) => ({
            ...acc,
            [chainId]: utils.getAddress(address as string),
          }),
          {}
        ),
      }),
      {}
    ),
    routes: config.routes.flatMap((route) =>
      transformBridgeRoute(route, config.hubPoolChain)
    ),
    swapRoutes: config.routes.flatMap((route) =>
      transformSwapRoute(route, config.hubPoolChain)
    ),
    pools: config.pools,
    spokePoolVerifier: config.spokePoolVerifier,
  };

  writeFileSync(
    `./src/data/routes_${hubPoolChainId}_${routeFileContent.hubPoolAddress}.json`,
    prettier.format(JSON.stringify(routeFileContent, null, 2), {
      parser: "json",
    })
  );
}

function transformBridgeRoute(route: Route, hubPoolChainId: number) {
  return route.toChains.flatMap((toChain: ToChain) => {
    return toChain.tokens.map((token: ToToken) => {
      const inputTokenSymbol =
        typeof token === "object" ? token.inputTokenSymbol : token;
      const outputTokenSymbol =
        typeof token === "object" ? token.outputTokenSymbol : token;
      try {
        return transformToRoute(
          route,
          toChain,
          inputTokenSymbol,
          outputTokenSymbol,
          hubPoolChainId
        );
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(
            `Failed to transform bridge route ${route.fromChain}->${toChain.chainId}: ${e.message}`
          );
        }
        throw e;
      }
    });
  });
}

function transformSwapRoute(route: Route, hubPoolChainId: number) {
  return route.toChains.flatMap((toChain: ToChain) => {
    return toChain.swapTokens.map((token: SwapToken) => {
      const {
        swapInputTokenSymbol,
        acrossInputTokenSymbol,
        acrossOutputTokenSymbol,
      } = token;

      const swapInputToken = getTokenBySymbol(
        swapInputTokenSymbol,
        route.fromChain,
        hubPoolChainId
      );
      try {
        const bridgeRoute = transformToRoute(
          route,
          toChain,
          acrossInputTokenSymbol,
          acrossOutputTokenSymbol,
          hubPoolChainId
        );

        return {
          ...bridgeRoute,
          swapTokenAddress: swapInputToken.address,
          swapTokenSymbol: swapInputToken.symbol,
          swapTokenL1TokenAddress: swapInputToken.l1TokenAddress,
        };
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(
            `Failed to transform swap route ${route.fromChain}->${toChain.chainId}: ${e.message}`
          );
        }
        throw e;
      }
    });
  });
}

function transformToRoute(
  route: Route,
  toChain: ToChain,
  inputTokenSymbol: ValidTokenSymbol,
  outputTokenSymbol: ValidTokenSymbol,
  hubPoolChainId: number
) {
  const inputToken = getTokenBySymbol(
    inputTokenSymbol,
    route.fromChain,
    hubPoolChainId
  );
  const outputToken = getTokenBySymbol(
    outputTokenSymbol,
    toChain.chainId,
    hubPoolChainId
  );

  if (inputToken.l1TokenAddress !== outputToken.l1TokenAddress) {
    throw new Error("Mismatching L1 addresses");
  }

  return {
    fromChain: route.fromChain,
    toChain: toChain.chainId,
    fromTokenAddress: inputToken.address,
    toTokenAddress: outputToken.address,
    fromSpokeAddress: utils.getAddress(route.fromSpokeAddress),
    fromTokenSymbol: inputTokenSymbol,
    toTokenSymbol: outputTokenSymbol,
    isNative: inputTokenSymbol === TOKEN_SYMBOLS_MAP.ETH.symbol,
    l1TokenAddress: inputToken.l1TokenAddress,
  };
}

function getTokenBySymbol(
  tokenSymbol: ValidTokenSymbol,
  chainId: number,
  l1ChainId: number
) {
  const tokenAddress = TOKEN_SYMBOLS_MAP[tokenSymbol]?.addresses[chainId];

  if (!tokenAddress) {
    throw new Error(
      `Could not find address for ${tokenSymbol} on chain ${chainId}`
    );
  }

  const l1TokenAddress =
    TOKEN_SYMBOLS_MAP[isBridgedUsdc(tokenSymbol) ? "USDC" : tokenSymbol]
      ?.addresses[l1ChainId];

  if (!l1TokenAddress) {
    throw new Error(`Could not find L1 token address for ${tokenSymbol}`);
  }

  return {
    chainId,
    address: utils.getAddress(tokenAddress),
    symbol: tokenSymbol,
    l1TokenAddress: utils.getAddress(l1TokenAddress),
  };
}

function isBridgedUsdc(tokenSymbol: string) {
  return tokenSymbol === "USDC.e" || tokenSymbol === "USDbC";
}

generateRoutes(Number(process.argv[2]));
