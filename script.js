const parts = [
  {
    id: "cpu-1",
    name: "Ryzen 7 7800X3D",
    category: "CPU",
    price: 399,
    rating: 4.9,
    watts: 120,
    socket: "AM5",
    description: "8 cores tuned for gaming with 3D V-Cache",
    tags: ["AM5", "Gaming", "PCIe 5.0"],
  },
  {
    id: "cpu-2",
    name: "Intel Core i7-14700K",
    category: "CPU",
    price: 419,
    rating: 4.8,
    watts: 155,
    socket: "LGA1700",
    description: "20 cores with strong single-thread performance",
    tags: ["LGA1700", "DDR4/DDR5", "PCIe 5.0"],
  },
  {
    id: "gpu-1",
    name: "GeForce RTX 4070 Super",
    category: "GPU",
    price: 579,
    rating: 4.7,
    watts: 220,
    description: "4K-ready graphics with DLSS 3",
    tags: ["12GB", "DLSS 3", "PCIe 4.0"],
  },
  {
    id: "gpu-2",
    name: "Radeon RX 7800 XT",
    category: "GPU",
    price: 499,
    rating: 4.6,
    watts: 260,
    description: "1440p powerhouse with efficient RDNA3",
    tags: ["16GB", "RDNA3", "PCIe 4.0"],
  },
  {
    id: "mb-1",
    name: "ASUS ROG Strix X670E-A",
    category: "Motherboard",
    price: 349,
    rating: 4.7,
    watts: 60,
    socket: "AM5",
    formFactor: "ATX",
    description: "PCIe 5.0 lanes, Wi-Fi 6E, and strong VRMs",
    tags: ["Wi-Fi 6E", "ATX", "USB-C"],
  },
  {
    id: "mb-2",
    name: "MSI MAG Z790 Tomahawk",
    category: "Motherboard",
    price: 299,
    rating: 4.6,
    watts: 55,
    socket: "LGA1700",
    formFactor: "ATX",
    description: "DDR5 support and PCIe 5.0 for next-gen GPUs",
    tags: ["DDR5", "ATX", "USB-C"],
  },
  {
    id: "ram-1",
    name: "Corsair Vengeance RGB 32GB (2x16) DDR5-6000",
    category: "Memory",
    price: 129,
    rating: 4.8,
    watts: 12,
    description: "Fast DDR5 kit with tight timings",
    tags: ["DDR5", "6000MHz"],
  },
  {
    id: "ram-2",
    name: "G.Skill Ripjaws S5 32GB (2x16) DDR5-5600",
    category: "Memory",
    price: 119,
    rating: 4.7,
    watts: 10,
    description: "Low-profile kit great for air coolers",
    tags: ["DDR5", "5600MHz"],
  },
  {
    id: "storage-1",
    name: "Samsung 990 Pro 2TB NVMe",
    category: "Storage",
    price: 189,
    rating: 4.9,
    watts: 8,
    description: "Blazing PCIe 4.0 speeds for quick loads",
    tags: ["PCIe 4.0", "2TB"],
  },
  {
    id: "storage-2",
    name: "Solidigm P44 Pro 1TB NVMe",
    category: "Storage",
    price: 89,
    rating: 4.7,
    watts: 6,
    description: "Strong sustained performance and efficiency",
    tags: ["PCIe 4.0", "1TB"],
  },
  {
    id: "psu-1",
    name: "Corsair RM850e 850W 80+ Gold",
    category: "PSU",
    price: 129,
    rating: 4.8,
    watts: -850,
    description: "Fully modular with quiet fan profile",
    tags: ["ATX 3.0", "80+ Gold"],
  },
  {
    id: "psu-2",
    name: "Seasonic Focus GX 750W 80+ Gold",
    category: "PSU",
    price: 119,
    rating: 4.8,
    watts: -750,
    description: "Compact design with high reliability",
    tags: ["ATX", "80+ Gold"],
  },
  {
    id: "case-1",
    name: "Lian Li Lancool 216",
    category: "Case",
    price: 109,
    rating: 4.7,
    watts: 0,
    formFactor: "ATX",
    description: "Airflow focused with RGB front fans",
    tags: ["ATX", "Airflow"],
  },
  {
    id: "case-2",
    name: "Fractal North",
    category: "Case",
    price: 139,
    rating: 4.8,
    watts: 0,
    formFactor: "ATX",
    description: "Wood-accented front with great thermals",
    tags: ["ATX", "Airflow"],
  },
  {
    id: "cooler-1",
    name: "Noctua NH-D15 chromax.black",
    category: "Cooling",
    price: 109,
    rating: 4.9,
    watts: 5,
    description: "Legendary air cooler with quiet operation",
    tags: ["Air", "Dual tower"],
  },
  {
    id: "cooler-2",
    name: "Arctic Liquid Freezer II 360",
    category: "Cooling",
    price: 129,
    rating: 4.8,
    watts: 7,
    description: "Efficient AIO with VRM fan",
    tags: ["AIO", "360mm"],
  },
  {
    id: "monitor-1",
    name: "LG 27GR95QE-B 27\" OLED",
    category: "Monitor",
    price: 899,
    rating: 4.9,
    watts: 48,
    description: "240Hz OLED panel with stunning contrast",
    tags: ["1440p", "240Hz", "OLED"],
  },
  {
    id: "monitor-2",
    name: "Gigabyte M27Q X 27\" QHD",
    category: "Monitor",
    price: 429,
    rating: 4.6,
    watts: 40,
    description: "High refresh IPS with great value",
    tags: ["1440p", "240Hz"],
  },
];

