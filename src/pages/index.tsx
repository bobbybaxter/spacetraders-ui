import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import AgentDetailsViewer from '../components/AgentDetails/AgentDetails';

type HomeProps = { agentDetails: AgentDetails };

const Home: NextPage<HomeProps> = ({ agentDetails }) => {
  return (
    <div className="flex min-h-screen flex-col items-start justify-between p-16">
      <Head>
        <title>Saia Spacetraders</title>
        <meta name="description" content="Saia Spacetraders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={clsx(
          'z-10 w-full max-w-5xl items-center justify-between',
          'font-mono text-sm lg:flex'
        )}
      >
        <AgentDetailsViewer agentDetails={agentDetails} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my/agent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 200) {
    throw new Error(`Error: ${res.status}`);
  }

  const agentDetails: AgentDetails = await res.json();

  return { props: { agentDetails } };
}

export default Home;
