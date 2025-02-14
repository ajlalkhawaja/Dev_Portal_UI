import fetcher from '../../../utils/fetcher';
import { Container } from '../../../components/layout';
import markdownToHtml from '../../../utils/markdown';
import { loadNewsletter } from "../../../lib/load-newsletter";

export async function getStaticPaths() {
  const response = await loadNewsletter();

  const paths = response.map(content => {
    return {
      params: {
        slug: content.SK
      }
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  
  const res = await loadNewsletter();

  let content = {};

  for (let i = 0; i < res.length; i++) {
    // If ID doesn't match next
    if (params.slug !== res[i].SK) continue;

    // Save content and stop loop
    content = res[i];
    content.ContentMarkdown = await markdownToHtml(content.ContentMarkdown);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    content.PublishedAt = new Date(content.PublishedAt).toLocaleDateString('en-US', options);

    break;
  }

  return {
    props: {
      content
    },
    revalidate: 60
  };
}

export default function Article({ content }) {
  const metaTags =  {
    title: content.Title,
    description: content.Description,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/newsletters/${content.SK}`,
    shouldIndex: true,
    img: content.Img
  };

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-20 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div className="align-center flex flex-col content-center items-center pb-10">
          <h1 className="mb-2">{content.Title}</h1>
            <h2 className="mt-0 mb-0 racking-wide text-gray-500 dark:text-gray-400">
              <a
                className="tracking-wide text-gray-500 no-underline hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-500"
                href="https://twitter.com/BNBCHAIN"
                target="_blank"
                rel="noreferrer"
              >
                by {content.Author}
              </a>
              {' · '}
              <span>{content.PublishedAt}</span>
            </h2>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content.ContentMarkdown }} />
          </div>
      </div>
    </Container>
  );
}
