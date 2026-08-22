// Park emblems. Each is the inner markup of a 0 0 100 100 SVG.
// Shape classes map to CSS custom properties on the tile:
//   a = accent, b = accent (muted), c = accent (deep), d = highlight, o = accent stroke
window.PARK_ICONS = {

"acadia": '<path class="c" d="M2 96c14-16 26-6 34-14 12-12 38-10 62 8v6z"/><path class="d" d="M59 27 85 16v20z" opacity=".45"/><path class="a" d="M45 36h12l5 36H40z"/><rect class="d" x="43" y="24" width="16" height="13" rx="2"/><path class="b" d="M40 72h22l3 8H37z"/>',

"american-samoa": '<path class="b" d="M0 84h100v16H0z"/><path class="c" d="M38 84 66 38l30 46z"/><path class="d" d="M66 38 55 56c5 3 8-3 12 0s7-5 11-2z" opacity=".7"/><path class="a" d="M28 86c-3-18-1-31 6-42l7 3c-7 11-8 22-7 39z"/><path class="a" d="M35 46c-8-9-19-10-25-5 9-2 16 1 21 7zM35 45c1-12 9-19 19-18-9 3-14 9-16 18zM36 46c9-6 20-4 25 4-10-3-17-2-22 1z"/>',

"arches": '<path class="b" d="M50 74a14 14 0 1 1 0-28 14 14 0 0 1 0 28z" opacity=".55"/><path class="a" d="M20 90V56c0-18 13-31 30-31s30 13 30 31v34H63V58c0-8-5-14-13-14s-13 6-13 14v32z"/><path class="c" d="M0 90h100v10H0z"/>',

"badlands": '<path class="b" d="M50 92 74 44l24 48z"/><path class="a" d="M2 92 26 34l14 26 10-17 22 49z"/><path class="c" d="M10 70h50v6H10zM14 80h44v5H14z" opacity=".4"/><path class="c" d="M0 92h100v8H0z"/>',

"big-bend": '<path class="a" d="M2 10h36l-4 78H2zM98 4H62l4 84h32z"/><path class="b" d="M38 10h24v78H38z" opacity=".4"/><path class="d" d="M0 88h100v12H0z" opacity=".7"/>',

"biscayne": '<path class="c" d="M0 46h100v54H0z"/><path class="b" d="M0 46h100v9H0z"/><path class="a" d="M52 46c3-10 12-16 22-16s19 6 22 16z"/><path class="d" d="M18 70c9-8 21-8 29 0-8 8-20 8-29 0zM18 70 8 62v16z"/><path class="a" d="M58 90c6-5 14-5 19 0-5 5-13 5-19 0zM58 90l-7-5v10z"/><circle class="d" cx="40" cy="58" r="2.5" opacity=".7"/>',

"black-canyon-of-the-gunnison": '<path class="c" d="M0 0h44L33 100H0zM100 0H57l10 100h33z"/><path class="a" d="M44 0h13l3 100h-9z" opacity=".35"/><path class="d" d="M46 100h8l-2-46h-4z" opacity=".8"/>',

"bryce-canyon": '<path class="a" d="M14 92V44a4 4 0 0 1 8 0v48zM30 92V28a4.5 4.5 0 0 1 9 0v64zM48 92V50a4 4 0 0 1 8 0v42zM64 92V36a4.5 4.5 0 0 1 9 0v56zM82 92V56a4 4 0 0 1 8 0v36z"/><path class="d" d="M11 43h14v6H11zM27 27h15v6H27zM45 49h14v6H45zM61 35h15v6H61zM79 55h14v6H79z" opacity=".75"/><path class="c" d="M0 92h100v8H0z"/>',

"canyonlands": '<path class="b" d="M52 96V42h36v54z"/><path class="a" d="M6 96V56h38v40z"/><path class="d" d="M6 56h38v6H6zM52 42h36v6H52z" opacity=".5"/><path class="c" d="M0 86c16 0 22 8 38 8s26-8 44-8v14H0z"/>',

"capitol-reef": '<path class="b" d="M0 92 30 54l18 20 22-28 30 46z"/><path class="d" d="M58 62a14 12 0 0 1 28 0z"/><path class="a" d="M0 78h100v6H0z" opacity=".35"/><path class="c" d="M0 92h100v8H0z"/>',

"carlsbad-caverns": '<path class="a" d="M0 0h100v9H0zM10 9l7 28 7-28zM32 9l8 36 8-36zM56 9l7 24 7-24zM76 9l8 32 8-32z"/><path class="b" d="M0 92h100v8H0zM18 92l7-26 7 26zM44 92l6-20 6 20zM70 92l8-30 8 30z"/><path class="d" d="M50 56c-7-6-15-7-21-3 6 0 10 2 14 6-5 1-8 3-10 6 6-3 12-3 17 0 5-3 11-3 17 0-2-3-5-5-10-6 4-4 8-6 14-6-6-4-14-3-21 3z"/>',

"channel-islands": '<path class="c" d="M58 78c6-15 16-24 25-24s18 9 20 24z"/><path class="a" d="M10 78V46c0-13 11-22 24-22s24 9 24 22v32H45V48c0-6-5-11-11-11s-11 5-11 11v30z"/><path class="b" d="M0 78h100v22H0z"/>',

"congaree": '<path class="a" d="M4 28c0-13 14-21 30-19 9-6 23-6 33 0 16-2 29 6 29 19z"/><path class="a" d="M18 68V26h6v42zM38 68V16h7v52zM59 68V30h6v38zM79 68V20h6v48z"/><path class="b" d="M0 68h100v32H0z"/><path class="d" d="M18 76h6v18h-6zM38 76h7v20h-7zM59 76h6v16h-6zM79 76h6v18h-6z" opacity=".3"/>',

"crater-lake": '<path class="a" d="M0 92 24 38l16 22 16-30 20 26 24 36z"/><path class="c" d="M50 60c20 0 35 8 35 17s-15 17-35 17-35-8-35-17 15-17 35-17z"/><path d="M50 60c20 0 35 8 35 17s-15 17-35 17-35-8-35-17 15-17 35-17z" fill="none" stroke="var(--c4)" stroke-width="2" opacity=".35"/><path class="d" d="M37 80 50 58l13 22z"/><path class="b" d="M0 92h100v8H0z"/>',

"cuyahoga-valley": '<path class="d" d="M58 44c0-7 9-7 9-14s-9-7-9-14" fill="none" stroke="var(--c4)" stroke-width="4" stroke-linecap="round" opacity=".55"/><path class="a" d="M18 58h36v22H18zM54 46h24v34H54z"/><path class="b" d="M22 62h12v10H22z" opacity=".8"/><path class="c" d="M0 88h100v6H0z"/><circle class="c" cx="30" cy="84" r="8"/><circle class="c" cx="50" cy="84" r="8"/><circle class="c" cx="70" cy="84" r="8"/>',

"death-valley": '<path class="d" d="M72 18a13 13 0 1 1 0 26 13 13 0 0 1 0-26z" opacity=".55"/><path class="a" d="M0 72c22-19 34 8 54-4s31-6 46 6v26H0z"/><path class="b" d="M0 88c26-15 40 6 62-4s28-2 38 4v12H0z" opacity=".55"/>',

"denali": '<path class="a" d="M0 92 34 26l19 28 12-16 35 54z"/><path class="d" d="M34 26 19 56c9 4 13-5 19-1s11-8 17-4l-8-9z" opacity=".85"/><path class="b" d="M65 38 55 54h20z" opacity=".7"/><path class="c" d="M0 92h100v8H0z"/>',

"dry-tortugas": '<path class="b" d="M0 70h100v30H0z"/><path class="c" d="M0 84h100v16H0z"/><path class="a" d="M28 28h44l16 21-16 21H28L12 49z"/><path class="c" d="M40 42h20v18H40z" opacity=".7"/><path class="d" d="M28 28h44v6H28z" opacity=".6"/>',

"everglades": '<path class="d" d="M76 16a11 11 0 1 1 0 22 11 11 0 0 1 0-22z" opacity=".5"/><path class="b" d="M0 74h100v26H0z"/><path class="c" d="M18 78h50l6 8H14z"/><circle class="d" cx="26" cy="72" r="4"/><circle class="d" cx="40" cy="72" r="4"/><path class="a" d="M6 74C6 54 10 42 14 32c-1 14 0 28 2 42zM24 74c-4-18-4-32-2-46 4 14 6 30 8 46zM42 74c0-20 4-32 8-42-1 14 0 28 2 42zM60 74c-4-16-4-30-2-42 4 12 6 26 8 42z"/>',

"gates-of-the-arctic": '<path class="a" d="M0 94 26 32l22 62zM100 94 74 32 52 94z"/><path class="d" d="M26 32 16 56c7 3 10-4 15-1l5-2zM74 32l10 24c-7 3-10-4-15-1l-5-2z" opacity=".8"/><path class="b" d="M40 100q10-32 10-46 0 14 10 46z"/><path class="c" d="M0 94h100v6H0z"/>',

"gateway-arch": '<path class="b" d="M4 88h12v10H4zM22 80h10v18H22zM76 84h10v14H76zM90 76h8v22h-8z" opacity=".7"/><path class="a" d="M22 92c0-32 12-56 28-56s28 24 28 56h-11c0-26-8-45-17-45s-17 19-17 45z"/><path class="c" d="M0 92h100v8H0z"/>',

"glacier": '<path class="a" d="M0 76 30 22l16 26 14-18 40 46z"/><path class="d" d="M30 22 18 46c8 4 11-4 17-1s9-6 14-3l-8-12z" opacity=".85"/><path class="b" d="M0 76h100v24H0z"/><path class="c" d="M20 100 30 68l10 32zM60 100l10-28 10 28z"/>',

"glacier-bay": '<path class="b" d="M0 58h100v42H0z"/><path class="c" d="M0 78h100v22H0z"/><path class="d" d="M0 12h44l12 46H0z"/><path class="a" d="M44 12h10l14 46H56z" opacity=".85"/><path class="d" d="M62 70 76 46l16 24z"/>',

"grand-canyon": '<path class="c" d="M0 24h100v18H0z"/><path class="a" d="M0 42h100v14L72 52 46 60 22 54 0 58z"/><path class="b" d="M0 58 22 54l24 6 26-8 28 4v16L72 68l-26 8-24-6L0 74z"/><path class="c" d="M0 74 22 70l24 6 26-8 28 4v22H0z"/><path d="M0 88c22-6 32 6 52 0s26 2 48-2" fill="none" stroke="var(--c4)" stroke-width="4" opacity=".5"/>',

"grand-teton": '<path class="a" d="M0 88 22 44l12 18 16-34 18 34 12-16 20 42z"/><path class="d" d="M50 28 38 54c7 3 9-4 13-1s7-4 11-1z" opacity=".85"/><path class="b" d="M0 88h100v12H0z"/><path class="d" d="M0 94c22 0 26 6 50 6s28-6 50-6" fill="none" stroke="var(--c4)" stroke-width="3" opacity=".4"/>',

"great-basin": '<circle class="d" cx="20" cy="16" r="3" opacity=".8"/><circle class="d" cx="78" cy="12" r="4" opacity=".8"/><circle class="d" cx="88" cy="34" r="2.5" opacity=".6"/><path class="o" d="M50 58 30 38M50 46l16-16M50 72 34 62M50 34l-8-16" stroke-width="6"/><path class="a" d="M43 96h14l-3-52h-8z"/><path class="c" d="M43 96h14l-1-18h-12z" opacity=".55"/>',

"great-sand-dunes": '<path class="c" d="M0 62 24 24l18 24 14-16 42 30z"/><path class="a" d="M0 70c20-14 30 6 48-2s34-4 52 8v24H0z"/><path class="b" d="M0 88c22-12 34 4 54-4s30 0 46 6v10H0z" opacity=".6"/>',

"great-smoky-mountains": '<path class="c" d="M0 44c18-16 32 4 50-6s34-2 50 10v10H0z"/><path class="b" d="M0 62c16-14 30 6 50-4s34 0 50 12v8H0z"/><path class="a" d="M0 82c18-16 32 6 50-4s34 0 50 12v10H0z"/><path class="d" d="M12 54h32M56 72h34" stroke="var(--c4)" stroke-width="4" stroke-linecap="round" opacity=".45"/>',

"guadalupe-mountains": '<path class="b" d="M0 92 34 46l20 46z"/><path class="a" d="M40 92 74 24l26 68z"/><path class="d" d="M74 24 62 50c8 3 11-4 16-1l4-3z" opacity=".8"/><path class="c" d="M0 92h100v8H0z"/>',

"haleakala": '<path class="d" d="M50 26a15 15 0 1 1 0 30 15 15 0 0 1 0-30z" opacity=".6"/><path class="a" d="M0 96 28 56l14 16 12-20 18 22 12-10 16 32z"/><path class="b" d="M30 78 42 62l10 12 12-14 12 18z" opacity=".6"/><path class="c" d="M0 96h100v4H0z"/>',

"hawaii-volcanoes": '<path class="c" d="M0 94 34 40h32l34 54z"/><path class="a" d="M34 40h32L50 16z" opacity=".9"/><path class="d" d="M42 40h16l6 18-10 8 8 12-14 16-6-20 8-12-8-10z"/><path class="d" d="M0 94c14-8 22 4 34-2s26 2 34 6" fill="none" stroke="var(--c4)" stroke-width="4" opacity=".5"/>',

"hot-springs": '<path class="o" d="M30 30c0-8 8-8 8-16s-8-8-8-16M50 26c0-8 8-8 8-16s-8-8-8-16M70 30c0-8 8-8 8-16s-8-8-8-16" opacity=".55"/><path class="a" d="M14 52h72v10H14z"/><path class="a" d="M18 62h12v30H18zM44 62h12v30H44zM70 62h12v30H70z"/><path class="b" d="M30 62h14v18H30zM56 62h14v18H56z" opacity=".6"/><path class="c" d="M6 92h88v8H6z"/>',

"indiana-dunes": '<path class="b" d="M0 42h100v18H0z" opacity=".7"/><path class="a" d="M0 62c24-16 40 4 58-4s28-2 42 6v36H0z"/><path class="d" d="M14 94c0-15 2-23 6-31-8 6-12 16-12 31zM27 94c0-17-2-25-6-33 8 6 14 18 14 33z" opacity=".7"/><path class="c" d="M62 92c0-12 2-20 6-26-8 4-12 14-12 26z"/>',

"isle-royale": '<path class="c" d="M50 12c26 0 46 14 46 31S76 82 50 82 4 60 4 43s20-31 46-31z" opacity=".45"/><path class="a" d="M16 62c6-14 17-21 34-21s28 7 34 21c-9 7-20 11-34 11s-25-4-34-11z"/><path class="c" d="M32 50 40 30l8 20zM54 50 62 26l8 24z"/><path class="o" d="M12 78c15 7 61 7 76 0" stroke-width="3" opacity=".5"/>',

"joshua-tree": '<circle class="d" cx="18" cy="20" r="3" opacity=".8"/><circle class="d" cx="82" cy="16" r="4" opacity=".8"/><path class="a" d="M45 96V44H55v52z"/><path class="a" d="M45 60 26 46l-2-14 8 12 15 8zM55 52l18-16 4-14-4 16-18 20zM45 76 30 68l-8-10 12 6 11 4zM55 70l14-8 6-10-4 12-16 12z"/><path class="b" d="M22 30c-3-7-1-12 2-15-1 5 0 9 4 13zM75 20c3-6 2-11-1-14 1 5 0 9-3 12z"/><path class="c" d="M0 96h100v4H0z"/>',

"katmai": '<path class="b" d="M0 86h100v14H0z"/><path class="d" d="M78 20c-8-6-18-6-24 0 6 6 16 6 24 0zM78 20l10-6v12z"/><circle class="a" cx="28" cy="36" r="9"/><circle class="a" cx="72" cy="36" r="9"/><path class="a" d="M50 34c14 0 24 11 24 25S64 86 50 86 26 73 26 59s10-25 24-25z"/><path class="d" d="M50 60c8 0 13 5 13 11s-6 11-13 11-13-5-13-11 5-11 13-11z" opacity=".85"/><circle class="c" cx="40" cy="54" r="3.5"/><circle class="c" cx="60" cy="54" r="3.5"/><circle class="c" cx="50" cy="68" r="4"/>',

"kenai-fjords": '<path class="c" d="M0 14 26 44v34H0zM100 10 72 44v34h28z"/><path class="d" d="M26 44h46v22l-46 8z"/><path class="b" d="M0 78h100v22H0z"/><path class="d" d="M36 86 46 72l10 14z"/>',

"kings-canyon": '<circle class="d" cx="50" cy="24" r="11" opacity=".45"/><path class="a" d="M0 8 32 62v38H0zM100 4 68 62v38h32z"/><path class="c" d="M32 62h36v38H32z"/><path class="d" d="M34 100q8-24 16-30 8 6 16 30z" opacity=".5"/><path class="b" d="M44 78V58l6-14 6 14v20z"/>',

"kobuk-valley": '<path class="a" d="M0 64c22-14 34 6 52-2s32-4 48 6v32H0z"/><path class="d" d="M32 50h24v11H32zM34 61h5v11h-5zM50 61h5v11h-5zM56 50l7-9h4v9z"/><path d="M62 41 57 30m5 11 7-11" fill="none" stroke="var(--c4)" stroke-width="2.5" stroke-linecap="round"/><path class="b" d="M0 84c24-12 36 4 56-4s28 0 44 6v14H0z" opacity=".5"/>',

"lake-clark": '<path class="c" d="M0 58 30 18l18 24 14-16 38 32z"/><path class="d" d="M30 18 20 36c7 3 10-4 15-1l4-2z" opacity=".8"/><path class="b" d="M0 58h100v42H0z"/><path class="a" d="M34 80c10-8 24-8 32 0-8 8-22 8-32 0z"/><path class="a" d="M34 80 22 71v18z"/>',

"lassen-volcanic": '<path class="a" d="M0 92 34 34h16l34 58z"/><path class="d" d="M34 34h16l-8-14z" opacity=".85"/><path class="d" d="M42 20c0-8 8-8 8-16" fill="none" stroke="var(--c4)" stroke-width="4" stroke-linecap="round" opacity=".5"/><path class="b" d="M76 92 90 60l10 32z"/><path class="c" d="M0 92h100v8H0z"/>',

"mammoth-cave": '<path class="a" d="M8 96V56c0-24 19-42 42-42s42 18 42 42v40H72V58c0-14-9-26-22-26s-22 12-22 26v38z"/><path class="c" d="M28 96V58c0-14 9-26 22-26s22 12 22 26v38z"/><path class="b" d="M38 96V62c0-9 5-17 12-17s12 8 12 17v34z" opacity=".55"/><path class="d" d="M34 40l4 13 4-13zM56 38l4 15 4-15z" opacity=".5"/><circle class="d" cx="50" cy="74" r="6"/>',

"mesa-verde": '<path class="b" d="M0 0h100v100H0z" opacity=".3"/><path class="c" d="M50 18c22 0 38 15 38 35v41H12V53c0-20 16-35 38-35z"/><path class="a" d="M24 94V66h16v28zM44 94V54h16v40zM64 94V70h14v24z"/><path class="d" d="M28 70h8v8h-8zM48 60h8v8h-8zM68 74h6v7h-6z" opacity=".8"/><path class="b" d="M0 94h100v6H0z"/>',

"mount-rainier": '<path class="a" d="M0 82 34 20l14 22 12-12 40 52z"/><path class="d" d="M34 20 18 48c9 4 12-6 19-2s10-8 16-4l-8-12z" opacity=".85"/><path class="b" d="M0 82h100v18H0z"/><circle class="d" cx="16" cy="90" r="5"/><circle class="d" cx="38" cy="94" r="5"/><circle class="d" cx="62" cy="90" r="5"/><circle class="d" cx="86" cy="94" r="5"/>',

"new-river-gorge": '<path class="c" d="M0 62 22 88v12H0zM100 62 78 88v12h22z"/><path class="a" d="M6 58c0-24 20-40 44-40s44 16 44 40h-10c0-19-15-31-34-31S16 39 16 58z"/><path class="a" d="M0 52h100v8H0z"/><path class="b" d="M26 44h6v10h-6zM46 36h6v18h-6zM68 44h6v10h-6z" opacity=".8"/><path class="d" d="M30 100q10-22 20-30 10 8 20 30z" opacity=".35"/>',

"north-cascades": '<path class="a" d="M0 70 24 24l16 24 14-30 20 32 12-14 14 34z"/><path class="d" d="M24 24 12 48c8 4 11-5 17-1l4-3zM54 18 42 42c8 4 11-5 17-1l3-3z" opacity=".85"/><path class="b" d="M0 70h100v30H0z"/><path class="d" d="M14 82c20-6 30 6 50 0s24-2 36 2" fill="none" stroke="var(--c4)" stroke-width="3" opacity=".35"/>',

"olympic": '<path class="b" d="M0 78h100v22H0z"/><path class="c" d="M64 78V42c0-7 5-12 12-12s12 5 12 12v36z"/><path class="a" d="M30 86 10 58h10L8 38h10L30 14l12 24h10L40 58h10z"/><path class="c" d="M27 84h6v12h-6z"/><path class="d" d="M0 90c12-6 20 4 32-2" fill="none" stroke="var(--c4)" stroke-width="3" opacity=".45"/>',

"petrified-forest": '<path class="c" d="M0 40c18-12 32 4 50-4s34 0 50 10v12H0z"/><path class="b" d="M0 58c20-10 32 6 52-2s30 0 48 8v10H0z" opacity=".75"/><path class="a" d="M6 78h26v12H6zM36 80h22v12H36zM62 76h30v12H62z"/><path class="d" d="M14 78h4v12h-4zM44 80h4v12h-4zM74 76h4v12h-4z" opacity=".6"/><path class="c" d="M0 92h100v8H0z"/>',

"pinnacles": '<path class="d" d="M50 18c-7-7-17-8-24-3 7 0 12 2 17 6-6 1-10 4-13 8 7-5 15-5 20-1 5-4 13-4 20 1-3-4-7-7-13-8 5-4 10-6 17-6-7-5-17-4-24 3z" opacity=".85"/><path class="a" d="M8 96 21 42l11 54zM34 96 49 32l15 64zM66 96l11-46 11 46z"/><path class="c" d="M21 42l11 54H21zM49 32l15 64H49zM77 50l11 46H77z" opacity=".4"/><path class="c" d="M0 96h100v4H0z"/>',

"redwood": '<path class="a" d="M14 100V26l12-12 10 12v74zM50 100V14l12-10 10 10v86z"/><path class="b" d="M78 100V40l8-8 8 8v60z" opacity=".7"/><path class="d" d="M0 44h100v8H0zM0 68h100v6H0z" opacity=".3"/><path class="c" d="M0 96h100v4H0z"/>',

"rocky-mountain": '<path class="a" d="M0 62 28 18l16 24 14-18 42 38z"/><path class="d" d="M28 18 16 42c8 4 11-5 17-1l3-3z" opacity=".85"/><path class="c" d="M34 94V76l-8-6 10 2 4-6h20l4 6 10-2-8 6v18h-8V80H42v14z"/><path class="c" d="M32 68c-6-4-8-10-7-16 3 6 7 8 12 9zM70 68c6-4 8-10 7-16-3 6-7 8-12 9z"/><path class="b" d="M0 94h100v6H0z"/>',

"saguaro": '<path class="d" d="M74 16a12 12 0 1 1 0 24 12 12 0 0 1 0-24z" opacity=".55"/><path class="a" d="M40 94V22a7 7 0 0 1 14 0v72z"/><path class="a" d="M40 60H28V40a6 6 0 0 0-12 0v26a6 6 0 0 0 6 6h18zM54 50h10a6 6 0 0 1 6 6v14a6 6 0 0 0 12 0V50a6 6 0 0 0-6-6H54z"/><path class="b" d="M0 94c18-6 30 4 48-2s34 0 52 4v4H0z"/>',

"sequoia": '<path class="b" d="M50 6 28 42h44z"/><path class="a" d="M36 42 14 30l22 6zM64 34l24-14-24 6z"/><path class="a" d="M36 96V38l14-14 14 14v58z"/><path class="a" d="M36 96c-9 0-15-3-19-9 7-1 13-4 19-9zM64 96c9 0 15-3 19-9-7-1-13-4-19-9z"/><path class="c" d="M43 46h4v50h-4zM55 54h4v42h-4z" opacity=".45"/>',

"shenandoah": '<path class="c" d="M0 50c18-12 32 4 50-4s32 0 50 8v10H0z"/><path class="b" d="M0 68c18-12 32 4 52-2s30 0 48 6v10H0z"/><path class="a" d="M0 84c20-12 34 4 52-2s30 0 48 8v12H0z"/><path d="M10 98c14-14 5-24 20-32s26-4 34-14 10-16 26-20" fill="none" stroke="var(--c4)" stroke-width="4" stroke-linecap="round" opacity=".7"/>',

"theodore-roosevelt": '<path class="c" d="M0 40c18-12 32 4 50-4s32 0 50 8v12H0z" opacity=".8"/><path class="a" d="M20 88V70c-6-4-8-12-4-18 3-5 9-8 16-8h30c10 0 18 6 18 16v28h-10V76H30v12z"/><path class="a" d="M24 44c-8-4-10-12-6-18 2 6 6 9 12 10zM40 40c8-6 10-14 6-20-2 6-6 10-12 12z"/><path class="b" d="M0 94h100v6H0z"/>',

"virgin-islands": '<path class="b" d="M0 66h100v34H0z"/><path class="d" d="M0 60h100v8H0z" opacity=".45"/><path class="a" d="M22 66c-4-18-2-30 6-40l8 4c-8 10-10 22-8 36z"/><path class="a" d="M30 30c-9-8-20-9-26-4 10-2 17 1 22 7zM30 28c1-12 10-19 20-18-9 3-15 9-17 18zM31 30c9-6 21-4 26 4-10-3-18-2-23 1z"/><path class="d" d="M62 62V30l22 32zM66 62l20-20v20z" opacity=".85"/>',

"voyageurs": '<path class="d" d="M76 14a12 12 0 1 1-6 22 13 13 0 0 0 6-22z" opacity=".7"/><path class="c" d="M8 60 20 30l12 30zM34 60 44 34l10 26z"/><path class="b" d="M0 62h100v38H0z"/><path class="a" d="M16 74h68c-4 12-16 18-34 18s-30-6-34-18z"/><path class="a" d="M46 74V60h6v14z"/><path class="d" d="M30 84h40" stroke="var(--c4)" stroke-width="3" opacity=".4"/>',

"white-sands": '<path class="c" d="M0 46c20-10 32 4 50-2s32 0 50 6v8H0z" opacity=".55"/><path class="d" d="M0 62c22-16 34 6 54-2s30-4 46 6v34H0z"/><path class="a" d="M64 68V44l-12-12 12 6V22l10 16 10-14-8 18 12-4-14 12v18z"/><path class="b" d="M0 86c24-12 36 4 56-4s28 0 44 6v12H0z" opacity=".5"/>',

"wind-cave": '<path class="c" d="M0 0h100v100H0z" opacity=".3"/><path class="a" d="M50 10c22 0 38 16 38 38v42H12V48c0-22 16-38 38-38zm0 14c-14 0-24 10-24 24v28h48V48c0-14-10-24-24-24z"/><path class="d" d="M32 52h36v6H32zM32 66h36v6H32zM40 46h6v36h-6zM56 46h6v36h-6z" opacity=".7"/>',

"wrangell-st-elias": '<path class="b" d="M0 74 20 34l14 22 10-14 18 32z"/><path class="a" d="M28 82 62 18l20 30 10-12 8 46z"/><path class="d" d="M62 18 48 46c9 4 12-6 18-2s10-6 15-2l-9-12z" opacity=".85"/><path class="d" d="M0 82h100v10H0z" opacity=".4"/><path class="c" d="M0 92h100v8H0z"/>',

"yellowstone": '<circle class="d" cx="32" cy="24" r="3" opacity=".55"/><circle class="d" cx="68" cy="18" r="3.5" opacity=".55"/><circle class="d" cx="28" cy="44" r="2.5" opacity=".45"/><circle class="d" cx="72" cy="40" r="2.5" opacity=".45"/><path class="d" d="M44 70c-5-19-5-36 0-48 2-5 4-9 6-12 2 3 4 7 6 12 5 12 5 29 0 48z"/><path class="a" d="M16 84c0-8 15-14 34-14s34 6 34 14-15 13-34 13-34-5-34-13z"/><path class="c" d="M33 84c0-4 8-7 17-7s17 3 17 7-8 7-17 7-17-3-17-7z"/>',

"yosemite": '<path class="c" d="M0 16h22v76H0z"/><path class="d" d="M8 22h7v44l-3.5 12L8 66z" opacity=".85"/><path class="a" d="M36 92V48c0-15 8-26 21-26 19 0 32 19 37 44l3 26z"/><path class="d" d="M36 92V48c0-11 4-19 11-24v68z" opacity=".2"/><path class="b" d="M0 92h100v8H0z"/>',

"zion": '<path class="c" d="M0 12l24 30v58H0z"/><path class="a" d="M28 100 66 22l34 78z"/><path class="d" d="M66 22 54 48c9 4 12-5 18-1l3-3z" opacity=".7"/><path class="b" d="M24 100q10-26 16-38 6 12 6 38z" opacity=".8"/>'
};
