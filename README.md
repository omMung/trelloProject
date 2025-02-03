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
├─ README.md
├─ src
│  ├─ alarms
│  │  ├─ alarms.controller.spec.ts
│  │  ├─ alarms.controller.ts
│  │  ├─ alarms.module.ts
│  │  ├─ alarms.service.spec.ts
│  │  ├─ alarms.service.ts
│  │  ├─ dto
│  │  │  ├─ create-alarm.dto.ts
│  │  │  └─ update-alarm.dto.ts
│  │  └─ entities
│  │     └─ alarm.entity.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ boards
│  │  ├─ boards.controller.spec.ts
│  │  ├─ boards.controller.ts
│  │  ├─ boards.module.ts
│  │  ├─ boards.service.spec.ts
│  │  ├─ boards.service.ts
│  │  ├─ dto
│  │  │  ├─ create-board.dto.ts
│  │  │  └─ update-board.dto.ts
│  │  └─ entities
│  │     ├─ board.entity.ts
│  │     └─ visibility.enum
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
│  │  │  └─ update-member.dto.ts
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

```
trelloProject
├─ .eslintrc.js
├─ .git
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 0b
│  │  │  └─ 7f76a70986566eeb203bee4864dcd93b0d101e
│  │  ├─ 11
│  │  │  └─ f0be09baa4b6e616b611bde80eeac9dc283ee7
│  │  ├─ 28
│  │  │  └─ ab1498ff75a7dd791c07317a1c07329d5d72e4
│  │  ├─ 2f
│  │  │  └─ cc188c16c4729a5aa6708f119bff81b02070ec
│  │  ├─ 3a
│  │  │  └─ 81a2eabca080b5b70294a0a5490f472dfc7335
│  │  ├─ 40
│  │  │  └─ 662ef6357ae6306e02884b2e3cd625c8f6eac0
│  │  ├─ 43
│  │  │  ├─ 0fdab80fa9af953f92697754b4118b0ac5216c
│  │  │  └─ 8555a2d063064a73ef65c4277ebfb3b2543eae
│  │  ├─ 44
│  │  │  └─ 64a96a7fc7f994dd8829d19645dbac9ab58a05
│  │  ├─ 47
│  │  │  └─ a4f8bb1e2d5e436df0ff1e2a525ba516966c97
│  │  ├─ 48
│  │  │  └─ 258ab4165d209df711c57c39aa53637881a05d
│  │  ├─ 4f
│  │  │  └─ ff93093d1b6d1e917c6c2816fc6e8ecfa2de29
│  │  ├─ 53
│  │  │  └─ 6dad7472fe7fdd306d10d867abd1261a5b693a
│  │  ├─ 5f
│  │  │  └─ def058eac0bc5425e23032f02e3873c370114e
│  │  ├─ 61
│  │  │  └─ faa2caf7a710a41f8241cd32fb416d1a79c90f
│  │  ├─ 67
│  │  │  └─ 25594f4e59aabdf32de7ca487c69af3ecdcc81
│  │  ├─ 69
│  │  │  └─ 1abda500533672b0f5f69a6e005e3ce41eed51
│  │  ├─ 6c
│  │  │  └─ 0932cd8a07f15c69d70608b091c4ada6439519
│  │  ├─ 6e
│  │  │  └─ b0ce76a50fa360d3c2e1dd78a3ef0bbe55f97f
│  │  ├─ 75
│  │  │  ├─ 65f04e6ba96140c612e82684ab0f58ca5acf10
│  │  │  └─ 784051531c3470c278df2a340f3e2c4f0947f4
│  │  ├─ 7e
│  │  │  └─ e50fb1c8fd10edeb7d39bba8225ed9c53b298f
│  │  ├─ 81
│  │  │  └─ ae2d00ed51e3cc1d2f1a36312ea668fab4e518
│  │  ├─ 8d
│  │  │  └─ e88677094be3d61fa1b5f55c600dd63e83813e
│  │  ├─ 8f
│  │  │  └─ f2bd136de72461702d41f6352bb106ecd10320
│  │  ├─ 96
│  │  │  └─ 326fff1782e96a06d8cdbcd462c73e613bde3f
│  │  ├─ 9d
│  │  │  └─ 263422f8d62beddc6d65f5c631f36e00a0f260
│  │  ├─ 9f
│  │  │  └─ 70ccfbcbc284b1905105f1386c3dcd57795c5e
│  │  ├─ ae
│  │  │  └─ c010c2db0a3f9be1907f53795224dcb5a14c60
│  │  ├─ af
│  │  │  └─ 53dea8cdaba388b8b30c1998a812c8b4c9c764
│  │  ├─ c5
│  │  │  └─ 82344a3fcde579d6c22a958dd97bda0afd7806
│  │  ├─ cd
│  │  │  └─ d3cd167b4a545d1ed336b5e32ce2dcb31bf68f
│  │  ├─ d1
│  │  │  └─ 38c0b0e591680a60201832b1e302c21693fece
│  │  ├─ d9
│  │  │  └─ cd13ce13892a5a107a7ec973966ac2c580fd7d
│  │  ├─ da
│  │  │  └─ e6c3b6664b608986d3fc97028184f9eb377155
│  │  ├─ db
│  │  │  └─ 1808a52967f82608b4c8efbec8a35f3f980f53
│  │  ├─ df
│  │  │  └─ 3ed12a8ba3930fd8da96540a27931be6e9d317
│  │  ├─ e3
│  │  │  └─ e47a16ae5a297ef08acdda351d2ec28ad33038
│  │  ├─ ed
│  │  │  └─ 0270fd8bde770a53cd28c62bded2e46e2d175d
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-f508f06bcacd2aa38a59586df4cab1ab434bff11.idx
│  │     ├─ pack-f508f06bcacd2aa38a59586df4cab1ab434bff11.pack
│  │     └─ pack-f508f06bcacd2aa38a59586df4cab1ab434bff11.rev
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ feat
│     │  │  └─ ydw
│     │  │     └─ list
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ dev
│     │     ├─ feat
│     │     │  ├─ jcs
│     │     │  │  └─ label
│     │     │  ├─ kdh
│     │     │  │  └─ comment
│     │     │  ├─ pys
│     │     │  │  └─ auth
│     │     │  ├─ ydw
│     │     │  │  └─ list
│     │     │  └─ yhg
│     │     │     └─ card
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ alarms
│  │  ├─ alarms.controller.spec.ts
│  │  ├─ alarms.controller.ts
│  │  ├─ alarms.module.ts
│  │  ├─ alarms.service.spec.ts
│  │  ├─ alarms.service.ts
│  │  ├─ dto
│  │  │  ├─ create-alarm.dto.ts
│  │  │  └─ update-alarm.dto.ts
│  │  └─ entities
│  │     └─ alarm.entity.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ boards
│  │  ├─ boards.controller.spec.ts
│  │  ├─ boards.controller.ts
│  │  ├─ boards.module.ts
│  │  ├─ boards.service.spec.ts
│  │  ├─ boards.service.ts
│  │  ├─ dto
│  │  │  ├─ create-board.dto.ts
│  │  │  └─ update-board.dto.ts
│  │  └─ entities
│  │     ├─ board.entity.ts
│  │     └─ visibility.enum
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
│  │  │  └─ update-member.dto.ts
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
