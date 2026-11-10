"use strict";

// ───────────── Tallennus (localStorage) ─────────────
const STORE_KEY = "bassotreeni30";
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || { done: {} };
  } catch {
    return { done: {} };
  }
}
function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    /* tallennus ei käytettävissä – sovellus toimii silti */
  }
}
const state = loadState();

const todayISO = () => new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD paikallisessa ajassa
const isDone = (d) => Boolean(state.done[d]);
const doneCount = () => Object.keys(state.done).length;
const nextDay = () => (PROGRAM.find((d) => !isDone(d.day)) || PROGRAM[PROGRAM.length - 1]).day;

function streak() {
  const dates = new Set(Object.values(state.done));
  const d = new Date();
  if (!dates.has(d.toLocaleDateString("sv-SE"))) d.setDate(d.getDate() - 1); // tämä päivä voi olla vielä kesken
  let n = 0;
  while (dates.has(d.toLocaleDateString("sv-SE"))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// ───────────── Ääni ─────────────
let audioCtx = null;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

const TUNING = { E: 41.2, A: 55.0, D: 73.42, G: 98.0 };
let tunerVoice = null;
function playTuningNote(note, btn) {
  stopTuningNote();
  const ac = ctx();
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const filter = ac.createBiquadFilter();
  const gain = ac.createGain();
  // Sahalaine + alipäästö: yläsävelet kuuluvat myös läppärin kaiuttimista
  osc.type = "sawtooth";
  osc.frequency.value = TUNING[note];
  filter.type = "lowpass";
  filter.frequency.value = 900;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 3);
  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 3);
  btn.classList.add("playing");
  tunerVoice = { osc, btn };
  osc.onended = () => {
    btn.classList.remove("playing");
    if (tunerVoice && tunerVoice.osc === osc) tunerVoice = null;
  };
}
function stopTuningNote() {
  if (!tunerVoice) return;
  try { tunerVoice.osc.stop(); } catch { /* jo pysähtynyt */ }
  tunerVoice.btn.classList.remove("playing");
  tunerVoice = null;
}
document.querySelectorAll(".tuner button").forEach((b) =>
  b.addEventListener("click", () => playTuningNote(b.dataset.note, b))
);

function beep(freq = 880, dur = 0.25) {
  const ac = ctx();
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.25, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur);
}

