import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    /* 640以上：px 24px 1024以上：px 32px */
    <div
      className='
				flex
				min-h-full
				flex-col
				justify-center
				py-12
				sm:px-6
				lg:px-8
				bg-gray-100
			'
    >
      {/* 640以上 最大宽度、 margin x 居中 */}
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          alt='Logo'
          height='48'
          width='48'
          className='mx-auto w-auto'
          src='/images/logo.png'
        />
        <h2
          className='
						mt-6
						text-center
						text-3xl
						font-bold
						tracking-tight
						text-gray-900
					'
        >
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
