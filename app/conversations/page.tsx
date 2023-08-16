'use client';

import useConvarsation from '@/app/hooks/useConversation';
import EmptyState from '@/components/EmptyState';
import clsx from 'clsx';

const Home = () => {
  const { isOpen } = useConvarsation();
  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
