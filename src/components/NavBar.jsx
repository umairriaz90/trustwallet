import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ethers } from "ethers";

import { useUser } from "../context/UserContext"
import { useContract } from "../context/ContractContext"
import logoimg from "./3.png"
import Web3Modal from "web3modal"

const MetaContainer = styled.div`
    height: 6rem;
    width: 100%;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: .04rem solid green;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 1.8rem;
    color: #ED7014;
    text-shadow: .03rem .03rem green;
    margin-left: 2rem;
`;

const SubContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Network = styled.div`
    font-size: 1.5rem;
    color: #000;
    margin-right: 2rem;
`;

const AccountWrapper = styled.div`
    height: 2.1rem;
    width: 16rem;
    font-size: 1.2rem;
    background: linear-gradient(45deg, #ED7014, #6e3003);
    margin-right: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .8rem;
`;

const Account = styled(AccountWrapper)`
    width: 9rem;
    background-color: #fff;
    height: 2rem;
    display: flex;
    justify-content: center;
    margin-right: 0;
    color: #7A3803;
    background: #fff;
`;

const Button = styled.button`
    width: 7rem;
    height: 2.2rem;
    font-size: 1.5rem;
    margin-right: 2rem;
    border-radius: .8rem;
    cursor: pointer;
    outline: none;
    :hover {
        background:#5f3c74;
    }
`;

const LotteryButton = styled(Button)`
    background: linear-gradient(45deg, #5f3c74, green);
`;

const NFTButton = styled(Button)`
    background: linear-gradient(45deg, #5f3c74, #ED7014);
`;

const OwnerButton = styled(Button)`
    background: linear-gradient(45deg, #5f3c74, white);
`;

const Eth = styled.div`
    margin-left: .5rem;
	color:#fff;
`;

const LogoContainer = styled.div`
	margin-left: .5rem;
`;
export default function NavBar() {

    const [isOwner, setIsOwner] = useState(false)

    const {
        userAddress,
        ethBalance,
        setUserNFTs
    } = useUser();

    const {
        networkId,
        isLotteryOpen,
        isNFTOpen,
        isOwnerOpen,
        lotteryContract,
        lotteryCount,
        jackContract,
        owner,
        setIsLotteryOpen,
        setIsNFTOpen,
        setIsOwnerOpen,
        setWinningNumber
    } = useContract();

    /**
     * @notice Fetch functions for the lottery
     */
    
    const loadWinningNumber = useCallback(async() => {
        let number = await lotteryContract.winningNumber(lotteryCount - 1)
        setWinningNumber(number.toString())
    }, [lotteryCount, lotteryContract, setWinningNumber])

    const loadUserNumbers = useCallback(async() => {
        try {
            let nftString = ""
            let total = await jackContract.balanceOf(userAddress)
            let i = 0
            while(i < total){
                let nfts = await jackContract.tokenOfOwnerByIndex(userAddress, i)
                if (nftString === ""){
                    nftString = nfts.toString()
                } else {
                    nftString += `, ${nfts.toString()}`
                }
                i++
            }
            setUserNFTs(nftString)
        } catch (error) {
            console.log(error)
        }
    }, [jackContract, userAddress, setUserNFTs])

    /**
     * @notice Functions handling modals for lottery, nft, and owner
     */

    async function handleLottery() {
        try{
            await loadWinningNumber()
        } catch (error) {
            console.log("Lottery not initiated", error)
        }
        await loadUserNumbers()
        setIsLotteryOpen(!isLotteryOpen)
    }
    
    function handleNFT() {
        setIsNFTOpen(!isNFTOpen)
    }

    function handleOwner() {
        setIsOwnerOpen(!isOwnerOpen)
    }
    const ownerComponent = <OwnerButton onClick={handleOwner} >Owner</OwnerButton>

    useEffect(() => {
        if(userAddress === owner){
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    }, [userAddress, owner, setIsOwner])

    return(
            <MetaContainer>
                <Container>
				    <LogoContainer>
                    <img src={logoimg} width="262" height="52" />
					</LogoContainer>
                    <SubContainer>
					    <div id="tohide">
                        {isOwner ? ownerComponent : null}
						
                        <Network>
                            { networkId ? networkId.charAt(0).toUpperCase() + networkId.slice(1) : "N/A" }
                        </Network>
                        <AccountWrapper>
                            <Eth>
                                { ethBalance ? Number.parseFloat(ethers.utils.formatEther(ethBalance)).toPrecision(3) : "0" } BNB
                                </Eth>
                            <Account>
                                { userAddress ? userAddress.slice(0, 5) + "..." + userAddress.slice(38, 42) : null }
                            </Account>
                        </AccountWrapper>
						</div>
					
                    </SubContainer>
                </Container>
            </MetaContainer>
    )
}