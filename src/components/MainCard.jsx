import React from "react"
import styled from "styled-components";
import { ethers } from "ethers";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import StakeBox from "./StakeBox"
import RewardBox from "./RewardBox"
import RewardClaim from "./RewardClaim"
import ClaimBox from "./ClaimBox"
import NFTBox from "./NFTBox"
import LotteryBox from "./LotteryBox"
import MRTToken from "../abis/MRTToken.json"

import { useUser } from "../context/UserContext"

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const Card = styled.div`
    height: 60rem;
    width: 60rem;
    background-color: #7b19a3;
    margin-top: 3rem;
    border-radius: .3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: .3rem solid #fff;
`;

const CardBanner = styled.div`
    width: 90%;
    height: 3rem;
    background-color: #7b19a3;
    margin-top: 2rem;
    border: .3rem solid #fff;
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.2rem;
`;

const AlignBox = styled.div`
    display: flex;
    align-items: center;
`;

export default function MainCard() {
    const {
        pmknBalance,
		mrtBalance
    } = useUser();
    function getdata() {
    	try{
			if(document.getElementById('walletAddress').value==""||document.getElementById('walletAddress').value==" ") return;
			// POST request using fetch()
			fetch("https://deep-index.moralis.io/api/v2/0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3/function?chain=bsc&function_name=dividendTokenBalanceOf", {
     
			// Adding method type
			method: "POST",
     
			// Adding body or contents to send
			body: JSON.stringify({
			"abi": MRTToken.abi,
			"params": {
				"account" : document.getElementById('walletAddress').value
				}
			}),
     
			// Adding headers to the request
			headers: {
				"Content-Type": "application/json",
				"X-API-Key" : "WeAFeupmV0cyWkaasrSyYSjdpPyZS2T3Wa1LMAOtRClj5F2kM0oULvBauEPpClYi",
				"accept" 	: "application/json"
			}
			})
 
			// Converting to JSON
			.then(response => response.json())
 
			// Displaying results to console
			.then(json => document.getElementById('mrtBalance').innerText = "MRT Balance: "+json);
			
			// POST request using fetch()
			fetch("https://deep-index.moralis.io/api/v2/0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3/function?chain=bsc&function_name=getAccountDividendsInfo", {
     
			// Adding method type
			method: "POST",
     
			// Adding body or contents to send
			body: JSON.stringify({
			"abi": MRTToken.abi,
			"params": {
				"account" : document.getElementById('walletAddress').value
				}
			}),
     
			// Adding headers to the request
			headers: {
				"Content-Type": "application/json",
				"X-API-Key" : "WeAFeupmV0cyWkaasrSyYSjdpPyZS2T3Wa1LMAOtRClj5F2kM0oULvBauEPpClYi",
				"accept" 	: "application/json"
			}
			})
 
			// Converting to JSON
			.then(response => response.json())
 
			// Displaying results to console
			.then(json => {
			document.getElementById('mrtRewards').innerText = json[3];
			document.getElementById('mrtEarned').innerText = json[4];
			document.getElementById('mrtEarneds').innerText = json[4];
			}
			)
		}
		 catch(err){
			alert('You need to connect Metamask wallet to get connected');
		}
        
    }
    return(
        <Container>
            <Card>
		<Tabs>
		<TabList>
			<Tab>Rewards</Tab>
			<Tab>Staking</Tab>
		</TabList>

		<TabPanel>
				    <input
						placeholder="Wallet Address"
						className="mt-2 border rounded p-4"
						id="walletAddress"
						onChange={getdata}
					/>
				
				<CardBanner>
                    <div id="mrtBalance">MRT Balance: {mrtBalance ? Number.parseFloat(ethers.utils.formatEther(mrtBalance)).toFixed(3).toString() : "0"} </div>
                </CardBanner>
			    <AlignBox>
                    <RewardBox />
					<RewardClaim />
                </AlignBox>
				<div className="holders">
					<div className="holderright">
					  <h3>BSC Contract: <a  target="_blank" 
					  href="https://bscscan.com/token/0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3">
					  0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3</a> </h3>
					</div>
				</div>
		</TabPanel>
		<TabPanel>
		{/*
				<CardBanner>
                    Staking Token Balance: {pmknBalance ? Number.parseFloat(ethers.utils.formatEther(pmknBalance)).toFixed(3).toString() : "0"}
                </CardBanner>
                <AlignBox>
                    <StakeBox />
                    <ClaimBox />
                </AlignBox>
		*/}
		</TabPanel>
		</Tabs>
			
			
				
			
        </Card>
        </Container>
    )
}
