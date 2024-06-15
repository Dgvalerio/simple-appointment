'use client';
import { NextPage } from 'next';

import { Button } from '@/components/ui/button';

import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GithubAuthProvider();

const SignInPage: NextPage = () => {
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

  return (
    <>
      Sign In <Button onClick={authHandler}>Github</Button>
    </>
  );
};

export default SignInPage;
