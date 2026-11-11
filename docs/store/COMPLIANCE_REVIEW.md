# Google Play release compliance review

Review date: 2026-11-09. This is a source review of the current project, not a legal certification or review of a signed release binary.

## Findings

- Package: `studio.moonga.lungiman`; display name: `Kanjiravanam Chronicles`.
- Owner-confirmed public support email for the privacy policy and Play Store listing: `hello@moonga.studio`.
- Owner-provided privacy policy URL: `https://www.moonga.studio/lungiman/privacy.html`. Checked on 2026-11-09: GitHub Pages returns 404 (File not found). Publish the policy at this address and verify its content before saving it in Play Console.
- Android compile and target API: 36; minimum API: 24.
- Application manifest requests INTERNET only. Final merged manifest must be checked after all release dependencies are installed.
- Game code stores four local values: `lungiman-hi`, `lungiman-prologue`, `lungiman-act`, `lungiman-snd`.
- The inspected game code loads bundled audio and images. No external upload endpoint, analytics integration, custom encryption implementation, or ad/billing plugin was identified in the inspected application sources and plugin registration.
- Android backup is enabled. Do not promise that saved data can never leave the device or that uninstalling necessarily deletes every backup.
- Automated headless gameplay completed all levels successfully during this chat. This does not verify Android rendering, touch controls, lifecycle behavior, performance, or SDK behavior.

## Work before final release

- Finish the privacy policy using `hello@moonga.studio` as the support contact, host it at a public URL, and provide access inside the app and in Play Console. `PRIVACY_POLICY_DRAFT.md` covers only the current build.
- Implement the approved Android monetisation plan before production, then review the exact ad and billing SDKs, final merged permissions, data handling, consent requirements, purchase verification/restoration, and offline/error behavior.
- Update Data safety and the ads declaration for the actual release build. Do not reuse a no-data-collected declaration without examining the added SDKs.
- Complete audience selection and content rating honestly, including fantasy violence and frightening scenes. Review the actual final artwork and cinematics.
- Confirm commercial rights for artwork and audio. `docs/audio-credits.md` records sources but still flags checks for ElevenLabs terms and Pixabay source licences. Keep generation/subscription records and source licence evidence.
- Review store copy and screenshots against the final game. Verify the signed Android bundle on real devices and a Play test track.
- Export eligibility is an owner declaration. No custom encryption was found in inspected game code; this does not classify platform cryptography or establish exporter eligibility under applicable law.

## Reference policies

- Developer policies: https://play.google/developer-content-policy/
- User Data and privacy: https://support.google.com/googleplay/android-developer/answer/10144311
- Intellectual Property: https://support.google.com/googleplay/android-developer/answer/9888072
- Ads: https://support.google.com/googleplay/android-developer/answer/9857753
- Payments: https://support.google.com/googleplay/android-developer/answer/9858738
- Export guidance: https://support.google.com/googleplay/android-developer/answer/113770

Neither creation-form declaration was accepted as part of this review. No app entry or release was submitted.
