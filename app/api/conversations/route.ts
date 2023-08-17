import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;
    console.log(11111);
    if (!currentUser?.id || !currentUser?.name) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    console.log(22222);
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    console.log(3333333);
    if (isGroup) {
      const newConversation = await prisma?.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }
    console.log(444444444);
    // 筛选登录用户和 body.userId 的对话
    const exisitingConversations = await prisma?.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    console.log(5555555555);
    const singleConversation =
      exisitingConversations && exisitingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    console.log(66666666666);
    const newConversation = await prisma?.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    console.log(777777777777);
    newConversation?.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });
    console.log(888888888);
    return NextResponse.json(newConversation);
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
