# PeRSSonal — RSS for People

**Track the smartest people in any domain across podcasts, YouTube, and the open web.**

PeRSSonal is a discovery engine that monitors notable individuals — not keywords. Instead of keyword-matching with Google Alerts and missing everything, PeRSSonal knows *who* to watch and catches every podcast appearance, interview, and video they surface on.

## The Problem

- Smart people appear on 20+ different podcasts across 5 different networks
- Their YouTube interviews, guest spots, and collaborations live in different feeds
- Google Alerts keyword-matches — it misses appearances where the episode title doesn't mention the guest's name or topic
- There's no "RSS feed for a person"

## The Solution

PeRSSonal tracks individuals, not keywords. Pick the people whose thinking you want to follow, and PeRSSonal:
1. **Searches** 20+ podcast networks (Apple Podcasts, Spotify, YouTube, web) for guest appearances
2. **Finds** their YouTube interviews and public content
3. **Delivers** a scannable alert twice daily — new appearances, new content, all in one place

## Who It's For

| Domain | Example People to Track |
|---|---|
| **AI/Tech** | Jordi Visser, Alex Wissner-Gross, Jensen Huang, Andrej Karpathy |
| **Crypto** | Raoul Pal, Anatoly Yakovenko, MartyParty |
| **Fantasy Football** | Beat writers, injury analysts, sleeper gurus |
| **Soccer/Betting** | Injury reporters, xG modelers, press conference accounts |
| **Fashion** | Trend forecasters, brand analysts, buyers |
| **Biotech** | FDA analysts, trial data reporters, patent watchers |
| **Macro/Finance** | Fed watchers, Tier 1 economists, PMs |

## How It Works (Current)

Currently runs as a Hermes Agent cron job:
- **Model:** Nemotron 3 Ultra 550B (free via OpenRouter)
- **Schedule:** Twice daily (7 AM / 7 PM CT)
- **Delivery:** Telegram DM
- **Silent when nothing new** — no noise

The agent searches web, Apple Podcasts, Spotify, YouTube, and podcast directories for each tracked person. Results are deduplicated, filtered for recency, and delivered link-forward.

## Roadmap

- [x] Core tracking engine (cron + LLM)
- [ ] PWA — add to home screen on any phone
- [ ] Self-serve: pick your own people to track
- [ ] Push notifications on new appearances
- [ ] Pre-built domain packs (AI, crypto, fantasy sports, etc.)
- [ ] API for agent integration (feed into Henry, etc.)

## Stack

- **Orchestration:** Hermes Agent cron
- **LLM:** Nemotron 3 Ultra 550B (research/search)
- **Delivery:** Telegram (Phase 1), PWA (Phase 2)
- **Future:** Python backend + React PWA frontend

## The Name

PeRSSonal = **Person** + **RSS** + **Personal**. RSS for people. Your personal signal board.

---

*Built by Matthew Blodgett (@MatthewBlodgett)*