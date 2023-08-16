import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUBSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUBSHER_KEY!,
  secret: process.env.PUBSHER_SECRET!,
  cluster: 'us2',
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUBSHER_KEY!,
  {
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax',
    },
    cluster: 'us2',
  },
);
