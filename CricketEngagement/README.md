# Cricket Fan Engagement

Interactive IPL fan experience built with React and Vite. The app combines a product-style landing page, IPL squad visualizations, player career timelines, and a personality-style fan quiz that maps user answers to cricket profiles.

## Features

- Landing page with clear entry points for team exploration, player timelines, and the fan quiz.
- IPL 2026 squad browser with all 10 teams and player-level timeline visualizations.
- Career timeline network for debuts, influential moments, trophies, comebacks, and squad context.
- Fan quiz with delayed reveal, progress tracking, and 60 possible cricketer matches.
- Data-driven roster and player metadata stored in JSON under `src/data`.
- Custom cricket-ball favicon instead of the default Vite icon.

## Screenshots

The app uses the hero visual below as the landing-page backdrop:

![Cricket fan engagement hero](src/assets/hero.png)

Recommended screenshots to capture for project submissions:

- Landing page: `http://localhost:5173/`
- Fan quiz: `http://localhost:5173/fan-test`
- Player visualizations: `http://localhost:5173/visualizations`

## Tech Stack

- React 19
- Vite 8
- Framer Motion
- GSAP
- JavaScript modules
- CSS custom properties and responsive layouts
- JSON-backed app data
- Three.js for the interactive IPL universe hero

## Project Structure

```text
CricketEngagement/
  data/
    source/                         # Source workbook used to generate career timeline data
  public/
    favicon.svg                     # Cricket-ball browser tab icon
    images/
      champions/                    # Season champion/trophy visuals
      logos/                        # Champion team logos
      orangecaps/                   # Orange Cap player portraits
      purplecaps/                   # Purple Cap player portraits
    models/                         # Runtime 3D/model assets
  src/
    assets/                         # Local image assets
    data/
      careerTimelines.json          # Generated player timeline dataset
      eventDetails.json             # Labels and descriptions for named timeline events
      featuredPlayers.json          # Curated featured-player timeline definitions
      internationalCareerTimelines.json
                                     # Fallback international timeline dataset
      iplSeasonImages.json          # Generated index of collected season imagery
      iplSeasonTimeline.json        # IPL Hall of Fame season timeline data
      iplTeams.json                 # Team rosters, captains, colors, and player roles
      playerHighlights.json         # Player highlight copy used by profile panels
      playerMeta.json               # Jersey numbers and role-group metadata
    App.jsx                         # Main UI, routing, scoring, and visualization composition
    App.css                         # Product, quiz, and visualization styling
    cricketerProfiles.js            # Quiz profiles and questions
    main.jsx                        # React entry point
  package.json
  package-lock.json
```

## Setup

Install dependencies:

```bash
npm ci
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Collect source-tracked public images:

```bash
npm run collect:images
```

Preview the production build:

```bash
npm run preview
```

## Routes

- `/` - Product landing page
- `/fan-test` - Fan quiz
- `/visualizations` - IPL team and player timeline visualizations

## Data Notes

- `src/data/iplTeams.json` is the source for team rosters.
- `src/data/playerMeta.json` stores jersey numbers and role-group metadata.
- `src/data/careerTimelines.json` stores generated player timeline data.
- `src/data/featuredPlayers.json` stores curated timelines for the featured players.
- `src/data/internationalCareerTimelines.json` stores fallback career timelines.
- `src/data/iplSeasonTimeline.json` powers the interactive 2008-2026 IPL Hall of Fame timeline.
- `src/data/iplSeasonImages.json` maps each season to collected public images.
- `src/data/playerHighlights.json` and `src/data/eventDetails.json` keep profile copy out of the React component.
- `data/source/ipl_2026_player_career_timelines.xlsx` is the source workbook used to generate the timeline dataset.