// ───────────── Metronomi (Web Audio -ajastus) ─────────────
const metro = {
  bpm: 70,
  running: false,
  beat: 0,
  nextTime: 0,
  timer: null,
  els: {
    toggle: document.getElementById("metro-toggle"),
    bpm: document.getElementById("metro-bpm"),
    beats: [...document.querySelectorAll("#metro-beats i")],
  },
  setBpm(v) {
    this.bpm = Math.max(30, Math.min(220, Math.round(v)));
    this.els.bpm.textContent = this.bpm;
  },
  start() {
    if (this.running) return;
    const ac = ctx();
    this.running = true;
    this.beat = 0;
    this.nextTime = ac.currentTime + 0.08;
    this.timer = setInterval(() => this.schedule(), 25);
    this.els.toggle.textContent = "■";
    this.els.toggle.setAttribute("aria-label", "Pysäytä metronomi");
  },
  stop() {
    this.running = false;
    clearInterval(this.timer);
    this.els.toggle.textContent = "▶";
    this.els.toggle.setAttribute("aria-label", "Käynnistä metronomi");
    this.els.beats.forEach((b) => b.classList.remove("on"));
  },
  schedule() {
    const ac = audioCtx;
    while (this.nextTime < ac.currentTime + 0.1) {
      this.click(this.nextTime, this.beat % 4 === 0);
      const beatIdx = this.beat % 4;
      const delay = Math.max(0, (this.nextTime - ac.currentTime) * 1000);
      setTimeout(() => {
        if (!this.running) return;
        this.els.beats.forEach((b, i) => b.classList.toggle("on", i === beatIdx));
      }, delay);
      this.nextTime += 60 / this.bpm;
      this.beat++;
    }
  },
  click(time, accent) {
    const ac = audioCtx;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.frequency.value = accent ? 1600 : 1000;
    gain.gain.setValueAtTime(accent ? 0.5 : 0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(gain).connect(ac.destination);
    osc.start(time);
    osc.stop(time + 0.06);
  },
};
metro.els.toggle.addEventListener("click", () => (metro.running ? metro.stop() : metro.start()));
document.getElementById("metro-down").addEventListener("click", () => metro.setBpm(metro.bpm - 5));
document.getElementById("metro-up").addEventListener("click", () => metro.setBpm(metro.bpm + 5));

// ───────────── Apufunktiot ─────────────
const app = document.getElementById("app");
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const totalMinutes = (day) => day.exercises.reduce((s, e) => s + e.minutes, 0);
const fmtTime = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

function fretboardSVG(notes) {
  const strings = ["G", "D", "A", "E"];
  const W = 660, nutX = 44, fw = 50, top = 18, gap = 24;
  const y = (s) => top + strings.indexOf(s) * gap;
  const x = (f) => (f === 0 ? nutX - 20 : nutX + (f - 0.5) * fw);
  const bottom = y("E");
  let svg = `<svg class="fretboard" viewBox="0 0 ${W} ${bottom + 34}" role="img" aria-label="Otelautakaavio">`;
  svg += `<rect x="${nutX}" y="${top - 8}" width="${12 * fw}" height="${bottom - top + 16}" fill="var(--wood)" rx="3"/>`;
  [3, 5, 7, 9].forEach((f) =>
    (svg += `<circle cx="${x(f)}" cy="${(top + bottom) / 2}" r="5" fill="var(--fret)" opacity=".5"/>`)
  );
  [top + gap * 0.5, bottom - gap * 0.5].forEach(
    (cy) => (svg += `<circle cx="${x(12)}" cy="${cy}" r="5" fill="var(--fret)" opacity=".5"/>`)
  );
  for (let f = 0; f <= 12; f++) {
    const fx = nutX + f * fw;
    svg += `<line x1="${fx}" y1="${top - 8}" x2="${fx}" y2="${bottom + 8}" stroke="var(--fret)" stroke-width="${f === 0 ? 5 : 2}"/>`;
    if (f > 0) svg += `<text x="${x(f)}" y="${bottom + 28}" text-anchor="middle" font-size="12" fill="var(--muted)">${f}</text>`;
  }
  strings.forEach((s, i) => {
    svg += `<line x1="${nutX}" y1="${y(s)}" x2="${nutX + 12 * fw}" y2="${y(s)}" stroke="var(--string)" stroke-width="${1 + i * 0.6}"/>`;
    svg += `<text x="6" y="${y(s) + 4}" font-size="12" font-weight="700" fill="var(--muted)">${s}</text>`;
  });
  notes.forEach((n) => {
    svg += `<circle cx="${x(n.f)}" cy="${y(n.s)}" r="10" fill="${n.root ? "var(--accent)" : "var(--text)"}"/>`;
    svg += `<text x="${x(n.f)}" y="${y(n.s) + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--bg)">${esc(n.l)}</text>`;
  });
  return svg + "</svg>";
}

// ───────────── Etusivu ─────────────
function renderHome() {
  stopRunner();
  const done = doneCount();
  const next = nextDay();
  const nextData = PROGRAM[next - 1];
  const allDone = done === PROGRAM.length;

  let html = `
    <section class="hero">
      <h1>30 päivää bassoa</h1>
      <p class="muted">10–15 minuuttia päivässä. Aloitetaan perusteista ja edetään omiin bassolinjoihin.</p>
      <div class="stats">
        <div class="stat"><strong>${done}/30</strong><span>päivää tehty</span></div>
        <div class="stat"><strong>${streak()}</strong><span>päivän putki</span></div>
      </div>
      <div class="progress"><div style="width:${(done / PROGRAM.length) * 100}%"></div></div>
      ${
        allDone
          ? `<p>🎉 Koko ohjelma suoritettu! Voit tehdä päiviä uudelleen korkeammilla tempoilla.</p>`
          : `<a href="#/day/${next}"><button class="primary">${done ? "Jatka" : "Aloita"}: Päivä ${next} – ${esc(nextData.title)}</button></a>`
      }
    </section>`;

  for (const w of WEEKS) {
    html += `<h2>${esc(w.title)}</h2><div class="days">`;
    for (const d of PROGRAM.filter((p) => p.day >= w.days[0] && p.day <= w.days[1])) {
      const cls = isDone(d.day) ? "done" : d.day === next && !allDone ? "next" : "";
      html += `<a class="day-card ${cls}" href="#/day/${d.day}">
        <div class="num">Päivä ${d.day} · ${totalMinutes(d)} min</div>
        <div class="t">${esc(d.title)}</div></a>`;
    }
    html += "</div>";
  }

  if (done) {
    html += `<p style="margin-top:32px"><button id="reset" class="small">Nollaa edistyminen</button></p>`;
  }
  app.innerHTML = html;
  document.getElementById("reset")?.addEventListener("click", () => {
    if (confirm("Haluatko varmasti nollata kaiken edistymisen?")) {
      state.done = {};
      saveState();
      renderHome();
    }
  });
}

// ───────────── Päivänäkymä + ajastin ─────────────
let runner = null; // { day, idx, remaining, paused, timer }

function renderDay(n) {
  stopRunner();
  const day = PROGRAM[n - 1];
  if (!day) return renderHome();

  const prev = n > 1 ? `<a href="#/day/${n - 1}">← Päivä ${n - 1}</a>` : `<a href="#/">← Kaikki päivät</a>`;
  const next = n < PROGRAM.length ? `<a href="#/day/${n + 1}">Päivä ${n + 1} →</a>` : "<span></span>";

  let html = `
    <nav class="day-nav">${prev}<a href="#/">Kaikki päivät</a>${next}</nav>
    <div class="muted">Päivä ${day.day} / 30 · noin ${totalMinutes(day)} min</div>
    <h1>${esc(day.title)}</h1>
    <div class="goal"><strong>Tavoite:</strong> ${esc(day.goal)}</div>
    <div class="actions">
      <button class="primary" id="start">▶ Aloita harjoitus</button>
      <span id="done-slot"></span>
    </div>
    <div id="runner-slot"></div>`;

  day.exercises.forEach((ex, i) => {
    html += `
      <article class="exercise" id="ex-${i}">
        <div class="ex-head">
          <h3>${i + 1}. ${esc(ex.title)}</h3>
          <div class="ex-meta">
            <span>${ex.minutes} min</span>
            ${ex.bpm ? `<button data-bpm="${ex.bpm}" title="Aseta metronomi">♩ ${ex.bpm} bpm</button>` : ""}
          </div>
        </div>
        <p>${esc(ex.text)}</p>
        ${ex.fretboard ? fretboardSVG(ex.fretboard) : ""}
        ${ex.tab ? `<pre class="tab">${esc(ex.tab)}</pre>` : ""}
        ${ex.tips ? `<ul>${ex.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      </article>`;
  });

  html += `<div class="actions" style="margin-top:24px"><span id="done-slot-bottom"></span></div>`;
  app.innerHTML = html;
  renderDoneButtons(day);

  app.querySelectorAll("[data-bpm]").forEach((b) =>
    b.addEventListener("click", () => {
      metro.setBpm(+b.dataset.bpm);
      metro.start();
    })
  );
  document.getElementById("start").addEventListener("click", () => startRunner(day));
  window.scrollTo(0, 0);
}

function renderDoneButtons(day) {
  const btn = isDone(day.day)
    ? `<button id="undo-%">✓ Tehty ${new Date(state.done[day.day]).toLocaleDateString("fi-FI")} – peru</button>`
    : `<button class="done-btn" id="mark-%">Merkitse päivä tehdyksi</button>`;
  ["done-slot", "done-slot-bottom"].forEach((slot, i) => {
    const el = document.getElementById(slot);
    if (!el) return;
    el.innerHTML = btn.replace("%", i);
    el.querySelector("button").addEventListener("click", () => {
      if (isDone(day.day)) delete state.done[day.day];
      else state.done[day.day] = todayISO();
      saveState();
      renderDoneButtons(day);
    });
  });
}

function startRunner(day) {
  stopRunner();
  runner = { day, idx: 0, remaining: day.exercises[0].minutes * 60, paused: false, timer: null };
  enterExercise();
  runner.timer = setInterval(tick, 1000);
  renderRunner();
}

function enterExercise() {
  const ex = runner.day.exercises[runner.idx];
  runner.remaining = ex.minutes * 60;
  if (ex.bpm) metro.setBpm(ex.bpm);
  runner.day.exercises.forEach((_, i) => {
    const el = document.getElementById(`ex-${i}`);
    el.classList.toggle("active", i === runner.idx);
    el.classList.toggle("finished", i < runner.idx);
  });
  const el = document.getElementById(`ex-${runner.idx}`);
  const y = el.getBoundingClientRect().top + window.scrollY - (topbar.offsetHeight + 120);
  window.scrollTo({ top: y, behavior: "smooth" });
}

function tick() {
  if (!runner || runner.paused) return;
  runner.remaining--;
  if (runner.remaining <= 0) {
    goTo(runner.idx + 1);
    return;
  }
  renderRunner();
}

function goTo(idx) {
  const exs = runner.day.exercises;
  if (idx < 0) idx = 0;
  if (idx >= exs.length) return finishRunner();
  runner.idx = idx;
  beep(idx > 0 ? 880 : 660);
  enterExercise();
  renderRunner();
}

function renderRunner() {
  const slot = document.getElementById("runner-slot");
  if (!slot || !runner) return;
  const ex = runner.day.exercises[runner.idx];
  const pct = 100 - (runner.remaining / (ex.minutes * 60)) * 100;
  if (!slot.firstChild) {
    slot.innerHTML = `
      <div class="runner">
        <div class="time" id="r-time"></div>
        <div class="label" id="r-label"></div>
        <button id="r-prev" aria-label="Edellinen">⏮</button>
        <button id="r-pause"></button>
        <button id="r-next" aria-label="Seuraava">⏭</button>
        <button id="r-stop" aria-label="Lopeta">✕</button>
        <div class="bar"><div id="r-bar"></div></div>
      </div>`;
    document.getElementById("r-prev").onclick = () => goTo(runner.idx - 1);
    document.getElementById("r-next").onclick = () => goTo(runner.idx + 1);
    document.getElementById("r-pause").onclick = () => {
      runner.paused = !runner.paused;
      renderRunner();
    };
    document.getElementById("r-stop").onclick = () => {
      stopRunner();
      metro.stop();
    };
  }
  document.getElementById("r-time").textContent = fmtTime(runner.remaining);
  document.getElementById("r-label").innerHTML =
    `<small>Harjoitus ${runner.idx + 1}/${runner.day.exercises.length}${runner.paused ? " · tauolla" : ""}</small>${esc(ex.title)}`;
  document.getElementById("r-pause").textContent = runner.paused ? "▶ Jatka" : "⏸ Tauko";
  document.getElementById("r-bar").style.width = `${pct}%`;
}

function finishRunner() {
  const day = runner.day;
  stopRunner();
  metro.stop();
  beep(1320, 0.5);
  document.querySelectorAll(".exercise").forEach((e) => e.classList.add("finished"));
  if (!isDone(day.day)) {
    state.done[day.day] = todayISO();
    saveState();
    renderDoneButtons(day);
  }
  const slot = document.getElementById("runner-slot");
  slot.innerHTML = `
    <div class="celebrate">
      <strong>Hienoa – päivä ${day.day} tehty! 🎸</strong>
      <p>${day.day < PROGRAM.length ? `Huomenna vuorossa: <a href="#/day/${day.day + 1}">${esc(PROGRAM[day.day].title)}</a>` : "Koko 30 päivän ohjelma on nyt suoritettu!"}</p>
    </div>`;
  slot.scrollIntoView({ behavior: "smooth", block: "center" });
}

function stopRunner() {
  if (!runner) return;
  clearInterval(runner.timer);
  runner = null;
  const slot = document.getElementById("runner-slot");
  if (slot) slot.innerHTML = "";
  document.querySelectorAll(".exercise").forEach((e) => e.classList.remove("active", "finished"));
}

// ───────────── Reititys ─────────────
function route() {
  const m = location.hash.match(/^#\/day\/(\d+)$/);
  if (m) renderDay(+m[1]);
  else renderHome();
}
window.addEventListener("hashchange", route);
route();

// Yläpalkin korkeus ajastimen sticky-sijaintia varten (vaihtelee leveyden ja iPadin tilarivin mukaan)
const topbar = document.querySelector(".topbar");
const syncTopbar = () => document.documentElement.style.setProperty("--topbar-h", `${topbar.offsetHeight}px`);
new ResizeObserver(syncTopbar).observe(topbar);
syncTopbar();

// Offline-tuki: iPadin Koti-valikosta avattu sovellus toimii ilman verkkoa
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
