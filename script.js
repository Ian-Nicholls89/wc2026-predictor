// ═══════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════
const SCRIPT_URL    = 'https://script.google.com/macros/s/AKfycbzhpvzdR2xZL5x_o1TFOeSnZLgm4lg9UaoQfSGkAYiUXaxXgfoPY74P-LAdZDTNkSdNpw/exec';

// Security: a shared secret sent with every POST.
// Set the same value in Apps Script Script Properties as SUBMIT_TOKEN.
// Change this to any short random string (e.g. 'porton2026').
const SUBMIT_TOKEN  = 'vP6HmhCBfAW2jSITslbF27ef9YK2JcTxr1gwqMBulT6VQwibsdajLVMUbJrt2ELq';

// ═══════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════
const FLAGS = {
  'Mexico':'🇲🇽','South Korea':'🇰🇷','South Africa':'🇿🇦','Czechia':'🇨🇿',
  'Canada':'🇨🇦','Bosnia & Herz.':'🇧🇦','Qatar':'🇶🇦','Switzerland':'🇨🇭',
  'Brazil':'🇧🇷','Morocco':'🇲🇦','Haiti':'🇭🇹','Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'USA':'🇺🇸','Paraguay':'🇵🇾','Australia':'🇦🇺','Turkey':'🇹🇷',
  'Germany':'🇩🇪','Curaçao':'🇨🇼','Ivory Coast':'🇨🇮','Ecuador':'🇪🇨',
  'Netherlands':'🇳🇱','Japan':'🇯🇵','Sweden':'🇸🇪','Tunisia':'🇹🇳',
  'Belgium':'🇧🇪','Iran':'🇮🇷','Egypt':'🇪🇬','New Zealand':'🇳🇿',
  'Spain':'🇪🇸','Cape Verde':'🇨🇻','Saudi Arabia':'🇸🇦','Uruguay':'🇺🇾',
  'France':'🇫🇷','Senegal':'🇸🇳','Iraq':'🇮🇶','Norway':'🇳🇴',
  'Argentina':'🇦🇷','Algeria':'🇩🇿','Austria':'🇦🇹','Jordan':'🇯🇴',
  'Portugal':'🇵🇹','DR Congo':'🇨🇩','Uzbekistan':'🇺🇿','Colombia':'🇨🇴',
  'England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croatia':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦',
};

