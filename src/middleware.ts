import { withAuth } from 'next-auth/middleware';

const auth = withAuth({
  pages: { signIn: '/sign-in' },
  callbacks: {
    authorized: (props) => !!props.token?.id,
  },
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

export const middleware = auth;
