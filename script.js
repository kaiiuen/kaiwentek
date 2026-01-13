const systems = [
  {
    id: "k-neo-x1",
    name: "KaiwenTek Neo X1",
    price: 1599,
    cpu: "Ryzen 7 7800X3D",
    cpuSpeed: 5.0,
    cores: 8,
    boostClock: 5.0,
    gpu: "GeForce RTX 4070 Super",
    vram: 12,
    ram: 32,
    storage: 2000,
    wifi: true,
    npu: false,
    description: "Balanced 1440p gaming tower with airflow focus.",
  },
  {
    id: "k-studio-pro",
    name: "KaiwenTek Studio Pro",
    price: 2499,
    cpu: "Intel Core i9-14900K",
    cpuSpeed: 5.6,
    cores: 24,
    boostClock: 5.8,
    gpu: "GeForce RTX 4080 Super",
    vram: 16,
    ram: 64,
    storage: 4000,
    wifi: true,
    npu: false,
    description: "Creator build for 4K timelines and 3D renders.",
  },
  {
    id: "k-air-mini",
    name: "KaiwenTek Air Mini",
    price: 1099,
    cpu: "Ryzen 5 7600",
    cpuSpeed: 5.1,
    cores: 6,
    boostClock: 5.1,
    gpu: "Radeon RX 7700 XT",
    vram: 12,
    ram: 16,
    storage: 1000,
    wifi: true,
    npu: false,
    description: "Compact mATX build tuned for esports titles.",
  },
  {
    id: "k-ai-edge",
    name: "KaiwenTek AI Edge",
    price: 1899,
    cpu: "Intel Core Ultra 9 285H",
    cpuSpeed: 5.1,
    cores: 16,
    boostClock: 5.1,
    gpu: "GeForce RTX 4070",
    vram: 12,
    ram: 32,
    storage: 2000,
    wifi: true,
    npu: true,
    description: "AI-ready desktop with onboard NPU acceleration.",
  },
  {
    id: "k-silence-x",
    name: "KaiwenTek Silence X",
    price: 1399,
    cpu: "Intel Core i5-14600K",
    cpuSpeed: 5.3,
    cores: 14,
    boostClock: 5.3,
    gpu: "GeForce RTX 4060 Ti",
    vram: 16,
    ram: 32,
    storage: 2000,
    wifi: true,
    npu: false,
    description: "Quiet build with strong 1080p/1440p performance.",
  },
  {
    id: "k-render-max",
    name: "KaiwenTek Render Max",
    price: 2799,
    cpu: "Ryzen 9 7950X",
    cpuSpeed: 5.7,
    cores: 16,
    boostClock: 5.7,
    gpu: "Radeon RX 7900 XTX",
    vram: 24,
    ram: 64,
    storage: 4000,
    wifi: true,
    npu: false,
    description: "High-thread workstation for heavy renders.",
  },
  {
    id: "k-creator-slim",
    name: "KaiwenTek Creator Slim",
    price: 1699,
    cpu: "Intel Core i7-14700F",
    cpuSpeed: 5.4,
    cores: 20,
    boostClock: 5.4,
    gpu: "GeForce RTX 4070",
    vram: 12,
    ram: 32,
    storage: 2000,
    wifi: true,
    npu: false,
    description: "Slim ATX tower for creators and streamers.",
  },
  {
    id: "k-budget-g1",
    name: "KaiwenTek Budget G1",
    price: 899,
    cpu: "Ryzen 5 5600",
    cpuSpeed: 4.4,
    cores: 6,
    boostClock: 4.4,
    gpu: "GeForce RTX 3060",
    vram: 12,
    ram: 16,
    storage: 1000,
    wifi: false,
    npu: false,
    description: "Entry gaming PC ready for 1080p play.",
  },
];