// Database for rich tooltips with expanded achievements and historical form
const TEAM_STATS = {
  'Argentina':    { rank: 3,  wcs: 3, regs: 16, last: '2022', lastPerf: 'Winners', best: 'Winners (1978, 1986, 2022)', form: 'W-W-W-L-W' },
  'France':       { rank: 1,  wcs: 2, regs: 2,  last: '2022', lastPerf: 'Runners-up', best: 'Winners (1998, 2018)', form: 'W-W-D-W-W' },
  'Spain':        { rank: 2,  wcs: 1, regs: 4,  last: '2022', lastPerf: 'Round of 16', best: 'Winners (2010)', form: 'W-W-W-W-D' },
  'England':      { rank: 4,  wcs: 1, regs: 0,  last: '2022', lastPerf: 'Quarter-finals', best: 'Winners (1966)', form: 'W-D-W-W-L' },
  'Brazil':       { rank: 6,  wcs: 5, regs: 9,  last: '2022', lastPerf: 'Quarter-finals', best: 'Winners (1958, 1962, 1970, 1994, 2002)', form: 'W-W-L-D-W' },
  'Germany':      { rank: 10, wcs: 4, regs: 3,  last: '2022', lastPerf: 'Group Stage', best: 'Winners (1954, 1974, 1990, 2014)', form: 'W-D-W-L-W' },
  'Portugal':     { rank: 5,  wcs: 0, regs: 1,  last: '2022', lastPerf: 'Quarter-finals', best: '3rd Place (1966)', form: 'W-W-W-W-D' },
  'Netherlands':  { rank: 7,  wcs: 0, regs: 1,  last: '2022', lastPerf: 'Quarter-finals', best: 'Runners-up (1974, 1978, 2010)', form: 'W-W-D-L-W' },
  'Morocco':      { rank: 8,  wcs: 0, regs: 1,  last: '2022', lastPerf: '4th Place', best: '4th Place (2022)', form: 'W-W-W-D-W' },
  'Mexico':       { rank: 15, wcs: 0, regs: 12, last: '2022', lastPerf: 'Group Stage', best: 'Quarter-finals (1970, 1986)', form: 'L-W-D-W-W' },
  'USA':          { rank: 16, wcs: 0, regs: 7,  last: '2022', lastPerf: 'Round of 16', best: '3rd Place (1930)', form: 'W-D-L-W-W' },
  'Croatia':      { rank: 11, wcs: 0, regs: 0,  last: '2022', lastPerf: '3rd Place', best: 'Runners-up (2018)', form: 'W-D-W-W-L' },
  'Uruguay':      { rank: 17, wcs: 2, regs: 15, last: '2022', lastPerf: 'Group Stage', best: 'Winners (1930, 1950)', form: 'W-L-W-D-W' },
  'Japan':        { rank: 18, wcs: 0, regs: 4,  last: '2022', lastPerf: 'Round of 16', best: 'Round of 16 (2002, 2010, 2018, 2022)', form: 'W-W-W-W-W' },
  'South Korea':  { rank: 25, wcs: 0, regs: 2,  last: '2022', lastPerf: 'Round of 16', best: '4th Place (2002)', form: 'L-W-W-D-W' },
  'Canada':       { rank: 30, wcs: 0, regs: 2,  last: '2022', lastPerf: 'Group Stage', best: 'Group Stage (1986, 2022)', form: 'D-W-L-W-D' },
  'Ecuador':      { rank: 23, wcs: 0, regs: 0,  last: '2022', lastPerf: 'Group Stage', best: 'Round of 16 (2006)', form: 'W-D-L-W-L' },
  'Ghana':        { rank: 74, wcs: 0, regs: 4,  last: '2022', lastPerf: 'Group Stage', best: 'Quarter-finals (2010)', form: 'L-W-D-L-D' },
  'Switzerland':  { rank: 19, wcs: 0, regs: 0,  last: '2022', lastPerf: 'Round of 16', best: 'Quarter-finals (1934, 1938, 1954)', form: 'W-D-W-L-D' },
  'Tunisia':      { rank: 44, wcs: 0, regs: 1,  last: '2022', lastPerf: 'Group Stage', best: 'Group Stage (5 times)', form: 'D-L-W-W-D' },
  'Saudi Arabia': { rank: 61, wcs: 0, regs: 3,  last: '2022', lastPerf: 'Group Stage', best: 'Round of 16 (1994)', form: 'L-L-W-D-L' },
  'Iran':         { rank: 21, wcs: 0, regs: 3,  last: '2022', lastPerf: 'Group Stage', best: 'Group Stage (6 times)', form: 'W-W-D-W-L' },
  'Australia':    { rank: 27, wcs: 0, regs: 4,  last: '2022', lastPerf: 'Round of 16', best: 'Round of 16 (2006, 2022)', form: 'W-D-W-W-D' },
  'Qatar':        { rank: 55, wcs: 0, regs: 2,  last: '2022', lastPerf: 'Group Stage', best: 'Group Stage (2022)', form: 'W-W-L-D-W' },
  'Belgium':      { rank: 9,  wcs: 0, regs: 0,  last: '2022', lastPerf: 'Group Stage', best: '3rd Place (2018)', form: 'L-W-D-W-W' },
  'Senegal':      { rank: 14, wcs: 0, regs: 1,  last: '2022', lastPerf: 'Round of 16', best: 'Quarter-finals (2002)', form: 'W-L-W-D-D' },
  'Panama':       { rank: 33, wcs: 0, regs: 0,  last: '2018', lastPerf: 'Group Stage', best: 'Group Stage (2018)', form: 'W-D-W-L-L' },
  'Sweden':       { rank: 38, wcs: 0, regs: 0,  last: '2018', lastPerf: 'Quarter-finals', best: 'Runners-up (1958)', form: 'W-W-L-D-W' },
  'Colombia':     { rank: 13, wcs: 0, regs: 1,  last: '2018', lastPerf: 'Round of 16', best: 'Quarter-finals (2014)', form: 'W-W-W-D-D' },
  'Egypt':        { rank: 29, wcs: 0, regs: 7,  last: '2018', lastPerf: 'Group Stage', best: 'First Round (1934)', form: 'W-D-W-L-W' },
  'Nigeria':      { rank: 26, wcs: 0, regs: 3,  last: '2018', lastPerf: 'Group Stage', best: 'Round of 16 (1994, 1998, 2014)', form: 'W-W-D-L-W' },
  'Ivory Coast':  { rank: 34, wcs: 0, regs: 3,  last: '2014', lastPerf: 'Group Stage', best: 'Group Stage (2006, 2010, 2014)', form: 'W-W-D-W-L' },
  'Algeria':      { rank: 28, wcs: 0, regs: 2,  last: '2014', lastPerf: 'Round of 16', best: 'Round of 16 (2014)', form: 'W-D-L-W-D' },
  'Bosnia & Herz.':{ rank: 65,wcs: 0, regs: 0,  last: '2014', lastPerf: 'Group Stage', best: 'Group Stage (2014)', form: 'L-W-L-D-D' },
  'Paraguay':     { rank: 40, wcs: 0, regs: 2,  last: '2010', lastPerf: 'Quarter-finals', best: 'Quarter-finals (2010)', form: 'D-D-W-L-W' },
  'South Africa': { rank: 60, wcs: 0, regs: 1,  last: '2010', lastPerf: 'Group Stage', best: 'Group Stage (1998, 2002, 2010)', form: 'D-L-W-D-L' },
  'Czechia':      { rank: 41, wcs: 0, regs: 0,  last: '2006', lastPerf: 'Group Stage', best: 'Runners-up (1934, 1962 as Czechoslovakia)', form: 'W-L-D-W-W' },
  'Turkey':       { rank: 22, wcs: 0, regs: 0,  last: '2002', lastPerf: '3rd Place', best: '3rd Place (2002)', form: 'W-W-L-D-W' },
  'Austria':      { rank: 24, wcs: 0, regs: 0,  last: '1998', lastPerf: 'Group Stage', best: '3rd Place (1954)', form: 'W-L-W-W-D' },
  'Norway':       { rank: 31, wcs: 0, regs: 0,  last: '1998', lastPerf: 'Round of 16', best: 'Round of 16 (1998)', form: 'L-W-D-W-L' },
  'Scotland':     { rank: 43, wcs: 0, regs: 0,  last: '1998', lastPerf: 'Group Stage', best: 'Group Stage (8 times)', form: 'L-D-L-W-L' },
  'New Zealand':  { rank: 85, wcs: 0, regs: 6,  last: '2010', lastPerf: 'Group Stage', best: 'Group Stage (1982, 2010)', form: 'W-D-L-L-W' },
  'Iraq':         { rank: 57, wcs: 0, regs: 1,  last: '1986', lastPerf: 'Group Stage', best: 'Group Stage (1986)', form: 'W-W-D-L-W' },
  'DR Congo':     { rank: 46, wcs: 0, regs: 2,  last: '1974', lastPerf: 'Group Stage', best: 'Group Stage (1974 as Zaire)', form: 'L-W-D-D-W' },
  'Haiti':        { rank: 83, wcs: 0, regs: 1,  last: '1974', lastPerf: 'Group Stage', best: 'Group Stage (1974)', form: 'W-L-L-D-L' },
  'Jordan':       { rank: 63, wcs: 0, regs: 0,  last: 'None', lastPerf: 'N/A', best: 'Tournament Debut', form: 'W-D-W-L-W' },
  'Uzbekistan':   { rank: 50, wcs: 0, regs: 0,  last: 'None', lastPerf: 'N/A', best: 'Tournament Debut', form: 'W-W-D-W-D' },
  'Cape Verde':   { rank: 69, wcs: 0, regs: 0,  last: 'None', lastPerf: 'N/A', best: 'Tournament Debut', form: 'D-L-W-L-W' },
  'Curaçao':      { rank: 82, wcs: 0, regs: 0,  last: 'None', lastPerf: 'N/A', best: 'Tournament Debut', form: 'L-W-D-L-L' }
};

