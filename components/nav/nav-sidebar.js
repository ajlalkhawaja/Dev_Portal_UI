import {
  BriefcaseIcon,
  ChatAlt2Icon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  FolderAddIcon,
  LibraryIcon,
  PaperClipIcon,
  SparklesIcon,
  AcademicCapIcon,
  NewspaperIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import fetch from '../../utils/fetcher';
import { useAppDispatch, useAppState } from '../../context/AppContext';

const navigation = [
  {
    name: 'Library',
    href: '/library',
    icon: LibraryIcon,
    disabled: false
  },
  {
    name: 'Community',
    href: '/community',
    icon: ChatAlt2Icon,
    disabled: false
  },

  {
    name: 'Newsletters',
    href: '/newsletters',
    icon: NewspaperIcon,
    disabled: false
  },
  {
    name: 'Bounty Board',
    href: 'https://bugcrowd.com/binance',
    icon: ClipboardCheckIcon,
    disabled: false,
    rel: 'noreferrer',
    target: '_blank'
  },
  {
    name: 'Jobs',
    href: 'https://www.bnbchain.org/en/careers',
    icon: BriefcaseIcon,
    disabled: false,
    rel: 'noreferrer',
    target: '_blank'
  }
];

const special = [
  /*{
    name: 'BNB Chain Cookbook',
    href: 'https://docs.bnbchain.org',
    disabled: false
  },*/
  {
    name: 'BNB Chain Docs',
    href: 'https://docs.bnbchain.org/',
    disabled: false
  },
  {
    name: 'Developer Portal',
    href: 'https://www.bnbchain.org/en/developers',
    disabled: false
  },
  {
    name: 'BNB Chain Forum',
    href: 'https://forum.bnbchain.org/',
    disabled: false
  },
  {
    name: 'Explore Dapps',
    href: 'https://dappbay.bnbchain.org/',
    disabled: false
  }
];

const specialLists = [
  {
    name: 'Getting Started',
    href: 'https://docs.bnbchain.org/docs/getting-started/'
    /*'/library/list/started'*/
  },
  {
    name: 'SDKs & Frameworks',
    href: '/library/sdk',
    /*href: 'https://github.com/orgs/bnb-chain/repositories?q=sdk&type=all&language=&sort=',*/
    disabled: false
  }
];

const categories = [
  {
    name: 'Tutorials',
    href: '/library/tutorials'
  },
  {
    name: 'Articles',
    href: '/library/articles'
  },
  {
    name: 'Podcasts',
    href: '/library/podcasts'
  },
  {
    name: 'AMAs',
    href: '/library/ama' /*'https://www.bsc.news/category/ama'*/
  },
  {
    name: 'Dapp Development',
    href: '/library/projects'
  },
  /*{
    name: 'SDKs & Frameworks',
    href: '/library/sdk'
  },*/
  {
    name: 'Scaffolds',
    href: '/library/scaffolds'
  },
  {
    name: 'Tools',
    href: 'https://nodereal.io/bnb-dev-tools',
    rel: 'noreferrer',
    target: '_blank'  
  },
  // {
  //   name: 'Implementations',
  //   href: '/library/implementations'
  // },
  {
    name: 'Security',
    href: '/library/security'
  },
  /*{
    name: 'Program Library',
    href: '/library/spl'
  },*/
  {
    name: 'Twitter Threads',
    href: '/library/threads'
  },
  {
    name: 'Video Playlists',
    href: '/library/playlists'
  },
  {
    name: 'Submitted',
    href: '/library/admin/submitted'
  },
  {
    name: 'Inactive',
    href: '/library/admin/inactive'
  },
  {
    name: 'Post NewsLetter',
    href: '/library/admin/newsletter/post'
  },
  {
    name: 'Post tweet',
    href: '/library/admin/tweet/post'
  },
  {
    name: 'Add Playlist',
    href: '/library/admin/playlist/post'
  }
];

const courses = [
  /* {
    name: 'Intro to BNBChain',
    href: '/course'
  },*/
  {
    name: 'BNBChain 101',
    href: '/course'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavSidebar({ closeMobileMenu, showButton = 0, publicKey }) {
  const [current, setCurrent] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(showButton);
  const { user, isAdmin_ = true, connected, error } = useUser();
  const appState = useAppState();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${window.sessionStorage.getItem('PublicKey')}`);
      let key = localStorage.getItem('PublicKey');
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${
          appState.publicKey ? appState.publicKey : key
        }`
      );
      const admin = data?.Role === 'admin' ? true : false;
      await appDispatch({ type: 'handleAdminMode', payload: admin });
      localStorage.setItem('handleAdminMode', admin);
      setisAdmin(admin);
    };

    fetchData().catch('Catch error ', console.error);
    if (window && window.sessionStorage.getItem('main-navigation')) {
      setCurrent(window.sessionStorage.getItem('main-navigation'));
    } else {
      setCurrent('Library');
    }
    setButtonsVisible(showButton);
  }, [showButton]);

  return (
    <nav aria-label="Sidebar" className="top-4 divide-y divide-gray-300 dark:divide-gray-500">
      <div className="pb-4">
        {navigation.map(item => {
          return (
            <Link href={item.href} passHref key={item.name} target={item.target}>
              <a target={item.target} rel={item.rel}>
                <button
                  className={classNames(
                    item.name === current
                      ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
                      : 'text-gray-800 dark:text-gray-300',
                    'group flex min-w-full max-w-[190px] items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-sm'
                  )}
                  onClick={() => {
                    setCurrent(item.name);
                    window.sessionStorage.setItem('main-navigation', item.name);
                    closeMobileMenu();
                  }}
                  aria-current={item.current ? 'page' : undefined}
                  disabled={item.disabled}
                >
                  <item.icon
                    className={classNames(
                      item.name === current ? 'text-gray-500' : 'text-yellow-400 ',
                      '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                      !item.disabled && 'group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate" title={item.name}>{item.name}</span>
                </button>
              </a>
            </Link>
          );
        })}
      </div>

      <div className="space-y-4 pt-4">
        {/* Add new content*/}
        <Link href="/submit" passHref>
          <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm">
            <FolderAddIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            <span className="truncate leading-6" title="Submit Content"> Submit content</span>
          </div>
        </Link>

        {/* Courses */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline" title="Courses"
          >
            Courses
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {courses.map(item => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <div
                    onClick={() => closeMobileMenu()}
                    className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
                  >
                    <AcademicCapIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>{item.name}</span>
                    {item.name === '"The" Course' && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Special */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline" title="References"
          >
            Reference
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {special.map(item => {
              return (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeMobileMenu()}
                >
                  <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm">
                    <ExternalLinkIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>{item.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Lists */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline" title="Lists"
          >
            Lists
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {specialLists.map(item => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
                  >
                    <SparklesIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline" title="Categories"
          >
            Categories
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {categories.map(item => {
              if (
                (item.name === 'Submitted' ||
                  item.name === 'Inactive' ||
                  item.name === 'Post NewsLetter' ||
                  item.name === 'Post tweet' ||
                  item.name === 'Add Playlist') &&
                appState.isAdminMode == false
              ) {
                return;
              }

              if (item.name === 'Tools') {
                return (
                  <Link href={item.href} passHref key={item.name}>
                    <a
                      href={item.href}
                      key={item.name}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => closeMobileMenu()}
                    >
                      <button
                        onClick={() => closeMobileMenu()}
                        className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
                      >
                        <PaperClipIcon
                          className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                          aria-hidden="true"
                        />
                        <span className="truncate leading-6" title={item.name}>{item.name}</span>
                      </button>
                    </a>
                  </Link>
                );
              }
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
                  >
                    <PaperClipIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

NavSidebar.defaultProps = {
  closeMobileMenu: () => {}
};

NavSidebar.prototype = {
  closeMobileMenu: PropTypes.func
};

export default memo(NavSidebar);
