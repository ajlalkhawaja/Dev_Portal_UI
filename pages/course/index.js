import { Container } from '../../components/layout';
import Table from '../../components/course/table';
import Banner from '../../components/course/banner';

export default function Course() {
  const metaTags = {
    title: 'Check Our Best Blockchain & Web3 Development Courses - BNB Chain Dev',
    description:
      'Know more about the Best Blockchain Development Course only at the BNB dev community website. Learn and develop your career path with Web3 Development.',
    url: `${process.env.HOME_URL}/course`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="mx-2">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            BNBChain Development Course
          </h1>
        </div>

        <div className="mx-auto mt-5 max-w-4xl">
          <p className="prose mx-auto mt-3 text-center text-lg dark:prose-invert">
            This course is designed to be the absolute best starting point for Web Developers
            looking to learn Web3 Development. BNBChain is the ideal network for starting your Web3
            journey because of its high speed, low cost, energy efficiency, and more.
          </p>
        </div>

        <Banner />

        {/* <Table /> */}
      </div>
    </Container>
  );
}
