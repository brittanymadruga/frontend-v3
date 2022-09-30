import AirdropCard from "../AirdropCard";
import RewardsCard from "./RewardsCard";
import { RewardsApiInterface } from "utils/serverless-api/types";

import { ReactComponent as LPArrow } from "assets/icons/plaap/lp-arrow.svg";
import { ReactComponent as WalletIcon } from "assets/icons/wallet-icon.svg";
import { CheckIconState } from "../CardIcon";
import { formatEther } from "utils";

interface Props {
  rewardsData: RewardsApiInterface;
  account?: string;
  isConnected: boolean;
}

function useLiquidityProviderCard(
  rewardsData: RewardsApiInterface,
  isConnected: boolean
) {
  const isEligible =
    isConnected && rewardsData?.liquidityProviderRewards?.eligible;

  const check: CheckIconState = !isConnected
    ? "undetermined"
    : isEligible
    ? "eligible"
    : "ineligible";

  const payout =
    isEligible && rewardsData?.liquidityProviderRewards?.amount
      ? formatEther(rewardsData?.liquidityProviderRewards?.amount)
      : undefined;

  const cardDescription = isConnected
    ? isEligible
      ? "Congratulations! You are eligible for the Across Liquidity Provider airdrop."
      : "This wallet isn't eligible for the Liquidity Provider airdrop. You can still earn ACX from now until token launch if you provide liquidity on Across."
    : "Liquidity providers who pool ETH, USDC, WBTC, and DAI into Across protocol before the token launch may be eligible for the $ACX airdrop.";

  return { check, payout, cardDescription };
}

const LiquidityProviderCard: React.FC<Props> = ({
  account,
  rewardsData,
  isConnected,
}) => {
  const { check, payout, cardDescription } = useLiquidityProviderCard(
    rewardsData,
    isConnected
  );
  return (
    <AirdropCard
      title="Liquidity Provider"
      description={cardDescription}
      Icon={LPArrow}
      check={check}
      rewardAmount={payout}
      buttonLink="/pools"
      children={
        check === "eligible" && (
          <RewardsCard
            label={
              check === "eligible" ? "Eligible wallet" : "Ineligible wallet"
            }
            address={account ?? ""}
            Icon={<WalletIcon />}
            bottomText="Rewards are estimated as of September 1, 2022 and are subject to change.  Liquidity providers continue to earn ACX up to token launch."
          />
        )
      }
    />
  );
};

export default LiquidityProviderCard;
