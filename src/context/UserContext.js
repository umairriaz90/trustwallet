import React, { useContext } from 'react'

export const UserContext = React.createContext({
    userAddress: "",
    setUserAddress: () => [],
    ethBalance: "",
    setEthBalance: () => {},
	mrtBalance: "",
	setmrtBalance: () => {},
	mrtEarned: "",
	setmrtEarned: () => {},
	mrtRewards: "",
	setmrtRewards: () => {},
    daiBalance: "",
    setDaiBalance: () => {},
    pmknBalance: "",
    setPmknBalance: () => {},
    stakingBalance: "",
    setStakingBalance: () => {},
    pmknYield: "",
    setPmknYield: () => {},
    pmknUnrealizedYield: "",
    setPmknUnrealizedYield: () => {},
    userNFTs: "",
    setUserNFTs: () => {},
})

export const UserProvider = UserContext.Provider
export const useUser = () => useContext(UserContext)