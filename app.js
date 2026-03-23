const STORAGE_KEY = "lau-study-center-state";
const LETTERS = ["A", "B", "C", "D"];
const data = window.LAU_STUDY_DATA;
const rulebookReaderData = window.LAU_RULEBOOK_READER || { entries: [] };

const OFFICIAL_RULEBOOK_TEXT = {
  "1-3-1": "The ball shall meet the current NOCSAE standard for baseballs at the time of manufacture and is required on balls that will be used in high school competition. The SEI/NOCSAE mark is required on all balls that meet the NOCSAE standard that will be used in high school competition. A minimum of three umpire-approved baseballs shall be provided to start the game. Unless otherwise mutually agreed upon, the home team has this responsibility. No less than two baseballs shall be used to complete a game. The NFHS Authenticating Mark is required on all balls that will be used in high school competition.",
  "1-3-2": "Bats that are altered from the manufacturer's original design and production, or that do not meet the rule specifications, are illegal. No artificial or intentional means shall be used to control the temperature of the bat. Resin, pine tar or any other drying agent to enhance the hold are permitted on the bat, not to exceed beyond 18 inches from the base of the knob. Molded grips are illegal.",
  "3-1-1": "After the lineup cards are official prior to the game, the player listed as pitcher shall pitch until the first opposing batter has been put out or has advanced to first base. In any other case, a substitute may replace a player when the ball is dead and time has been called.",
  "3-1-4": "A hitter may be designated for any one starting player and all subsequent substitutes for that player in the game. A designated hitter for said player shall be selected prior to the start of the game, and the player's name shall be included on the lineup cards presented to the umpire-in-chief and to the official scorer. A team forfeits the use of a designated hitter if it fails to declare a designated hitter prior to the game.",
  "1-6-2": "A coach may use a one-way electronic communication device to communicate to the catcher for the purpose of calling pitches. Coaches may not use electronic communication device(s) to communicate with any other team member while on defense or any team member while on offense. When using the electronic communication device, the coach cannot be outside the dugout/bench area.",
  "2-9-1": "A catch is the act of a fielder in getting secure possession in the hand or glove of a live ball in flight and firmly holding it, provided the fielder does not use the cap, protector, mask, pocket or other part of the uniform to trap the ball. The catch of a fly ball by a fielder is not completed until the continuing action of the catch is completed.",
  "2-16-1": "A foul ball is a batted ball that settles on foul territory between home and first base or between home and third base; bounds past first or third base on or over foul territory; first falls on foul territory beyond first or third base; while on or over foul ground, touches an umpire, a player or any object foreign to the natural ground; or while over foul territory, passes out of the playing field in flight.",
  "2-20-2": "A half-inning is the interval during which one team is on offense and the other is on defense. A half-inning ends when there is a third out or when, in the last inning, the winning run is scored. If there is a delayed out declared by the umpire for a baserunning infraction, a possible fourth out may be recognized.",
  "2-21-4": "Follow-through interference is when the bat hits the catcher after the batter has swung at a pitch and hinders action at home plate or the catcher's attempt to play on a runner.",
  "2-21-5": "Backswing interference is when a batter contacts the catcher or the catcher's equipment prior to the time of the pitch.",
  "3-3-4": "Whenever team members are loosening up in an area which is not protected by a fence or other structure, another member of the team with a glove must be positioned between them and the batter to protect them from a batted or thrown ball within the confines of the field.",
  "3-2-2": "No coach shall physically assist a runner during playing action.",
  "3-4-1": "Each team, when on defense, may be granted not more than three charged conferences during a seven-inning game, without penalty, to permit coaches or their non-playing representatives to confer with a defensive player or players. In an extra inning game, each team shall be permitted one charged conference per inning without penalty.",
  "4-1-3": "Before game time, the home team and then the visiting team shall deliver their respective batting orders in duplicate to the umpire-in-chief. The umpire then shall permit inspection by both head coaches and/or captains if available. Prior to the start of the game, the umpire-in-chief shall receive verification from each head coach that the team's participants are properly equipped in accordance with NFHS rules.",
  "4-4-1": "A game shall be forfeited to the offended team by the umpire when a team is late in appearing or in beginning play after the umpire calls play; refuses to continue play after the game has started; delays more than a reasonable amount of time in resuming play; persists in tactics designed to delay or shorten the game; willfully and persistently violates any of the rules after being warned by the umpire; or is unable to provide at least nine players to start the game or eight players to finish the game.",
  "5-1-1": "Ball becomes dead immediately when a pitch touches a batter or the batter's clothing, a runner, the ball is illegally batted or intentionally struck a second time with the bat, the batter enters the batter's box with an illegal bat, there is a foul ball, or there is interference by a runner, batter-runner, retired runner, batter, or by any person as provided by rule.",
  "10-2-3": "The umpire-in-chief's duties include those listed in 10-2-1, 10-2-2 and the following: inspecting bats, balls, helmets, catcher's equipment and uniforms; receiving the batting orders from the captains and informing both teams of any special ground rules; being in sole possession of the game ball; and calling illegal pitches and balks.",
  "5-1-2": "It is a delayed dead ball when there is interference by a batter; when the batter interferes with the catcher attempting to play on a runner if an out does not result at the end of the catcher's throw; when a catcher or any fielder obstructs a batter or runner; when the umpire interferes with the catcher attempting to throw; when offensive personnel try to cause the pitcher to balk; or when a ball touches an illegal glove or mitt.",
  "5-1-4": "When the ball is in play, it remains live until a dead ball situation occurs, time is called, or the ball becomes dead under another rule.",
  "7-1-1": "Each player of the team at bat shall become the batter and shall take a position within a batter's box, on either side of home plate, in the order in which each player's name appears on the lineup card as delivered to the umpire prior to the game. This order shall be followed during the entire game except that an entering substitute shall take the replaced player's place in the batting order.",
  "8-4-2": "A runner is out when the runner runs more than three feet away from a direct line between bases to avoid being tagged; physically passes a preceding runner before that runner is out; misses a base and is properly appealed; leaves a base too soon on a caught fly ball and is properly appealed; fails to slide legally or avoid a fielder on a force play; intentionally interferes with a throw or thrown ball; or commits any other baserunning infraction covered by Rule 8-4-2.",
  "8-4-1": "The batter-runner is out when the batter-runner interferes with the catcher or a fielder, intentionally drops a fair fly, bunts foul on third strike, uses an illegal bat, or commits another infraction listed in Rule 8-4-1.",
  "8-2-8": "A runner who has retouched a base while the ball is dead is not required to retouch after the ball again becomes live unless forced to advance by the batter becoming a runner.",
  "9-1-1": "A runner scores one run each time the runner legally advances to and touches first, second, third and then home plate before there are three outs to end the inning. A run is not scored if the third out is by the batter-runner before first base, by a force out, or by appeal on a preceding runner for missing a base or leaving too soon on a caught fly ball."
};

