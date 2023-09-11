import { Heading, VStack } from '@chakra-ui/react'

import EditUsername from './EditUsername'
import { TUser } from 'types/user'

const AddDomain = ({ user, setUser }: { user: TUser; setUser: (user: TUser) => void }) => {
  return (
    <VStack align="left" border="1px" borderColor="gray.200" rounded="lg" p={4}>
      <Heading pb={4} fontSize="2xl">
        Domains
      </Heading>
      <EditUsername user={user} setUser={setUser} />
    </VStack>
  )
}
export default AddDomain
