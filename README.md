# SCMP Tech Test

## Requirements

This project using node.js `v16.18.1` on development. If your version can not run the project, try switching to the version mentioned previously.

## Run the project

```
npm run install // is not `npm install`, don't typo!
npm run dev
```

## APIs

- GET `./poll`: list all polls.
- GET `./poll/:pollId`: get poll by id, and also the vote results.
- POST `./poll/:pollId/vote`: to vote.

## Hacky Part

I've meet all the requirement, expect the DB part is using the json file. I create a DB class to mock the behavior of communication with DB.

## Relationship of Model if actual db was created

```typescript
type Poll = {
  id: number
  title: string
  createdAt: string
  answerType: string
}

type PollOption = {
  id: number
  pollId: number
  label: string
}

type PollResult = {
  id: string
  pollId: number
  pollOptionId: number
}
```
