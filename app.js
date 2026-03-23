const STORAGE_KEY = "lau-study-center-state";
const LETTERS = ["A", "B", "C", "D"];
const data = window.LAU_STUDY_DATA;

if (!data) {
  throw new Error("LAU study data failed to load.");
}

const sourceList = document.querySelector("#source-list");
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
const sessionScore = document.querySelector("#session-score");
const lastFullExam = document.querySelector("#last-full-exam");
const bestQuickScore = document.querySelector("#best-quick-score");
const missedPreview = document.querySelector("#missed-preview");
const studySearch = document.querySelector("#study-search");
const studyChipRow = document.querySelector("#study-chip-row");
const studyResultsCount = document.querySelector("#study-results-count");
const clearStudyFiltersButton = document.querySelector("#clear-study-filters");
const studyList = document.querySelector("#study-list");
const ruleGrid = document.querySelector("#rule-grid");
const highlightGrid = document.querySelector("#highlight-grid");
const rulebookNoteGrid = document.querySelector("#rulebook-note-grid");

const sections = ["All", ...data.ruleSections.map((section) => section.label)];

const state = loadState();
let activeMode = "full";
let studyFilter = "All";
let studyQuery = "";
let currentSession = null;

initialize();

function initialize() {
  statQuestionCount.textContent = String(data.meta.questionCount);
  renderSources();
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
    const button = event.target.closest("[data-launch-rule]");
    if (!button) {
      return;
    }

    const section = button.dataset.launchRule;
    sectionFilter.value = section;
    activeMode = "quick";
    syncModeButtons();
    window.location.hash = "exam-center";
  });

  ruleGrid.addEventListener("click", (event) => {
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

function renderSources() {
  sourceList.innerHTML = "";

  data.meta.sources.forEach((source) => {
    const item = document.createElement("article");
    item.className = "source-item";
    item.innerHTML = `
      <p class="section-label">Included Source</p>
      <h3>${escapeHtml(source)}</h3>
      <p>Used to build the exam bank, study review, and rulebook study lanes in this app.</p>
    `;
    sourceList.append(item);
  });
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
  highlightGrid.innerHTML = "";
  rulebookNoteGrid.innerHTML = "";

  data.ruleSections.forEach((section) => {
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
      <button type="button" class="rule-link" data-rule-filter="${escapeAttribute(section.label)}">Study this lane</button>
    `;
    ruleGrid.append(card);
  });

  data.rulebookHighlights.forEach((highlight) => {
    const card = document.createElement("article");
    card.className = "highlight-card";
    card.innerHTML = `
      <p class="section-label">${escapeHtml(highlight.citation)}</p>
      <h3>${escapeHtml(highlight.title)}</h3>
      <ul class="highlight-list">
        ${highlight.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
    highlightGrid.append(card);
  });

  data.rulebookNotes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "note-card";
    card.innerHTML = `
      <p class="section-label">${escapeHtml(note.citation)}</p>
      <h3>${escapeHtml(note.title)}</h3>
      <p class="note-copy">${escapeHtml(note.excerpt)}</p>
    `;
    rulebookNoteGrid.append(card);
  });
}

function renderStats() {
  const answeredEntries = Object.values(state.answered);
  const answeredCount = answeredEntries.length;
  const correctCount = answeredEntries.filter((entry) => entry.correct).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const fullSessions = state.examHistory.filter((session) => session.mode === "full");
  const quickSessions = state.examHistory.filter((session) => session.mode === "quick");

  statAnsweredCount.textContent = String(answeredCount);
  statAccuracy.textContent = `${accuracy}%`;
  statMissedCount.textContent = String(state.missedQuestionIds.length);
  lastFullExam.textContent = formatHistoryScore(fullSessions.at(-1));
  bestQuickScore.textContent = formatHistoryScore(bestHistoryScore(quickSessions));

  renderMissedPreview();
}

function renderMissedPreview() {
  missedPreview.innerHTML = "";

  if (!state.missedQuestionIds.length) {
    missedPreview.innerHTML = `
      <div class="review-card">
        <p class="section-label">Missed Review</p>
        <p>No missed questions saved yet. Once you miss one in exam mode, it will show up here.</p>
      </div>
    `;
    return;
  }

  const previewQuestions = state.missedQuestionIds
    .slice(0, 5)
    .map((number) => findQuestion(number))
    .filter(Boolean);

  previewQuestions.forEach((question) => {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <p class="section-label">Question ${escapeHtml(question.number)}</p>
      <p>${escapeHtml(question.prompt)}</p>
    `;
    missedPreview.append(card);
  });
}

function startSession() {
  const selectedSection = sectionFilter.value;
  const pool = selectedSection === "All"
    ? [...data.questions]
    : data.questions.filter((question) => question.section === selectedSection);

  let sessionQuestions = [...pool];

  if (activeMode === "quick") {
    sessionQuestions = shuffle(sessionQuestions).slice(0, Math.min(25, sessionQuestions.length));
  } else if (activeMode === "missed") {
    const missedSet = new Set(state.missedQuestionIds);
    sessionQuestions = data.questions.filter((question) => missedSet.has(question.number));
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
    sessionScore.textContent = "0 / 0";
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
  sessionScore.textContent = `${currentSession.score} / ${currentSession.answeredCount}`;

  questionShell.innerHTML = `
    <article class="question-card">
      <p class="question-kicker">${escapeHtml(question.section)} · Question ${escapeHtml(question.number)}</p>
      <h3 class="question-title">${escapeHtml(question.prompt)}</h3>
      <p class="question-body">Rule reference: ${escapeHtml(question.reference || "Mechanics / local policy section")}</p>
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
      <strong>Reference:</strong> ${escapeHtml(question.reference || "Mechanics / local policy section")}
    </p>
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
  sessionScore.textContent = `${currentSession.score} / ${currentSession.answeredCount}`;
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
          <span class="pill muted-pill">Correct: ${LETTERS[question.answerIndex]}</span>
          <button type="button" class="ghost-button" data-launch-rule="${escapeAttribute(question.section)}">Quiz this lane</button>
        </div>
      </summary>
      <div class="study-card-body">
        <div class="study-choice-list">
          ${question.choices
            .map((choice, index) => {
              const answerClass = index === question.answerIndex ? "study-choice is-answer" : "study-choice";
              return `<div class="${answerClass}"><strong>${LETTERS[index]}.</strong> ${escapeHtml(choice)}</div>`;
            })
            .join("")}
        </div>
        <p class="study-answer"><strong>Answer key:</strong> ${LETTERS[question.answerIndex]}. ${escapeHtml(question.correctChoice)}</p>
        <p class="study-reference"><strong>Rule reference:</strong> ${escapeHtml(question.reference || "Mechanics / local policy section")}</p>
      </div>
    `;
    studyList.append(card);
  });

  renderRulebookHub();
}

function getFilteredStudyQuestions() {
  return data.questions.filter((question) => {
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

function bestHistoryScore(entries) {
  return entries.reduce((best, entry) => {
    if (!best || entry.percent > best.percent) {
      return entry;
    }
    return best;
  }, null);
}

function formatHistoryScore(entry) {
  if (!entry) {
    return "Not taken";
  }
  return `${entry.percent}%`;
}

function findQuestion(number) {
  return data.questions.find((question) => question.number === number);
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
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
