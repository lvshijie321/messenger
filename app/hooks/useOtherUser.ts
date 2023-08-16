import { User } from '@prisma/client';
import { FullConversationType } from '../types';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

type Users = {
  users: User[];
};
type Conversation = FullConversationType | Users;

const useOtherUser = (conversation: Conversation) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );
    return otherUser[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
