import styled from "@emotion/styled";

import { Text } from "components/Text";
import { Deposit } from "hooks/useDeposits";
import { rewardTiers } from "utils";

import { BaseCell } from "./BaseCell";

type Props = {
  deposit: Deposit;
  width: number;
};

export function RateCell({ deposit, width }: Props) {
  return (
    <StyledRateCell width={width}>
      <Text color="light-200">
        {deposit.rewards ? `${deposit.rewards.rate * 100}%` : "-"}
      </Text>
      {deposit.rewards && deposit.rewards.type === "referrals" && (
        <Text color="white-200">
          Tier:{" "}
          {rewardTiers[deposit.rewards.tier - 1].title.replace("tier", "")}
        </Text>
      )}
    </StyledRateCell>
  );
}

const StyledRateCell = styled(BaseCell)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
