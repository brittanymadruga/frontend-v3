import { useState } from "react";
import {
  Wrapper,
  Tabs,
  Tab,
  StakeInfo,
  StakeInfoItem,
  StakeInfoItemSmall,
  LightGrayItemText,
  MutliplierValue,
  StyledProgressBar,
  APYInfo,
  APYInfoItem,
  ArrowIcon,
  UsdcLogo,
  InfoIcon,
  InputBlockWrapper,
} from "./StakingForm.styles";

import { PopperTooltip } from "components/Tooltip";
import StakingInputBlock from "../StakingInputBlock";
import { StakingFormPropType } from "../../types";
import { repeatableTernaryBuilder } from "utils/ternary";

type StakeTab = "stake" | "unstake";

export const StakingForm = ({
  isConnected,
  walletConnectionHandler,
}: StakingFormPropType) => {
  const [activeTab, setActiveTab] = useState<StakeTab>("stake");
  const [stakeAmount, setStakeAmount] = useState("");

  const buttonHandler = isConnected ? () => {} : walletConnectionHandler;
  const buttonTextPrefix = isConnected ? "" : "Connect wallet to ";

  // Stub data for form
  function validateStakeAmount(amount: string) {
    return amount.length > 0;
  }

  const valueOrEmpty = repeatableTernaryBuilder(isConnected, "-");

  return (
    <Wrapper>
      <Tabs>
        <Tab
          onClick={() => setActiveTab("stake")}
          active={activeTab === "stake"}
        >
          Stake
        </Tab>
        <Tab
          onClick={() => setActiveTab("unstake")}
          active={activeTab === "unstake"}
        >
          Unstake
        </Tab>
      </Tabs>
      <InputBlockWrapper>
        <StakingInputBlock
          value={stakeAmount}
          setValue={setStakeAmount}
          valid={!isConnected || validateStakeAmount(stakeAmount)}
          buttonText={`${buttonTextPrefix} ${activeTab}`}
          Logo={UsdcLogo}
          maxValue="0"
          omitInput={!isConnected}
          onClickHandler={buttonHandler}
        />
      </InputBlockWrapper>
      <StakeInfo>
        <StakeInfoItem>Staked LP Tokens</StakeInfoItem>
        <StakeInfoItem>
          {valueOrEmpty(
            <div>
              10,000.00
              <LightGrayItemText margin={4}>
                / 32,424.24 USDC-LP
              </LightGrayItemText>
            </div>
          )}
        </StakeInfoItem>
        <StakeInfoItem>
          Age of capital
          <PopperTooltip
            title="Age of capital"
            body="The age of capital is the time since the last time you staked LP tokens."
            placement="bottom-start"
          >
            <InfoIcon />
          </PopperTooltip>
        </StakeInfoItem>
        <StakeInfoItem>{valueOrEmpty("50 days")}</StakeInfoItem>
        <StakeInfoItem>
          Multiplier
          <PopperTooltip
            title="Multiplier"
            body="The multiplier is the amount of LP tokens you get for staking."
            placement="bottom-start"
          >
            <InfoIcon />
          </PopperTooltip>
        </StakeInfoItem>
        <StakeInfoItem>
          {valueOrEmpty(
            <MutliplierValue>
              <StyledProgressBar percent={50} />
              1.5x
            </MutliplierValue>
          )}
        </StakeInfoItem>
        <StakeInfoItemSmall>
          Note: Multipliers of previously staked tokens are not impacted
        </StakeInfoItemSmall>
      </StakeInfo>
      <APYInfo>
        <APYInfoItem>
          <ArrowIcon />
          Your total APY
        </APYInfoItem>
        <APYInfoItem>{valueOrEmpty("2.81%")}</APYInfoItem>
      </APYInfo>
    </Wrapper>
  );
};

export default StakingForm;
