import { useQuery } from "react-query";
import { useState } from "react";

import { useConnection } from "hooks";
import {
  getToken,
  recordTransferUserProperties,
  wait,
  getDepositByTxHash,
  getFillByDepositTxHash,
  NoFundsDepositedLogError,
} from "utils";
import {
  getLocalDepositByTxHash,
  addLocalDeposit,
  removeLocalDeposits,
} from "utils/local-deposits";
import { convertForDepositQuery, convertForFillQuery } from "../utils";
import { FromBridgePagePayload } from "../types";

export function useDepositTracking(
  depositTxHash: string,
  fromChainId: number,
  toChainId: number,
  fromBridgePagePayload?: FromBridgePagePayload
) {
  const [shouldRetryDepositQuery, setShouldRetryDepositQuery] = useState(true);

  const { account } = useConnection();

  const depositQuery = useQuery(
    ["deposit", depositTxHash, fromChainId, account],
    async () => {
      // On some L2s the tx is mined too fast for the animation to show, so we add a delay
      await wait(3_000);

      try {
        const deposit = await getDepositByTxHash(depositTxHash, fromChainId);
        return deposit;
      } catch (e) {
        // If the error NoFundsDepositedLogError is thrown, this implies that the used
        // tx hash is valid and mined but the origin is not a SpokePool contract. So we
        // should not retry the query and throw the error.
        if (e instanceof NoFundsDepositedLogError) {
          setShouldRetryDepositQuery(false);
        }
        throw e;
      }
    },
    {
      staleTime: Infinity,
      retry: shouldRetryDepositQuery,
      onSuccess: (data) => {
        if (!fromBridgePagePayload) {
          return;
        }

        const localDepositByTxHash = getLocalDepositByTxHash(depositTxHash);
        if (!localDepositByTxHash) {
          // Optimistically add deposit to local storage for instant visibility on the
          // "My Transactions" page. See `src/hooks/useDeposits.ts` for details.
          addLocalDeposit(convertForDepositQuery(data, fromBridgePagePayload));
        }

        if (account !== fromBridgePagePayload.account) {
          return;
        }
      },
    }
  );

  const fillQuery = useQuery(
    ["fill-by-deposit-tx-hash", depositTxHash, fromChainId, toChainId],
    async () => {
      if (!depositQuery.data) {
        throw new Error(
          `Could not fetch deposit by tx hash ${depositTxHash} on chain ${fromChainId}`
        );
      }

      await wait(4000);

      return getFillByDepositTxHash(
        depositTxHash,
        fromChainId,
        toChainId,
        depositQuery.data
      );
    },
    {
      staleTime: Infinity,
      retry: true,
      enabled: !!depositQuery.data,
      onSuccess: (data) => {
        if (!fromBridgePagePayload) {
          return;
        }

        const localDepositByTxHash = getLocalDepositByTxHash(depositTxHash);
        if (localDepositByTxHash) {
          removeLocalDeposits([depositTxHash]);
        }

        // Optimistically add deposit to local storage for instant visibility on the
        // "My Transactions" page. See `src/hooks/useDeposits.ts` for details.
        addLocalDeposit(convertForFillQuery(data, fromBridgePagePayload));

        const { quote, sendDepositArgs, tokenPrice } = fromBridgePagePayload;

        recordTransferUserProperties(
          sendDepositArgs.amount,
          tokenPrice,
          getToken(quote.tokenSymbol).decimals,
          quote.tokenSymbol.toLowerCase(),
          Number(quote.fromChainId),
          Number(quote.toChainId),
          quote.fromChainName
        );
      },
    }
  );

  return { depositQuery, fillQuery };
}
