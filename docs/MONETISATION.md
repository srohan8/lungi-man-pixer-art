# Monetisation plan (owner-approved direction, NOT built yet)

Status: agreed in discussion, no code written. The game comes first; build this when the owner says it is time to publish.
Until then the rules in CLAUDE.md still apply (no ads, no in-app purchases in the build).

## The model
- One free app. Every act is playable. No demo, no locked content, no paid upfront price (not everyone will pay, and reviews and word of mouth bring installs).
- Income: a full-screen ad at a few story breaks, plus one optional one-time purchase, **Remove ads**.
- Later, optional: a rewarded video (opt in) on the game-over screen, for example a coconut refill. Needs the owner's approval first.
- Long term: the character (Kannan) as a brand: stickers, a WhatsApp sticker pack, merchandise. Only after the game has an audience.

## iPhone model (owner decision, NOT built yet; Android keeps the model above)
- iPhone app: **free download, no ads at all**. Prologue, Act I and the Act II ride are free. After the ride ends, a one-time **Unlock full game** purchase opens Act II to the ending.
- One non-consumable in-app product, price string taken from the store (never hardcoded). Price to be set in App Store Connect; suggested around 2.99 to 3.99 USD with regional prices, Rs price lower for India.
- The unlock screen sits on the same spot as an ad break (after the ride clear countdown, before the Act II story panel). It must be a plain screen with one big UNLOCK button, the price, and a small "Restore purchase" (Apple requires it) and a way back to the title. Never during play, never in a cinematic.
- Locked acts show as locked in the title-screen level selector; the selector must not bypass the unlock. This ties in with the planned progress-based selector (see Related plan).
- Needs the same "stand-in" approach as above: the game works in the browser with a fake unlock and no plugins, and the locked content flag is one TUNE line (for example `TUNE.freeUpTo='bike'`).
- Apple side: App Store Connect product, Capacitor iOS platform plus a StoreKit purchase plugin, TestFlight sandbox testers. Privacy label can stay "Data not collected" because there are no ads.
- CLAUDE.md must be updated when this is built: this is a new system (a paywall), allowed only as this one exception to guardrail 9 and "Out of scope".

## Where the ad breaks are (Android)
| Transition | Ad? | Why |
|---|---|---|
| Prologue to Act I | No | First impression, still teaching the controls |
| Act I to ride | No | The first act stays ad-free |
| **Ride to Act II** | **Yes** | Short, light break |
| **Act II to Act III** | **Yes** | Clean break |
| Act III to Interlude | No | Boss-finish cinematic leads into the fever-dream disco |
| **Interlude to Act IV** | **Yes** | The dream is over |
| Act IV to Pathalam | No | Ground-opening cinematic |
| Pathalam to Act V | No | Would cut Maveli's blessing |
| Act V to ending | No | Never before the ending |

- Make the list a config line in TUNE (for example `TUNE.adAfter=['bike','a2','disco']`, keyed by the level that was just cleared) so a break can be added or dropped without touching the code. Ads per break: start at 1. Never more than 2.
- The break comes after the act-clear countdown and Amma's last line, before the next story panel or scene.
- Never: at game start, after a death or game over, on "tap to continue", from the level selector, inside a cinematic, or during play.

## The ad-break screen (same screen at every break)
- The ad is the main path. One small **Remove ads · price** button sits on the same screen. No "choose first" screen, no toll gate.
- **Never block play.** If no ad is loaded (offline, no fill, error, timeout), skip the break silently and carry on. The pay option must never be the only way forward.
- A player who bought Remove ads never sees a break again (keep the flag in localStorage and confirm it with the store on launch).
- It is between levels, so "no menus during play" still holds. Touch targets stay large, two-thumb friendly.

## Price
- Product: one non-consumable in-app product, **Remove ads**.
- India: about Rs 15. EU, UK and US: about 1 euro, 1 dollar, 1 pound. Set in Play Console (default price, then per-country overrides). Google handles VAT and GST.
- The game must show the price string the store returns for that player (their own currency). Never hardcode "Rs 15" in the game.
- The price can be changed later without a new release.

## What it takes to build (in this order)
1. Game side with a stand-in (works in the browser with zero plugins, like the audio rule): the break screen, the TUNE list, the saved "ads removed" flag, a fake ad and a fake purchase for testing. The game must always run with no ad or billing plugin present.
2. Rewrite the rules in CLAUDE.md (see below) in the same change.
3. AdMob account, app id and one interstitial ad unit. Use Google's test ads while developing (tapping real ads on the owner's own account can get it banned).
4. Capacitor plugins: an AdMob plugin and a Play Billing plugin; add the Remove ads product in Play Console; test with license-tester accounts on an uploaded test track.
5. Play Console declarations: the app contains ads and in-app purchases; privacy policy URL that covers ad data; content rating.

## CLAUDE.md rules to change when this is built
- "Out of scope" lists ads and in-app purchases. Change to: no in-game shops or purchases, no ads during play; allowed: one full-screen ad at the breaks above, and one Remove ads purchase outside gameplay.
- Guardrail 9 (no new systems): add the ad break screen and the ads-removed flag as the only exceptions.
- Mention the rewarded video only if the owner approves it.

## Honest expectations
- At rough Indian rates, 3 or 4 breaks earn about Rs 0.30 to 0.70 per player who finishes the game, and only some players finish. Treat it as a bonus until there are tens of thousands of installs. Rates abroad (Gulf, UK, US) are several times higher, which may matter for a Malayali audience.
- If 2% to 4% of players buy Remove ads at about Rs 15, that is only a few rupees per 100 players.
- The numbers above are estimates from memory; check current AdMob rates.
- Do not add more ads to chase income: each extra ad costs reviews, and reviews bring the installs.

## Related plan
- The title-screen level selector is planned to become progress-based (locked at first). When that is built, the ending must keep every level unlocked: today the clear handler sets progress back to Act I at the ending (`resume=1`).
