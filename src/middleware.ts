import { withAuth } from 'next-auth/middleware';

const auth = withAuth({
  pages: { signIn: '/sign-in' },
  callbacks: {
    authorized: (props) => !!props.token?.id,
  },
});

export const middleware = auth;

export const config = {
  matcher: ['/((?!_next).*)'],
};