if (!data) {
  throw new Error("LAU study data failed to load.");
}

const statQuestionCount = document.querySelector("#stat-question-count");
const statAnsweredCount = document.querySelector("#stat-answered-count");
const statAccuracy = document.querySelector("#stat-accuracy");
const statMissedCount = document.querySelector("#stat-missed-count");
const modeRow = document.querySelector("#mode-row");
const sectionFilter = document.querySelector("#section-filter");
const startExamButton = document.querySelector("#start-exam-button");
const examSectionPill = document.querySelector("#exam-section-pill");
const examProgressCopy = document.querySelector("#exam-progress-copy");
const examProgressBar = document.querySelector("#exam-progress-bar");
const questionShell = document.querySelector("#question-shell");
const studySearch = document.querySelector("#study-search");
const studyChipRow = document.querySelector("#study-chip-row");
const studyResultsCount = document.querySelector("#study-results-count");
const clearStudyFiltersButton = document.querySelector("#clear-study-filters");
const studyList = document.querySelector("#study-list");
const ruleGrid = document.querySelector("#rule-grid");
const ruleReaderModal = document.querySelector("#rule-reader-modal");
const ruleReaderKicker = document.querySelector("#rule-reader-kicker");
const ruleReaderTitle = document.querySelector("#rule-reader-title");
const ruleReaderSource = document.querySelector("#rule-reader-source");
const ruleReaderNav = document.querySelector("#rule-reader-nav");
const ruleReaderBody = document.querySelector("#rule-reader-body");
const ruleReaderStudyLink = document.querySelector("#rule-reader-study-link");
const ruleReaderCloseButton = document.querySelector(".rule-reader-close");

