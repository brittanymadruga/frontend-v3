import { BigNumber, ethers } from "ethers";
import { Fee } from "utils/bridge";
import { ChainId } from "utils/constants";

/**
 * Creates a mocked variant of the suggestedAPI Call
 * @param _amount The amount of fees to calculate
 * @param _originToken The ERC20 token address from the origin chain
 * @param _toChainid The destination chain number. The chain `amount` of `originToken` will be bridged to
 * @returns The result of the HTTP call to `api/suggested-fees`
 */
export async function suggestedFeesMockedApiCall(
  _amount: ethers.BigNumber,
  _originToken: string,
  _toChainid: ChainId
): Promise<{
  relayerFee: Fee;
  relayerGasFee: Fee;
  relayerCapitalFee: Fee;
  isAmountTooLow: boolean;
}> {
  return {
    relayerFee: {
      pct: BigNumber.from("1"),
      total: BigNumber.from("1"),
    },
    relayerCapitalFee: {
      pct: BigNumber.from("1"),
      total: BigNumber.from("1"),
    },
    relayerGasFee: {
      pct: BigNumber.from("1"),
      total: BigNumber.from("1"),
    },
    isAmountTooLow: false,
  };
}