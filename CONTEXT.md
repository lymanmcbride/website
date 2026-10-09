# Session context — trombone website

Written 2026-10-01 from the planning session. This is the working context, not a transcript. The site has not been built. The Notion cards have not been created.

## What this is

A personal site for Lyman, a professional trombone player. The repo is a fresh Vite + React 19 app (`my-react-app`). `src/App.jsx` is still the Vite counter starter. No router, no content, no host.

The ask was to brainstorm what the site needs, then create cards on an existing Notion board. Building the site was explicitly out of scope until asked.

## Decisions

Readers: hirers and listeners. A contractor or colleague should be able to hear the playing. Someone coming to a concert should be able to see when and where. Both of those have to work on a phone.

Events source: a Google Apps Script web app, called directly from the site. It must not block any page except the events page. A slow or failed script leaves Home, About, and Listen alone.

On the first version, besides About, recordings, one YouTube video, and events: a photo and credits. Not on the first version: a booking email, a press kit, a teaching page.

Look: quiet. The name and the playing carry it. Readable type, generous space, phone width. No theme toggle, no blog, no store.

## v1

Routes and sections:

1. **Home.** Name, "trombone", one sentence, and a way into the recording and the video. A link to Events. This page does not call the events service.
2. **About.** A short bio, one photo, and a few credits or ensembles. Copy, photo path, credits, recording links, and the YouTube id live in `src/content/site.js`.
3. **Listen.** A short list of recordings that link out to wherever they already live. One featured YouTube video on the privacy-enhanced player (`youtube-nocookie`). The site does not host audio files. Listen can sit on the home page.
4. **Events.** Its own route. Upcoming concerts only, soonest first. Each row is date, ensemble or program, city and venue, and an optional ticket or info link.

## Events, and what is allowed to wait

Concerts live in a Google Sheet. An Apps Script web app reads that sheet and returns JSON. The events route is the only code that calls it, and it calls it after the page has painted.

```json
{
  "events": [
    {
      "date": "2026-10-12",
      "title": "Ensemble name",
      "venue": "Hall",
      "city": "City",
      "url": "https://..."
    }
  ]
}
```

The script returns rows dated today or later, soonest first. An empty list is a real state: the events page says nothing is on the calendar. A failed request says the list could not be loaded and offers a retry. The sheet holds public concert facts only.

Deploy the web app as Lyman, available to anyone with the link. The events page calls that URL directly. Apps Script often answers a browser `fetch` with a redirect whose follow-up response has no CORS header. Prove the call from the browser. If that redirect blocks it, the script also accepts a `callback` query and the page loads it as a script tag. No proxy.

## Later

Written down so they stay out of the first build:

- A booking email
- A press kit
- A teaching or lessons page
- A custom domain and analytics

## Notion destination

Board: **Create Website**, under the Personal page.

- Board: https://app.notion.com/p/3e9653bb6a7980448883c67e6938a992?v=3e9653bb6a7980718e96000cbf071cff
- Data source: `collection://3e9653bb-6a79-80dc-b9ee-000b7944df4a`
- Parent page: Personal, https://app.notion.com/p/213653bb6a798048a1b6c81965648a48

Properties:

| Property | Type | Values |
| --- | --- | --- |
| Name | title | card title |
| Status | status | Not started, In progress, Done |
| Assign | person | leave empty |

New cards should be Status `Not started`. Notion auth was completed in this session. A private "Trombone website" page was proposed and rejected; do not create another page. Add rows to this board.

## Cards still to create

Each card is a row. Put the body in the page content. Do not repeat the title at the top of the content.

### 1. Site shell

Status: Not started. v1.

Replace the Vite starter with nav, a home view, and an Events route. Home introduces the player and links to Events. Home does not call the events script. Check the layout at phone width.

Done when the starter counter is gone, Home and Events are separate routes, and loading Home starts no request to the script.

### 2. About

Status: Not started. v1.

Short bio, one photo, and a few credits, read from `src/content/site.js`.

Done when About renders the bio, the photo, and the credits from that file, including a sensible empty state if a field is missing.

### 3. Listen

Status: Not started. v1.

A short list of recordings that link out, plus one YouTube embed on `youtube-nocookie`. Can live on the home page. The site does not host audio files.

Done when each recording is an outbound link and one video plays from a YouTube id in the content file.

### 4. Events web app

Status: Not started. v1.

A Google Sheet of public concerts and an Apps Script web app that returns the JSON shape above. Upcoming rows only, soonest first. Deploy as the owner, anyone with the link. If a browser `fetch` is blocked by the Apps Script redirect, also accept a `callback` query.

Done when the web app URL returns that JSON for the sheet, including an empty list when nothing is upcoming.

### 5. Events page

Status: Not started. v1. After the web app answers.

The only route that calls the web app, and only after paint. Empty list and failed request are both visible states, with a retry on failure.

Done when Home starts no events request, and opening Events starts one. Empty and error states are both reachable.

### 6. Real content

Status: Not started. v1. Blocked on Lyman supplying copy, a photo, recording links, a YouTube id, and the first concerts.

Drop those into `src/content/site.js` and the Sheet.

Done when the site shows real bio, photo, credits, links, video, and concerts instead of placeholders.

### 7. Publish the static site

Status: Not started. v1.

Publish the Vite build somewhere it can be opened on a phone.

Done when a public URL serves the built site.

### 8. Booking email

Status: Not started. Later.

A contact line with an email. No form and no server. Stays out of the first build.

### 9. Press kit

Status: Not started. Later.

Downloadable bio and photos. Stays out of the first build.

### 10. Teaching page

Status: Not started. Later.

A lessons section. Stays out of the first build.

## Checks that belong on the build, not on extra cards

Phone width is part of the site shell. The events fetch is part of the events page: load Home and confirm no request, then open Events and confirm one request.

## What was not done

- No site code was written.
- No Notion rows were inserted. The create call for a new private page was rejected. The board above is the destination.
