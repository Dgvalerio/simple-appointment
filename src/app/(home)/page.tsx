import { NextPage } from 'next';

const HomePage: NextPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2048));

  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
};

export default HomePage;