const searchInput = document.querySelector("#search");
const cpuFilter = document.querySelector("#cpu-filter");
const gpuFilter = document.querySelector("#gpu-filter");
const wifiFilter = document.querySelector("#wifi-filter");
const npuFilter = document.querySelector("#npu-filter");
const ramRange = document.querySelector("#ram-range");
const ssdRange = document.querySelector("#ssd-range");
const cpuSpeedRange = document.querySelector("#cpu-speed-range");
const vramRange = document.querySelector("#vram-range");
const coreRange = document.querySelector("#core-range");
const clockRange = document.querySelector("#clock-range");
const ramValue = document.querySelector("#ram-value");
const ssdValue = document.querySelector("#ssd-value");
const cpuSpeedValue = document.querySelector("#cpu-speed-value");
const vramValue = document.querySelector("#vram-value");
const coreValue = document.querySelector("#core-value");
const clockValue = document.querySelector("#clock-value");
const cardsContainer = document.querySelector("#result-cards");
const matchCount = document.querySelector("#match-count");
const priceRange = document.querySelector("#price-range");
const resetFiltersBtn = document.querySelector("#reset-filters");
const activeChips = document.querySelector("#active-chips");

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function setSelectOptions(select, values, label) {
  const unique = Array.from(new Set(values));
  select.innerHTML = ["Any", ...unique]
    .map((value) => `<option value="${value === "Any" ? "" : value}">${value}</option>`)
    .join("");
  select.previousElementSibling?.querySelector?.("strong");
  select.setAttribute("aria-label", label);
}

function setRange(range, valueEl, values, step = 1) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  range.min = min;
  range.max = max;
  range.step = step;
  range.value = min;
  valueEl.textContent = range.value;
}

function renderCards(list) {
  if (!list.length) {
    cardsContainer.innerHTML = '<p class="empty">No computers match these filters yet.</p>';
    return;
  }

  cardsContainer.innerHTML = list
    .map((system) => {
      return `
        <article class="card" data-id="${system.id}">
          <div class="card__category">${system.cpu}</div>
          <h3 class="card__title">${system.name}</h3>
          <p>${system.description}</p>
          <div class="card__meta">
            <span>GPU: ${system.gpu} (${system.vram}GB)</span>
            <span>RAM: ${system.ram}GB</span>
            <span>SSD: ${system.storage}GB</span>
            <span>${system.cores} cores @ ${system.cpuSpeed.toFixed(1)}GHz</span>
            <span>Boost: ${system.boostClock.toFixed(1)}GHz</span>
            <span>${system.wifi ? "Wi‑Fi" : "No Wi‑Fi"}</span>
            <span>${system.npu ? "NPU ready" : "No NPU"}</span>
          </div>
          <div class="card__price">${formatPrice(system.price)}</div>
        </article>
      `;
    })
    .join("");
}

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const cpu = cpuFilter.value;
  const gpu = gpuFilter.value;
  const ramMin = Number(ramRange.value);
  const ssdMin = Number(ssdRange.value);
  const cpuSpeedMin = Number(cpuSpeedRange.value);
  const vramMin = Number(vramRange.value);
  const coresMin = Number(coreRange.value);
  const clockMin = Number(clockRange.value);

  const filtered = systems.filter((system) => {
    const matchesSearch = `${system.name} ${system.cpu} ${system.gpu}`.toLowerCase().includes(query);
    const matchesCpu = !cpu || system.cpu.includes(cpu);
    const matchesGpu = !gpu || system.gpu.includes(gpu);
    const matchesWifi = !wifiFilter.checked || system.wifi;
    const matchesNpu = !npuFilter.checked || system.npu;
    const matchesRam = system.ram >= ramMin;
    const matchesSsd = system.storage >= ssdMin;
    const matchesCpuSpeed = system.cpuSpeed >= cpuSpeedMin;
    const matchesVram = system.vram >= vramMin;
    const matchesCores = system.cores >= coresMin;
    const matchesClock = system.boostClock >= clockMin;

    return (
      matchesSearch &&
      matchesCpu &&
      matchesGpu &&
      matchesWifi &&
      matchesNpu &&
      matchesRam &&
      matchesSsd &&
      matchesCpuSpeed &&
      matchesVram &&
      matchesCores &&
      matchesClock
    );
  });

  renderCards(filtered);
  updateSummary(filtered);
  renderActiveChips();
}

