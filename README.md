# Wasil Islamic App — recovered full backup (2026-10-26) — images included (see MISSING)

## Recovery version and source
- Source artifact: https://claude.ai/artifact/6cU6DPEywb6hQc1ne5zaZH (title "Wasil – recovery app")
- Authoritative page: app/recovery/wasil-recovery.html (exact published bytes, checksum in SHA256SUMS.txt)
- Module resource: app/recovery/modules.js (recovered modules: Quran, Hadith, Salah, Prayer, Wudhu, Tasbih, Embrace Islam, Membership, In Loving Memory)

## Folder structure
- app/recovery/       authoritative recovered application page and module resource
- app/data/           runtime (support.js) and shared data (wasil-data.js, includes one Janaza dua audio, base64 MP3)
- app/hadith/         Hadith data: 3 bundles + 3 JSON books (Sahih Muslim-style "hm" data present in bundles)
- app/quran/          Quran Arabic text and metadata (quran-ar.js, quran-meta.js, quran-state.js)
- app/source/         EARLIER working copies of screen sources (stale; see NOTE-STALE-WORKING-COPIES.txt)
- app/assets/images/  all 155 recovered image assets (exported byte-for-byte, checksums in SHA256SUMS.txt)
- app/assets-map/     original -> recovered asset ID mappings, and asset-file-manifest.json linking each ID to its file

## Running the application
The recovered page loads its runtime, data, modules and images from the hosting platform's asset store
(/_blob/<id> URLs). It cannot run independently from this folder: the image bytes are not in this backup
(see MISSING). Running it requires the Claude artifact platform or an equivalent host that serves those asset IDs.

## Rebuilding / redeploying
1. Host app/recovery/wasil-recovery.html and app/recovery/modules.js on a host that serves the same /_blob/ IDs,
   or rewrite the /_blob/ references to your own asset URLs using assets-map/original-to-recovered-ids.json.
2. Upload every asset listed in assets-map to the same URLs before rewriting references.

## Asset mapping and dependencies
- assets-map/original-to-recovered-ids.json: 160 entries (155 images + 5 runtime/data/Hadith).
- assets-map/original-to-stage3-ids.json: earlier mapping (kept for history).
- External services used by the recovered page: https://api.bigdatacloud.net (reverse geocoding for location),
  https://fonts.googleapis.com (Amiri font), https://www.youtube.com (video links). No API keys are stored in this backup.

## Known incomplete functionality
- Badge access in the Membership area, Legacy of Love badges in loved-one profiles, badge image export: NOT BUILT.
- Memorial profile editing, photo selection/preview and Save-and-Finish-Later: NOT TESTED.
- Sahih al-Bukhari Arabic text: MISSING from all recovered data (English text and numbering preserved).
- Quran audio: NONE available in the recovered project.
- Dua audio: only the Janaza dua is available; other duas show "Audio not available".

## Browser-local storage limitations
- Memorial records created in the app are saved in the user's browser only (localStorage key wasil.memorials.v2 / wasil.stage3.memorials.v2),
  not on a server. Clearing browser data removes them. Photos are not stored.
- Membership state is session-only in this build; no real payments (mock only).

## Required external services and credentials (documented, no secrets included)
- Location reverse geocoding: bigdatacloud client endpoint (no key required by the recovered code, to be confirmed on hosting).
- No credentials, tokens, passwords, real OTP codes or real user data are included.

## KNOWN DEFECT IN THE LIVE RECOVERED APP (found during backup verification)
- The module resource (app/recovery/modules.js) contains one truncated asset reference:
  /_blob/64a34859bc7c438647a70a4f0b7b6ca (31 characters). The correct recovered ID is
  /_blob/64a34859bc7c438647a70a4f0b7b6ba4 (32 characters), and that image is included as app/assets/images/64a34859bc7c438647a70a4f0b7b6ba4.svg.
- Effect: the image that uses this reference is expected to show as broken in the live app. This has NOT been fixed,
  because the backup task forbids coding changes until verification is complete.
- Fix (to apply later, after backup sign-off): re-upload modules.js with the corrected ID, then republish the page to reference the new module asset.
- The backup keeps modules.js byte-for-byte as it is in the live app, so the backup matches what is deployed.

## MISSING (not claimed as backed up)
- Image bytes: NOW INCLUDED (155 of 155, verified). The earlier note saying they were missing is superseded.
- Quran audio files (none found).
- Fonts beyond Google Fonts' hosted Amiri (not bundled).
- Sahih al-Bukhari Arabic text (not available in any source).
- Quran audio, Sahih al-Bukhari Arabic and the known truncated reference above are the only remaining gaps in the recovered content.
- Canonical (non-stale) screen sources: the recovered app exists as one compiled page; the separate *.dc.html files are stale copies.
