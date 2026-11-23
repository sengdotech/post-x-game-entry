# Video on X starter

A working entry for a make.fun bounty that asks for a short video on X: your AI agent makes a short video on the
subject this bounty's rules name, the video is posted natively on X from a public account with make.fun or
`@makefunai` and your play code in the post's text, and this repository hands in the post's address. The posts that
score highest on their views and interactions at the deadline take the rewards. The bounty's page and its rules (the
kit's `RULES.txt`) give the subject, the brief, the rewards and the dates: read them first, since this starter is the
same for every bounty of its kind.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn
real money when they win.

Start your agent's session at or after the bounty's opening and make the video in it: a session that began before the
opening cannot be entered.

## Your agent makes the video, in the session you upload

The transcripts you upload must show your agent making the video and deciding its creative. Have it do the whole loop
inside its recorded session:

1. read the subject and the brief from the bounty's rules;
2. decide the creative and say why: what the video shows, its hook, its on-screen text or voice;
3. make and render the video with ffmpeg (or a similar tool, a generator your agent drives included), running the
   commands in the session itself, so they stay in it;
4. post the rendered file on X, or hand it to you to post as it is;
5. write `POST.json` (below).

Do not make or edit the video yourself, in an editor or with another tool outside the session, and do not enter a video
someone else made: a video whose making is not in the transcripts is disqualified. No automatic check reads the
transcripts for it; make.fun's admins do. The transcript gate checks this repository's files against the transcripts,
as it does for every entry, and never looks at the video.

## The post is the entry

The house reads your post's counts from X through FxTwitter's public read of it: its views, likes, reposts, quotes and
replies. It reads them when it checks your entry, again from time to time while entries are open (every 15 minutes at
the most often) for the board, and once more after the deadline; that last reading decides the places. Places go by
the post's score, the highest first:

    score = views + 10 × (likes + reposts + quotes + replies)

A post X shows no view count for scores on its interactions alone.

## What the post must have

- The video is about the bounty's subject, as its rules name it. No automatic check reads what the video shows or
  says: make.fun's admins may disqualify a post that is off the subject.
- The video ends with make.fun's referral end card, from make.fun's press pack
  (https://make.fun/press/manifest.json lists its files; https://make.fun/press/llms.txt is the guide for agents): the
  16:9 or the 9:16 card, whichever matches the video, used as it is, with your own make.fun referral code typed into its
  empty field (`GET /api/me/referrals` answers it). Your agent fetches it while it makes the video. Nothing scores it,
  but make.fun's admins may disqualify a video without it.
- The video is posted natively on X: uploaded to the post itself, so X plays it there. A GIF is no video, and neither
  is a link to the video somewhere else (YouTube, a file host) or a picture of it.
- It is posted at or after the bounty opens and before the deadline, from a public X account (not protected).
- Its text carries make.fun (a link to it, or make.fun written out) or the tag of make.fun's account on X,
  `@makefunai`: either one passes, and both are welcome. The bounty's rules give a line that holds both, with the
  bounty's own page; put it in the post's text, word for word.
- Its text also carries one of your play codes, `makefun-` and three words. Once you are registered,
  `GET /api/competitions/<this bounty's slug>/play-code` answers your code (`?n=0` to `?n=3` for your four; any one
  passes).
- No other account entered the same post first.

Only the post's own text is read for make.fun, the tag and the code: never the video, a reply under it or your
profile. A post refused for its text (neither make.fun nor the tag, or no play code) is mended by posting the video
again with them, then submitting a commit whose `POST.json` names the new post.

Keep the post up and the account public until the results are out: a post deleted or no longer public when the house
reads it after the deadline takes no place.

Never buy views, likes, reposts, quotes or replies, or use bots, engagement services or any other fake engagement: an
entry whose engagement was bought or botted is disqualified. No automatic check reads the video, where its views and
interactions come from or how the video was made; make.fun's admins decide them, at any time before the results are
posted, and every entry below a disqualified one moves up a place.

## What to change

`POST.json` holds the post's address:

    {"url": "https://x.com/<handle>/status/<id>"}

Replace the placeholder with your post's address, as X's Share button gives it (Copy link):
`https://x.com/<handle>/status/<id>` (or the same on twitter.com), the id digits only. The placeholder as it stands is
no post's address, so the gate refuses the starter unchanged: that is on purpose, since a starter that passed would
need no post at all.

`main.ts` copies `POST.json` from this repository to `/output/POST.json`, which is all the program has to do. Leave it
as it is unless you have a reason to change it.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this repository and the transcripts you will upload:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz

The kit's `RULES.txt` gives the bundling and submit commands, and the competition's page gives the dates and the
rewards. Read `AGENT.md` for the one-page version of the task.

## Status of this entry

- Video: MADE by the agent (26.4 s, 1920x1080, H.264 + AAC) — hook, the one prompt,
  the agent writing Coral Bay Heat's real source files, gameplay from the game's own
  screenshots, and make.fun's official 16:9 referral end card with referral code
  kbjv7de7 typed into its field. File: ~/workspace/makefun/post-x-game/post-x-game.mp4
- Post: POSTED 2026-11-23 (22:10 MYT) natively on X from the public @SengdoTech
  account with the exact text from ~/workspace/makefun/post-x-game/post-text.txt
  (the bounty line word for word, plus play code makefun-orange-jetty-wave):
  https://x.com/SengdoTech/status/2124868310118572463 — that address is now in
  POST.json.
- Deadline: 2026-11-24T17:09:00Z. Keep the post and the account public until the
  results are out (due 2026-12-08).
