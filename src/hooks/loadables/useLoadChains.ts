import { useEffect } from 'react'
import {
  getChainsConfig,
  type ChainInfo,
  FEATURES,
  GAS_PRICE_TYPE,
  RPC_AUTHENTICATION,
} from '@safe-global/safe-gateway-typescript-sdk'
import useAsync, { type AsyncResult } from '../useAsync'
import { logError, Errors } from '@/services/exceptions'

export const additionalChains: ChainInfo[] = [
  {
    chainId: '59144',
    chainName: 'Linea',
    description: 'Linea Mainnet',
    l2: true,
    nativeCurrency: {
      name: 'Linea Ether',
      symbol: 'ETH',
      decimals: 18,
      logoUri: 'https://linea.build/favicon-32x32.png',
    },
    transactionService: 'https://transaction.safe.linea.build',
    blockExplorerUriTemplate: {
      address: 'https://lineascan.build/address/{{address}}',
      txHash: 'https://lineascan.build/tx/{{txHash}}',
      api: 'https://lineascan.build/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    disabledWallets: [
      'authereum',
      'coinbase',
      'fortmatic',
      'keystone',
      'lattice',
      'opera',
      'operaTouch',
      'portis',
      'safeMobile',
      'tally',
      'torus',
      'trezor',
      'trust',
      'walletConnect',
      'walletLink',
    ],
    ensRegistryAddress: undefined,
    features: [
      FEATURES.CONTRACT_INTERACTION,
      FEATURES.CONTRACT_INTERACTION,
      FEATURES.EIP1271,
      FEATURES.ERC721,
      FEATURES.SAFE_APPS,
      FEATURES.SAFE_TX_GAS_OPTIONAL,
      FEATURES.SPENDING_LIMIT,
      FEATURES.TX_SIMULATION,
    ],
    gasPrice: [
      {
        type: GAS_PRICE_TYPE.ORACLE,
        uri: 'https://api.lineascan.build/api?module=gastracker&action=gasoracle&apiKey=KWKSKC2MB2D136DDQT2QTJPU8B93XDW1TJ',
        gasParameter: 'SafeGasPrice',
        gweiFactor: '1000000000.000000000',
      },
    ],
    publicRpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc.linea.build/',
    },
    rpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc.linea.build/',
    },
    safeAppsRpcUri: {
      authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
      value: 'https://rpc.linea.build/',
    },
    shortName: 'linea',
    theme: {
      textColor: '#ffffff',
      backgroundColor: '#63defd',
    },
    isTestnet: false,
  },
]

const getConfigs = async (): Promise<ChainInfo[]> => {
  const data = await getChainsConfig()
  return [...data.results, ...additionalChains] || [...additionalChains]
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
