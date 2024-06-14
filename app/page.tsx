import { getAllContents } from '@/libs/microcms';

import Hero from '@/components/app/home/Hero';
import Portfolio from '@/components/app/home/Portfolio';

export default async function Home() {
  const data = await getAllContents({
    limit: 1,
    offset: 0,
    orders: 'publishedAt',
  });

  return (
    <main>
      <div>
        <Hero articles={data.contents} />
        <Portfolio articles={data.contents} />
      </div>
    </main>
  );
}