# Kannan and the Kanjiravanam Chronicles

A simple, old-school run-and-throw game that plays inside a Reddit post. Run, jump, throw coconuts, beat the bosses.
Set in the folk-tale landscape of Kerala, in India: bamboo hollows, festival grounds, pepper hills, mangroves and a banyan temple grove.

## Overview

**What it is.** A short action game with a story, in the spirit of Contra and Prince of Persia. You play Kannan, a young man in a lungi, who must free five sacred groves from a creeping red corruption. Each of the five acts has the same shape: run to the right, dodge or hit a few kinds of enemies, pass the tea-stall checkpoints, beat the boss.

**Who it is for.** Anyone who wants a quick game with no learning curve, on a phone or a computer. It is meant for players aged 13 and over.

**The controls are only three buttons.**

- Move left and right
- Jump
- Throw a coconut (hold to keep throwing)

On a computer: arrow keys or A and D to move, the up arrow, W or Space to jump, X to throw. On a phone: on-screen buttons.

**Good to know**

- You die in one hit, but you get lives and restart from your last checkpoint.
- Dialogue boxes stop the game until you tap them, so you can read at your own pace.
- Best played in landscape. If you hold your phone upright, the game turns itself sideways, so you can play either way.
- Sound can be switched off with the SND button at the top right (M on a keyboard).

## How to play

1. Open the post and tap **PLAY**. The game opens full size.
2. Start from the title screen. The first time, a short tutorial teaches the three buttons.
3. Reach the end of each act, beat the boss and move on to the next act.
4. Use the pause button (or P or Esc) to **RESUME** or go back to the title screen.

## Content notice

This is a fantasy adventure with cartoon-style pixel art. Enemies are spirits, animals and cursed guardians, and they are defeated by thrown coconuts and a magic trident. There is a spooky "haunted" look (glowing red eyes), but no blood, no gore, and no sexual content. There is no user-written content, chat, or links to other sites.

## Data and privacy

The app does not collect, store or share any personal information. It does not use your Reddit username. Your progress and language choice stay on your own device only. The app has no accounts, no leaderboards, no ads, no purchases, and it makes no requests to outside sites: all art, fonts and sounds are included in the app.

## For moderators: installing and using

1. Install the app in your subreddit from the Reddit App Directory.
2. In your subreddit, use the subreddit menu item **"[kanjiravanam] New Post"** to create a game post. The app also creates one post when it is first installed.
3. Members open the post and tap **PLAY**. Nothing else needs to be configured.

## Reporting problems

If something is broken or inappropriate, please use Reddit's normal **Report** option on the post, or message the moderators of the subreddit where the game is installed.

## For developers

The game is plain HTML, Canvas and JavaScript with no dependencies. This folder is the Reddit (Devvit Web) wrapper:

- `public/splash.html` is the post card (logo and PLAY button).
- `public/game.html`, `game.js`, `game.css` and `public/assets/` are generated from the main game by `../tools/build-reddit.js`. Do not edit them by hand.
- `src/server` creates the game post. The game itself runs in the browser.

Commands (run inside this folder; on Windows PowerShell use `npm.cmd`):

- `npm run dev`: playtest in your test subreddit.
- `npm test`: type check, lint, unit tests and build.
- `npm run publish`: upload the app for Reddit app review (only when ready).