// Day names for each match date (Jun 11 2026 = Thursday)
const DAY = {
  '11 Jun':'Thu','12 Jun':'Fri','13 Jun':'Sat','14 Jun':'Sun',
  '15 Jun':'Mon','16 Jun':'Tue','17 Jun':'Wed',
  '18 Jun':'Thu','19 Jun':'Fri','20 Jun':'Sat','21 Jun':'Sun',
  '22 Jun':'Mon','23 Jun':'Tue','24 Jun':'Wed',
  '25 Jun':'Thu','26 Jun':'Fri','27 Jun':'Sat'
};

// Matches in chronological order
const M = [
  {id:1, g:'A',h:'Mexico',        a:'South Africa',  d:'11 Jun'},
  {id:2, g:'A',h:'South Korea',   a:'Czechia',        d:'11 Jun'},
  {id:7, g:'B',h:'Canada',        a:'Bosnia & Herz.', d:'12 Jun'},
  {id:19,g:'D',h:'USA',           a:'Paraguay',        d:'12 Jun'},
  {id:8, g:'B',h:'Qatar',         a:'Switzerland',    d:'13 Jun'},
  {id:13,g:'C',h:'Brazil',        a:'Morocco',         d:'13 Jun'},
  {id:14,g:'C',h:'Haiti',         a:'Scotland',        d:'13 Jun'},
  {id:20,g:'D',h:'Australia',     a:'Turkey',          d:'13 Jun'},
  {id:25,g:'E',h:'Germany',       a:'Curaçao',         d:'14 Jun'},
  {id:26,g:'E',h:'Ivory Coast',   a:'Ecuador',         d:'14 Jun'},
  {id:31,g:'F',h:'Netherlands',   a:'Japan',           d:'14 Jun'},
  {id:32,g:'F',h:'Sweden',        a:'Tunisia',         d:'14 Jun'},
  {id:37,g:'G',h:'Belgium',       a:'Egypt',           d:'15 Jun'},
  {id:38,g:'G',h:'Iran',          a:'New Zealand',     d:'15 Jun'},
  {id:43,g:'H',h:'Spain',         a:'Cape Verde',      d:'15 Jun'},
  {id:44,g:'H',h:'Saudi Arabia',  a:'Uruguay',         d:'15 Jun'},
  {id:49,g:'I',h:'France',        a:'Senegal',         d:'16 Jun'},
  {id:50,g:'I',h:'Iraq',          a:'Norway',          d:'16 Jun'},
  {id:55,g:'J',h:'Argentina',     a:'Algeria',         d:'16 Jun'},
  {id:56,g:'J',h:'Austria',       a:'Jordan',          d:'17 Jun'},
  {id:61,g:'K',h:'Portugal',      a:'DR Congo',        d:'17 Jun'},
  {id:62,g:'K',h:'Uzbekistan',    a:'Colombia',        d:'17 Jun'},
  {id:67,g:'L',h:'England',       a:'Croatia',         d:'17 Jun'},
  {id:68,g:'L',h:'Ghana',         a:'Panama',          d:'17 Jun'},
  {id:3, g:'A',h:'Mexico',        a:'South Korea',    d:'18 Jun'},
  {id:4, g:'A',h:'Czechia',       a:'South Africa',   d:'18 Jun'},
  {id:9, g:'B',h:'Switzerland',   a:'Bosnia & Herz.', d:'18 Jun'},
  {id:10,g:'B',h:'Canada',        a:'Qatar',           d:'18 Jun'},
  {id:15,g:'C',h:'Brazil',        a:'Haiti',           d:'19 Jun'},
  {id:16,g:'C',h:'Scotland',      a:'Morocco',         d:'19 Jun'},
  {id:21,g:'D',h:'USA',           a:'Australia',       d:'19 Jun'},
  {id:22,g:'D',h:'Turkey',        a:'Paraguay',        d:'19 Jun'},
  {id:27,g:'E',h:'Germany',       a:'Ivory Coast',    d:'20 Jun'},
  {id:28,g:'E',h:'Ecuador',       a:'Curaçao',         d:'20 Jun'},
  {id:33,g:'F',h:'Netherlands',   a:'Sweden',          d:'20 Jun'},
  {id:34,g:'F',h:'Tunisia',       a:'Japan',           d:'21 Jun'},
  {id:39,g:'G',h:'Belgium',       a:'Iran',            d:'21 Jun'},
  {id:40,g:'G',h:'New Zealand',   a:'Egypt',           d:'21 Jun'},
  {id:45,g:'H',h:'Spain',         a:'Saudi Arabia',   d:'21 Jun'},
  {id:46,g:'H',h:'Uruguay',       a:'Cape Verde',      d:'21 Jun'},
  {id:51,g:'I',h:'France',        a:'Iraq',            d:'22 Jun'},
  {id:52,g:'I',h:'Norway',        a:'Senegal',         d:'22 Jun'},
  {id:57,g:'J',h:'Argentina',     a:'Austria',         d:'22 Jun'},
  {id:58,g:'J',h:'Jordan',        a:'Algeria',         d:'22 Jun'},
  {id:63,g:'K',h:'Portugal',      a:'Uzbekistan',      d:'23 Jun'},
  {id:64,g:'K',h:'Colombia',      a:'DR Congo',        d:'23 Jun'},
  {id:69,g:'L',h:'England',       a:'Ghana',           d:'23 Jun'},
  {id:70,g:'L',h:'Panama',        a:'Croatia',         d:'23 Jun'},
  {id:5, g:'A',h:'Czechia',       a:'Mexico',         d:'24 Jun'},
  {id:6, g:'A',h:'South Africa',  a:'South Korea',    d:'24 Jun'},
  {id:11,g:'B',h:'Switzerland',   a:'Canada',          d:'24 Jun'},
  {id:12,g:'B',h:'Bosnia & Herz.',a:'Qatar',           d:'24 Jun'},
  {id:17,g:'C',h:'Brazil',        a:'Scotland',        d:'25 Jun'},
  {id:18,g:'C',h:'Morocco',       a:'Haiti',           d:'25 Jun'},
  {id:23,g:'D',h:'USA',           a:'Turkey',          d:'25 Jun'},
  {id:24,g:'D',h:'Paraguay',      a:'Australia',       d:'25 Jun'},
  {id:29,g:'E',h:'Germany',       a:'Ecuador',         d:'26 Jun'},
  {id:30,g:'E',h:'Ivory Coast',   a:'Curaçao',         d:'26 Jun'},
  {id:35,g:'F',h:'Netherlands',   a:'Tunisia',         d:'26 Jun'},
  {id:36,g:'F',h:'Japan',         a:'Sweden',          d:'26 Jun'},
  {id:41,g:'G',h:'Belgium',       a:'New Zealand',    d:'26 Jun'},
  {id:42,g:'G',h:'Iran',          a:'Egypt',           d:'26 Jun'},
  {id:47,g:'H',h:'Spain',         a:'Uruguay',         d:'26 Jun'},
  {id:48,g:'H',h:'Saudi Arabia',  a:'Cape Verde',     d:'26 Jun'},
  {id:53,g:'I',h:'France',        a:'Norway',          d:'27 Jun'},
  {id:54,g:'I',h:'Senegal',       a:'Iraq',            d:'27 Jun'},
  {id:59,g:'J',h:'Argentina',     a:'Jordan',          d:'27 Jun'},
  {id:60,g:'J',h:'Algeria',       a:'Austria',         d:'27 Jun'},
  {id:65,g:'K',h:'Portugal',      a:'Colombia',        d:'27 Jun'},
  {id:66,g:'K',h:'Uzbekistan',    a:'DR Congo',        d:'27 Jun'},
  {id:71,g:'L',h:'England',       a:'Panama',          d:'27 Jun'},
  {id:72,g:'L',h:'Croatia',       a:'Ghana',           d:'27 Jun'},
];

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
let preds  = {};
let admRes = {};
let adminPw = '';
let adminUnlocked = false;
let editMode           = false;
let lbCache            = null;
let editPlayerSelected = false;

