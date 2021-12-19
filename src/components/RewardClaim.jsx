import React from "react"
import styled from "styled-components";
import { ethers } from "ethers";

import { useUser } from "../context/UserContext"
import { useContract } from "../context/ContractContext"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem;
`;

const Box = styled.div`
    height: 17rem;
    width: 22rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border: .3rem solid #fff;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    color: white;
`

const Banner = styled.div`
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ClaimButton = styled.button`
    height: 5rem;
    width: 100%;
    background-color: black;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
`;

const TopBanner = styled.div`
    align-self: center;
    font-size: 1.65rem;
    font-weight: bold;
    color: #fff;
	text-align:center;
`;

const BottomBanner = styled.div`
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
`;

const Circle = styled.button`
    width: 12rem;
    height: 4rem;
    border: .05rem dashed #ED7014;
    border-radius: 1rem;
    background-color: transparent;
    color: yellow;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function RewardClaim() {

    const {
        stakingBalance,
        pmknYield,
        pmknUnrealizedYield,
		mrtEarned
    } = useUser();

    const {
        provider,
        pmknFarmContract,
		mrtContract
    } = useContract();

    /**
     * @notice Calls the withdrawYield function
     */
    const withdrawYield = async() => {
		try {
        let signer = provider.getSigner()
        let tx = await mrtContract.methods.claim().call()
        return tx
		}
		catch(err) {
		alert('You need to connect with Metamask wallet in order to claim');
		}
    }
    
    //const accruing = pmknYield / 1e18
    //const unrealized = pmknUnrealizedYield ? pmknUnrealizedYield / 1e18 : 0

    return(
        <Container>
            
        <Box>
            <Banner>
                <TopBanner>
				  Rewards Not Claimed
                    <div id="mrtEarneds">
                        { mrtEarned ? ethers.utils.formatEther(mrtEarned) : "0" }
                    </div>
                </TopBanner>
            </Banner>
            <div>
                <ClaimButton onClick={withdrawYield}>
                    Claim Manually
                </ClaimButton>
				<p className="textinclaim">
				Rewards are automatically sent. However, it can take longer depending on your holdings and trading volume. Rewards will be triggered once they are large enough to cover the gas fees.
				</p>
            </div>
            <Banner>
                
            </Banner>
        </Box>
        </Container>
    )
}