const categories = [
  "All",
  "CPU",
  "GPU",
  "Motherboard",
  "Memory",
  "Storage",
  "PSU",
  "Case",
  "Cooling",
  "Monitor",
];

const selectedParts = {};
const buildContainer = document.querySelector("#build-summary");
const cardsContainer = document.querySelector("#catalog-cards");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#search");
const heroTotal = document.querySelector("#hero-total");
const heroWatts = document.querySelector("#hero-watts");
const heroChips = document.querySelector("#hero-chips");
const compatMessage = document.querySelector("#compat-message");
const resetButton = document.querySelector("#reset-build");

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function renderFilters() {
  categoryFilter.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

function cardMarkup(part) {
  const chipList = part.tags.map((tag) => `<span>${tag}</span>`).join("");
  return `
    <article class="card" data-category="${part.category}" data-id="${part.id}">
      <div class="card__category">${part.category}</div>
      <h3 class="card__title">${part.name}</h3>
      <p>${part.description}</p>
      <div class="card__meta">
        ${chipList}
        <span>⭐ ${part.rating.toFixed(1)}</span>
        <span>${part.watts > 0 ? `${part.watts}W draw` : `${Math.abs(part.watts)}W capacity`}</span>
      </div>
      <div class="card__price">${formatPrice(part.price)}</div>
      <button class="cta" type="button">Add to build</button>
    </article>
  `;
}

function renderCards() {
  const query = searchInput.value.toLowerCase();
  const activeCategory = categoryFilter.value;

  const filtered = parts.filter((part) => {
    const matchesCategory = activeCategory === "All" || part.category === activeCategory;
    const matchesQuery = `${part.name} ${part.description} ${part.tags.join(" ")}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  cardsContainer.innerHTML = filtered.map((part) => cardMarkup(part)).join("");
}

function renderBuild() {
  buildContainer.innerHTML = categories
    .filter((c) => c !== "All")
    .map((category) => {
      const part = selectedParts[category];
      if (!part) {
        return `
          <div class="build-row">
            <div class="build-row__header">
              <h4 class="build-row__title">${category}</h4>
              <span class="build-row__price">—</span>
            </div>
            <p class="build-row__empty">Pick a ${category.toLowerCase()} to add it to your KaiwenTek build.</p>
          </div>
        `;
      }

      return `
        <div class="build-row">
          <div class="build-row__header">
            <h4 class="build-row__title">${category}</h4>
            <span class="build-row__price">${formatPrice(part.price)}</span>
          </div>
          <p>${part.name}</p>
          <div class="card__meta">
            ${part.tags.map((tag) => `<span>${tag}</span>`).join("")}
            <span>⭐ ${part.rating.toFixed(1)}</span>
            <span>${part.watts > 0 ? `${part.watts}W draw` : `${Math.abs(part.watts)}W capacity`}</span>
          </div>
          <button class="ghost" type="button" data-remove="${part.id}">Remove</button>
        </div>
      `;
    })
    .join("");

  updateTotals();
  renderHeroChips();
  renderCompatibility();
}

function renderHeroChips() {
  const chips = Object.values(selectedParts)
    .map((part) => `<span class="chip">${part.category}: ${part.name}</span>`)
    .join("");

  heroChips.innerHTML = chips || '<span class="chip">No parts yet</span>';
}

function updateTotals() {
  const total = Object.values(selectedParts).reduce((sum, part) => sum + part.price, 0);
  const watts = Object.values(selectedParts).reduce((sum, part) => sum + Math.max(part.watts, 0), 0);
  heroTotal.textContent = formatPrice(total);
  heroWatts.textContent = `${watts}W estimated draw`;
}

function renderCompatibility() {
  const psu = Object.values(selectedParts).find((part) => part.category === "PSU");
  const totalDraw = Object.values(selectedParts).reduce((sum, part) => sum + Math.max(part.watts, 0), 0);
  let status = "Great: Your current picks look balanced.";
  let tone = "good";

  if (psu) {
    const capacity = Math.abs(psu.watts);
    if (totalDraw > capacity) {
      status = `Warning: Estimated ${totalDraw}W draw exceeds PSU capacity (${capacity}W).`;
      tone = "warn";
    } else if (totalDraw > capacity * 0.8) {
      status = `Heads up: ${totalDraw}W draw is close to PSU limit (${capacity}W).`;
      tone = "info";
    }
  }

  compatMessage.innerHTML = `<span class="compat__status">${tone === "good" ? "✓" : "⚠"}</span> ${status}`;
  compatMessage.dataset.tone = tone;
}

function attachEvents() {
  cardsContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const card = target.closest(".card");
      const part = parts.find((item) => item.id === card.dataset.id);
      selectedParts[part.category] = part;
      renderBuild();
      window.scrollTo({ top: document.querySelector("#builder").offsetTop - 70, behavior: "smooth" });
    }
  });

  buildContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-remove]");
    if (button) {
      const partId = button.dataset.remove;
      const part = parts.find((item) => item.id === partId);
      if (part) {
        delete selectedParts[part.category];
        renderBuild();
      }
    }
  });

  categoryFilter.addEventListener("change", renderCards);
  searchInput.addEventListener("input", renderCards);

  resetButton.addEventListener("click", () => {
    Object.keys(selectedParts).forEach((key) => delete selectedParts[key]);
    renderBuild();
  });
}

function init() {
  renderFilters();
  renderCards();
  renderBuild();
  attachEvents();
}

init();
