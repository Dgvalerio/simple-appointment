'use client';

import { useState } from 'react';

import { NextPage } from 'next';

import { EmailCheck } from '@/app/(public)/sign-in/email-check';
import { PasswordCheck } from '@/app/(public)/sign-in/password-check';
import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GithubAuthProvider();

const SignInPage: NextPage = () => {
  const [phase, setPhase] = useState<0 | 1>(0);
  const [email, setEmail] = useState<string>();

  const authHandler = (): void => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log({
          result,
          credential,
          token,
          user,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);

        // ...
        console.log({
          error,
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  const checkEmailHandler = (email: string): void => {
    setPhase(1);
    setEmail(email);
  };

  return (
    <div className="flex flex-col gap-2 text-center">
      {phase === 0 && <EmailCheck onSuccess={checkEmailHandler} />}
      {phase === 1 && email && <PasswordCheck email={email} />}
      <Separator className="my-3">
        <p className="bg-background mt-[-7px] px-2 text-xs uppercase text-zinc-400">
          Ou continue com
        </p>
      </Separator>
      <Button variant="outline" className="gap-2" onClick={authHandler}>
        <GithubIcon className="h-4 dark:fill-zinc-100" />
        GitHub
      </Button>
    </div>
  );
};

export default SignInPage;
