'use client';
import { useState } from 'react';

import { NextPage } from 'next';
import { signIn } from 'next-auth/react';

import { FirebaseError } from '@firebase/util';

import {
  EmailCheck,
  EmailCheckProps,
} from '@/app/(auth)/sign-in/components/email-check';
import {
  PasswordCheck,
  PasswordCheckProps,
} from '@/app/(auth)/sign-in/components/password-check';
import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserSession } from '@/lib/next-auth/user-session.types';
import { routes } from '@/utils/constants/routes';

import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GithubAuthProvider();

const SignInPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<0 | 1>(0);
  const [email, setEmail] = useState<string>();

  const githubAuthHandler = async (): Promise<void> => {
    setLoading(true);

    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      const user: UserSession = {
        id: result.user.uid,
        email: result.user.email || 'email@mail.com',
        photo: result.user.photoURL || 'https://picsum.photos/128/128',
        name: result.user.displayName || 'Sem Nome',
      };

      await signIn('github', { ...user, callbackUrl: routes.home });
    } catch (e) {
      const error = e as FirebaseError;

      const credential = GithubAuthProvider.credentialFromError(error);

      // eslint-disable-next-line
      console.warn({ error, credential });
    } finally {
      setLoading(false);
    }
  };

  const checkEmailHandler: EmailCheckProps['onSuccess'] = (email) => {
    setPhase(1);
    setEmail(email);
  };

  const checkPasswordHandler: PasswordCheckProps['onSuccess'] = async (
    data
  ) => {
    console.log({ data });
  };

  return (
    <div className="flex flex-col gap-2 text-center">
      {phase === 0 && (
        <EmailCheck loading={loading} onSuccess={checkEmailHandler} />
      )}
      {phase === 1 && email && (
        <PasswordCheck
          loading={loading}
          email={email}
          onSuccess={checkPasswordHandler}
        />
      )}
      <Separator className="my-3">
        <p className="bg-background mt-[-7px] px-2 text-xs uppercase text-zinc-400">
          Ou continue com
        </p>
      </Separator>
      <Button
        loading={loading}
        variant="outline"
        className="gap-2"
        onClick={githubAuthHandler}
      >
        <GithubIcon className="h-4 dark:fill-zinc-100" />
        GitHub
      </Button>
    </div>
  );
};

export default SignInPage;
