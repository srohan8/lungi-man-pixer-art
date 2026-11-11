# Malayalam title logo (art prompt)

Now: when the player picks Malayalam, the title screen shows the words in the bundled Noto Sans Malayalam (gold, big) because the logo picture has its English lettering baked in. A hand-made Malayalam logo would look better. The game picks it up automatically if the file `assets/art/bosses/logo_ml_hi.png` exists (same size and framing as `logo_hi.png`, transparent background).

## Option A (best): a designer / calligrapher
Give them `assets/art/bosses/logo_hi.png` as the reference. Keep Kannan leaping, the palm leaf, the lamp and the ribbon; replace the lettering with Malayalam:
- big line: കണ്ണനും
- second line: കാഞ്ഞിരവനം കഥകളും
Bold, brush-like Malayalam lettering in the same gold with dark outline, readable at 300 px wide. Please check the spelling with a native reader.

## Option B: AI art without any text, then I add the Malayalam in code
AI image tools often garble Malayalam letters, so ask for the logo with EMPTY banners:
"The same logo illustration as the reference (Kannan leaping with a coconut satchel, green palm leaf arching over, brass lamp on the right, two cream ribbons), but with NO text at all: the big title area and the ribbon are empty and flat so lettering can be added later. Same style, transparent background, no extra words, no watermark."
Send me the file and I will put the Malayalam title on it with the bundled font (crisp, correct spelling), and save it as `logo_ml_hi.png`.

## Status (done, with open spelling fixes)
Both logos arrived (assets/reference: the English one and the Malayalam one) and are in the game as `logo_hi.png` and `logo_ml_hi.png` (background removed, same size). The Malayalam title is the transliteration of the English name.
Spelling to fix in the Malayalam picture (the AI drew a few letters wrong), ribbon line:
- now: ആൻഡ് ഭ കാഞ്ഞിരവന്നം ക്കോണിക്കിൾസ്
- should be: ആൻഡ് ദി കാഞ്ഞിരവനം ക്രോണിക്കിൾസ് (ഭ is the wrong letter for "ദി", കാഞ്ഞിരവന്നം has an extra ന്ന, and "ക്രോ" came out as "ക്കോ")
The big word കണ്ണൻ: please check the last letter reads ൻ (it looks close to ർ).
The English picture: the "I" in KANJIRAVANAM and CHRONICLES has a stray tick mark above it (looks like İ).
When a corrected picture arrives, replace the two files (same names) and tell me; I will cut them again.
