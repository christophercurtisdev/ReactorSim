# Technical Details

**React + TypeScript + Tailwind**

Nuclear Reactor Simulator is a game I'm makeing to learn Typescript and React.

Ideally, the game should have no assets (barring SVG's for icons) and just be entirely styled with CSS.

Typescript for the engine.

React and Tailwind for front end.

```npm install```
```npm run dev```

---

# Game Details

Current thoughts on gameplay:
- **Queue**
    1. Queue actions to do stuff, each action takes a set amount of ticks, you cannot rearrange the queue or remove items in the queue.
    2. Some actions are forced (like disengaging rods when they're too hot for example) in which case the rod will do damage to the array until it's disengaged.
- **Autobattler**
    - Engage and disangege rods as you please but when they get too irradiated/ too hot/ too cold, they're queued to be disengaged.
    - Some builds should benefit from switching them all on and lettingthem burn out, others should benefit from min maxing rod engegement.
- **General Loop**
    - Start the day (game round), meet the quota of energy generation before the day ends without causing a meltdown
    - On success, end the day (game round), go to the shop, buy consumables, items, etc.
    - Start the next day with a higher quota.
    - Rinse and repeat with some kind of boss mechanic at specific intervals.