// ═══════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function isTournamentStarted() {
  const start = new Date('Jun 11, 2026');
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= start;
}

function getLockedMatchIds() {
  const locked = new Set();
  const today  = new Date();
  today.setHours(0, 0, 0, 0);

  const rr = (lbCache && lbCache.results) || [];
  rr.forEach(r => {
    if (r.home!==null&&r.home!==''&&r.away!==null&&r.away!=='') locked.add(r.id);
  });

  M.forEach(m => {
    const parts     = m.d.split(' ');
    const matchDate = new Date(`${parts[1]} ${parts[0]}, 2026`);
    matchDate.setHours(0, 0, 0, 0);
    if (matchDate <= today) locked.add(m.id);
  });

  return locked;
}

function applyPredsToInputs(lockedIds = new Set()) {
  M.forEach(m => {
    const p   = preds[m.id] || {};
    const hEl = document.getElementById('prh'+m.id);
    const aEl = document.getElementById('pra'+m.id);
    if (!hEl||!aEl) return;

    const hv     = (p.h!==''&&p.h!==undefined) ? p.h : '';
    const av     = (p.a!==''&&p.a!==undefined) ? p.a : '';
    const locked = lockedIds.has(m.id);

    hEl.value = hv; hEl.classList.toggle('ok', hv!==''&&!locked); hEl.classList.toggle('locked', locked);
    aEl.value = av; aEl.classList.toggle('ok', av!==''&&!locked); aEl.classList.toggle('locked', locked);
    hEl.disabled = locked;
    aEl.disabled = locked;
  });
}

function flatArrayToPreds(scores) {
  const result  = {};
  const sortedM = [...M].sort((a,b) => a.id - b.id);
  sortedM.forEach((m,i) => {
    const raw_h = scores[i*2], raw_a = scores[i*2+1];
    result[m.id] = {
      h: (raw_h!==''&&raw_h!==null&&raw_h!==undefined) ? parseInt(raw_h) : '',
      a: (raw_a!==''&&raw_a!==null&&raw_a!==undefined) ? parseInt(raw_a) : '',
    };
  });
  return result;
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  buildSections('groups-wrap', false);
  buildSections('admin-groups-wrap', true);
  updateProgress();
  updateDateCounts();
  loadLB();

  // 1. Create and append the global tooltip element dynamically
  const tipEl = document.createElement('div');
  tipEl.id = 'global-tooltip';
  tipEl.className = 'rt-tooltip';
  document.body.appendChild(tipEl);

  // 2. Set up mouse tracking listeners
  setupTooltipTracking(tipEl);

  document.getElementById('inp-name').addEventListener('input', () => {
    localStorage.setItem('wc26_name', document.getElementById('inp-name').value);
    updateSubmitBtn();
  });

  if (SCRIPT_URL === 'SCRIPT_URL_HERE') {
    setTimeout(() => toast('⚠️ Script URL not set — see setup instructions', 'bad', 6000), 800);
  }
  if (SUBMIT_TOKEN === 'SECRET_KEY') {
    setTimeout(() => toast('⚠️ Set SUBMIT_TOKEN to something unique', 'bad', 6000), 1500);
  }
});

// ═══════════════════════════════════════════════════
//  STORAGE
// ═══════════════════════════════════════════════════
function loadStorage() {
  try {
    const p = localStorage.getItem('wc26_preds');   if (p) preds   = JSON.parse(p);
    const r = localStorage.getItem('wc26_admin');   if (r) admRes  = JSON.parse(r);
    const n = localStorage.getItem('wc26_name');    if (n) document.getElementById('inp-name').value = n;
  } catch(e) {}
}
function savePreds() {
  localStorage.setItem('wc26_preds', JSON.stringify(preds));
  localStorage.setItem('wc26_name',  document.getElementById('inp-name').value);
}

// ═══════════════════════════════════════════════════
//  SCORING
// ═══════════════════════════════════════════════════
function scoreMatch(ph, pa, ah, aa) {
  if (ah===''||aa===''||ah===null||aa===null) return null;
  ph=+ph; pa=+pa; ah=+ah; aa=+aa;
  if (isNaN(ph)||isNaN(pa)) return 0;
  if (ph===ah && pa===aa) return 5;
  const pr = ph>pa?'H':ph<pa?'A':'D';
  const ar = ah>aa?'H':ah<aa?'A':'D';
  const ok = pr===ar, one = ph===ah||pa===aa;
  if (ok&&one) return 3; if (ok&&!one) return 2;
  if (!ok&&one) return 1; return 0;
}

