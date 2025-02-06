<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

```
trelloProject
├─ .eslintrc.js
├─ .prettierrc
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ myAlarm.html
├─ README.md
├─ src
│  ├─ alarms
│  │  ├─ alarms.controller.spec.ts
│  │  ├─ alarms.controller.ts
│  │  ├─ alarms.gateway.ts
│  │  ├─ alarms.listener.ts
│  │  ├─ alarms.module.ts
│  │  ├─ alarms.service.spec.ts
│  │  ├─ alarms.service.ts
│  │  ├─ dto
│  │  │  └─ create-alarm.dto.ts
│  │  ├─ entities
│  │  │  └─ alarm.entity.ts
│  │  └─ event
│  │     └─ alarm.events.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ controllers
│  │  │  └─ auth.controller.ts
│  │  ├─ dto
│  │  │  ├─ login.dto.ts
│  │  │  └─ verify-email.dto.ts
│  │  ├─ guards
│  │  │  └─ jwt-auth.guard.ts
│  │  └─ services
│  │     └─ auth.service.ts
│  ├─ boards
│  │  ├─ boards.controller.spec.ts
│  │  ├─ boards.controller.ts
│  │  ├─ boards.module.ts
│  │  ├─ boards.service.spec.ts
│  │  ├─ boards.service.ts
│  │  ├─ dto
│  │  │  ├─ create-board.dto.ts
│  │  │  ├─ update-board.dto.ts
│  │  │  └─ visibility.enum.ts
│  │  └─ entities
│  │     └─ board.entity.ts
│  ├─ card-labels
│  │  ├─ card-labels.controller.spec.ts
│  │  ├─ card-labels.controller.ts
│  │  ├─ card-labels.module.ts
│  │  ├─ card-labels.service.spec.ts
│  │  ├─ card-labels.service.ts
│  │  ├─ dto
│  │  │  ├─ create-card-label.dto.ts
│  │  │  └─ update-card-label.dto.ts
│  │  └─ entities
│  │     └─ card-label.entity.ts
│  ├─ card-members
│  │  ├─ card-members.controller.spec.ts
│  │  ├─ card-members.controller.ts
│  │  ├─ card-members.module.ts
│  │  ├─ card-members.service.spec.ts
│  │  ├─ card-members.service.ts
│  │  ├─ dto
│  │  │  ├─ create-card-member.dto.ts
│  │  │  └─ update-card-member.dto.ts
│  │  └─ entities
│  │     └─ card-member.entity.ts
│  ├─ cards
│  │  ├─ cards.controller.spec.ts
│  │  ├─ cards.controller.ts
│  │  ├─ cards.module.ts
│  │  ├─ cards.service.spec.ts
│  │  ├─ cards.service.ts
│  │  ├─ dto
│  │  │  ├─ create-card.dto.ts
│  │  │  ├─ update-card-positions.dto.ts
│  │  │  └─ update-card.dto.ts
│  │  └─ entities
│  │     └─ card.entity.ts
│  ├─ checkitems
│  │  ├─ checkitems.controller.spec.ts
│  │  ├─ checkitems.controller.ts
│  │  ├─ checkitems.module.ts
│  │  ├─ checkitems.service.spec.ts
│  │  ├─ checkitems.service.ts
│  │  ├─ dto
│  │  │  ├─ create-checkitem.dto.ts
│  │  │  └─ update-checkitem.dto.ts
│  │  └─ entities
│  │     └─ checkitem.entity.ts
│  ├─ checklists
│  │  ├─ checklists.controller.spec.ts
│  │  ├─ checklists.controller.ts
│  │  ├─ checklists.module.ts
│  │  ├─ checklists.service.spec.ts
│  │  ├─ checklists.service.ts
│  │  ├─ dto
│  │  │  ├─ create-checklist.dto.ts
│  │  │  └─ update-checklist.dto.ts
│  │  └─ entities
│  │     └─ checklist.entity.ts
│  ├─ comments
│  │  ├─ comments.controller.spec.ts
│  │  ├─ comments.controller.ts
│  │  ├─ comments.module.ts
│  │  ├─ comments.service.spec.ts
│  │  ├─ comments.service.ts
│  │  ├─ dto
│  │  │  ├─ create-comment.dto.ts
│  │  │  └─ update-comment.dto.ts
│  │  └─ entities
│  │     └─ comment.entity.ts
│  ├─ config
│  │  ├─ data-source.ts
│  │  └─ jwt.config.ts
│  ├─ labels
│  │  ├─ dto
│  │  │  ├─ create-label.dto.ts
│  │  │  └─ update-label.dto.ts
│  │  ├─ entities
│  │  │  └─ label.entity.ts
│  │  ├─ labels.controller.spec.ts
│  │  ├─ labels.controller.ts
│  │  ├─ labels.module.ts
│  │  ├─ labels.service.spec.ts
│  │  └─ labels.service.ts
│  ├─ lists
│  │  ├─ dto
│  │  │  ├─ create-list.dto.ts
│  │  │  ├─ update-list-positions.dto.ts
│  │  │  └─ update-list.dto.ts
│  │  ├─ entities
│  │  │  └─ list.entity.ts
│  │  ├─ lists.controller.spec.ts
│  │  ├─ lists.controller.ts
│  │  ├─ lists.module.ts
│  │  ├─ lists.service.spec.ts
│  │  └─ lists.service.ts
│  ├─ main.ts
│  ├─ members
│  │  ├─ dto
│  │  │  ├─ create-member.dto.ts
│  │  │  └─ get-member.dto.ts
│  │  ├─ entities
│  │  │  └─ member.entity.ts
│  │  ├─ members.controller.spec.ts
│  │  ├─ members.controller.ts
│  │  ├─ members.module.ts
│  │  ├─ members.service.spec.ts
│  │  └─ members.service.ts
│  └─ users
│     ├─ dto
│     │  ├─ create-user.dto.ts
│     │  └─ update-user.dto.ts
│     ├─ entities
│     │  └─ user.entity.ts
│     ├─ users.controller.spec.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     ├─ users.service.spec.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```