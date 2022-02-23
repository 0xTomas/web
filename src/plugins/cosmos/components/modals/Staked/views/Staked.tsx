import { Box, Flex } from '@chakra-ui/layout'
import { Button, ModalCloseButton } from '@chakra-ui/react'
import { Asset } from '@shapeshiftoss/types'
import { AnimatePresence } from 'framer-motion'
import { RewardsRow } from 'plugins/cosmos/components/RewardsRow/RewardsRow'
import { StakingButtons } from 'plugins/cosmos/components/StakingButtons/StakingButtons'
import { StakingHeader } from 'plugins/cosmos/components/StakingHeader/StakingHeader'
import { StakingRow } from 'plugins/cosmos/components/StakingRow/StakingRow'
import { UnbondingRow } from 'plugins/cosmos/components/UnbondingRow/UnbondingRow'
import { Text } from 'components/Text'
import { bnOrZero } from 'lib/bignumber/bignumber'

type StakedProps = {
  assetId: string
}

// TODO: Wire up the whole component with staked data
export const Staked = ({ assetId }: StakedProps) => {
  // TODO: wire me up, parentheses are nice but let's get asset name from selectAssetNameById instead of this
  const asset = (_ => ({
    name: 'Osmo',
    symbol: 'OSMO'
  }))(assetId) as Asset
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Box pt='38px' pb='70px' px='24px'>
        <ModalCloseButton borderRadius='full' />
        <Flex
          direction='column'
          maxWidth='595px'
          minHeight='380px'
          alignItems='center'
          justifyContent='space-between'
        >
          <StakingHeader assetName={asset.name} width='100%' mb='35px' />
          <StakingRow
            width='100%'
            mb='20px'
            assetSymbol={asset.symbol}
            fiatRate={bnOrZero('8.47')}
            cryptoStakedAmount={bnOrZero('708.00')}
            apr={bnOrZero('1.25')}
          />
          <StakingButtons width='100%' />
          <Box width='100%' mt='20px'>
            {
              /* TODO: use real unbonds data */
              new Array(3).fill(undefined).map((_, i) => (
                <UnbondingRow
                  key={i}
                  assetSymbol={asset.symbol}
                  fiatRate={bnOrZero('8.47')}
                  cryptoUnbondedAmount={bnOrZero('420.65')}
                />
              ))
            }
          </Box>
          <RewardsRow
            width='100%'
            mb='20px'
            mt='25px'
            assetSymbol={asset.symbol}
            fiatRate={bnOrZero('8.47')}
            cryptoRewardsAmount={bnOrZero('23.24')}
          />
          <Button width='100%' colorScheme='darkTeal'>
            <Text translation={'defi.claim'} fontWeight='bold' color='#00cd98' />
          </Button>
        </Flex>
      </Box>
    </AnimatePresence>
  )
}