// ═══════════════════════════════════════════════════
//  BUILD DATE SECTIONS (predict + admin)
// ═══════════════════════════════════════════════════
function buildSections(wrapperId, isAdm) {
  const wrap = document.getElementById(wrapperId);
  wrap.innerHTML = '';

  // Group matches by date (M is already in date order)
  const dates = [...new Set(M.map(m => m.d))];
  dates.forEach(date => {
    const matches = M.filter(m => m.d === date);
    wrap.appendChild(buildDateSection(date, matches, isAdm));
  });
}

function buildDateSection(date, matches, isAdm) {
  const sec  = document.createElement('div');
  sec.className = 'card grp-sec open';
  const sid  = (isAdm ? 'a' : 'p') + 'sec-' + date.replace(' ','');
  sec.id = sid;

  const dayName   = DAY[date] || '';
  const groups    = [...new Set(matches.map(m => m.g))];
  const grpLabel  = 'Group' + (groups.length > 1 ? 's ' : ' ') + groups.join(', ');
  const [day, mon] = date.split(' ');

  sec.innerHTML = `
    <div class="grp-hdr" onclick="toggleSec('${sid}')">
      <div class="date-badge"><div class="dd">${day}</div><div class="mm">${mon}</div></div>
      <div class="grp-info">
        <div class="grp-name">${dayName} ${date}</div>
        <div class="grp-teams">${matches.length} match${matches.length>1?'es':''} · ${grpLabel}</div>
      </div>
      ${!isAdm ? `<div class="grp-count" id="dc-${date.replace(' ','')}">${countDate(date)}</div>` : ''}
      <svg class="chev" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <div class="grp-matches" id="${sid}-body">
      ${matches.map(m => mrow(m, isAdm)).join('')}
    </div>`;
  return sec;
}

function mrow(m, isAdm) {
  const src = isAdm ? admRes : preds;
  const hv  = src[m.id]?.h ?? '';
  const av  = src[m.id]?.a ?? '';
  const pfx = isAdm ? 'ar' : 'pr';
  const fn  = isAdm ? 'updAdm' : 'updPred';

  // Updated tooltip text configuration string builder
  const getTip = (teamName) => {
    const s = TEAM_STATS[teamName];
    if (!s) return '';
    
    // Custom label parsing if the nation is making its tournament debut
    const lastAppearance = s.last === 'None' ? 'Never Qualified' : `${s.last} (${s.lastPerf})`;

    return `${FLAGS[teamName]} ${teamName}
    FIFA Rank: #${s.rank}
    🏆 World Cups: ${s.wcs}
    🌍 Regional Cups: ${s.regs}
    📅 Last WC Finish: ${lastAppearance}
    🏅 Best Finish: ${s.best}
    📈 Recent Form: ${s.form}`;
  };

  return `
  <div class="mrow">
    <div class="mgrp"><span class="grp-pip g${m.g}">${m.g}</span></div>
    <div class="team custom-tip" data-tip="${getTip(m.h)}">
      <span class="flag">${FLAGS[m.h]||'🏳️'}</span>
      <span class="tname">${m.h}</span>
    </div>
    <div class="sc">
      <input type="number" min="0" max="20" id="${pfx}h${m.id}" value="${hv}" placeholder="–" class="${hv!==''?'ok':''}"
        oninput="${fn}(${m.id},'h',this.value)">
      <span class="vs">:</span>
      <input type="number" min="0" max="20" id="${pfx}a${m.id}" value="${av}" placeholder="–" class="${av!==''?'ok':''}"
        oninput="${fn}(${m.id},'a',this.value)">
    </div>
    <div class="team r custom-tip" data-tip="${getTip(m.a)}">
      <span class="tname">${m.a}</span>
      <span class="flag">${FLAGS[m.a]||'🏳️'}</span>
    </div>
  </div>`;
}

function toggleSec(id) { document.getElementById(id).classList.toggle('open'); }

// ═══════════════════════════════════════════════════
//  PREDICTION UPDATES
// ═══════════════════════════════════════════════════
function updPred(id, side, val) {
  if (!preds[id]) preds[id] = {};
  preds[id][side] = val==='' ? '' : parseInt(val);
  document.getElementById('prh'+id+(side==='h'?'':'').replace('h',''))
  document.getElementById('pr'+(side==='h'?'h':'a')+id).classList.toggle('ok', val!=='');
  savePreds(); updateProgress(); updateDateCounts(); updateSubmitBtn();
}

function countDate(date) {
  const matches = M.filter(m => m.d === date);
  const n = matches.filter(m => {
    const p = preds[m.id];
    return p && p.h!==''&&p.h!==undefined && p.a!==''&&p.a!==undefined;
  }).length;
  return `${n}/${matches.length}`;
}

function updateProgress() {
  const n = M.filter(m => { const p=preds[m.id]; return p&&p.h!==''&&p.h!==undefined&&p.a!==''&&p.a!==undefined; }).length;
  const pct = Math.round(n/72*100);
  document.getElementById('prog-txt').textContent = `${n} of 72 matches filled`;
  document.getElementById('prog-pct').textContent = pct+'%';
  document.getElementById('pfill').style.width = pct+'%';
}

function updateDateCounts() {
  const dates = [...new Set(M.map(m => m.d))];
  dates.forEach(date => {
    const el = document.getElementById('dc-'+date.replace(' ',''));
    if (!el) return;
    const txt = countDate(date);
    const [n, tot] = txt.split('/').map(Number);
    el.textContent = txt;
    el.className = 'grp-count' + (n===tot?' done':'');
  });
}

function luckyDip() {
  const lockedIds = editMode ? getLockedMatchIds() : new Set();
  M.forEach(m => {
    if (lockedIds.has(m.id)) return;
    if (!preds[m.id]) preds[m.id] = {};
    preds[m.id].h = Math.floor(Math.random() * 7);
    preds[m.id].a = Math.floor(Math.random() * 7);
  });
  savePreds();
  applyPredsToInputs(lockedIds);
  updateProgress();
  updateDateCounts();
  updateSubmitBtn();
  toast('Scores filled! Feel free to change any you like before submitting.', 'ok');
}

function updateSubmitBtn() {
  const nameTooShort = document.getElementById('inp-name').value.trim().length < 2;
  const newClosed    = !editMode && isTournamentStarted();
  document.getElementById('sub-btn').disabled = nameTooShort || newClosed;
}

