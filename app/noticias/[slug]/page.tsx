import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPost, newsPosts } from "../../content";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { siteUrl } from "../../../lib/site";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/noticias/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/noticias/${post.slug}`,
      publishedTime: post.isoDate,
    },
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    inLanguage: "es",
    mainEntityOfPage: `${siteUrl}/noticias/${post.slug}/`,
    author: {
      "@type": "Organization",
      name: "Envite Canario",
    },
    publisher: {
      "@type": "Organization",
      name: "Envite Canario",
      url: `${siteUrl}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="article-page">
        <article className="article-inner">
          <div className="news-meta">
            <span>{post.category}</span>
            <time dateTime={post.isoDate}>{post.published}</time>
          </div>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.summary}</p>
          <div className="article-body">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="article-source-note">
            <strong>Autoría</strong>
            <span>Equipo de Envite Canario.</span>
          </aside>
          <Link className="text-link" href="/noticias">
            Volver a noticias
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
