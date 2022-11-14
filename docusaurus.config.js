// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Excel-DNA',
  tagline: 'Free and easy .NET for Excel',
  url: 'https://excel-dna.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Excel-DNA', // Usually your GitHub org/user name.
  projectName: 'TestDocs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        //blog: {
          //showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Excel-DNA',
        logo: {
          alt: 'Excel-DNA',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
        }, 
        items: [
          {  //knowledge base start
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'intro',
                label: 'Introduction',
              },
              {
                type: 'doc',
                docId: 'getting-started/installation',
                label: 'Getting Started',
              },
              {
                type: 'doc',
                docId: 'guides-basic/tempbasicguide',
                label: 'Guides - Basic',
              },
              {
                type: 'doc',
                docId: 'guides-advanced/tempadvancedguide',
                label: 'Guides - Advanced',
              },
            ],
          }, //knowledge base end
          {  //discussions start 
            label: 'Discussions',
            href: 'https://groups.google.com/g/exceldna',
          }, //discussions end
          {  //support start
            type: 'dropdown',
            label: 'Support',
            position: 'left',
            items: [
              {
                label: 'Getting Help',
                to: 'gettinghelp'
              },
              {
                label: 'Corporate Support Agreement',
                to: 'corporatesupportagreement',
              },
              {
                label: 'Sponsor',
                href: 'https://github.com/sponsors/Excel-DNA',
              },
            ], //
          }, //support end
          //{
          //  type: 'doc',
          //  docId: 'hello',
          //  position: 'left',
          //  label: 'Tutorial',
          //},
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left',
          },
          {
            type: 'html',
            value: '<a href="https://github.com/Excel-DNA" target="_blank" rel="noopener noreferrer" class="header-github-link"></a>',
            position: 'right',
          },
          {
            type: 'html',
            value: '<a href="https://groups.google.com/g/exceldna" target="_blank" rel="noopener noreferrer" class="header-googlegroup-link"></a>',
            position: 'right',
          },
          {
            type: 'html',
            value: '<a href="https://www.youtube.com/user/govertvd" target="_blank" rel="noreferrer noopener" class="header-youtube-link"></a>',
            position: 'right'
          },
          {
            type: 'html',
            value: '<a href="https://github.com/sponsors/Excel-DNA" target="_blank" rel="noopener noreferrer" class="header-sponsor-link"><svg class="sponsor-heart-icon" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path></svg><span>&nbsp;&nbsp;Sponsor</a>',
            position: 'right',
          },
        ], 
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Getting Started',
                to: 'getting-started/installation',
              },
              {
                label: 'Guides - Basic',
                to: 'guides-basic/tempbasicguide',
              },
              {
                label: 'Guides - Advanced',
                to: 'guides-advanced/tempadvancedguide',
              },
              {
              html: `
                  <a href="https://www.youtube.com/user/govertvd" target="_blank" rel="noreferrer noopener" class="footer__link-item"> 
                  <img src="/img/youtube.png" alt="YouTube" width="20.42" height="14.4" style="margin-right:5px;" />govertvd
                  </a>
              `,
              },
            ],
          },
          {
            title: 'Discussions',
            items: [
              {
                html: `
                    <a href="https://groups.google.com/g/exceldna" target="_blank" rel="noreferrer noopener" class="footer__link-item"> 
                    <img src="/img/google_groups.png" alt="Google Groups" width="16" height="16" style="margin-right:5px;" />exceldna
                    </a>
                `,
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                html: `
                    <a href="https://github.com/Excel-DNA" target="_blank" rel="noreferrer noopener" class="footer__link-item"> 
                    <img src="/img/github.png" alt="GitHub" width="16" height="16" style="margin-right:5px;" />excel-dna
                    </a>
                `,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DNA Kode, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'fsharp' ,'visual-basic', 'basic', 'vbnet'],
      },
    }),
};

module.exports = config
