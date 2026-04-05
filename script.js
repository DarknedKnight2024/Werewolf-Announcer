// -------------------------
// DOM Helpers
// -------------------------
function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function isSelected(roleName) {
  const card = qs(`.role-card[data-role="${roleName}"]`);
  return card?.classList.contains("selected") ?? false;
}

// -------------------------
// Sidebar Rendering Helpers
// -------------------------
function clearSidebar() {
  qs("#sidebar-sections").innerHTML = "";
}

function addPhaseLabel(text) {
  const container = qs("#sidebar-sections");
  const label = document.createElement("div");
  label.className = "phase-label";
  label.textContent = text;
  container.appendChild(label);
}

function addSidebarItem(code, label) {
  const container = qs("#sidebar-sections");
  const row = document.createElement("div");
  row.className = "sidebar-item";

  const labelSpan = document.createElement("span");
  labelSpan.className = "sidebar-item-label";
  labelSpan.textContent = label;

  const codeSpan = document.createElement("span");
  codeSpan.className = "sidebar-item-code";
  codeSpan.textContent = code;

  row.appendChild(labelSpan);
  row.appendChild(codeSpan);
  container.appendChild(row);
}

function dusk(code, label) { addSidebarItem(code, label); }
function night(code, label) { addSidebarItem(code, label); }
function day(code, label) { addSidebarItem(code, label); }

// -------------------------
// Canonical Dusk/Night/Day Engine
// -------------------------
function updateSidebar() {
  clearSidebar();

  // ===== DUSK =====
  addPhaseLabel("Dusk");

  // 00 Lovers (Cupid / Lovers)
  if (isSelected("Cupid") || isSelected("Lovers")) {
    dusk("00", "Lovers");
  }

  // v1‑B Apprentice Assassin
  if (isSelected("Apprentice Assassin")) {
    dusk("v1-B", "Apprentice Assassin");
  }

  // Copycat
  if (isSelected("Copycat")) {
    dusk("C1", "Copycat");
  }

  // Doppelgänger
  if (isSelected("Doppelganger")) {
    dusk("D1", "Doppelgänger");
  }

  // Oracle (dusk peek)
  if (isSelected("Oracle")) {
    dusk("O1", "Oracle (dusk peek)");
  }

  // Randomizer
  if (isSelected("Randomizer")) {
    dusk("R1", "Randomizer");
  }

  // ===== NIGHT =====
  addPhaseLabel("Night");

  // 1‑A Alien Slash Group
  const alienGroup = [];
  if (isSelected("Alien")) alienGroup.push("Alien");
  if (isSelected("Synthetic Alien")) alienGroup.push("Synthetic Alien");
  if (isSelected("Groob")) alienGroup.push("Groob");
  if (isSelected("Zerb")) alienGroup.push("Zerb");
  if (isSelected("Body Snatcher")) alienGroup.push("Body Snatcher");

  if (alienGroup.length > 0) {
    night("1-A", alienGroup.join(" / "));
  }

  // 2 Werewolf Slash Group
  const wolfGroup = [];
  if (isSelected("Werewolf")) wolfGroup.push("Werewolf");
  if (isSelected("Alpha Wolf")) wolfGroup.push("Alpha Wolf");
  if (isSelected("Mystic Wolf")) wolfGroup.push("Mystic Wolf");
  if (isSelected("Dream Wolf")) wolfGroup.push("Dream Wolf");

  if (wolfGroup.length > 0) {
    night("2", wolfGroup.join(" / "));
  }

  // 2‑B Alpha Wolf
  if (isSelected("Alpha Wolf")) {
    night("2-B", "Alpha Wolf");
  }

  // 2‑C Mystic Wolf
  if (isSelected("Mystic Wolf")) {
    night("2-C", "Mystic Wolf");
  }

  // Dream Wolf (thumb only)
  if (isSelected("Dream Wolf")) {
    night("(DW)", "Dream Wolf (thumb only)");
  }

  // 3 Vampires
  if (isSelected("Vampire")) {
    night("3", "Vampires");
  }

  // 3‑B Renfield
  if (isSelected("Renfield")) {
    night("3-B", "Renfield");
  }

  // 4 Oracle (night)
  if (isSelected("Oracle")) {
    night("4", "Oracle");
  }

  // 5 Seer
  if (isSelected("Seer")) {
    night("5", "Seer");
  }

  // 5‑B Apprentice Seer
  if (isSelected("Apprentice Seer")) {
    night("5-B", "Apprentice Seer");
  }

  // 5‑C Paranormal Investigator
  if (isSelected("Paranormal Investigator")) {
    night("5-C", "Paranormal Investigator");
  }

  // 6 Robber
  if (isSelected("Robber")) {
    night("6", "Robber");
  }

  // 7 Troublemaker
  if (isSelected("Troublemaker")) {
    night("7", "Troublemaker");
  }

  // 8 Drunk
  if (isSelected("Drunk")) {
    night("8", "Drunk");
  }

  // 9 Insomniac
  if (isSelected("Insomniac")) {
    night("9", "Insomniac");
  }

  // 10 Super Villain
  if (isSelected("Super Villain")) {
    night("10", "Super Villain");
  }

  // ===== DAY =====
  addPhaseLabel("Day");
  day("D", "Discussion & Vote");
}

// -------------------------
// Tabs + Selection Wiring
// -------------------------
function setupTabs() {
  const buttons = qsa(".tab-button");
  const panels = qsa(".tab-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      buttons.forEach(b => b.classList.toggle("active", b === btn));
      panels.forEach(p => {
        p.classList.toggle("active", p.dataset.tabPanel === tab);
      });
    });
  });
}

function setupRoleSelection() {
  qsa(".role-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
      updateSidebar();
    });
  });
}

// -------------------------
// Init
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupRoleSelection();
  updateSidebar();
});