function updateSummary(list) {
  matchCount.textContent = list.length;
  if (!list.length) {
    priceRange.textContent = "No price range";
    return;
  }
  const prices = list.map((item) => item.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  priceRange.textContent = low === high ? formatPrice(low) : `${formatPrice(low)} – ${formatPrice(high)}`;
}

function renderActiveChips() {
  const chips = [];
  if (cpuFilter.value) chips.push(`CPU: ${cpuFilter.value}`);
  if (gpuFilter.value) chips.push(`GPU: ${gpuFilter.value}`);
  if (wifiFilter.checked) chips.push("Wi‑Fi required");
  if (npuFilter.checked) chips.push("NPU required");
  chips.push(`RAM ≥ ${ramRange.value}GB`);
  chips.push(`SSD ≥ ${ssdRange.value}GB`);
  chips.push(`CPU ≥ ${cpuSpeedRange.value}GHz`);
  chips.push(`VRAM ≥ ${vramRange.value}GB`);
  chips.push(`Cores ≥ ${coreRange.value}`);
  chips.push(`Boost ≥ ${clockRange.value}GHz`);

  activeChips.innerHTML = chips.map((chip) => `<span class="chip">${chip}</span>`).join("");
}

function resetFilters() {
  searchInput.value = "";
  cpuFilter.value = "";
  gpuFilter.value = "";
  wifiFilter.checked = false;
  npuFilter.checked = false;
  ramRange.value = ramRange.min;
  ssdRange.value = ssdRange.min;
  cpuSpeedRange.value = cpuSpeedRange.min;
  vramRange.value = vramRange.min;
  coreRange.value = coreRange.min;
  clockRange.value = clockRange.min;
  syncRangeLabels();
  applyFilters();
}

function syncRangeLabels() {
  ramValue.textContent = `${ramRange.value}`;
  ssdValue.textContent = `${ssdRange.value}`;
  cpuSpeedValue.textContent = `${Number(cpuSpeedRange.value).toFixed(1)}`;
  vramValue.textContent = `${vramRange.value}`;
  coreValue.textContent = `${coreRange.value}`;
  clockValue.textContent = `${Number(clockRange.value).toFixed(1)}`;
}

function attachEvents() {
  [searchInput, cpuFilter, gpuFilter, wifiFilter, npuFilter].forEach((el) => {
    el.addEventListener("input", applyFilters);
    el.addEventListener("change", applyFilters);
  });

  [ramRange, ssdRange, cpuSpeedRange, vramRange, coreRange, clockRange].forEach((el) => {
    el.addEventListener("input", () => {
      syncRangeLabels();
      applyFilters();
    });
  });

  resetFiltersBtn.addEventListener("click", resetFilters);
}

function initFilters() {
  setSelectOptions(cpuFilter, systems.map((s) => s.cpu), "CPU filter");
  setSelectOptions(gpuFilter, systems.map((s) => s.gpu), "GPU filter");
  setRange(ramRange, ramValue, systems.map((s) => s.ram));
  setRange(ssdRange, ssdValue, systems.map((s) => s.storage));
  setRange(cpuSpeedRange, cpuSpeedValue, systems.map((s) => s.cpuSpeed), 0.1);
  setRange(vramRange, vramValue, systems.map((s) => s.vram));
  setRange(coreRange, coreValue, systems.map((s) => s.cores));
  setRange(clockRange, clockValue, systems.map((s) => s.boostClock), 0.1);
  syncRangeLabels();
}

function init() {
  initFilters();
  attachEvents();
  applyFilters();
}

init();
