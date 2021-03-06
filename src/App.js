import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ethers } from "ethers"

import PmknFarm from "./abis/PmknFarm.json"
import PmknToken from "./abis/PmknToken.json"
import JackOLantern from "./abis/JackOLantern.json"
import Lottery from "./abis/Lottery.json"
import ERC20 from "./abis/ERC20.json"
import MRTToken from "./abis/MRTToken.json"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';

import { UserProvider } from "./context/UserContext"
import { ContractProvider } from "./context/ContractContext"
import Web3Modal from "web3modal"

import Main from "./components/Main";

const Container = styled.div`
    width: 100%;
    height: 75rem;
`;

function App() {

  /**
   * @notice User state
   */
    const [userAddress, setUserAddress] = useState("")
    const [ethBalance, setEthBalance] = useState("")
    const [daiBalance, setDaiBalance] = useState("")
    const [pmknBalance, setPmknBalance] = useState("")
	const [mrtBalance, setmrtBalance] = useState("")
	const [mrtEarned, setmrtEarned] = useState("")
	const [mrtRewards, setmrtRewards] = useState("")
    const [stakingBalance, setStakingBalance] = useState("")
    const [pmknYield, setPmknYield] = useState("")
    const [pmknUnrealizedYield, setPmknUnrealizedYield] = useState("")
    const [userNFTs, setUserNFTs] = useState("")

    const userState = {
        userAddress, 
        setUserAddress,
        ethBalance, 
        setEthBalance,
        daiBalance,
        setDaiBalance,
        pmknBalance,
        setPmknBalance,
		mrtBalance,
		setmrtBalance,
		mrtEarned,
		setmrtEarned,
		mrtRewards,
		setmrtRewards,
        stakingBalance,
        setStakingBalance,
        pmknYield,
        setPmknYield,
        pmknUnrealizedYield,
        setPmknUnrealizedYield,
        userNFTs,
        setUserNFTs,
    }

    /**
     * @notice Contract state
     */
    const [init, setInit] = useState(false)
    const [networkId, setNetworkId] = useState("")
    const [provider, setProvider] = useState({})
    const [daiContract, setDaiContract] = useState({})
	const [mrtContract, setmrtContract] = useState({})
    const [linkContract, setLinkContract] = useState({})
    const [pmknTokenContract, setPmknTokenContract] = useState({})
    const [pmknFarmContract, setPmknFarmContract] = useState({})
    const [jackContract, setJackContract] = useState({})
    const [lotteryContract, setLotteryContract] = useState({})
    const [isLotteryOpen, setIsLotteryOpen] = useState(false)
    const [isNFTOpen, setIsNFTOpen] = useState(false)
    const [isOwnerOpen, setIsOwnerOpen] = useState(false)
    const [lotteryBalance, setLotteryBalance] = useState("")
    const [linkBalance, setLinkBalance] = useState("")
    const [lotteryCount, setLotteryCount] = useState("")
    const [owner, setOwner] = useState("")
    const [winningNumber, setWinningNumber] = useState("")

    const contractState = {
        init,
        setInit,
        networkId,
        setNetworkId,
        provider,
        setProvider,
        daiContract,
        setDaiContract,
		mrtContract,
		setmrtContract,
        linkContract,
        setLinkContract,
        pmknTokenContract,
        setPmknTokenContract,
        pmknFarmContract,
        setPmknFarmContract,
        jackContract,
        setJackContract,
        lotteryContract,
        setLotteryContract,
        isLotteryOpen, 
        setIsLotteryOpen,
        isNFTOpen,
        setIsNFTOpen,
        isOwnerOpen,
        setIsOwnerOpen,
        lotteryBalance,
        setLotteryBalance,
        linkBalance,
        setLinkBalance,
        lotteryCount,
        setLotteryCount,
        owner,
        setOwner,
        winningNumber,
        setWinningNumber,
    }

    /**
     * @notice componentDidMount
     */

    const loadProvider = useCallback(async() => {
        let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        setProvider(web3)
        return web3
    }, [setProvider])

    const loadDaiContract = useCallback(async(_provider) => {
        let daiAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa" 
        let contract = new ethers.Contract(daiAddress, ERC20.abi, _provider)
        setDaiContract(contract)
    }, [setDaiContract])
    
    const loadLinkContract = useCallback(async(_provider) => {
        let linkAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
        let contract = new ethers.Contract(linkAddress, ERC20.abi, _provider)
        setLinkContract(contract)
    }, [setLinkContract])

    const loadPmknToken = useCallback(async(_provider) => {
        let pmknTokenAddress = "0x0De58c860043b4a86F0A6A160BC3538b22549E5d" 
        let contract = new ethers.Contract(pmknTokenAddress, PmknToken.abi, _provider)
        setPmknTokenContract(contract)
    }, [setPmknTokenContract])
	const loadmrtToken = useCallback(async(_provider) => {
        let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        let contract = new web3.eth.Contract(MRTToken.abi, "0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3");
        console.log(contract)
        setmrtContract(contract)
    }, [setmrtContract])
    const loadPmknFarmContract = useCallback(async(_provider) => {
        let pmknFarmAddress = "0x908747dd9bEb737D6F5C6Daa1E0E96F828f1b9E0"
        let contract = new ethers.Contract(pmknFarmAddress, PmknFarm.abi, _provider)
        setPmknFarmContract(contract)
    }, [setPmknFarmContract])

    const loadJackContract = useCallback(async(_provider) => {
        let jackContractAddress = JackOLantern["networks"]["42"]["address"]
        let contract = new ethers.Contract(jackContractAddress, JackOLantern.abi, _provider)
        setJackContract(contract)
    }, [setJackContract])

    const loadLotteryContract = useCallback(async(_provider) => {
        let lotteryContractAddress = Lottery["networks"]["42"]["address"]
        console.log("Lottery: ", lotteryContractAddress)
        let contract = new ethers.Contract(lotteryContractAddress, Lottery.abi, _provider)
        setLotteryContract(contract)
    }, [setLotteryContract])

    const componentDidMount = useCallback(async() => {
    	try{await loadProvider().then(async(res) => {
            //await loadDaiContract(res)
            //await loadLinkContract(res)
            //await loadPmknToken(res)
			await loadmrtToken(res)
			document.getElementById('connect_lib').innerText="connected";
            //await loadPmknFarmContract(res)
            //await loadJackContract(res)
            //await loadLotteryContract(res)
        })
		}
		 catch(err){
			alert('You need to connect Metamask wallet to get connected');
		};
        setInit(true)
    }, [
        loadProvider, 
        loadDaiContract, 
        loadLinkContract,
        loadPmknToken, 
		loadmrtToken,
        loadPmknFarmContract, 
        loadJackContract,
        loadLotteryContract,
        setInit
    ])

    useEffect(() => {
    	try {
    		if(init === false){
    			//componentDidMount()
    		  }
    	} catch (error) {
    		console.log(error)
    	}
    }, [componentDidMount,mrtContract, init])

    /**
     * @notice userDidMount functions
     */

    const loadUser = useCallback(async() => {
		const web3Modal = new Web3Modal({
network: "bnb",
cacheProvider: true,
providerOptions
})
		const connection = await web3Modal.connect()
		const provider = new ethers.providers.Web3Provider(connection)
        let accounts = provider.getSigner()
        let account = await accounts.getAddress()
		if(document.getElementById('walletAddress').value!="") {
			account = document.getElementById('walletAddress').value;
		}
		else if(account) {
			document.getElementById('walletAddress').value = account;
			document.getElementById('walletAddress').readOnly = true;
		}
		//console.log(account)
        return account
    }, [provider])

    const loadNetwork = useCallback(async() => {
        let netId = await provider.getNetwork()
        setNetworkId(netId["name"])
    }, [provider, setNetworkId])

    const loadEthBalance = useCallback(async(user) => {
        let balance = await provider.getBalance(user)
        setEthBalance(balance)
    }, [provider, setEthBalance])

    const loadDaiBalance = useCallback(async(user) => {
        let balance = await daiContract.balanceOf(user)
        setDaiBalance(balance.toString())
    }, [daiContract, setDaiBalance])

    const loadPmknBalance = useCallback(async(user) => {
        let balance = await pmknTokenContract.balanceOf(user)
        setPmknBalance(balance.toString())
    }, [pmknTokenContract, setPmknBalance])
	
	const loadmrtBalance = useCallback(async(user) => {
		let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
                // Instantiate smart contract using ABI and address.
                let getrewards = new web3.eth.Contract(MRTToken.abi, "0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3");
                let counter = await getrewards.methods.dividendTokenBalanceOf(user).call();
                setmrtBalance(counter.toString());
    }, [mrtBalance, setmrtBalance])
	
	const loadmrtEarned = useCallback(async(user) => {
		let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
                // Instantiate smart contract using ABI and address.
                let getrewards = new web3.eth.Contract(MRTToken.abi, "0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3");
                let counter = await getrewards.methods.getAccountDividendsInfo(user).call();
                setmrtEarned(counter[3].toString());
    }, [mrtEarned, setmrtEarned])
	
	const loadmrtRewards = useCallback(async(user) => {
		let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
                // Instantiate smart contract using ABI and address.
                let getrewards = new web3.eth.Contract(MRTToken.abi, "0xb15f39d979208f05474cf4b8f66fd46f6f4a77f3");
                let counter = await getrewards.methods.getAccountDividendsInfo(user).call();
                setmrtRewards(counter[4].toString());
    }, [mrtRewards, setmrtRewards])
	
	

    const loadStakingBalance = useCallback(async(user) => {
		let prov = new ethers.providers.Web3Provider(window.ethereum)
        let balance = await pmknFarmContract.stakingBalance(user)
        setStakingBalance(balance.toString())
    }, [setStakingBalance, pmknFarmContract])

    const loadPmknYield = useCallback(async(user) => {
        let balance = await pmknFarmContract.calculateYieldTotal(user)
        setPmknYield(balance.toString())
    }, [setPmknYield, pmknFarmContract])

    const loadPmknUnrealizedYield = useCallback(async(user) => {
        let balance = await pmknFarmContract.pmknBalance(user)
        setPmknUnrealizedYield(balance.toString())
    }, [setPmknUnrealizedYield, pmknFarmContract])


    const userDidMount = useCallback(async() => {
    	try{ document.getElementById('tohide').style.display = 'block';
			await loadNetwork()
    		await loadUser().then(res => {
    			setUserAddress(res)
    			loadEthBalance(res)
    			//loadDaiBalance(res)
				loadmrtBalance(res)
				loadmrtEarned(res)
				loadmrtRewards(res)
    			//loadPmknBalance(res)
    			//loadStakingBalance(res)
    			//loadPmknYield(res)
    			//loadPmknUnrealizedYield(res)
    		})
    	} catch(error) {
			document.getElementById('tohide').style.display = 'none';
    		console.log(error)
    	}
        
    }, [
        loadUser, 
        loadNetwork, 
        loadEthBalance, 
        loadDaiBalance,
		loadmrtBalance,
		loadmrtEarned,
		loadmrtRewards,
        loadPmknBalance,
        loadStakingBalance,
        setUserAddress,
        loadPmknYield,
        loadPmknUnrealizedYield
    ])

    useEffect(() => {
        if(userAddress === "" && init === true){
            userDidMount()
        }
    }, [userDidMount, init, userAddress])

    /**
     * @notice Contract balances/state
     */
    /*
    const loadOwner = useCallback(async() => {
        let contractOwner = await lotteryContract.owner()
        setOwner(contractOwner)
    }, [lotteryContract, setOwner])

    const loadLotteryPool = useCallback(async() => {
        let balance = await pmknTokenContract.balanceOf(lotteryContract.address)
        setLotteryBalance(ethers.utils.formatEther(balance))
    }, [lotteryContract, pmknTokenContract]) 

    const loadLinkBalance = useCallback(async() => {
        let balance = await linkContract.balanceOf(lotteryContract.address)
        setLinkBalance(ethers.utils.formatEther(balance))
    }, [lotteryContract, linkContract, setLinkBalance])

    const loadLotteryCount = useCallback(async() => {
        let count = await lotteryContract.lotteryCount()
        setLotteryCount(count.toString())
        return count.toString()
    }, [lotteryContract])

    const loadWinningNumber = useCallback(async(lottoCount) => {
        let number = await lotteryContract.winningNumber(lottoCount)
        setWinningNumber(number.toString())
    }, [setWinningNumber, lotteryContract])

    const contractStateDidMount = useCallback(async() => {
        await loadOwner()
        await loadLotteryPool()
        await loadLinkBalance()
        await loadLotteryCount()
            .then(async(res) => {
                await loadWinningNumber(res)
            })
        }, [
        loadOwner, 
        loadLotteryPool, 
        loadLinkBalance, 
        loadLotteryCount, 
        loadWinningNumber, 
    ])
    */
    useEffect(() => {
      if(init === true){
        //contractStateDidMount()
      }
    }, [init])

    /**
    * @notice Events ----------------------------------------->
    */

    useEffect(() => {
        if(userAddress !== ""){
        /**
         * @notice PmknFarm Events
         */
		 /*
            pmknFarmContract.on("Stake", async(userAddress) => {
                //await loadDaiBalance(userAddress)
                await loadStakingBalance(userAddress)
            });

            pmknFarmContract.on("Unstake", async(userAddress) => {
                //await loadDaiBalance(userAddress)
                await loadStakingBalance(userAddress)
            })

            pmknFarmContract.on("YieldWithdraw", async(userAddress) => {
                await loadPmknUnrealizedYield(userAddress)
                await loadPmknYield(userAddress)
                await loadPmknBalance(userAddress)
            })
			*/
            /**
             * @notice Lottery events
             */
			/*
            lotteryContract.on("NumberReceived", async(userAddress) => {
                await loadLotteryCount()
                  .then(async(res) => {
                await loadWinningNumber(res)
                })
            })

            lotteryContract.on("LotteryClaim", async(userAddress) => {
                await loadPmknBalance(userAddress)
                await loadLotteryPool()
            })

            lotteryContract.on("WithdrawLink", async(userAddress) => {
                await loadLinkBalance()
            })
			*/
        }

    /**
     * @notice Updates Pmkn yield balance every 20 seconds
     */

    if(stakingBalance > 0){
        let interval = null
        interval = setInterval(() => {
            loadPmknYield(userAddress)
        }, 20000)
    return () => clearInterval(interval)
    }

    }, [
        pmknFarmContract, 
        userAddress, 
        stakingBalance,
		mrtBalance,
		loadmrtBalance,
		loadmrtEarned,
		loadmrtRewards,
        lotteryContract,
        loadDaiBalance, 
        loadStakingBalance,
        loadPmknUnrealizedYield,
        loadPmknYield,
        loadPmknBalance,
        //loadWinningNumber,
        //loadLotteryContract,
        //loadLinkBalance,
        //loadLotteryCount,
        //loadLotteryPool,
    ])
    let providerOptions;
providerOptions = {
metamask: {
id: "injected",
name: "MetaMask",
type: "injected",
check: "isMetaMask"
},
walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "8c661edd6d764e1e95fd0318054d331c" // required
    }
	}
};
    return (
		
        <Container>
          <ContractProvider value={contractState}>
            <UserProvider value={userState}>
			    <button onClick={componentDidMount} id="connect_lib">Connect</button>
              	<Main />
            </UserProvider>
          </ContractProvider>
        </Container>
      );
    }

export default App;
