import { createClient } from '@/utils/supabase/server';
import { MetadataRoute } from 'next';

const sitemapList: MetadataRoute.Sitemap = [
  {
    url: `${process.env.NEXT_PUBLIC_URL}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/signup`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/login`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/feedback`,
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 0.8,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/topic`,
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 0.8,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/tip`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const { data: feedbackId } = await supabase.from('feedback').select('id');
  const { data: topicId } = await supabase.from('topic').select('id');
  const { data: tipId } = await supabase.from('tip').select('id');

  const pushSitemap = (category: string, idList: { id: number }[] | null) => {
    idList?.map(({ id }) => {
      sitemapList.push({
        url: `${process.env.NEXT_PUBLIC_URL}/${category}/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  };

  pushSitemap('feedback', feedbackId);
  pushSitemap('topic', topicId);
  pushSitemap('tip', tipId);

  return sitemapList;
}
