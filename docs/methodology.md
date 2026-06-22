# PeRSSonal — Tracking Methodology

## Overview

PeRSSonal tracks individuals across fragmented content surfaces. The core insight: smart people appear on many different podcasts, shows, and platforms, and there's no single way to follow them.

## Search Strategy

For each tracked person, PeRSSonal runs:

### Podcast Networks
```
"Person Name" podcast                      — General web search
site:podcasts.apple.com "Person Name"      — Apple Podcasts
site:open.spotify.com "Person Name"        — Spotify
site:youtube.com "Person Name" podcast     — YouTube podcast interviews
```

### Interview Detection
```
"Person Name" interview                    — General interview search
site:youtube.com "Person Name" interview   — YouTube interview videos
```

### Aggregators (secondary)
- Listen Notes
- Podchaser
- Any podcast directory that indexes by guest name

## Deduplication Rules

1. Episode must be published within the last ~12 hours (configurable)
2. Exclude the person's OWN show (not a guest appearance)
3. Exclude short clips under 5 minutes
4. Remove duplicates across search sources
5. When date is uncertain, flag it

## Exclusions

- A person's own podcast or channel (e.g., Real Vision for Raoul Pal, Moonshots for AWG)
- Short video clips
- Content without a clear publish date

## Output Format

```
📡 PeRSSonal — [time]

🎙 Podcast Appearances
Person: Show — Episode Title
   Link

🎬 YouTube
Person: Video Title
   Link

📝 Notable Posts
Person: Post Title
   Link
```

Omit empty sections. If nothing found across all tracked people, send a single line: "All quiet — nothing new."

## Data Sources

- **Web Search:** DuckDuckGo / Google (via LLM agent)
- **Apple Podcasts:** Searched via site: operator
- **Spotify:** Searched via site: operator
- **YouTube:** Searched via site: operator and channel scraping
- **Substack/Blogs:** RSS feeds (optional, currently excluded)

## Architecture (Phase 1)

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  Cron Scheduler  │────▶│  LLM Agent   │────▶│  Telegram DM  │
│  (7AM / 7PM CT)  │     │  (Nemotron)  │     │              │
└─────────────────┘     │  web_search  │     └──────────────┘
                        │  web_extract │
                        └──────────────┘
```

## Configuration

Currently tracks:
- Jordi Visser
- Raoul Pal
- Alex Wissner-Gross (AWG)
- Jensen Huang

Add more by: editing the cron prompt or building the self-serve PWA interface.

## Running Locally

Requires:
- Hermes Agent with cron support
- OpenRouter API access (free Nemotron tier)
- Telegram connected

The tracking is fully prompt-driven. The cron prompt is the logic.

---

*See LICENSE for usage terms.*