// ═══════════════════════════════════════════════════
//  SUBMIT PREDICTIONS
// ═══════════════════════════════════════════════════
document.getElementById('sub-btn').addEventListener('click', async () => {
  const name = document.getElementById('inp-name').value.trim();
  if (!name) return;
  if (!editMode && isTournamentStarted()) { toast('New predictions are now closed', 'bad'); return; }
  if (SCRIPT_URL === 'SCRIPT_URL_HERE') { toast('Script URL not configured', 'bad'); return; }

  const btn = document.getElementById('sub-btn');
  btn.textContent = 'Submitting…'; btn.disabled = true;

  // Build flat [h1,a1,h2,a2,...] array in match ID order (1–72)
  const sorted = [...M].sort((a,b) => a.id - b.id);
  const scores = [];
  sorted.forEach(m => {
    const p = preds[m.id] || {};
    scores.push(p.h!==undefined&&p.h!==''?parseInt(p.h):'');
    scores.push(p.a!==undefined&&p.a!==''?parseInt(p.a):'');
  });

  try {
    await fetch(SCRIPT_URL, {
      method:'POST', mode:'no-cors',
      headers:{'Content-Type':'text/plain'},
      body: JSON.stringify({action:'submit_predictions', token:SUBMIT_TOKEN, name, predictions:scores})
    });
    document.getElementById('success-box').classList.add('on');
    document.getElementById('success-msg').textContent =
      `${name}'s predictions are saved — check the Google Sheet to confirm.`;
    toast('Predictions submitted!', 'ok');
    localStorage.setItem('wc26_submitted','1');

    // Clear the form so it's ready for the next person
    preds = {};
    document.getElementById('inp-name').value = '';
    savePreds();
    applyPredsToInputs();
    updateProgress();
    updateDateCounts();
    btn.textContent = 'Submit My Predictions'; btn.disabled = true;
  } catch(e) {
    btn.textContent = 'Submit My Predictions'; btn.disabled = false;
    toast('Submit failed — check your connection', 'bad');
  }
});