const safeQuestions = Array.isArray(data.questions) ? data.questions : [];
const safeRuleSections = Array.isArray(data.ruleSections) && data.ruleSections.length
  ? data.ruleSections
  : buildFallbackRuleSections(safeQuestions);
const sections = ["All", ...safeRuleSections.map((section) => section.label)];
const rulebookEntriesByLabel = new Map(
  (Array.isArray(rulebookReaderData.entries) ? rulebookReaderData.entries : []).map((entry) => [entry.label, entry])
);

const state = loadState();
let activeMode = "full";
let studyFilter = "All";
let studyQuery = "";
let currentSession = null;
let openRuleReaderLabel = "";

initialize();

function initialize() {
  statQuestionCount.textContent = String(data.meta?.questionCount || safeQuestions.length);
  renderSectionFilter();
  renderStudyChips();
  renderRulebookHub();
  bindEvents();
  renderStudyList();
  renderStats();
}

function bindEvents() {
  modeRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mode]");
    if (!button) {
      return;
    }

    activeMode = button.dataset.mode;
    syncModeButtons();
  });

  startExamButton.addEventListener("click", () => {
    startSession();
  });

  studySearch.addEventListener("input", () => {
    studyQuery = studySearch.value.trim().toLowerCase();
    renderStudyList();
  });

  studyChipRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chip]");
    if (!button) {
      return;
    }

    studyFilter = button.dataset.chip;
    renderStudyChips();
    renderStudyList();
  });

  clearStudyFiltersButton.addEventListener("click", () => {
    studyFilter = "All";
    studyQuery = "";
    studySearch.value = "";
    renderStudyChips();
    renderStudyList();
  });

  studyList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-study-choice]");
    if (choiceButton) {
      const card = choiceButton.closest("[data-study-question]");
      if (!card || card.dataset.answered === "true") {
        return;
      }

      const questionNumber = Number(card.dataset.studyQuestion);
      const selectedIndex = Number(choiceButton.dataset.studyChoice);
      const question = findQuestion(questionNumber);

      if (question) {
        handleStudyChoice(card, question, selectedIndex);
      }
      return;
    }

    const button = event.target.closest("[data-launch-rule]");
    if (!button) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const section = button.dataset.launchRule;
    sectionFilter.value = section;
    activeMode = "quick";
    syncModeButtons();
    window.location.hash = "exam-center";
    startSession();
  });

  ruleGrid.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-rulebook]");
    if (openButton) {
      openRuleReader(openButton.dataset.openRulebook);
      return;
    }

    const button = event.target.closest("[data-rule-filter]");
    if (!button) {
      return;
    }

    const section = button.dataset.ruleFilter;
    studyFilter = section;
    renderStudyChips();
    renderStudyList();
    sectionFilter.value = section;
    window.location.hash = "study-center";
  });

  if (ruleReaderModal) {
    ruleReaderModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-reader]")) {
        closeRuleReader();
      }
    });
  }

  if (ruleReaderNav && ruleReaderBody) {
    ruleReaderNav.addEventListener("click", (event) => {
      const link = event.target.closest(".rule-reader-nav-link");
      if (!link) {
        return;
      }

      event.preventDefault();

      const targetId = link.getAttribute("href");
      const target = targetId ? ruleReaderBody.querySelector(targetId) : null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (ruleReaderStudyLink) {
    ruleReaderStudyLink.addEventListener("click", () => {
      if (!openRuleReaderLabel) {
        return;
      }

      studyFilter = openRuleReaderLabel;
      renderStudyChips();
      renderStudyList();
      window.location.hash = "study-center";
      closeRuleReader();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !ruleReaderModal?.hidden) {
      closeRuleReader();
    }
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      answered: saved.answered || {},
      missedQuestionIds: saved.missedQuestionIds || [],
      examHistory: saved.examHistory || [],
    };
  } catch {
    return {
      answered: {},
      missedQuestionIds: [],
      examHistory: [],
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderSectionFilter() {
  sectionFilter.innerHTML = sections
    .map((section) => `<option value="${escapeAttribute(section)}">${escapeHtml(section)}</option>`)
    .join("");
}

function renderStudyChips() {
  studyChipRow.innerHTML = sections
    .map((section) => {
      const activeClass = section === studyFilter ? "chip-button is-active" : "chip-button";
      return `<button type="button" class="${activeClass}" data-chip="${escapeAttribute(section)}">${escapeHtml(section)}</button>`;
    })
    .join("");
}

function renderRulebookHub() {
  ruleGrid.innerHTML = "";

  safeRuleSections.forEach((section) => {
    const card = document.createElement("article");
    card.className = `rule-card${section.label === studyFilter ? " is-active" : ""}`;
    card.innerHTML = `
      <div>
        <p class="section-label">${escapeHtml(section.label)}</p>
        <h3>${escapeHtml(section.title)}</h3>
      </div>
      <div class="rule-meta">
        <span class="pill">${escapeHtml(section.questionCount)} study questions</span>
        <span class="pill muted-pill">Starts on page ${escapeHtml(section.page)}</span>
      </div>
      <p>${escapeHtml(section.summary)}</p>
      <button type="button" class="rule-link" data-open-rulebook="${escapeAttribute(section.label)}">Study This Rule</button>
    `;
    ruleGrid.append(card);
  });
}

function openRuleReader(label) {
  const entry = rulebookEntriesByLabel.get(label);
  const section = safeRuleSections.find((item) => item.label === label);

  if (
    !entry ||
    !ruleReaderModal ||
    !ruleReaderBody ||
    !ruleReaderTitle ||
    !ruleReaderSource ||
    !ruleReaderNav ||
    !ruleReaderKicker ||
    !ruleReaderStudyLink
  ) {
    return;
  }

  openRuleReaderLabel = label;
  ruleReaderKicker.textContent = label;
  ruleReaderTitle.textContent = section?.title || label;
  ruleReaderSource.textContent = label.startsWith("Rule ")
    ? `Official 2025 NFHS Baseball Rules text${section?.page ? ` · Starts on page ${section.page}` : ""}`
    : "Supplemental local section text";
  ruleReaderStudyLink.hidden = !safeQuestions.some((question) => question.section === label);

  const rendered = renderRuleReaderContent(entry.text);
  ruleReaderNav.innerHTML = rendered.navHtml || '<p class="rule-reader-empty">Use the scrollable reader to move through this section.</p>';
  ruleReaderBody.innerHTML = rendered.bodyHtml;
  ruleReaderBody.scrollTop = 0;
  ruleReaderModal.hidden = false;
  document.body.classList.add("is-reader-open");
  ruleReaderCloseButton?.focus();
}

function closeRuleReader() {
  if (!ruleReaderModal) {
    return;
  }

  openRuleReaderLabel = "";
  ruleReaderModal.hidden = true;
  document.body.classList.remove("is-reader-open");
}

function renderRuleReaderContent(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line.replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const navItems = [];
  const bodyParts = [];
  let sectionIndex = 0;

  lines.forEach((line) => {
    if (/^SECTION\s+\d+/i.test(line)) {
      sectionIndex += 1;
      const sectionId = `rule-reader-section-${sectionIndex}`;
      navItems.push(`<a href="#${sectionId}" class="rule-reader-nav-link">${escapeHtml(line)}</a>`);
      bodyParts.push(`<h3 class="rule-reader-section-title" id="${sectionId}">${escapeHtml(line)}</h3>`);
      return;
    }

    if (/^Rule\b/i.test(line)) {
      bodyParts.push(`<p class="rule-reader-rule-label">${escapeHtml(line)}</p>`);
      return;
    }

    if (/^(ART\.|PENALTY:|NOTE:|NOTES:|EXCEPTION:)/i.test(line)) {
      bodyParts.push(`<p class="rule-reader-paragraph rule-reader-emphasis">${escapeHtml(line)}</p>`);
      return;
    }

    if (/^[•\-]/.test(line)) {
      bodyParts.push(`<p class="rule-reader-paragraph rule-reader-bullet">${escapeHtml(line)}</p>`);
      return;
    }

    bodyParts.push(`<p class="rule-reader-paragraph">${escapeHtml(line)}</p>`);
  });

  return {
    navHtml: navItems.join(""),
    bodyHtml: bodyParts.join(""),
  };
}

function getPageLabel(question) {
  if (!question.reference) {
    return "";
  }

  const matchingSection = safeRuleSections.find((section) => section.label === question.section);
  if (!matchingSection || !matchingSection.page) {
    return "";
  }

  return `Page ${matchingSection.page}`;
}

function getRuleSummary(question) {
  const matchingSection = safeRuleSections.find((section) => section.label === question.section);
  if (matchingSection && matchingSection.summary) {
    return matchingSection.summary;
  }

  if (question.section === "Mechanics") {
    return "This question covers umpire mechanics, positioning, rotations, or crew responsibilities from the LAU/NFHS study material.";
  }

  if (question.section === "LAU Adoption") {
    return "This question covers LAU or City Section local policy rather than the base NFHS rulebook language.";
  }

  return "This question is tied to the cited rule area in the 2025 NFHS baseball rulebook.";
}

function getRulebookText(question) {
  const matches = question.reference ? question.reference.match(/\d+[.-]\d+[.-]\d+[a-z]?/gi) : null;
  if (!matches) {
    return "";
  }

  const seen = new Set();
  const snippets = [];

  for (const match of matches) {
    const normalized = match
      .replace(/\./g, "-")
      .replace(/[a-z]$/i, "")
      .toLowerCase();

    if (!OFFICIAL_RULEBOOK_TEXT[normalized] || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    snippets.push(OFFICIAL_RULEBOOK_TEXT[normalized]);
  }

  return snippets.join("\n\n");
}

function getDisplayedRulebookText(question) {
  return getRulebookText(question) || getRuleSummary(question);
}

function formatReferenceLine(question) {
  const parts = [];

  if (question.reference) {
    parts.push(`Rule reference: ${question.reference}`);
  }

  const pageLabel = getPageLabel(question);
  if (pageLabel) {
    parts.push(pageLabel);
  }

  if (!parts.length) {
    return "Mechanics / local policy section";
  }

  return parts.join(" · ");
}

function renderStats() {
  const answeredEntries = Object.values(state.answered);
  const answeredCount = answeredEntries.length;
  const correctCount = answeredEntries.filter((entry) => entry.correct).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  statAnsweredCount.textContent = String(answeredCount);
  statAccuracy.textContent = `${accuracy}%`;
  statMissedCount.textContent = String(state.missedQuestionIds.length);
}

function startSession() {
  const selectedSection = sectionFilter.value;
  const pool = selectedSection === "All"
    ? [...safeQuestions]
    : safeQuestions.filter((question) => question.section === selectedSection);

  let sessionQuestions = [...pool];

  if (activeMode === "quick") {
    sessionQuestions = shuffle(sessionQuestions).slice(0, Math.min(25, sessionQuestions.length));
  } else if (activeMode === "missed") {
    const missedSet = new Set(state.missedQuestionIds);
    sessionQuestions = safeQuestions.filter((question) => missedSet.has(question.number));
    if (selectedSection !== "All") {
      sessionQuestions = sessionQuestions.filter((question) => question.section === selectedSection);
    }
  }

  if (!sessionQuestions.length) {
    questionShell.innerHTML = `
      <p class="empty-state">
        There are no questions in this lane for the current mode. Try a different rule filter or switch back to the full bank.
      </p>
    `;
    examProgressCopy.textContent = "No questions loaded";
    examProgressBar.style.width = "0%";
    return;
  }

  currentSession = {
    mode: activeMode,
    section: selectedSection,
    questions: sessionQuestions,
    currentIndex: 0,
    score: 0,
    answeredCount: 0,
    answers: {},
    complete: false,
  };

  renderSessionQuestion();
}

function renderSessionQuestion() {
  if (!currentSession) {
    return;
  }

  const question = currentSession.questions[currentSession.currentIndex];
  const progress = ((currentSession.currentIndex) / currentSession.questions.length) * 100;

  examSectionPill.textContent = currentSession.section === "All"
    ? labelForMode(currentSession.mode)
    : `${labelForMode(currentSession.mode)} · ${currentSession.section}`;
  examProgressCopy.textContent = `Question ${currentSession.currentIndex + 1} of ${currentSession.questions.length}`;
  examProgressBar.style.width = `${progress}%`;

  questionShell.innerHTML = `
    <article class="question-card">
      <p class="question-kicker">${escapeHtml(question.section)} · Question ${escapeHtml(question.number)}</p>
      <h3 class="question-title">${escapeHtml(question.prompt)}</h3>
      <p class="question-body">${escapeHtml(formatReferenceLine(question))}</p>
      <div class="choice-list">
        ${question.choices
          .map(
            (choice, index) => `
              <button type="button" class="choice-button" data-choice-index="${index}">
                <span class="choice-letter">${LETTERS[index]}</span>
                <span>${escapeHtml(choice)}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </article>
  `;

  const choiceButtons = questionShell.querySelectorAll("[data-choice-index]");
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentSession.answers[question.number] !== undefined) {
        return;
      }
      handleChoice(question, Number(button.dataset.choiceIndex));
    });
  });
}

function handleChoice(question, selectedIndex) {
  const isCorrect = selectedIndex === question.answerIndex;
  currentSession.answers[question.number] = selectedIndex;
  currentSession.answeredCount += 1;
  if (isCorrect) {
    currentSession.score += 1;
  }

  state.answered[question.number] = {
    selectedIndex,
    correct: isCorrect,
    answeredAt: new Date().toISOString(),
  };

  if (isCorrect) {
    state.missedQuestionIds = state.missedQuestionIds.filter((number) => number !== question.number);
  } else if (!state.missedQuestionIds.includes(question.number)) {
    state.missedQuestionIds.unshift(question.number);
  }

  saveState();
  renderAnsweredQuestion(question, selectedIndex, isCorrect);
  renderStats();
}

function renderAnsweredQuestion(question, selectedIndex, isCorrect) {
  const buttons = questionShell.querySelectorAll("[data-choice-index]");
  buttons.forEach((button) => {
    const buttonIndex = Number(button.dataset.choiceIndex);
    button.classList.add("is-disabled");
    if (buttonIndex === question.answerIndex) {
      button.classList.add("is-correct");
    }
    if (buttonIndex === selectedIndex && buttonIndex !== question.answerIndex) {
      button.classList.add("is-incorrect");
    }
  });

  const feedback = document.createElement("article");
  feedback.className = `feedback-card ${isCorrect ? "is-correct" : "is-incorrect"}`;
  feedback.innerHTML = `
    <p class="section-label">${isCorrect ? "Correct" : "Review This"}</p>
    <p class="feedback-copy">
      <strong>Correct answer:</strong> ${LETTERS[question.answerIndex]}. ${escapeHtml(question.correctChoice)}
    </p>
    <p class="feedback-copy">
      <strong>Reference:</strong> ${escapeHtml(formatReferenceLine(question))}
    </p>
    <div class="feedback-copy">
      <strong>Rulebook Text:</strong>
      <p class="feedback-rulebook-text">${escapeHtml(getDisplayedRulebookText(question))}</p>
    </div>
    <div class="question-footer">
      <span class="pill ${isCorrect ? "" : "muted-pill"}">${isCorrect ? "Score added" : "Saved to missed review"}</span>
      <button type="button" class="primary-button" id="next-question-button">
        ${currentSession.currentIndex === currentSession.questions.length - 1 ? "Finish session" : "Next question"}
      </button>
    </div>
  `;
  questionShell.append(feedback);

  feedback.querySelector("#next-question-button").addEventListener("click", () => {
    advanceSession();
  });

  examProgressBar.style.width = `${((currentSession.currentIndex + 1) / currentSession.questions.length) * 100}%`;
}

function advanceSession() {
  if (!currentSession) {
    return;
  }

  if (currentSession.currentIndex >= currentSession.questions.length - 1) {
    finishSession();
    return;
  }

  currentSession.currentIndex += 1;
  renderSessionQuestion();
}

function finishSession() {
  const percent = Math.round((currentSession.score / currentSession.questions.length) * 100);
  const historyEntry = {
    mode: currentSession.mode,
    section: currentSession.section,
    score: currentSession.score,
    total: currentSession.questions.length,
    percent,
    completedAt: new Date().toISOString(),
  };

  state.examHistory.push(historyEntry);
  saveState();
  renderStats();

  examSectionPill.textContent = `${labelForMode(currentSession.mode)} complete`;
  examProgressCopy.textContent = `${currentSession.score} of ${currentSession.questions.length} correct`;
  examProgressBar.style.width = "100%";

  questionShell.innerHTML = `
    <article class="result-card">
      <p class="section-label">Session Complete</p>
      <h3 class="question-title">${percent}% on ${labelForMode(currentSession.mode).toLowerCase()}</h3>
      <p class="question-body">
        You finished ${currentSession.questions.length} question${currentSession.questions.length === 1 ? "" : "s"} in the
        ${escapeHtml(currentSession.section === "All" ? "full bank" : currentSession.section)} lane.
      </p>
      <div class="question-footer">
        <span class="pill">${currentSession.score} correct</span>
        <button type="button" class="primary-button" id="restart-session-button">Start another session</button>
      </div>
    </article>
  `;

  questionShell.querySelector("#restart-session-button").addEventListener("click", () => {
    startSession();
  });

  currentSession = null;
}

function renderStudyList() {
  const questions = getFilteredStudyQuestions();
  studyResultsCount.textContent = `${questions.length} question${questions.length === 1 ? "" : "s"}`;
  studyList.innerHTML = "";

  if (!questions.length) {
    studyList.innerHTML = `
      <p class="empty-state">No questions matched that filter. Try a broader rule lane or a different search phrase.</p>
    `;
    renderRulebookHub();
    return;
  }

  questions.forEach((question) => {
    const card = document.createElement("details");
    card.className = "study-card";
    card.dataset.studyQuestion = String(question.number);
    card.dataset.answered = "false";
    card.innerHTML = `
      <summary>
        <div class="study-card-header">
          <div>
            <p class="section-label">${escapeHtml(question.section)} · Question ${escapeHtml(question.number)}</p>
            <h3 class="study-card-title">${escapeHtml(question.prompt)}</h3>
          </div>
          <span class="pill">${escapeHtml(question.reference || "Mechanics / LAU")}</span>
        </div>
        <div class="study-card-meta">
          <button type="button" class="ghost-button" data-launch-rule="${escapeAttribute(question.section)}">Quiz this lane</button>
        </div>
      </summary>
      <div class="study-card-body">
        <div class="study-choice-list">
          ${question.choices
            .map((choice, index) => {
              return `
                <button type="button" class="study-choice" data-study-choice="${index}">
                  <strong>${LETTERS[index]}.</strong> ${escapeHtml(choice)}
                </button>
              `;
            })
            .join("")}
        </div>
        <p class="study-answer" hidden><strong>Answer key:</strong> ${LETTERS[question.answerIndex]}. ${escapeHtml(question.correctChoice)}</p>
        <p class="study-reference"><strong>Reference:</strong> ${escapeHtml(formatReferenceLine(question))}</p>
      </div>
    `;
    studyList.append(card);
  });

  renderRulebookHub();
}

function handleStudyChoice(card, question, selectedIndex) {
  card.dataset.answered = "true";

  const choiceButtons = card.querySelectorAll("[data-study-choice]");
  choiceButtons.forEach((button) => {
    const buttonIndex = Number(button.dataset.studyChoice);
    button.disabled = true;

    if (buttonIndex === question.answerIndex) {
      button.classList.add("is-answer");
    }

    if (buttonIndex === selectedIndex && buttonIndex !== question.answerIndex) {
      button.classList.add("is-incorrect");
    }
  });

  const answerLine = card.querySelector(".study-answer");
  if (answerLine) {
    answerLine.hidden = false;
  }
}

function getFilteredStudyQuestions() {
  return safeQuestions.filter((question) => {
    const sectionMatches = studyFilter === "All" || question.section === studyFilter;
    const queryMatches = !studyQuery || question.searchText.includes(studyQuery);
    return sectionMatches && queryMatches;
  });
}

function syncModeButtons() {
  modeRow.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === activeMode);
  });
}

function labelForMode(mode) {
  if (mode === "quick") {
    return "Quick 25";
  }
  if (mode === "missed") {
    return "Missed Only";
  }
  return "Full 100";
}

function findQuestion(number) {
  return safeQuestions.find((question) => question.number === number);
}

function buildFallbackRuleSections(questions) {
  const counts = {};

  questions.forEach((question) => {
    const label = question.section || "General";
    counts[label] = (counts[label] || 0) + 1;
  });

  return Object.keys(counts)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((label) => ({
      label,
      title: label,
      page: "",
      summary: "Study questions grouped from the loaded exam bank.",
      questionCount: counts[label],
    }));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
