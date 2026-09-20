# Next steps

Working notes, not a roadmap anyone signed off on. Written 2026-09-21, right
after trailers landed.

## Known limitation to fix first

**Overflow rows cannot be scrolled.** `.article--grid` in
`overflow-row.component.css:24` is `overflow: hidden` with no scroll and no
controls, so anything past the visible width is unreachable. The gradient on
the right edge implies otherwise.

Cast, recommendations, posters and seasons get away with it because they each
pass a `showMoreLink` and the "Show all" link leads to a full page. The new
trailers row has no such page, so the ones past the edge cannot be opened at
all — Inception renders 27 of them and roughly four fit at a desktop width.

Two ways out, and they are not exclusive:

- make the row itself scrollable (`overflow-x: auto`, plus prev/next buttons
  and keyboard support), which fixes every row at once
- give trailers a child route the way posters has one
  (`movies/:id/trailers`), and pass it as `showMoreLink`

## Finish what the payload already pays for

`append_to_response` on both detail endpoints asks for more than the UI
renders. This is data already downloaded on every detail view and thrown away.

- **Reviews** are fetched for both movies and shows, never mapped, never
  shown. There was a `tmdb-reviews-response.ts` interface; it was deleted in
  5f62368 as unreachable, so this starts from the response type.
- **`similar`** is fetched for both and unused. Recommendations are rendered
  instead. Either surface it or stop asking for it.
- **Keyword and genre chips are dead ends.** `ChipComponent` already takes a
  `link` input with `href` and `queryParams`, and the discover query builders
  can produce the target — `discoverGenres()` already builds one for the "More
  like this" link. The chips themselves just are not wired to it.
- **Collections.** `belongs_to_collection` is commented out in
  `detailed-movie.ts`. A collection page ("The Lord of the Rings Collection")
  is a cheap, satisfying surface.

## Bigger product gaps

1. **Search deserves a real page.** It lives only on the home page today. No
   URL, so results cannot be linked or bookmarked; no pagination; no filter by
   type; and `HomeComponent.ngOnDestroy` clears the service, so navigating into
   a result and pressing back loses everything. A `/search?q=` route plus a
   search field in the header is the largest UX win available.
2. **Watchlist / seen / favourites.** `StorageService` exists and was hardened
   in c0d432b with quota recovery and retry. All local, no auth needed. This is
   what separates the app from a TMDB mirror — a `/my-list` page, a marker on
   the cards, recently viewed on the home page.
3. **Watch providers.** `/watch/providers` is the one major TMDB endpoint the
   app does not touch, and it answers the question people actually have.
   `IsoCountryService` already exists for the region picker.
4. **People are unreachable except through a cast list.** There is no people
   search and no popular-people page. `PeopleComponent` was removed in 5f62368
   because no route pointed at it.
5. **Episodes.** `shows/:id/seasons/:seasonId` exists, but an individual
   episode has no page.

## Plumbing that shows up in the product

- **The wildcard route does not match.** `app.routes.ts` ends with
  `{ path: "*", redirectTo: "" }`, and Angular reads that as a literal `*`
  segment — the spelling is `**`. A mistyped URL throws "Cannot match any
  routes" instead of landing anywhere, and there is no NotFound component at
  all. This matters more than it looks because the Pages deploy routes
  everything through `404.html` back into `index.html`.
- **`/test` ships to production**, pointing at `TestComponent`.
- **`index.html` has no metadata worth sharing**: the title is still "Pmdb2",
  there is no description and no Open Graph tags, so links unfurl to nothing.
  `CustomTitleStrategyService` already sets per-route titles and could set meta
  tags too. Caveat: as a SPA on Pages with no SSR, crawlers will not execute
  that — full effect needs prerendering. The static tags are still worth doing.
- **The header is desktop-only.** Branch `mobile-header` has a single "begin"
  commit against it.
- **CI never runs the tests.** `deploy.yml` only builds. That is how the suite
  managed to stop compiling entirely without anyone noticing (see 5a862b5).
  ChromeHeadless demonstrably works, so a test step is cheap.
- **The bundle is over budget**, 599 kB against the 500 kB in `angular.json`.
  It has been over for a while; the warning is ignored rather than tuned.
- **25 of 84 specs fail.** 13 are the same cause — components read resolved
  data from `activatedRoute.parent`, and TestBed gives them no parent route. A
  shared fixture helper fixes over half of them at once.

## Branch housekeeping

Six branches hold work that is not on master: `wip` (5 commits — the original
trailer spike, now superseded, plus a responsive image grid and a linked header
logo worth salvaging), `reactive-signals-and-new-discover-logic` (2),
`expand-discovery-and-test-signal-forms` (2), `mobile-header` (1), `filters`
(1). Thirteen more are fully merged and just noise.