// ═══════════════════════════════════════════════════
//  PREDICT COUNTDOWN
// ═══════════════════════════════════════════════════
(function startPredCountdown() {
  const DEADLINE = new Date('Jun 11, 2026');
  DEADLINE.setHours(0, 0, 0, 0);
  let interval;

  function tick() {
    const diff = DEADLINE - Date.now();
    if (diff <= 0) {
      clearInterval(interval);
      document.getElementById('pcd-open').style.display   = 'none';
      document.getElementById('pcd-closed').style.display = 'block';
      if (!editMode) document.getElementById('pred-form-wrap').style.display = 'none';
      return;
    }
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('pcd-days').textContent  = pad(Math.floor(diff / 86400000));
    document.getElementById('pcd-hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('pcd-mins').textContent  = pad(Math.floor((diff % 3600000) / 60000));
    document.getElementById('pcd-secs').textContent  = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  interval = setInterval(tick, 1000);
})();

// ═══════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════
function go(v) {
  document.querySelectorAll('.view').forEach(el => el.classList.remove('on'));
  document.querySelectorAll('.ntab').forEach(el => el.classList.remove('on'));
  document.getElementById('v-'+v).classList.add('on');
  document.getElementById('tab-'+v).classList.add('on');
  if (v==='leaderboard') loadLB();
  if (v==='predict' && isTournamentStarted() && !editMode) switchPredTab('edit');
}

// ═══════════════════════════════════════════════════
//  PREDICT SUB-TABS
// ═══════════════════════════════════════════════════
function switchPredTab(tab) {
  editMode = (tab === 'edit');
  document.getElementById('ptab-new').classList.toggle('on', !editMode);
  document.getElementById('ptab-edit').classList.toggle('on', editMode);

  const backBtn    = document.getElementById('edit-back-btn');
  const lockNotice = document.getElementById('edit-lock-notice');
  const newClosed  = document.getElementById('new-closed-notice');

  if (editMode) {
    document.getElementById('edit-panel').style.display = 'block';
    document.getElementById('pred-countdown-wrap').style.display = 'none';
    document.getElementById('pred-form-wrap').style.display = editPlayerSelected ? 'block' : 'none';
    if (backBtn)    backBtn.style.display    = editPlayerSelected ? 'block' : 'none';
    if (lockNotice) lockNotice.style.display = editPlayerSelected ? 'block' : 'none';
    if (newClosed)  newClosed.style.display  = 'none';
    if (!editPlayerSelected) renderEditPlayerList();
  } else {
    const saved = localStorage.getItem('wc26_preds');
    if (saved) try { preds = JSON.parse(saved); } catch(e) {}
    document.getElementById('inp-name').value = localStorage.getItem('wc26_name') || '';
    applyPredsToInputs();
    updateProgress();
    updateDateCounts();
    updateSubmitBtn();

    document.getElementById('edit-panel').style.display = 'none';
    document.getElementById('pred-countdown-wrap').style.display = 'block';
    document.getElementById('pred-form-wrap').style.display = isTournamentStarted() ? 'none' : 'block';
    if (backBtn)    backBtn.style.display    = 'none';
    if (lockNotice) lockNotice.style.display = 'none';
    editPlayerSelected = false;
  }
}

// ═══════════════════════════════════════════════════
//  EDIT MODE — PLAYER LIST
// ═══════════════════════════════════════════════════
async function loadEditData() {
  try {
    const res = await fetch(SCRIPT_URL + '?action=get_data');
    lbCache   = await res.json();
    renderEditPlayerList();
  } catch(e) {
    document.getElementById('edit-player-list').innerHTML =
      `<div class="edit-empty"><div class="ico">❌</div><p>Could not load players.<br>${escHtml(e.message)}</p></div>`;
  }
}

function renderEditPlayerList() {
  const el = document.getElementById('edit-player-list');
  if (!lbCache) {
    el.innerHTML = `<div class="edit-empty"><span class="spin"></span>&nbsp; Loading players…</div>`;
    loadEditData();
    return;
  }
  const { predictions: pp, results: rr } = lbCache;
  if (!pp || pp.length === 0) {
    el.innerHTML = `<div class="edit-empty"><div class="ico">👀</div><p>No predictions submitted yet.<br>Use the <strong>New Prediction</strong> tab to be first!</p></div>`;
    return;
  }

  const rm = {};
  (rr||[]).forEach(r => {
    if (r.home!==null&&r.home!==''&&r.away!==null&&r.away!=='') rm[r.id]={h:r.home,a:r.away};
  });
  const hasResults = Object.keys(rm).length > 0;
  const sortedM    = [...M].sort((a,b) => a.id - b.id);

  const players = pp.map(p => {
    let tot = 0;
    sortedM.forEach((m,i) => {
      const res = rm[m.id];
      if (res) { const pts = scoreMatch(p.scores[i*2], p.scores[i*2+1], res.h, res.a); if (pts!==null) tot+=pts; }
    });
    return { name: p.name, scores: p.scores, tot };
  });
  players.sort((a,b) => b.tot - a.tot || a.name.localeCompare(b.name));

  const rows = players.map((p,i) => `
    <div class="edit-player-row" onclick="selectEditPlayer(${i})">
      <div class="epr-rank">${i+1}</div>
      <div class="epr-name">${escHtml(p.name)}</div>
      <div class="epr-pts">${hasResults ? p.tot : '<span class="epr-dash">–</span>'}</div>
      <div class="epr-arrow">›</div>
    </div>`).join('');

  el.innerHTML = `<div class="edit-list-hdr">Select a player to update their predictions</div>
    <div class="edit-list">${rows}</div>
    <div class="edit-list-refresh"><button class="btn-sm" onclick="lbCache=null;renderEditPlayerList()">↻ Refresh list</button></div>`;

  el._players = players;
}

function selectEditPlayer(idx) {
  const el      = document.getElementById('edit-player-list');
  const players = el._players;
  if (!players || !players[idx]) return;
  const player = players[idx];

  document.getElementById('success-box').classList.remove('on');

  document.getElementById('inp-name').value = player.name;
  localStorage.setItem('wc26_name', player.name);
  preds = flatArrayToPreds(player.scores);
  savePreds();

  const lockedIds     = getLockedMatchIds();
  const lockedCount   = [...lockedIds].filter(id => M.some(m => m.id === id)).length;
  const editableCount = 72 - lockedCount;

  applyPredsToInputs(lockedIds);
  updateProgress();
  updateDateCounts();
  updateSubmitBtn();

  let lockNotice = document.getElementById('edit-lock-notice');
  if (!lockNotice) {
    lockNotice = document.createElement('div');
    lockNotice.id = 'edit-lock-notice';
    lockNotice.className = 'edit-lock-notice';
    document.getElementById('pred-form-wrap').insertAdjacentElement('afterbegin', lockNotice);
  }
  if (lockedCount > 0) {
    lockNotice.innerHTML = '🔒 ' + lockedCount + ' match' + (lockedCount===1?'':'es') + ' locked — games that have started or been played cannot be changed. You can still update your ' + editableCount + ' remaining prediction' + (editableCount===1?'':'s') + '.';
    lockNotice.style.display = 'block';
  } else {
    lockNotice.style.display = 'none';
  }

  editPlayerSelected = true;
  document.getElementById('edit-panel').style.display = 'none';
  document.getElementById('pred-form-wrap').style.display = 'block';

  let backBtn = document.getElementById('edit-back-btn');
  if (!backBtn) {
    backBtn = document.createElement('div');
    backBtn.id = 'edit-back-btn';
    backBtn.className = 'edit-back-btn';
    backBtn.textContent = '← Choose a different player';
    backBtn.onclick = () => {
      editPlayerSelected = false;
      document.getElementById('pred-form-wrap').style.display = 'none';
      document.getElementById('edit-panel').style.display = 'block';
      backBtn.style.display = 'none';
      lockNotice.style.display = 'none';
      renderEditPlayerList();
    };
    document.getElementById('pred-form-wrap').parentNode.insertBefore(
      backBtn, document.getElementById('pred-form-wrap')
    );
  }
  backBtn.style.display = 'block';

  toast(`Loaded ${escHtml(player.name)}'s predictions`, 'ok');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════
//  LEADERBOARD
// ═══════════════════════════════════════════════════
async function loadLB() {
  if (SCRIPT_URL==='SCRIPT_URL_HERE') {
    document.getElementById('lb-body').innerHTML =
      `<div class="lb-empty"><div class="ico">⚙️</div><p>Script URL not configured.<br>See setup instructions.</p></div>`;
    return;
  }
  document.getElementById('lb-body').innerHTML =
    `<div class="lb-empty"><span class="spin"></span>&nbsp; Loading…</div>`;
  try {
    const res  = await fetch(SCRIPT_URL+'?action=get_data');
    const data = await res.json();
    lbCache = data;
    renderLB(data);
  } catch(e) {
    document.getElementById('lb-body').innerHTML =
      `<div class="lb-empty"><div class="ico">❌</div><p>Could not load data.<br>${e.message}</p></div>`;
  }
}

function renderLB({predictions:pp, results:rr}) {
  if (!pp || pp.length===0) {
    document.getElementById('lb-body').innerHTML =
      `<div class="lb-empty"><div class="ico">👀</div><p>No predictions yet.<br>Be the first to submit!</p></div>`;
    return;
  }

  const rm = {};
  (rr||[]).forEach(r => {
    if (r.home!==null&&r.home!==''&&r.away!==null&&r.away!=='') rm[r.id]={h:r.home,a:r.away};
  });
  const hasResults = Object.keys(rm).length > 0;
  const myName = (localStorage.getItem('wc26_name')||'').toLowerCase();

  // Sort M by id for consistent score array indexing
  const sortedM = [...M].sort((a,b) => a.id-b.id);

  const entries = pp.map(p => {
    let tot=0,f5=0,f3=0,f2=0,f1=0;
    sortedM.forEach((m,i) => {
      const res = rm[m.id];
      if (res) {
        const pts = scoreMatch(p.scores[i*2], p.scores[i*2+1], res.h, res.a);
        if (pts!==null) { tot+=pts; if(pts===5)f5++;else if(pts===3)f3++;else if(pts===2)f2++;else if(pts===1)f1++; }
      }
    });
    return {name:p.name, tot, f5, f3, f2, f1};
  });

  entries.sort((a,b)=>b.tot-a.tot||b.f5-a.f5||b.f3-a.f3||b.f2-a.f2||b.f1-a.f1);
  entries.forEach((e,i)=>{
    if(i===0){e.rank=1;return;}
    const pv=entries[i-1];
    e.rank=(e.tot===pv.tot&&e.f5===pv.f5&&e.f3===pv.f3)?pv.rank:i+1;
  });

  let html='';
  if (!hasResults) {
    html+=`<div style="text-align:center;padding:10px 14px 14px;font-size:12px;color:var(--muted)">
      ⏳ Scores will appear once results are entered</div>`;
  }
  if (hasResults && entries.length>=2) {
    const top=entries.slice(0,Math.min(3,entries.length));
    html+=`<div class="podium">`;
    if(top[1])html+=podHtml(top[1],2);
    html+=podHtml(top[0],1);
    if(top[2])html+=podHtml(top[2],3);
    html+=`</div>`;
  }
  html+=`<div class="lb-list">`;
  entries.forEach((e,i)=>{
    const isMe = e.name.toLowerCase()===myName;
    html+=`<div class="lb-row${isMe?' me':''}">
      <div class="lbr">${e.rank}</div>
      <div class="lbn">${e.name}${isMe?' <span style="font-size:10px;color:var(--muted)">you</span>':''}</div>
      ${hasResults?`
        <div class="lbchips">
          ${e.f5>0?`<span class="chip chip5">${e.f5}×5</span>`:''}
          ${e.f3>0?`<span class="chip chip3">${e.f3}×3</span>`:''}
          ${e.f2>0?`<span class="chip chip2">${e.f2}×2</span>`:''}
          ${e.f1>0?`<span class="chip chip1">${e.f1}×1</span>`:''}
        </div>
        <div class="lbpts">${e.tot}</div>
      `:`<div class="lbpts" style="color:var(--muted);font-size:11px">–</div>`}
    </div>`;
  });
  html+=`</div>`;
  document.getElementById('lb-body').innerHTML=html;
}

function podHtml(e,pos){
  return `<div class="pod p${pos}">
    <div class="pod-ico">${['🥇','🥈','🥉'][pos-1]}</div>
    <div class="pod-pos">${['1st','2nd','3rd'][pos-1]}</div>
    <div class="pod-name">${e.name}</div>
    <div class="pod-pts c${pos}">${e.tot}</div>
  </div>`;
}

// ═══════════════════════════════════════════════════
//  ADMIN
// ═══════════════════════════════════════════════════
function updAdm(id, side, val) {
  if (!admRes[id]) admRes[id]={};
  admRes[id][side] = val===''?'':parseInt(val);
  document.getElementById('ar'+(side==='h'?'h':'a')+id).classList.toggle('ok',val!=='');
  localStorage.setItem('wc26_admin',JSON.stringify(admRes));
}

function adminLogin(e) {
  e.preventDefault();
  adminPw = document.getElementById('adm-pw').value;
  document.getElementById('admin-lock').style.display='none';
  document.getElementById('admin-panel').style.display='block';
  adminUnlocked = true;
}

async function saveResults() {
  if (!adminUnlocked) return;
  if (SCRIPT_URL==='https://script.google.com/macros/s/AKfycbzhpvzdR2xZL5x_o1TFOeSnZLgm4lg9UaoQfSGkAYiUXaxXgfoPY74P-LAdZDTNkSdNpw/exec') { toast('Script URL not configured','bad'); return; }
  const btn = document.querySelector('.adm-save');
  btn.textContent='Saving…'; btn.disabled=true;
  const results = M.map(m=>({
    id:m.id,
    home:admRes[m.id]?.h!==undefined&&admRes[m.id]?.h!==''?admRes[m.id].h:'',
    away:admRes[m.id]?.a!==undefined&&admRes[m.id]?.a!==''?admRes[m.id].a:'',
  }));
  try {
    await fetch(SCRIPT_URL,{
      method:'POST',mode:'no-cors',
      headers:{'Content-Type':'text/plain'},
      body:JSON.stringify({action:'submit_results',token:SUBMIT_TOKEN,password:adminPw,results})
    });
    btn.textContent='💾 Save All'; btn.disabled=false;
    toast('✅ Results saved! Check the sheet to confirm.','ok',4000);
  } catch(e) {
    btn.textContent='💾 Save All'; btn.disabled=false;
    toast('Save failed: '+e.message,'bad');
  }
}

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
let _tt;
function toast(msg,cls='',ms=3000){
  const el=document.getElementById('toast');
  el.textContent=msg; el.className='toast show'+(cls?' '+cls:'');
  clearTimeout(_tt); _tt=setTimeout(()=>el.classList.remove('show'),ms);
}

// ═══════════════════════════════════════════════════
//  TOOLTIP
// ═══════════════════════════════════════════════════
function setupTooltipTracking(tipEl) {
  // Listen for hover entries anywhere on the page body
  document.body.addEventListener('mouseover', (e) => {
    const target = e.target.closest('.custom-tip');
    if (!target) return;

    const text = target.getAttribute('data-tip');
    if (!text) return;

    tipEl.textContent = text;
    tipEl.style.display = 'block';
    
    // Tiny timeout to let display:block register so transition animation works smoothly
    setTimeout(() => tipEl.classList.add('show'), 10);
  });

  // Track cursor movement updates dynamically
  document.body.addEventListener('mousemove', (e) => {
    if (!tipEl.classList.contains('show')) return;

    // Position the tooltip 15px to the right and 15px below the cursor point
    let x = e.clientX + 15;
    let y = e.clientY + 15;

    // Boundary check: Prevent the tooltip from falling off the right edge of the window
    const tipWidth = tipEl.offsetWidth;
    if (x + tipWidth > window.innerWidth) {
      x = e.clientX - tipWidth - 15; // Flip to the left side of the cursor
    }

    // Boundary check: Prevent falling off the bottom edge
    const tipHeight = tipEl.offsetHeight;
    if (y + tipHeight > window.innerHeight) {
      y = e.clientY - tipHeight - 15; // Flip above the cursor
    }

    tipEl.style.left = `${x}px`;
    tipEl.style.top = `${y}px`;
  });

  // Hide the element when leaving a team element
  document.body.addEventListener('mouseout', (e) => {
    const target = e.target.closest('.custom-tip');
    if (!target) return;

    tipEl.classList.remove('show');
    // Hide it completely from layout tree when invisible
    setTimeout(() => {
      if (!tipEl.classList.contains('show')) tipEl.style.display = 'none';
    }, 100);
  });
}