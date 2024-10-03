'use client';
import { useState } from 'react';

import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { FirebaseError } from '@firebase/util';

import {
  SignInForm,
  SignInFormProps,
} from '@/app/(auth)/sign-in/components/form';
import { Icon } from '@/components/icon/icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserSession } from '@/lib/next-auth/user-session.types';
import { toast } from '@/lib/sonner/sonner';
import { routes } from '@/utils/constants/routes';

import {
  getAuth,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const provider = new GithubAuthProvider();

const SignInPage: NextPage = () => {
  const [loading, setLoading] = useState(false);

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

      toast.error(
        'Houve uma falha ao realizar o login, verifique seus dados e tente novamente.'
      );

      // eslint-disable-next-line
      console.warn({ error, credential });
    } finally {
      setLoading(false);
    }
  };

  const signInHandler: SignInFormProps['onSuccess'] = async (data) => {
    setLoading(true);

    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user: UserSession = {
        id: result.user.uid,
        email: result.user.email || 'email@mail.com',
        photo: result.user.photoURL || 'https://picsum.photos/128/128',
        name: result.user.displayName || 'Sem Nome',
      };

      await signIn('firebase', { ...user, callbackUrl: routes.home });
    } catch (e) {
      const error = e as FirebaseError;

      toast.error(
        'Houve uma falha ao realizar o login, verifique seus dados e tente novamente.'
      );

      // eslint-disable-next-line
      console.warn({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-center">
      <SignInForm loading={loading} onSuccess={signInHandler} />
      <Button variant="outline" loading={loading} asChild>
        <Link href={routes.signUp}>Criar uma conta</Link>
      </Button>
      <Separator className="my-3">
        <p className="mt-[-7px] bg-background px-2 text-xs uppercase text-zinc-400">
          Ou continue com
        </p>
      </Separator>
      <Button
        loading={loading}
        variant="outline"
        className="gap-2"
        onClick={githubAuthHandler}
      >
        <Icon icon="github" className="h-4 dark:fill-zinc-100" />
        GitHub
      </Button>
    </div>
  );
};

export default SignInPage;
