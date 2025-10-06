<p align=center>
  <img src=https://img.shields.io/badge/node-v18+-brightgreen.svg?style=flat-square alt="node" />
  <img src=https://img.shields.io/badge/npm-v8+-blue.svg?style=flat-square alt="npm" />
  <a href=https://github.com/prateeksrivastava/self_portfolio/blob/main/LICENSE>
    <img src=https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square alt="License: MIT" />
  </a>
  <a href=https://github.com/prateeksrivastava/self_portfolio/blob/main/.github/contributing.md>
    <img src=https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square alt="Contributions Welcome" />
  </a>
  <a href=https://vercel.com?utm_source=prateeksrivastava.dev&utm_campaign=oss>
    <img src=https://img.shields.io/badge/Powered_by-Vercel-black?style=flat-square alt="Powered by Vercel">
  </a>
</p>

# Personal Portfolio

A modern, responsive portfolio website built with Next.js, designed to showcase projects, skills, and professional experience. This application emphasizes performance, accessibility, and clean design principles.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (v18 or higher)
- [NVM](https://github.com/creationix/nvm) (recommended)
- [Next.js](https://nextjs.org/)

## Installing

In a terminal window run these commands.

```sh
$ git clone https://github.com/prateeksrivastava/self_portfolio.git
$ cd self_portfolio
$ nvm install
$ npm install
$ npm run dev
```

You should be able to view the website locally at `http://localhost:3000/`.

### Environment Setup

Create a `.env.local` file based on `.env.local.example` and add your environment variables:

```sh
$ cp .env.local.example .env.local
```

Add necessary API keys and configuration to your new `.env.local` file.

## Testing

In a terminal window run these commands.

```sh
$ cd self_portfolio
$ npm run test
```

<br>

In a terminal window run these commands to run the jest test suite in watch mode.

```sh
$ cd self_portfolio
$ npm run test:watch
```

In a terminal window run these commands to view the jest coverage report.

```sh
$ cd self_portfolio
$ npm run test:coverage
$ npm run view:coverage
```

In a terminal window run these commands if you need to update a snapshot.

```sh
$ cd self_portfolio
$ npm run test -- --updateSnapshot
```

## Building for Production

To create an optimized production build:

```sh
$ npm run build
$ npm run start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Features

- ⚡ Built with Next.js 14+ and React 18
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- ♿ Accessibility compliant
- 🚀 Optimized for performance
- 📊 SEO friendly
- 🌙 Dark/Light mode support
- 📝 TypeScript for type safety

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Testing:** Jest & React Testing Library
- **Deployment:** Vercel
- **Linting:** ESLint
- **Formatting:** Prettier

## Contact

For any questions or suggestions, feel free to reach out:

- **Email:** [email]
- **LinkedIn:** [linkedin_profile]
- **GitHub:** [github_profile]

---

Made with ❤️ by Prateek Srivastava
