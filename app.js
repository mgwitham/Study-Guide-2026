const STORAGE_KEY = "blue-crew-academy";

const topicGrid = document.querySelector("#topic-grid");
const ruleOutlineGrid = document.querySelector("#rule-outline-grid");
const manualGrid = document.querySelector("#manual-grid");
const plateChecklist = document.querySelector("#plate-checklist");
const baseChecklist = document.querySelector("#base-checklist");
const pregameList = document.querySelector("#pregame-list");
const deadBallList = document.querySelector("#dead-ball-list");
const awardList = document.querySelector("#award-list");
const rulebookUpdateList = document.querySelector("#rulebook-update-list");
const rulebookSupportList = document.querySelector("#rulebook-support-list");
const glossaryList = document.querySelector("#glossary-list");
const crewList = document.querySelector("#crew-list");
const answersContainer = document.querySelector("#answers");
const questionPrompt = document.querySelector("#question-prompt");
const questionTag = document.querySelector("#question-tag");
const questionCounter = document.querySelector("#question-counter");
const feedbackText = document.querySelector("#feedback-text");
const nextQuestionButton = document.querySelector("#next-question-button");
const quizTitle = document.querySelector("#quiz-title");
const situationSearchForm = document.querySelector("#situation-search-form");
const situationSearchInput = document.querySelector("#situation-search-input");
const situationSearchResults = document.querySelector("#situation-search-results");
const studyModal = document.querySelector("#study-modal");
const studyModalTitle = document.querySelector("#study-modal-title");
const studyModalSource = document.querySelector("#study-modal-source");
const studyModalCopy = document.querySelector("#study-modal-copy");
const studyModalClose = document.querySelector("#study-modal-close");
const studyModalBackdrop = document.querySelector("#study-modal-backdrop");
const startTonightButton = document.querySelector("#start-tonight");
const reviewMistakesButton = document.querySelector("#review-mistakes");
const trainRuleButton = document.querySelector("#train-rule");
const pathwayButtons = Array.from(document.querySelectorAll(".pathway-card"));

const studyTopics = [
  {
    id: "dead-ball",
    title: "Dead Ball and Live Ball",
    reference: "Rules 5 and 6 focus",
    description: "Know when the ball is immediately dead, delayed dead, or still live after a surprise event.",
  },
  {
    id: "interference",
    title: "Interference and Obstruction",
    reference: "Rules 2 and 8 focus",
    description: "Separate offensive acts, defensive hindrance, and the awards or outs that follow.",
  },
  {
    id: "appeals",
    title: "Appeals and Batting Order",
    reference: "Rules 7 and 8 focus",
    description: "Study timing, live-ball status, and when the defense has lost its shot to appeal.",
  },
  {
    id: "balks",
    title: "Pitching Infractions",
    reference: "Rule 6 focus",
    description: "Recognize illegal pitches, quick pitches, and when runners advance under code rules.",
  },
  {
    id: "catch-no-catch",
    title: "Catch / No Catch",
    reference: "Rule 2 focus",
    description: "Work the difference between secure possession, transfer, and touching the ground.",
  },
  {
    id: "rotations",
    title: "Crew Rotations",
    reference: "Mechanics emphasis",
    description: "Decide who owns touches, tags, and trouble balls when the play starts moving fast.",
  },
  {
    id: "lineup-equipment",
    title: "Lineups and Equipment",
    reference: "Rule 1 focus",
    description: "Work lineup-card duties, legal baseballs, defensive player requirements, and equipment checks before they become game problems.",
  },
  {
    id: "substitutions-conduct",
    title: "Substitutions and Bench Conduct",
    reference: "Rule 3 focus",
    description: "Study legal substitutions, conferences, bench behavior, coach restrictions, and how participation becomes legal.",
  },
  {
    id: "game-status-scoring",
    title: "Game Status and Scoring",
    reference: "Rules 4 and 9 focus",
    description: "Train official-game status, suspended-game questions, run-count decisions, and third-out scoring logic.",
  },
  {
    id: "runner-awards",
    title: "Runner Awards and Placement",
    reference: "Rule 8 focus",
    description: "Rehearse award timing, runner placement, ball-four and hit-by-pitch awards, and out-of-play advancement decisions.",
  },
];

const trainingPaths = [
  {
    id: "beginner",
    title: "Beginner path",
    topicIds: ["catch-no-catch", "dead-ball"],
  },
  {
    id: "intermediate",
    title: "Intermediate path",
    topicIds: ["appeals", "interference", "balks"],
  },
  {
    id: "advanced",
    title: "Advanced path",
    topicIds: ["rotations", "appeals"],
  },
];

const sourceMaterials = [
  {
    title: "2020 NFHS Baseball Rule Book .xlsx",
    detail: "Used to drive the rule-by-rule study spine, dead-ball table, and baserunning awards references.",
  },
  {
    title: "2025 Rulebook.pdf",
    detail: "Included as your current NFHS rules backbone, with extracted text now informing 2025 changes, points of emphasis, and support topics.",
  },
  {
    title: "2026 Umpires Manual.pdf",
    detail: "Included as your mechanics and game-management companion for pregame, positioning, rotations, and professionalism.",
  },
];

const rulebookOutline = [
  {
    rule: "Rule 1",
    title: "Players, Field, and Equipment",
    sections: 5,
    articles: 50,
    questionTopicIds: ["dead-ball", "interference"],
    summary: "Use this rule to review lineup-card duties, legal field conditions, required player positions at pitch time, and equipment legality.",
    bullets: [
      "Lineup cards and captain/head coach responsibilities",
      "Field markings, diamond setup, and legal positioning",
      "Equipment checks that matter in pregame",
    ],
  },
  {
    rule: "Rule 2",
    title: "Playing Terms and Definitions",
    sections: 42,
    articles: 75,
    questionTopicIds: ["catch-no-catch", "interference", "appeals"],
    summary: "This is the vocabulary engine of the rulebook. Catch, force, obstruction, interference, timing terms, and award concepts all start here.",
    bullets: [
      "Catch and no-catch language",
      "Definitions that control later rulings",
      "Timing words that change enforcement",
    ],
  },
  {
    rule: "Rule 3",
    title: "Substituting, Coaching, Bench and Field Conduct, Charged Conferences",
    sections: 4,
    articles: 19,
    questionTopicIds: ["interference", "appeals"],
    summary: "Study legal substitutions, DH structure, bench conduct, restricted personnel, and conference limits.",
    bullets: [
      "When substitutions are legal and official",
      "Bench decorum and conduct restrictions",
      "Charged conference timing and penalties",
    ],
  },
  {
    rule: "Rule 4",
    title: "Starting and Ending Game",
    sections: 5,
    articles: 11,
    questionTopicIds: ["dead-ball", "appeals", "rotations"],
    summary: "This rule covers pregame procedure, ground-rule authority, game status, and when contests become official, suspended, or ended.",
    bullets: [
      "Pregame conference and lineup acceptance",
      "Ground-rule authority and field conditions",
      "Regulation, suspended, and ending-game concepts",
    ],
  },
  {
    rule: "Rule 5",
    title: "Dead Ball, Suspension of Play",
    sections: 2,
    articles: 6,
    questionTopicIds: ["dead-ball"],
    summary: "Use this with the dead-ball table to sharpen your instinct for when play stops immediately and how to restart correctly.",
    bullets: [
      "Immediate dead-ball situations",
      "Suspension-of-play mechanics",
      "Dead-ball timing tied to awards and outs",
    ],
  },
  {
    rule: "Rule 6",
    title: "Pitching",
    sections: 2,
    articles: 12,
    questionTopicIds: ["balks", "dead-ball"],
    summary: "Wind-up vs. set, legal disengagement, complete-stop requirements, illegal pitches, and balks all live here.",
    bullets: [
      "Pivot foot and legal position",
      "Set position stop requirement",
      "Illegal pitch and balk framework",
    ],
  },
  {
    rule: "Rule 7",
    title: "Batting",
    sections: 4,
    articles: 13,
    questionTopicIds: ["appeals", "catch-no-catch", "interference"],
    summary: "Review batting order, strikes and fouls, illegal bat penalties, and the timing windows for batting-out-of-order appeals.",
    bullets: [
      "Batting out of order",
      "Illegal bat and batter responsibilities",
      "Strike, bunt, and foul-ball study areas",
    ],
  },
  {
    rule: "Rule 8",
    title: "Baserunning, Baserunning Awards Table",
    sections: 4,
    articles: 19,
    questionTopicIds: ["interference", "appeals", "dead-ball"],
    summary: "This is the runner-placement rule. Appeals, awards, obstruction, interference, and batter-runner rights run through here.",
    bullets: [
      "When a batter becomes a runner",
      "Award timing and placement",
      "Runner outs, appeals, and interference",
    ],
  },
  {
    rule: "Rule 9",
    title: "Scoring, Record Keeping",
    sections: 7,
    articles: 25,
    questionTopicIds: ["appeals", "dead-ball"],
    summary: "Best used to reinforce when runs count, how force and appeal outs affect scoring, and how game events are recorded.",
    bullets: [
      "When runs score or do not score",
      "Force and appeal scoring impact",
      "Official record-keeping concepts",
    ],
  },
  {
    rule: "Rule 10",
    title: "Umpiring",
    sections: 3,
    articles: 15,
    questionTopicIds: ["rotations", "catch-no-catch"],
    summary: "Pairs with the umpires manual. Study jurisdiction, authority, judgment calls, and how rules questions should be handled.",
    bullets: [
      "Jurisdiction and authority",
      "Judgment vs. rules appeal distinctions",
      "Crew structure and umpire responsibilities",
    ],
  },
];

const manualModules = [
  {
    title: "Part 1: Definition of Terms",
    detail: "Build shared vocabulary first so your mechanics talk sounds like a crew instead of three different clinics.",
    focus: "Glossary, positions, movement language",
    pathwayId: "beginner",
    actionLabel: "Open foundation reps",
    studyNote: "This section is the vocabulary base for the whole manual.\n\nWhat to learn:\nMake sure the crew uses the same language for positions, movement, going out, staying in, and who owns the next play.\n\nWhy it matters:\nA lot of mechanics problems are really language problems. If one umpire says 'I've got the ball' or 'I'm staying home' and the partner attaches a different meaning to it, coverage breaks down before the play even develops.\n\nWhat to focus on in study:\nPay attention to terms that affect movement, angle, and responsibility transfer. Learn the words in a way that lets you explain them in your own pregame, not just recognize them on the page.\n\nCommon trap:\nReading the definitions like a glossary quiz instead of connecting them to actual on-field communication.\n\nBest use:\nReview this first whenever your crew language feels inconsistent or when you are working with a new partner.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 2: Working the Plate",
    detail: "Plate posture, timing, clearing the catcher, and reading plays after the pitch.",
    focus: "Slot, timing, plate mobility",
    topicId: "catch-no-catch",
    actionLabel: "Open plate situations",
    studyNote: "This module is about seeing the pitch well and staying usable after the pitch.\n\nWhat to learn:\nSet in a stable slot, keep the head quiet, let the pitch finish, and then move out of the plate area in a way that keeps the next play visible.\n\nWhy it matters:\nPlate work is not only about calling balls and strikes. It also determines whether you can read swing/no-swing, foul tip versus foul ball, backswing contact, catch/no-catch at the plate, and any developing play in front of you.\n\nWhat to focus on in study:\nTiming, head height, clearing the catcher, and reading the first movement after contact. Study how your feet create or destroy the next angle.\n\nCommon trap:\nRushing to move before you actually read the pitch result, or getting stuck behind the catcher and losing the play after the pitch.\n\nBest use:\nReview this before plate assignments and before any game where you want your strike-zone work and post-pitch movement to feel calmer.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 3: Working the Bases",
    detail: "Angle, distance, pause-read-react, and position discipline around the infield.",
    focus: "Footwork, pivots, reading throws",
    topicId: "rotations",
    actionLabel: "Open base situations",
    studyNote: "This section teaches how to move with purpose instead of drifting into bad looks.\n\nWhat to learn:\nRead the ball off the bat or throw, protect angle before distance, stop before the call when possible, and keep the play in front of your body.\n\nWhy it matters:\nMost missed base calls do not come from not knowing the rule. They come from poor angle, late movement, or arriving still in motion when the tag or touch happens.\n\nWhat to focus on in study:\nPause-read-react, pivot discipline, reading throws into first and second, and recognizing when the next likely play is changing while the ball is still moving.\n\nCommon trap:\nRunning to a spot because it feels active instead of moving to the angle that actually lets you judge the play.\n\nBest use:\nReview this before base assignments, especially if you are trying to clean up pulled-foot calls, swipe tags, or rotating coverage on extra-base hits.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 4: Working as a Team",
    detail: "Crew communication, acknowledgments, responsibility transfer, and shared coverage language.",
    focus: "Partner communication",
    topicId: "rotations",
    actionLabel: "Open teamwork reps",
    studyNote: "This part is about trust, acknowledgments, and clean responsibility transfer.\n\nWhat to learn:\nHow to communicate who has the ball, who is rotating, who is staying home, and who owns the next play when coverage changes fast.\n\nWhy it matters:\nA crew that does not communicate ends up with double coverage in one area and no coverage in another. Good teams make movement feel coordinated even when the play becomes chaotic.\n\nWhat to focus on in study:\nAcknowledging partner information, using clear crew language, and understanding what your movement tells the other umpire about his next responsibility.\n\nCommon trap:\nAssuming your partner understood your movement without ever confirming it, or using vague language in pregame that collapses under pressure.\n\nBest use:\nReview this before working with a new crew or before any assignment where rotations and trouble balls are likely to matter.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 4: Pregame Preparations",
    detail: "Use the manual’s pregame emphasis to standardize rotations, signals, and special-play coverage before first pitch.",
    focus: "Pregame checklist",
    topicId: "rotations",
    actionLabel: "Open pregame reps",
    studyNote: "This section is really about eliminating surprises before the game starts.\n\nWhat to learn:\nBuild a repeatable pregame around rotations, picked-off runners, appeal responsibilities, trouble balls, fair/foul ownership, and unusual situations near the plate or lines.\n\nWhy it matters:\nThe cleanest crews do not invent coverage on the fly. They already agreed on what they are doing, what terms they will use, and what happens if a partner goes out.\n\nWhat to focus on in study:\nThe handful of situations that change ownership quickly: line-drive trouble balls, third-to-first rotations, tag-up plays, and secondary appeals.\n\nCommon trap:\nTalking about mechanics in general language instead of naming the exact situations that create confusion in a real game.\n\nBest use:\nUse this right before an assignment so your pregame sounds specific, short, and useful instead of generic.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 5: Signal Chart",
    detail: "Sharpen verbal and visual presence so your signals match the call quality and game situation.",
    focus: "Signal discipline",
    pathwayId: "intermediate",
    actionLabel: "Open judgment reps",
    studyNote: "This section is about clarity, credibility, and consistency.\n\nWhat to learn:\nUse signals that are readable, decisive, and matched to the play. The right signal should help players and coaches understand what happened without adding extra drama.\n\nWhy it matters:\nA weak or sloppy signal makes even a correct call look uncertain. A disciplined signal supports your timing, your presence, and your crew's overall credibility.\n\nWhat to focus on in study:\nDead ball, safe, out, fair, foul, strike, and count mechanics, plus the difference between showing information and overselling a call.\n\nCommon trap:\nAdding too much motion, signaling before you have really seen the play finish, or using different mechanics every inning.\n\nBest use:\nReview this when your calls are right but your presentation still feels rushed or inconsistent.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 6: Crew of One",
    detail: "Study single-umpire survival mechanics, priorities, and what you simply cannot overextend on.",
    focus: "Solo-game priorities",
    topicId: "rotations",
    actionLabel: "Open solo-coverage reps",
    studyNote: "This module is about discipline, not perfection.\n\nWhat to learn:\nIdentify the most important play, protect the best possible angle for it, and accept that one umpire cannot cover every secondary piece of action.\n\nWhy it matters:\nSolo games punish over-chasing. The umpire who tries to get everything often ends up getting the key play from the worst possible spot.\n\nWhat to focus on in study:\nPriorities, positioning choices, base-touch tradeoffs, and how to manage the game without pretending you are a two- or three-umpire crew.\n\nCommon trap:\nRunning after impossible secondary coverage and losing the primary play that actually matters.\n\nBest use:\nReview this before subvarsity, small-school, or emergency one-umpire assignments where survival priorities matter more than perfect mechanics.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 7: Crew of Two",
    detail: "Own two-man rotations, tag-up coverage, and pause-read-react decisions for common runner states.",
    focus: "Two-umpire coverage",
    topicId: "rotations",
    actionLabel: "Open two-umpire reps",
    studyNote: "This is the core mechanics system for a lot of actual games.\n\nWhat to learn:\nRead the ball well enough to know when the base umpire goes out, when the plate umpire rotates, and how the crew protects the next likely play with only two people.\n\nWhy it matters:\nMost real coverage mistakes in two-man mechanics come from reading the ball late or from both umpires moving as if the other one is staying put.\n\nWhat to focus on in study:\nGoing out, staying in, tag-up coverage, third-to-first responsibilities, and who owns the batter-runner when the ball creates rotation pressure.\n\nCommon trap:\nThinking of two-man work as fixed positions instead of a coverage exchange that changes once the ball is read correctly.\n\nBest use:\nReview this before varsity or JV two-umpire work, especially if trouble balls and extra-base hits have been creating crew confusion.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Part 8-9: Crew of Three and Four",
    detail: "Add deeper starting positions, outfield responsibilities, and advanced coverage tradeoffs by runner configuration.",
    focus: "Advanced crew systems",
    pathwayId: "advanced",
    actionLabel: "Open advanced reps",
    studyNote: "These sections are about system refinement, not just adding more people to the field.\n\nWhat to learn:\nHow deeper starting positions, line responsibility, outfield coverage, and runner-based adjustments create more precise play ownership in larger crews.\n\nWhy it matters:\nThree- and four-umpire systems can look crowded if the crew thinks like a two-man crew with extra help. They only work well when each umpire understands where coverage begins, where it transfers, and what plays no longer belong to him.\n\nWhat to focus on in study:\nU3 and U4 starting positions, line calls, tag-up ownership, trouble balls, and the way runner configuration changes who has the next play.\n\nCommon trap:\nTaking extra umpires as permission to relax coverage discipline instead of tightening ownership and communication.\n\nBest use:\nReview this before tournament crews, advanced assignments, or any game where larger-crew mechanics need to feel deliberate instead of improvised.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
];

const glossaryReference = [
  {
    title: "Acknowledge partner",
    detail: "When one umpire communicates coverage movement, the partner should visibly or verbally confirm it during the play.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "rotations",
    actionLabel: "Open crew-communication reps",
    studyNote: "Use this term as a teamwork habit. When one umpire gives coverage information, the receiving umpire should confirm it clearly so both partners know the responsibility change has actually been heard and understood.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Chest to the ball",
    detail: "Keep the play in front of you by turning the chest toward the ball whenever mechanics allow.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "rotations",
    actionLabel: "Open movement reps",
    studyNote: "This is a positioning reminder. The practical lesson is to keep the developing play in front of your body whenever possible so your angle, timing, and visual stability stay strong.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Clear the catcher",
    detail: "After a pitch, create space with the back foot first, then move left and back from or around the catcher.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "catch-no-catch",
    actionLabel: "Open plate-mechanics reps",
    studyNote: "Study this as a plate-mobility principle. The main point is to create safe space after the pitch so you can see the next play without getting trapped behind the catcher.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Pause, read and react",
    detail: "Observe initial action, diagnose the likely play, then move with purpose into the best working angle.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "rotations",
    actionLabel: "Open timing reps",
    studyNote: "This is one of the core mechanics ideas in the manual. The point is to avoid guessing with your feet, read the play first, and then move with purpose to the best angle for the likely call.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Dead-ball signal",
    detail: "Hands up, palms forward, with a strong verbal 'Time' when the ball is no longer in play.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "dead-ball",
    actionLabel: "Open dead-ball reps",
    studyNote: "Use this as a presence and communication study point. A dead-ball signal should be immediate, clear, and paired with voice so everyone on the field understands play has stopped.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Position A-E",
    detail: "The manual defines starting positions by crew size, runner state, and whether coverage begins infield or outfield.",
    citation: "2025-2026 manual text, Part 1",
    topicId: "rotations",
    actionLabel: "Open starting-position reps",
    studyNote: "Treat these positions as the map for pre-pitch responsibility. The important lesson is to connect starting position to runner state, crew size, and the kinds of plays most likely to develop from that setup.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
];

const crewReference = [
  {
    title: "Crew of One",
    detail: "Prioritize the most likely play, avoid chasing impossible coverage, and keep the game manageable through discipline.",
    citation: "Part 6",
    topicId: "rotations",
    actionLabel: "Open solo-coverage reps",
    studyNote: "This section is really about disciplined priorities. In a one-umpire game, you cannot cover everything, so the goal is to manage the game by getting the most important play right as often as possible.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Crew of Two",
    detail: "The manual repeatedly leans on pause-read-react, clear-the-runner language, and position A/B/C discipline.",
    citation: "Part 7",
    topicId: "rotations",
    actionLabel: "Open two-umpire reps",
    studyNote: "Study this as the core everyday mechanics system. The emphasis is on reading the ball well, understanding when one umpire goes out, and adjusting coverage without both umpires drifting to the same place.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Crew of Three",
    detail: "Adds U3 starting positions, broader trouble-ball reads, and more refined fair/foul and tag-up ownership.",
    citation: "Part 8",
    pathwayId: "advanced",
    actionLabel: "Open three-umpire reps",
    studyNote: "This crew size adds more coverage options, but it also demands cleaner ownership. The big study point is knowing who owns line calls, tag-ups, and secondary plays before the ball is ever put in play.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Crew of Four",
    detail: "Introduces deeper coverage structure, outfield support, and the 'quarterback' feel of advanced rotations.",
    citation: "Part 9",
    pathwayId: "advanced",
    actionLabel: "Open four-umpire reps",
    studyNote: "A four-umpire system is about coverage structure, not just extra bodies. The learning target is how deeper starting positions and stronger outfield support create cleaner ownership on advanced rotations and big-field plays.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Pregame crew language",
    detail: "The manual text reinforces that coverages and acknowledgments should be settled before the first pitch, not improvised after contact.",
    citation: "Part 4",
    topicId: "rotations",
    actionLabel: "Open pregame reps",
    studyNote: "Use this as a pregame communication reminder. The cleanest crews settle coverage language, acknowledgments, and unusual-play responsibilities before the game instead of inventing them in the middle of action.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
  {
    title: "Code of ethics lens",
    detail: "The manual frames umpires as the third team on the field, emphasizing professionalism and synchronized crew work.",
    citation: "Introduction / ethics section",
    pathwayId: "intermediate",
    actionLabel: "Open professionalism reps",
    studyNote: "This section is about professionalism and crew identity. The practical takeaway is that umpires should work as a composed, consistent team whose behavior supports the game as much as their rulings do.",
    sourceLabel: "Paraphrased from 2026 umpires manual",
  },
];

const deadBallReference = [
  {
    title: "Illegal pitch with no runner",
    detail: "Ball becomes dead immediately and the pitch is ruled a ball.",
    citation: "5-1-1k, 6-1-2/3 Pen., 8-3-1a • pp. 37, 41, 48",
    topicId: "balks",
    actionLabel: "Open illegal-pitch reps",
    studyNote: "Study this as an immediate dead-ball illegal-pitch situation with no runners. The important point is that the pitch is shut down right away and enforced as a ball rather than being treated like a live-ball advance play.",
    sourceLabel: "Paraphrased from NFHS dead-ball and pitching provisions",
  },
  {
    title: "Pitch touches batter",
    detail: "Dead ball immediately; batter is awarded first unless he permitted contact or the pitch is a strike.",
    citation: "5-1-1a, 8-1-1d • pp. 37, 48",
    topicId: "dead-ball",
    actionLabel: "Open hit-by-pitch reps",
    studyNote: "Use this as a hit-by-pitch judgment tool. The key is to stop play immediately, then decide whether the batter is entitled to first or whether his own action or the pitch status removes that award.",
    sourceLabel: "Paraphrased from NFHS dead-ball and batter-award provisions",
  },
  {
    title: "Pitch touches runner",
    detail: "Dead ball immediately; runners advance one base except when the pitch is strike three for the third out.",
    citation: "5-1-1a, 8-3-1a, 6-1-4 • pp. 37, 41, 48",
    topicId: "dead-ball",
    actionLabel: "Open pitch-award reps",
    studyNote: "Treat this as an immediate dead-ball award play. The main study point is that runner placement follows the pitch award rule, except when the play ends the inning on strike three for the third out.",
    sourceLabel: "Paraphrased from NFHS dead-ball and awards provisions",
  },
  {
    title: "Illegally batted ball",
    detail: "Dead ball immediately; batter is out and runners return.",
    citation: "5-1-1b, 7-3-2, 7-4-1a, 8-2-2 • pp. 37, 45, 48",
    topicId: "appeals",
    actionLabel: "Open batting-rule reps",
    studyNote: "This is best studied as an immediate-dead-ball offensive violation. The important takeaway is that the batter is declared out right away and runner placement is corrected from the rule, not from where the play happened to end.",
    sourceLabel: "Paraphrased from NFHS dead-ball and batting provisions",
  },
  {
    title: "Runner interference on a batted ball",
    detail: "Interferer is out, and additional outs or runner returns depend on whether a double play was prevented.",
    citation: "5-1-1e, 8-4-1a/h, 8-4-2b/f/g/k • pp. 37, 48",
    topicId: "interference",
    actionLabel: "Open runner-interference reps",
    studyNote: "Study this as an interference enforcement situation, not just a dead-ball event. The big question is whether the interference only retires the offender or also changes other outs and runner returns because a double-play opportunity was affected.",
    sourceLabel: "Paraphrased from NFHS interference provisions",
  },
  {
    title: "Fair ball over fence in flight",
    detail: "Award all runners home base on an immediate dead ball home run situation.",
    citation: "5-1-1f, 8-3-3a • pp. 37, 48",
    topicId: "dead-ball",
    actionLabel: "Open home-run award reps",
    studyNote: "This should be learned as an immediate-award home run play. The main issue is not where runners stopped, but that the rules award home to the batter-runner and every forced or entitled runner automatically.",
    sourceLabel: "Paraphrased from NFHS home-run award provisions",
  },
];

const rulebookUpdates = [
  {
    title: "2025 rules changes",
    detail: "The extracted text flags changes around bat drying agents in the permitted area and a modified definition of forfeiture.",
    citation: "2025 rulebook text, rules changes page",
    studyNote: "The key takeaway is to notice what changed in administration and equipment language before the season starts. Review new wording carefully, then ask how the change affects enforcement, pregame checks, and any conversations with coaches.",
    sourceLabel: "Paraphrased from 2025 rules changes page",
    actionLabel: "Open study note",
  },
  {
    title: "Authenticating Mark program balls",
    detail: "The 2025 points of emphasis call attention to using baseballs that carry the NFHS authenticating mark.",
    citation: "2025 points of emphasis",
    studyNote: "Treat this as an equipment-compliance reminder. The practical lesson is to know what a legal game ball looks like and to address ball-quality issues before they become a game-management problem.",
    sourceLabel: "Paraphrased from 2025 points of emphasis",
    actionLabel: "Open study note",
  },
  {
    title: "Pitching positions",
    detail: "The book stresses that umpires, coaches, and players must know whether the pitcher is in wind-up or set based on pivot-foot position.",
    citation: "2025 points of emphasis",
    studyNote: "This emphasis is really about getting everyone to classify the pitcher's position correctly before judging legality. If the crew misidentifies wind-up versus set, it becomes much harder to rule on stops, disengagements, and illegal movement.",
    sourceLabel: "Paraphrased from 2025 points of emphasis",
    actionLabel: "Open study note",
  },
  {
    title: "Bench decorum",
    detail: "The 2025 book explicitly ties bench behavior to sportsmanship and coach responsibility for dugout tone.",
    citation: "2025 points of emphasis",
    studyNote: "Use this as a sportsmanship and game-management lens. The important point is that dugout behavior is part of the coach's responsibility, so preventive communication and consistent standards matter before behavior escalates.",
    sourceLabel: "Paraphrased from 2025 points of emphasis",
    actionLabel: "Open study note",
  },
  {
    title: "Use of props",
    detail: "Props are framed as inconsistent with the educational purpose of high school baseball contests.",
    citation: "2025 points of emphasis",
    studyNote: "The practical lesson is that the game environment should stay educational and sportsmanlike, not theatrical. Study this topic as part of bench conduct, celebration limits, and how to address issues early without overcomplicating the game.",
    sourceLabel: "Paraphrased from 2025 points of emphasis",
    actionLabel: "Open study note",
  },
  {
    title: "Improper communication equipment use",
    detail: "One-way coach-to-catcher communication is permitted, but the book emphasizes limits on who may use it and how.",
    citation: "2025 points of emphasis",
    studyNote: "This topic matters because permitted communication devices still have role limits and usage rules. The study point is not just that equipment exists, but that umpires should know who may use it, what is allowed, and when misuse becomes an issue.",
    sourceLabel: "Paraphrased from 2025 points of emphasis",
    actionLabel: "Open study note",
  },
];

const rulebookSupportReference = [
  {
    title: "Dead ball tables",
    detail: "The extracted text includes dedicated dead-ball table pages, reinforcing quick-reference ruling work for clinics and pregame review.",
    citation: "Rule 5 support pages",
    studyNote: "These support pages are best used as a dead-ball sorting tool. Study them by grouping events into immediate dead ball, delayed dead ball, and award-driven stoppages, then ask what runners, outs, or returns follow from each category.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
  {
    title: "Baserunning awards table",
    detail: "The 2025 text confirms a stand-alone awards table, which pairs well with situational base-award drills.",
    citation: "Rule 8 support pages",
    studyNote: "Treat the awards table as a timing-and-placement chart. The real learning target is not memorizing isolated awards, but recognizing whether the play is judged from time of pitch, time of throw, or time of infraction before placing runners.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
  {
    title: "Official NFHS baseball signals",
    detail: "The table of contents includes official signals pages, making the rulebook a direct study source for signal consistency.",
    citation: "Pages 69-70",
    studyNote: "Use the signals pages to standardize visual language: dead ball, safe, out, fair, foul, strike, and count mechanics should all look decisive and consistent. The purpose here is presence and clarity, not just memorizing arm positions.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
  {
    title: "Suggested speed-up rules",
    detail: "The rulebook includes administrative support material that helps explain game-management expectations beyond pure live-ball rulings.",
    citation: "Support material",
    studyNote: "This section is useful for game-management awareness. The main value is understanding what pace-of-game procedures may be adopted or discussed locally, then confirming what your state association actually uses before the season starts.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
  {
    title: "Suggested double first base rules",
    detail: "The text also includes double-first-base guidance, which is useful for state-adoption awareness and local-rule conversations.",
    citation: "Support material",
    studyNote: "Study this as a local-adoption and mechanics conversation. Focus on runner lane expectations, defensive access to the white side, offensive use of the colored side, and what your local code wants on pulled-foot or collision-type plays.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
  {
    title: "Rules by state association adoption",
    detail: "The book reminds you that some procedural details may vary by state adoption, so local interpretation still matters.",
    citation: "Support material",
    studyNote: "This material matters because not every published support topic is universal in the same way. Use it as a reminder to verify state adoption, tournament modifications, and local expectations before relying on a national support page in a real game.",
    sourceLabel: "Paraphrased from 2025 support material",
    actionLabel: "Open study note",
  },
];

const awardReference = [
  {
    title: "Balk",
    detail: "One-base award to runners, determined from time of infraction.",
    citation: "Awards table: one base to runners • pp. 41, 52",
    topicId: "balks",
    actionLabel: "Open pitching awards",
    studyNote: "Award basis: one base to each runner.\nTiming point: time of infraction.\nWho moves: only runners already on base receive the balk award.\nHow to study it: decide first that you have a balk-type infraction, then freeze runner placement from the moment the illegal act occurred.\nCommon trap: placing runners from where they ended up after extra action instead of from the timing point that controls the award.",
    sourceLabel: "Paraphrased from NFHS awards table",
  },
  {
    title: "Throw from pitcher’s plate goes out of play",
    detail: "One-base award to runners, determined from time of the throw.",
    citation: "Awards table: one base to runners • p. 52",
    topicId: "dead-ball",
    actionLabel: "Open throw awards",
    studyNote: "Award basis: one base to runners.\nTiming point: time of the throw.\nWho moves: runners on base are placed from where they were when the pitcher made the throw that went out of play.\nHow to study it: identify that this is a thrown-ball award, not a pitch award or infraction award, then lock in runner placement from the instant of release.\nCommon trap: mixing this up with time-of-pitch awards and giving too much or too little advancement.",
    sourceLabel: "Paraphrased from NFHS awards table",
  },
  {
    title: "Catcher obstruction on advancing runner",
    detail: "One-base award to the runner attempting to advance, determined from time of pitch.",
    citation: "Awards table: one base to runners • pp. 48, 52",
    topicId: "interference",
    actionLabel: "Open obstruction reps",
    studyNote: "Award basis: one base to the obstructed advancing runner.\nTiming point: time of pitch.\nWho moves: the runner who was trying to advance when the catcher hindered the play.\nHow to study it: identify the obstructed runner first, then place that runner from the pitch timing point instead of from the throw or tag result.\nCommon trap: treating this like an ordinary tag play instead of a rule-based award tied to the pitch.",
    sourceLabel: "Paraphrased from NFHS awards table",
  },
  {
    title: "Ball four or walk",
    detail: "Batter is awarded first base from time of pitch.",
    citation: "Awards table: one base to batter • pp. 48, 52",
    topicId: "dead-ball",
    actionLabel: "Open batter awards",
    studyNote: "Award basis: first base to the batter.\nTiming point: time of pitch.\nWho moves: the batter is awarded first, and any forced runner movement follows from that award.\nHow to study it: start with the batter's entitlement to first, then work forward through any force advances created behind him.\nCommon trap: treating a walk like a live-ball scramble instead of a rule-driven placement play.",
    sourceLabel: "Paraphrased from NFHS awards table",
  },
  {
    title: "Hit by pitch",
    detail: "Batter is awarded first base from time of pitch.",
    citation: "Awards table: one base to batter • pp. 48, 52",
    topicId: "dead-ball",
    actionLabel: "Open hit-by-pitch reps",
    studyNote: "Award basis: first base to the batter when he is entitled to the award.\nTiming point: time of pitch.\nWho moves: the batter is awarded first, and forced runners advance if the award creates force movement.\nHow to study it: first decide whether the batter earned the award under the rule, then place runners from the pitch award rather than from live-ball action.\nCommon trap: skipping the entitlement question and assuming every pitch-to-body contact produces the same award.",
    sourceLabel: "Paraphrased from NFHS awards table",
  },
  {
    title: "Batter obstruction",
    detail: "Batter is awarded first base from time of pitch unless the resulting play satisfies the rule exception.",
    citation: "Awards table and 8-1-1e • pp. 48, 52",
    topicId: "interference",
    actionLabel: "Open batter-obstruction reps",
    studyNote: "Award basis: first base to the batter as the default remedy.\nTiming point: time of pitch.\nWho moves: the batter receives first unless the rule exception allows the actual play result to stand.\nHow to study it: learn the default award first, then train yourself to spot the exception before automatically placing the batter at first.\nCommon trap: knowing the ordinary award but missing the rule language that sometimes lets the play outcome govern instead.",
    sourceLabel: "Paraphrased from NFHS awards and obstruction provisions",
  },
];

const plateWork = [
  {
    title: "Slot and head height",
    copy: "Start from a balanced set and keep your eyes level through the pitch before reading the plate result.",
  },
  {
    title: "Pause, read, decide",
    copy: "Let the pitch finish, see glove stability and location, then make a crisp ruling instead of guessing early.",
  },
  {
    title: "Own foul tips and swings",
    copy: "Be ready to rule on caught foul tips, check swings with help, and immediate dead-ball conditions around the batter.",
  },
];

const baseWork = [
  {
    title: "Start in a seeing position",
    copy: "Prioritize angle over distance so you can rule on voluntary release, pulled foot, and tags with conviction.",
  },
  {
    title: "Read the ball before you move",
    copy: "Trouble balls, rotations, and touches start with the first read off the bat, not after you have already drifted.",
  },
  {
    title: "Stop before the call",
    copy: "Set your feet if the play allows it and separate movement from decision-making to protect timing.",
  },
];

const pregamePrompts = [
  {
    title: "Third-to-first rotations",
    copy: "How are we handling the batter-runner at first when U1 rotates up on a trouble ball from B or C?",
  },
  {
    title: "Line-drive trouble reads",
    copy: "What visual cue triggers us to stay with the ball, and when are we releasing to normal responsibilities?",
  },
  {
    title: "Picked-off runners and appeals",
    copy: "Who owns the primary tag and who is ready for the secondary play or appeal behind the runner?",
  },
  {
    title: "Checked swings and help calls",
    copy: "Who is giving help on half swings, how are we asking, and what pace do we want on those appeals so the crew stays calm and clear?",
  },
  {
    title: "Pulled foot and swipe-tag coverage",
    copy: "On close plays at first and second, what angles do we want and when do we stay with the touch versus widen for the tag or pulled foot?",
  },
  {
    title: "Dead-ball and award enforcement",
    copy: "If a pitch or throw goes out of play, who is freezing runners, who is watching touches, and how are we communicating the award before play resumes?",
  },
  {
    title: "Fair-foul and catch-no-catch trouble balls",
    copy: "Who owns the line, who may go out, and what does the other umpire pick up immediately if that ball becomes a rotation play?",
  },
  {
    title: "Bench decorum and game management",
    copy: "How do we want to handle early dugout chirping, equipment issues, and preventive communication so the game never gets away from us?",
  },
];

const questions = [
  {
    topicId: "dead-ball",
    prompt: "With R1 on first, the batter swings and the pitch hits the batter's hands while the bat is still in the strike zone. The ball drops near the plate. What is the ruling priority?",
    answers: [
      "Dead ball immediately, award first base because any pitch touching the hands is a hit batter.",
      "Live ball because the hands are part of the bat during the swing.",
      "Strike on the batter if he was swinging, with the ball remaining live or dead based on the resulting action.",
      "Foul ball because the pitch touched the batter while he was in the box.",
    ],
    correctIndex: 2,
    explanation: "In NFHS code, a pitch hitting the batter's hands during a swing is handled as a swung-at pitch situation rather than an automatic award. Diagnose swing status first, then apply the dead-ball or foul result that follows. Reference: 5-1-1a and 8-1-1d study area.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 5", "Rule 8"],
    prompt: "A fair batted ball lodges in the outfielder's uniform after bouncing. From what timing concept should awards be judged first?",
    answers: [
      "Time of pitch because a lodged fair ball is treated as a dead-ball award situation.",
      "Time of the throw because the outfielder touched it first.",
      "Time the coach requests time.",
      "No award; keep the ball live until the runner stops.",
    ],
    correctIndex: 0,
    explanation: "A fair ball lodged in a player's uniform or equipment sends you to dead-ball award rules. Start with the award timing concept, then place runners accordingly. Reference: Rule 5 dead-ball table and Rule 8 awards study area.",
  },
  {
    topicId: "interference",
    prompt: "R2 breaks for third on a ground ball. The runner collides with the fielder trying to field the batted ball in front of shortstop. What should you be thinking first?",
    answers: [
      "This is obstruction because the defense must avoid the runner.",
      "This is interference because a runner hindered a fielder attempting to field a batted ball.",
      "Ignore the contact if the ball still reaches the infield grass.",
      "Call time and place runners where you think they would have ended up.",
    ],
    correctIndex: 1,
    explanation: "A fielder attempting to field a batted ball is protected. Your first job is identifying that protected act, then enforcing the interference penalty under code. Reference: 5-1-1e and 8-4 interference study area.",
  },
  {
    topicId: "interference",
    prompt: "The batter-runner is running inside fair territory and is struck by a throw while outside the running lane in the final half of the trip to first. What is the key question?",
    answers: [
      "Whether the defense yelled loudly enough for interference.",
      "Whether the batter-runner's position hindered the fielder taking the throw at first base.",
      "Whether the throw was perfect.",
      "Whether the batter-runner touched first before the contact.",
    ],
    correctIndex: 1,
    explanation: "Running-lane interference is not automatic on every contact. The key is whether the batter-runner hindered the taking of the throw while outside the protected lane. Reference: Rule 8 batter-runner interference study area.",
  },
  {
    topicId: "appeals",
    prompt: "The defense believes R3 left early on a caught fly ball. After the next pitch is delivered, the coach asks for an appeal. What is the best ruling?",
    answers: [
      "Honor the appeal because live-ball appeals can happen at any time.",
      "The defense lost the appeal opportunity when the next pitch was thrown.",
      "Allow the appeal only if the plate umpire did not put the ball back in play.",
      "Allow the appeal if all infielders verbally agree.",
    ],
    correctIndex: 1,
    explanation: "Appeal timing matters. Once a legal or illegal pitch, play, or attempted play closes the window, the missed-base or leaving-early appeal is gone. Reference: Rule 7 batting-order penalties and Rule 8 appeal timing study area.",
  },
  {
    topicId: "appeals",
    prompt: "An improper batter completes the at-bat and reaches first safely. Before the next pitch, the defense appeals. What is the core enforcement concept?",
    answers: [
      "The improper batter is out and all runners always stay where they advanced.",
      "The proper batter is declared out and runners return to time-of-pitch bases unless their advance was otherwise legal.",
      "The offensive coach may choose which batter stays legalized.",
      "Nothing can be done once the batter reached first base.",
    ],
    correctIndex: 1,
    explanation: "Batting-out-of-order enforcement hinges on timing and on calling out the proper batter when the defense appeals before the next pitch or play closes the window. Reference: Rule 7 batting-order penalties.",
  },
  {
    topicId: "balks",
    prompt: "With runners on base, the pitcher starts the motion, stops, then restarts without disengaging. Which rule concept are you applying?",
    answers: [
      "Nothing, because pitchers may reset once they pause.",
      "Balk or illegal pitch territory because the pitcher interrupted the delivery while engaged.",
      "Automatic ball only if no runner advanced.",
      "Obstruction because the pitcher deceived the batter.",
    ],
    correctIndex: 1,
    explanation: "This is a classic pitching infraction study point. Under NFHS code, once engaged, the pitcher must comply with delivery requirements without illegal interruption. Reference: Rule 6 pitching position and penalty sections.",
  },
  {
    topicId: "balks",
    prompt: "With runners on base, the pitcher in set position fails to come to a complete and discernible stop before delivering. What should your ruling framework be?",
    answers: [
      "Legal as long as the batter was not quick-pitched.",
      "Balk or illegal pitch because the set position requires a complete stop before delivery.",
      "Automatic no-pitch because the ball was released.",
      "Only warn the pitcher on the first offense.",
    ],
    correctIndex: 1,
    explanation: "The NFHS rulebook and points of emphasis both stress legal pitching positions. In set position, a complete stop is part of legality, and failure moves you into balk/illegal-pitch enforcement. Reference: Rule 6 and 2025 points of emphasis.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "The outfielder secures the ball, takes two steps, then drops it while transferring to the throwing hand. What question controls the ruling?",
    answers: [
      "Whether the crowd reacted like it was a catch.",
      "Whether the fielder crossed the warning track.",
      "Whether the fielder demonstrated secure possession long enough to show voluntary release and complete the catch.",
      "Whether the drop happened after the umpire signaled out.",
    ],
    correctIndex: 2,
    explanation: "Do not rush this one. The controlling idea is secure possession plus evidence of completing the act of the catch, not simply touching the ball and moving briefly. Reference: Rule 2 definitions study area for catch/no-catch.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "A diving fielder secures the ball just above the grass and rolls over while maintaining control. What mechanic should help sell the ruling?",
    answers: [
      "Point fair immediately because diving catches are always fair/foul issues.",
      "Use the below-the-knee catch discipline: see it, pause, and confirm the catch or no-catch clearly.",
      "Ask the coach which side saw it best.",
      "Delay until the next pitch so the crew can discuss.",
    ],
    correctIndex: 1,
    explanation: "The manual's catch language emphasizes below-the-knee discipline and clear confirmation on diving or unstable catches. Timing and visual confidence matter as much as the call itself. Reference: Umpires Manual Part 1 definitions.",
  },
  {
    topicId: "rotations",
    prompt: "With two umpires and R1 only, a trouble fly ball sends U1 out. The batter-runner stretches for second. What crew principle should the plate umpire be ready to execute?",
    answers: [
      "Stay home because the plate umpire never takes plays at second.",
      "Rotate up and take the batter-runner into second because responsibilities expand when the base umpire goes out.",
      "Let the defense sort it out and only rule if there is a tag.",
      "Call time so the umpires can reset responsibilities.",
    ],
    correctIndex: 1,
    explanation: "Rotation study is about anticipating vacancies. When your partner goes out, the remaining umpire picks up uncovered responsibilities instead of staying locked to the starting spot. Reference: Rule 10 umpiring plus your umpires manual mechanics work.",
  },
  {
    topicId: "rotations",
    prompt: "During pregame, your partner says, 'I've got third if he comes.' What should happen next between the crew members?",
    answers: [
      "Nothing; acknowledgments waste time.",
      "The partner should acknowledge the communication so both umpires know the responsibility transfer is understood.",
      "Only the plate umpire needs to remember it.",
      "Write it down but do not discuss it verbally.",
    ],
    correctIndex: 1,
    explanation: "The manual explicitly teaches crew acknowledgment language. Coverage communication only works when the receiving umpire confirms it. Reference: 'Acknowledge partner' and pregame communication sections.",
  },
  {
    topicId: "dead-ball",
    prompt: "A pitch hits the batter's loose jersey that is hanging away from the body. What should you rule first?",
    answers: [
      "Award first automatically because any clothing contact is a hit batter.",
      "Determine whether the garment was worn properly, because loose improper clothing can change the award.",
      "Call a strike because clothing is never part of the batter.",
      "Keep the ball live and wait for play to finish.",
    ],
    correctIndex: 1,
    explanation: "The rulebook specifically distinguishes ordinary clothing contact from a loose garment not worn properly. That detail controls whether first base is awarded. Reference: Rule 8-1-1d study area.",
  },
  {
    topicId: "appeals",
    prompt: "A half-inning ends, and the defense wants to appeal a runner missing home after all infielders have left fair territory. What should you know immediately?",
    answers: [
      "The appeal window has likely closed once the infielders have left the diamond at inning end.",
      "All end-of-inning appeals are automatically honored.",
      "Only the plate umpire may deny such appeals if the ball was dead.",
      "Appeals can be made in the next half-inning without restriction.",
    ],
    correctIndex: 0,
    explanation: "The appeal window does not stay open forever. End-of-half-inning appeals are tied to specific timing limits, including the infielders leaving the diamond. Reference: Rule 7 and Rule 8 timing provisions.",
  },
  {
    topicId: "balks",
    prompt: "The pitcher disengages legally with the pivot foot first and then feints to first. Which concept controls the ruling?",
    answers: [
      "Still a balk because any first-base feint is illegal.",
      "Once properly disengaged, the pitcher has infielder status for throw/feint purposes.",
      "It becomes obstruction on the batter.",
      "It is an automatic no-pitch.",
    ],
    correctIndex: 1,
    explanation: "Proper disengagement changes what the player may legally do next. Once off the plate legally, the pitcher gains infielder throw/feint rights. Reference: Rule 6 disengagement and pitching-position provisions.",
  },
  {
    topicId: "interference",
    prompt: "A team member in the dugout reaches out and hinders a live-ball defensive play on a runner. What family of rule are you in?",
    answers: [
      "Team personnel interference, with outs and runner placement handled under interference enforcement.",
      "Obstruction because the defense was hindered by the offense.",
      "Spectator interference because the dugout is outside the field.",
      "Ignore it unless the coach admits it.",
    ],
    correctIndex: 0,
    explanation: "Interference can come from others connected with the team, not just active runners. This is an immediate enforcement and placement issue, not something to play through casually. Reference: Dead-ball/interference tables.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "On a looping line drive, the fielder traps the ball against the ground but lifts the glove confidently. What should govern the call?",
    answers: [
      "The fielder's body language controls.",
      "Whether the ball was secured before touching the ground and the act of the catch was completed.",
      "The offensive coach's reaction.",
      "Whether the umpire was inside the cutout.",
    ],
    correctIndex: 1,
    explanation: "Catch/no-catch is evidence-based, not sold by body language. Secure possession before ground contact and completion of the act remain the controlling ideas. Reference: Rule 2 catch definition and manual below-the-knee catch language.",
  },
  {
    topicId: "rotations",
    prompt: "In a two-umpire game, why is 'pause, read and react' so important before moving on a developing play?",
    answers: [
      "It slows the game down for the coaches.",
      "It helps both umpires evaluate the same developing play and move into coordinated coverage instead of guessing early.",
      "It replaces the need for a pregame discussion.",
      "It means both umpires should wait until the play ends before moving.",
    ],
    correctIndex: 1,
    explanation: "The manual directly ties pause-read-react to coordinated two-man coverage. It prevents early drift and keeps the crew's movement aligned with the actual play. Reference: Umpires Manual Part 1.",
  },
  {
    topicId: "dead-ball",
    prompt: "A pitch bounces and goes through the catcher's legs into dead-ball territory with R1 on first. What timing concept starts your award?",
    answers: [
      "Time of pitch because this is a pitch-out-of-play award situation.",
      "Time the catcher crossed the foul line.",
      "Time of the runner's last legally touched base.",
      "No award unless the offense asks for it.",
    ],
    correctIndex: 0,
    explanation: "When a pitch goes into dead-ball territory, start with the pitch award framework and place runners from the proper timing reference. Reference: Rule 8 awards table and dead-ball study work.",
  },
  {
    topicId: "dead-ball",
    prompt: "A batted ball strikes a runner who is standing on a base while an infielder behind the runner still has a play. What should you identify first?",
    answers: [
      "Dead ball and runner interference because a fair batted ball struck a runner before passing an infielder.",
      "Nothing, because touching a base gives the runner full protection.",
      "Obstruction on the defense for failing to avoid the runner.",
      "Delayed dead ball until all play stops.",
    ],
    correctIndex: 0,
    explanation: "Base contact does not erase runner interference on a fair batted ball. Your first question is whether the ball had passed the protected fielder or another infielder had a play. Reference: Rule 8 interference and dead-ball enforcement.",
  },
  {
    topicId: "dead-ball",
    prompt: "Time has been granted, but the pitcher delivers and the batter hits a line drive into the gap. What is the ruling priority?",
    answers: [
      "Keep the ball live because the batter put it in play.",
      "Immediate dead ball because action after granted time does not stand.",
      "Award the batter first and score any runners who advance.",
      "Let the defense choose whether to accept the result.",
    ],
    correctIndex: 1,
    explanation: "Once time is granted, action after that point is dead. Your priority is dead-ball status first, not the quality of the contact. Reference: Rule 5 suspension-of-play concepts.",
  },
  {
    topicId: "dead-ball",
    prompt: "The bat hits the catcher on the backswing, and then the batter chops the ball fair in front of the plate. What must you decide first?",
    answers: [
      "Whether the backswing contact created an immediate dead ball under code.",
      "Whether the batter reached first before the throw.",
      "Whether the catcher would have thrown out the runner.",
      "Whether the coach requested interference.",
    ],
    correctIndex: 0,
    explanation: "Backswing interference has its own dead-ball treatment. Diagnose that before evaluating the weakly hit fair ball that followed. Reference: Rule 2 and Rule 7 offensive-interference study area.",
  },
  {
    topicId: "dead-ball",
    prompt: "With bases loaded, the batter is awarded first on ball four. Which runner movement is forced by rule, not judgment?",
    answers: [
      "Only the runner from third is forced home.",
      "All runners advance one base because the batter is awarded first.",
      "Runners advance only if the coach elects to send them.",
      "No runner moves until the ball becomes live again.",
    ],
    correctIndex: 1,
    explanation: "This is a rules award, not a play. Start with the forced advance created by the batter's award of first base. Reference: Rule 8 batter becomes runner and awards table.",
  },
  {
    topicId: "dead-ball",
    prompt: "A thrown ball by an infielder goes into the dugout. Before placing runners, what must you identify first?",
    answers: [
      "Whether the throw was from fair or foul territory only.",
      "The number of bases plus whether placement is from time of throw or another timing point.",
      "Whether the offensive coach wants to stop at one base.",
      "Whether the ball touched the fence first.",
    ],
    correctIndex: 1,
    explanation: "Thrown-ball awards start with timing and base count. Identify the governing award principle first, then place each runner accordingly. Reference: Rule 8 awards table.",
  },
  {
    topicId: "interference",
    prompt: "The batter remains in the box after a dropped third strike and hinders the catcher's throw to first. What family of ruling is this?",
    answers: [
      "Batter interference because the batter hindered the catcher's play.",
      "Obstruction by the catcher because contact happened near the plate.",
      "Nothing, because the batter is entitled to the box.",
      "Delayed dead ball with bases awarded at the end.",
    ],
    correctIndex: 0,
    explanation: "The plate area does not excuse hindering the catcher's play. Once the batter interferes with the retired or potential out play, interference enforcement controls. Reference: Rule 7 and Rule 8 batter interference.",
  },
  {
    topicId: "interference",
    prompt: "R1 slides hard into second and takes out the pivot man on a potential double play. What concept are you sorting out first?",
    answers: [
      "Runner interference on a force-play double-play attempt.",
      "Automatic obstruction on any hard slide.",
      "Nothing unless the fielder complains.",
      "Only whether the runner touched the base before contact.",
    ],
    correctIndex: 0,
    explanation: "On force-play slides, your first lens is interference and whether the runner illegally hindered the relay. Reference: Rule 8 force-play slide and interference study area.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 8"],
    prompt: "A retired runner continues running and draws a throw that allows another runner to advance. What issue must you evaluate?",
    answers: [
      "Whether the retired runner's act hindered or confused the defense enough to create interference.",
      "Whether any runner touched the next base before time was called.",
      "Whether the coach warned the runner to leave the field.",
      "Whether the throw was accurate enough to matter.",
    ],
    correctIndex: 0,
    explanation: "A retired runner can still interfere by hindering or confusing the defense. This is an interference judgment, not simply a courtesy reminder to clear the field. Reference: Rule 8 retired-runner interference.",
  },
  {
    topicId: "interference",
    prompt: "The on-deck batter picks up a loose bat while a live play is developing and bumps the catcher. What are you in first?",
    answers: [
      "Team-offense interference if the offensive team member hindered the defense.",
      "Spectator interference because the on-deck batter was outside the box.",
      "Nothing because the ball remained in the infield.",
      "Obstruction because the catcher was impeded.",
    ],
    correctIndex: 0,
    explanation: "Offensive team personnel can interfere during a live ball. Identify the hindrance first, then enforce the interference penalty and placements. Reference: Rule 3 bench conduct and Rule 8 interference framework.",
  },
  {
    topicId: "interference",
    prompt: "A fielder camps under a popup near first base, and the batter-runner collides with him while watching the ball. What matters most?",
    answers: [
      "Whether the batter-runner hindered a fielder attempting to catch a batted ball.",
      "Whether the batter-runner had already crossed the running lane line.",
      "Whether the umpire verbalized 'that's yours.'",
      "Whether the collision happened in fair territory only.",
    ],
    correctIndex: 0,
    explanation: "Any fielder attempting to catch a batted ball is protected. Your first job is deciding whether the runner hindered that protected act. Reference: Rule 8 runner interference on a batted ball.",
  },
  {
    topicId: "interference",
    prompt: "The base coach physically grabs R2 and pushes him back toward second on a rundown. What should you think first?",
    answers: [
      "Assisted runner, which is offensive interference territory.",
      "Nothing, because base coaches may touch runners freely.",
      "Obstruction on the defense because the runner changed direction.",
      "Dead ball only if the defense asks for help.",
    ],
    correctIndex: 0,
    explanation: "Physically assisting a runner is a rules violation, not legal coaching. Identify the assistance first, then apply the penalty that follows. Reference: Rule 8 assisted-runner study area.",
  },
  {
    topicId: "appeals",
    prompt: "R1 misses second on a double. The defense tags second before the next pitch while the ball is live. What is the defense attempting?",
    answers: [
      "A live-ball appeal on a missed base.",
      "An obstruction claim against the runner.",
      "A dead-ball protest requiring the plate umpire.",
      "Nothing recognized by rule.",
    ],
    correctIndex: 0,
    explanation: "A runner missing a base can be put out on a proper appeal before the window closes. Tagging the base live with the ball is one recognized appeal method. Reference: Rule 8 appeal procedures.",
  },
  {
    topicId: "appeals",
    prompt: "The defense wants to appeal batting out of order, but a play has already occurred after the improper batter completed the at-bat. What should you know?",
    answers: [
      "The appeal window likely closed when the next play occurred.",
      "Batting-order appeals never close.",
      "Only the offensive team can cancel the improper batter.",
      "The proper batter is out no matter when the defense notices.",
    ],
    correctIndex: 0,
    explanation: "Batting-order enforcement is timing-dependent. Once the next pitch, play, or attempted play closes the window, the improper action is legalized. Reference: Rule 7 batting-order procedures.",
  },
  {
    topicId: "appeals",
    prompt: "R3 leaves early on a caught fly, but the defense throws to first instead of appealing home or third. What do you need to judge?",
    answers: [
      "Whether that subsequent play or attempted play ended the defense's appeal opportunity.",
      "Whether the runner touched home before the throw.",
      "Whether the first baseman verbally announced an appeal.",
      "Whether the ball remained in fair territory.",
    ],
    correctIndex: 0,
    explanation: "Appeal rights can be lost by a play or attempted play. Your first question is whether the defense gave away its own appeal window. Reference: Rule 8 appeal timing.",
  },
  {
    topicId: "appeals",
    prompt: "A coach asks, 'Blue, he missed the bag,' while the ball is dead and no defensive player makes a tag or touch. What should you know?",
    answers: [
      "An appeal requires proper action by a defensive player, not just a coach's statement.",
      "The verbal comment alone is always enough.",
      "The plate umpire may make the appeal for the defense.",
      "Dead-ball appeals are impossible in NFHS.",
    ],
    correctIndex: 0,
    explanation: "The appeal belongs to the defense through a proper player action, not merely a dugout announcement. Know the method as well as the timing. Reference: Rule 8 appeal procedure.",
  },
  {
    topicId: "appeals",
    prompt: "With two outs, R3 misses home on a ball in play. The defense properly appeals before all infielders leave fair territory. Why is this appeal especially important?",
    answers: [
      "Because an upheld appeal out can erase a run that otherwise appeared to score.",
      "Because appeals cannot be made with two outs unless the coach requests it.",
      "Because the run always scores first and the appeal only adds an extra out.",
      "Because appeals at home are automatic dead-ball awards.",
    ],
    correctIndex: 0,
    explanation: "Missed-home and force/appeal scoring plays are tightly linked. A proper appeal can remove a run if it creates the relevant out. Reference: Rule 9 scoring and Rule 8 appeals.",
  },
  {
    topicId: "appeals",
    prompt: "The batter-runner misses first and enters the dugout. The defense tags first before the next pitch. What are they trying to record?",
    answers: [
      "An appeal out for missing first base.",
      "A balk on the pitcher because play paused.",
      "A substitution violation because the batter entered dead-ball territory.",
      "An automatic unsportsmanlike warning.",
    ],
    correctIndex: 0,
    explanation: "Missing first is still appealable if the defense acts before the appeal window closes. The dugout trip does not erase the appeal right by itself. Reference: Rule 8 missed-base appeals.",
  },
  {
    topicId: "balks",
    prompt: "With R1 on first, the pitcher from set starts toward home, then throws to first without first legally disengaging. What are you evaluating?",
    answers: [
      "A balk because the pitcher initiated a home move and altered it while engaged.",
      "A legal pick because any move to first is allowed.",
      "A no-pitch because the batter was not ready.",
      "Obstruction on the runner at first.",
    ],
    correctIndex: 0,
    explanation: "Once engaged, the pitcher must comply with legal move requirements. Starting one action and illegally converting to another is balk territory. Reference: Rule 6 pitching restrictions.",
  },
  {
    topicId: "balks",
    prompt: "The pitcher in windup takes signs with the pivot foot not in legal contact with the pitcher's plate, then delivers. What should concern you first?",
    answers: [
      "Whether the pitcher assumed a legal pitching position before the delivery.",
      "Whether the batter offered at the pitch.",
      "Whether the catcher was fully in the box.",
      "Whether a runner attempted a steal.",
    ],
    correctIndex: 0,
    explanation: "Legal pitching begins with legal position. If the pivot foot and body position are wrong, the entire delivery starts from an improper foundation. Reference: Rule 6 windup and set position requirements.",
  },
  {
    topicId: "balks",
    prompt: "With runners on, the pitcher drops the ball while in contact with the plate but before making a play. Which framework applies?",
    answers: [
      "Pitching infraction/balk treatment because the pitcher mishandled the live ball while engaged.",
      "Automatic no-pitch with no runner movement.",
      "Nothing, because the ball stayed near the mound.",
      "Obstruction because the batter may have been deceived.",
    ],
    correctIndex: 0,
    explanation: "A dropped ball by an engaged pitcher with runners on sends you into Rule 6 enforcement territory. Start there before anything else. Reference: Rule 6 engaged-pitcher infractions.",
  },
  {
    topicId: "balks",
    prompt: "The pitcher quick-pitches the batter with no runners on base. What is the core ruling concept?",
    answers: [
      "Illegal pitch/ball because the batter was not given proper opportunity to be ready.",
      "Balk, because all quick pitches are balks.",
      "Live ball if the batter makes contact.",
      "Automatic strike because the pitch crossed the plate.",
    ],
    correctIndex: 0,
    explanation: "Without runners, quick pitch issues stay in the illegal-pitch/ball framework rather than balk enforcement. The key is the pitcher's unfair haste. Reference: Rule 6 quick-pitch language.",
  },
  {
    topicId: "balks",
    prompt: "From set position, the pitcher separates the hands, then pauses, then delivers without first stepping off. What should your first lens be?",
    answers: [
      "Whether the engaged pitcher made an illegal interrupted delivery.",
      "Whether the catcher caught the pitch cleanly.",
      "Whether the batter called time.",
      "Whether the runner at first was stealing.",
    ],
    correctIndex: 0,
    explanation: "Hand separation and delivery sequence matter. Once engaged, interruption without legal disengagement is a Rule 6 problem. Reference: Rule 6 delivery requirements.",
  },
  {
    topicId: "balks",
    prompt: "The pitcher feints to third from the rubber with no intent to throw and then turns to first. What should anchor your ruling?",
    answers: [
      "Whether the move complies with current NFHS engaged-pitcher move restrictions.",
      "Whether the runner at first reacted strongly.",
      "Whether the plate umpire had already signaled live ball.",
      "Whether the coach had discussed the move in pregame.",
    ],
    correctIndex: 0,
    explanation: "This is a pure Rule 6 move-legality question. Start with the engaged pitcher's permissible feints and throws under current code. Reference: Rule 6 pitching moves and 2025 study emphasis.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "A fielder secures a fly ball, collides with the fence, and the ball comes loose only after the impact and fall. What governs the call?",
    answers: [
      "Whether the fielder had secure possession long enough to complete the catch despite the subsequent collision.",
      "Whether the coach believed the fence caused the drop.",
      "Whether the fielder raised the glove after the play.",
      "Whether the ball stayed in fair territory after release.",
    ],
    correctIndex: 0,
    explanation: "Do not shortcut this to 'he hit the fence, so no catch.' Secure possession and completion of the act remain the governing ideas. Reference: Rule 2 catch definition.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "An infielder traps a low liner into the grass, but the crowd and dugout react as though it was caught. What should control your ruling?",
    answers: [
      "Ball evidence, not reactions. Judge secure possession before any ground contact.",
      "The louder bench reaction.",
      "Whether the pitcher thought it was caught.",
      "Whether the ball ended up in the glove after the trap.",
    ],
    correctIndex: 0,
    explanation: "Crowd noise and confident body language are not evidence. The catch/no-catch ruling turns on secure possession and the ball not contacting the ground first. Reference: Rule 2 definitions.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "The catcher catches a foul tip cleanly and the ball goes directly to the mitt. Which concept should you recognize first?",
    answers: [
      "A foul tip is live and counts as a strike when it goes sharp and direct to the catcher's hand or mitt.",
      "Any touched foul ball is dead immediately.",
      "Foul tip and foul ball are enforced the same way.",
      "The batter is always out on a foul tip.",
    ],
    correctIndex: 0,
    explanation: "Foul tip language matters because it changes ball status. This is a live-ball strike concept, not an ordinary dead foul ball. Reference: Rule 2 foul tip definition.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "A fielder intentionally drops a line drive with runners on first and second and less than two outs. What do you need to distinguish first?",
    answers: [
      "Whether this is an intentionally dropped ball rule issue rather than an ordinary no-catch only.",
      "Whether the batter-runner reached first before the call.",
      "Whether the umpire was in foul territory.",
      "Whether the coach requested the infield fly.",
    ],
    correctIndex: 0,
    explanation: "Some no-catch plays trigger a specific dead-ball rule. The first question is whether intentionally dropped ball provisions apply. Reference: Rule 5 dead-ball and Rule 2/8 study connections.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "The outfielder secures the ball in the glove, transfers it to the throwing hand, and drops it while taking the throw-out step. What should your timing protect?",
    answers: [
      "Your judgment on whether the transfer showed voluntary release after completing the catch.",
      "Whether the player looked smooth enough.",
      "Whether the base umpire mirrored your out signal.",
      "Whether the offensive coach left the box.",
    ],
    correctIndex: 0,
    explanation: "Transfer drops are not automatic no-catches. Timing protects your read on secure possession, completed act, and voluntary release. Reference: Rule 2 catch completion.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "A popup near the line is gloved, bobbled, and then pinned against the chest before touching the ground. What should you decide first?",
    answers: [
      "Whether the fielder ultimately secured possession before the ball touched the ground.",
      "Whether the fielder was in fair or foul territory after the bobble.",
      "Whether the offensive team stopped running.",
      "Whether the ball sounded like it hit leather cleanly.",
    ],
    correctIndex: 0,
    explanation: "Bobbles do not automatically erase a catch if the ball never contacts the ground and secure possession is achieved. Reference: Rule 2 catch/no-catch study area.",
  },
  {
    topicId: "rotations",
    prompt: "With two umpires and no runners, U1 goes out on a trouble ball. Where should the plate umpire be thinking next if the batter-runner advances hard?",
    answers: [
      "Rotating into uncovered base responsibilities rather than staying anchored at home.",
      "Remaining at the plate because rotations never change with no runners.",
      "Waiting for U1 to return before calling anything.",
      "Calling time to reset the crew.",
    ],
    correctIndex: 0,
    explanation: "When one umpire goes out, someone must own the uncovered base play. Rotation awareness starts before the throw is made. Reference: Two-umpire manual coverage.",
  },
  {
    topicId: "rotations",
    prompt: "With R1 and R3, a fly ball to the outfield sends the base umpire out. What is the plate umpire's first mental adjustment?",
    answers: [
      "Coverage has expanded, so the plate umpire must be ready to leave home for uncovered runner plays after reading the ball.",
      "Stay home no matter what because there is a runner at third.",
      "Only watch the catch and let runners self-administer.",
      "Turn the play over to the nearest coach.",
    ],
    correctIndex: 0,
    explanation: "Going-out mechanics create vacancies. The remaining umpire cannot stay fixed if the play develops away from the plate. Reference: Umpires Manual crew-of-two rotations.",
  },
  {
    topicId: "rotations",
    prompt: "On a ground ball in the infield, what is the danger of moving before you read the throw and runner path?",
    answers: [
      "You can outrun the play and lose angle, timing, and responsibility clarity.",
      "Nothing; earlier movement is always better.",
      "It speeds the game up for the defense.",
      "It guarantees the call will be sold better.",
    ],
    correctIndex: 0,
    explanation: "Good mechanics are not just movement, but controlled movement. Pause-read-react protects angle, timing, and who owns the play. Reference: Manual movement fundamentals.",
  },
  {
    topicId: "rotations",
    prompt: "Your partner signals he is staying with a trouble ball. What should your crew response be?",
    answers: [
      "Immediately adjust your own coverage because responsibility has shifted.",
      "Ignore it unless he repeats the signal twice.",
      "Keep your original coverage and hope the play stays simple.",
      "Wait until the inning ends to discuss it.",
    ],
    correctIndex: 0,
    explanation: "Trouble-ball communication only matters if the partner receives and acts on it. Coverage shifts must be acknowledged and absorbed in real time. Reference: Manual team-work language.",
  },
  {
    topicId: "rotations",
    prompt: "Why should a base umpire avoid drifting toward the ball on every routine hit?",
    answers: [
      "Because drifting can cost the angle needed for touches, tags, and the next likely play.",
      "Because umpires should never move on a batted ball.",
      "Because it makes the pitcher uncomfortable.",
      "Because only the plate umpire should read the ball.",
    ],
    correctIndex: 0,
    explanation: "Ball-watching drift is a common mechanics leak. Good umpiring preserves angle and prepares for the actual play rather than chasing the ball with your feet. Reference: Base-work movement anchors.",
  },
  {
    topicId: "rotations",
    prompt: "In pregame, why do crews talk through line-drive trouble reads and third-to-first coverage specifically?",
    answers: [
      "Because those plays create fast responsibility changes and are easier when the crew already has shared language.",
      "Because the rulebook requires those exact phrases.",
      "Because only varsity crews are allowed to discuss them.",
      "Because they matter more than all other live-ball plays.",
    ],
    correctIndex: 0,
    explanation: "Pregame is where you reduce uncertainty on the fastest coverage changes. Shared language is what lets the crew react together at game speed. Reference: Pregame prompts and manual teamwork sections.",
  },
  {
    topicId: "dead-ball",
    prompt: "A fair batted ball deflects off a fielder and then lodges under the outfield fence. What should guide you first?",
    answers: [
      "The dead-ball award tied to a lodged fair ball after the deflection.",
      "Whether the outfielder raised both hands.",
      "Whether the coach wanted to send the runner.",
      "Whether the ball crossed the warning track first.",
    ],
    correctIndex: 0,
    explanation: "Once a fair ball becomes lodged, the award framework controls regardless of the prior deflection. Start with the dead-ball award concept, then place runners. Reference: Rule 5 dead-ball table and Rule 8 awards work.",
  },
  {
    topicId: "dead-ball",
    prompt: "The batter bunts, and the ball hits the plate and then settles in fair territory after everyone momentarily stops. What should anchor your ruling?",
    answers: [
      "Whether the ball remains live and fair despite touching the plate.",
      "The plate is out of play, so the ball must be dead.",
      "Automatic foul because the ball hit home plate first.",
      "Dead ball unless the catcher fields it immediately.",
    ],
    correctIndex: 0,
    explanation: "Touching the plate does not kill the ball. You still have to judge fair/foul and live-ball status under ordinary bunt rules. Reference: Rule 2 fair/foul concepts and Rule 5 live-ball principles.",
  },
  {
    topicId: "interference",
    prompt: "The batter-runner collides with the first baseman taking a throw, but the first baseman has moved into the running lane without the ball. What issue comes first?",
    answers: [
      "Whether the defense created obstruction rather than the runner creating interference.",
      "Automatic runner interference because there was contact near first.",
      "Whether the throw was high enough to ignore the contact.",
      "Whether the coach yelled 'lane' before the collision.",
    ],
    correctIndex: 0,
    explanation: "Contact near first is not automatically batter-runner interference. First decide whether the fielder without the ball illegally hindered the runner. Reference: Rule 2 obstruction definition and Rule 8 obstruction/interference distinctions.",
  },
  {
    topicId: "interference",
    prompt: "R3 breaks home on a squeeze, misses the plate area, and crashes into the catcher trying to field a throw before the catcher ever has possession. What must you sort out?",
    answers: [
      "Whether the runner hindered a fielder in the act of fielding a thrown ball and created interference.",
      "Nothing because the catcher did not yet control the ball.",
      "Automatic obstruction because the runner was going home.",
      "A delayed dead ball only if the ball gets away.",
    ],
    correctIndex: 0,
    explanation: "A fielder can be protected while attempting to field a thrown ball, not only after secure possession. Your first task is deciding whether the runner illegally hindered that protected act. Reference: Rule 8 runner interference.",
  },
  {
    topicId: "appeals",
    prompt: "On a caught fly, R1 leaves early and returns to first safely. Before the next pitch, the defense tags first with the live ball. What are they doing?",
    answers: [
      "Appealing the early leave even though the runner returned to the base.",
      "Nothing, because returning cures the early leave automatically.",
      "Making a force play on the batter-runner.",
      "Requesting obstruction enforcement.",
    ],
    correctIndex: 0,
    explanation: "Returning to the original base does not erase a leaving-early violation. The defense may still record the out with a proper appeal before the window closes. Reference: Rule 8 appeal procedure and tag-up timing.",
  },
  {
    topicId: "appeals",
    prompt: "The defense appeals batting out of order after the proper batter has already completed a turn at bat. What should you know?",
    answers: [
      "The prior improper action has been legalized once the next proper sequence progressed that far.",
      "The improper batter can still always be declared out retroactively.",
      "The coach chooses which at-bat stands.",
      "Only the plate umpire may decide if the lineup resets.",
    ],
    correctIndex: 0,
    explanation: "Batting-order remedies depend on when the defense catches the mistake. Once the game moves beyond the proper appeal window, the earlier action is legalized. Reference: Rule 7 batting-order enforcement.",
  },
  {
    topicId: "balks",
    prompt: "With R2 on second, the pitcher from set turns the shoulders toward second but never steps, then throws there. What should your first question be?",
    answers: [
      "Whether the pitcher legally stepped toward the base before throwing while engaged.",
      "Whether the runner broke for third.",
      "Whether the shortstop was covering the bag.",
      "Whether the throw stayed on the infield dirt.",
    ],
    correctIndex: 0,
    explanation: "Pickoff legality starts with the pitcher's step and movement obligations while engaged. Turning the body is not enough by itself. Reference: Rule 6 throw/feint requirements.",
  },
  {
    topicId: "balks",
    prompt: "The pitcher comes set with the ball in the glove but then quickly swaps the ball to the bare hand and delivers without a stop. What framework controls?",
    answers: [
      "The legality of the set position and delivery sequence under Rule 6.",
      "Nothing, because hand changes are never regulated.",
      "Catcher's obstruction, because the batter may be distracted.",
      "Automatic no-pitch because the ball changed hands.",
    ],
    correctIndex: 0,
    explanation: "Any movement from the set position still has to satisfy legal stop and delivery requirements. Start with Rule 6 sequence and deception limits. Reference: Rule 6 set-position study points.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "A fielder reaches into the dugout opening and secures a popup while both feet remain in live-ball territory. What should you judge first?",
    answers: [
      "Whether the catch was legally completed before entering dead-ball territory.",
      "Whether the offensive coach objected to the reach.",
      "Whether the ball crossed the foul line first.",
      "Whether the player touched the railing with the glove.",
    ],
    correctIndex: 0,
    explanation: "This is a catch-completion and dead-ball-boundary issue. Start with whether the fielder legally secured the ball while still entitled to the catch. Reference: Rule 2 catch and dead-ball territory concepts.",
  },
  {
    topicId: "catch-no-catch",
    prompt: "The catcher secures a pop foul, hits the fence, and drops the ball only after voluntarily reaching for the transfer. What should your timing protect?",
    answers: [
      "Whether the catcher had already completed the catch before the later release.",
      "Whether the dugout yelled 'that's a catch.'",
      "Whether the batter had started back to the bench.",
      "Whether the drop happened in foul territory.",
    ],
    correctIndex: 0,
    explanation: "You still must separate catch completion from a later voluntary release. The collision alone does not end the analysis. Reference: Rule 2 catch completion principles.",
  },
  {
    topicId: "rotations",
    prompt: "With R1 only, a ground ball to the outfield creates a play developing at third after the batter-runner threatens second. What should the crew be reading?",
    answers: [
      "Which base is becoming the next likely play so coverage shifts can happen before the throw arrives.",
      "Whether both umpires can watch the runner at first the whole time.",
      "Whether the coach is giving aggressive signals.",
      "Whether the ball remains on the grass.",
    ],
    correctIndex: 0,
    explanation: "Rotations are driven by the next likely play, not by where the runner started. The crew should read the developing base pressure and adjust coverage early. Reference: Manual pause-read-react and rotation priorities.",
  },
  {
    topicId: "rotations",
    prompt: "On a trouble fly ball near the line, why is verbal or visual communication between umpires so important before the ball is caught or dropped?",
    answers: [
      "Because ownership of the ball and the next base responsibility may both change instantly.",
      "Because the rulebook requires two signals on every fly ball.",
      "Because coaches cannot see the line from the dugout.",
      "Because all trouble balls automatically belong to the plate umpire.",
    ],
    correctIndex: 0,
    explanation: "Trouble balls can change both ball coverage and runner-play ownership in one beat. Clear crew communication prevents two umpires from taking the same thing or leaving a play uncovered. Reference: Manual teamwork and going-out mechanics.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 1"],
    prompt: "During pregame, the home coach presents baseballs without the required authenticating mark. Which rule-family issue are you dealing with first?",
    answers: [
      "Equipment and game-ball legality before play starts.",
      "A live-ball appeal issue that waits until the first pitch.",
      "Nothing, because ball legality is only a state-association issue.",
      "Automatic forfeiture if one illegal ball is found.",
    ],
    correctIndex: 0,
    explanation: "This starts as a Rule 1 equipment and game-ball legality issue. The crew should address legal baseballs before the game begins rather than treating it as an in-game appeal. Reference: Rule 1 equipment and 2025 ball-authentication emphasis.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 1"],
    prompt: "A batter enters with a noncompliant bat discovered before the next pitch after a double. What is the crew sorting out first under the code structure?",
    answers: [
      "Whether the bat met equipment legality requirements and what penalty/enforcement follows.",
      "Whether the defense can only protest after the inning.",
      "Whether the ball was dead when the batter touched first.",
      "Whether the umpire warned the dugout before the at-bat.",
    ],
    correctIndex: 0,
    explanation: "The first issue is bat legality under Rule 1, followed by the proper batting penalty and placement consequences. Illegal equipment is not just a coaching conversation. Reference: Rule 1 equipment and Rule 7 batting enforcement.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "A substitute enters on defense without being reported and records an out before the offense notices. What is the key study concept?",
    answers: [
      "Substitution legality and timing under the reporting requirements.",
      "Nothing, because any unreported substitute is legalized immediately.",
      "Automatic ejection of the head coach.",
      "Dead ball and replay of the pitch by rule.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 starts with when a substitute becomes legal and what happens if a player enters unreported. The first job is to classify the substitution status correctly before enforcing any follow-up penalty. Reference: Rule 3 substitution procedures.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "Bench personnel continue chirping warnings after the coach has been addressed once. What rule family governs your next step?",
    answers: [
      "Bench conduct and coach responsibility for personnel under Rule 3.",
      "Baserunning awards because the ball is dead.",
      "Only local ground rules, not NFHS code.",
      "Rule 9 scoring because the behavior happened between innings.",
    ],
    correctIndex: 0,
    explanation: "This is a bench-conduct and game-management issue tied to coach responsibility for the dugout. The rule framework is Rule 3, not an informal warning-only area. Reference: Rule 3 bench and field conduct.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 4"],
    prompt: "Just before the first pitch, a coach asks to add a special out-of-play area as a ground rule. What must the umpire crew think about first?",
    answers: [
      "Pregame ground-rule authority and whether the requested rule is legal and workable.",
      "Whether the offense or defense benefits more from the rule.",
      "Whether the ball has already been made live.",
      "Whether the official scorer agrees with the request.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 covers pregame procedure and ground-rule authority. The crew should first decide whether the requested ground rule is legal and appropriate before adopting it. Reference: Rule 4 starting game and ground-rule authority.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 4"],
    prompt: "Heavy rain ends play in the fifth inning with the home team tied after completing its turn at bat. What rule family controls whether the game is official, suspended, or resumed later?",
    answers: [
      "Starting and ending game status under Rule 4.",
      "Only Rule 9 because a score exists.",
      "Rule 6 because weather affects pitching conditions.",
      "No rule applies once weather halts the game.",
    ],
    correctIndex: 0,
    explanation: "When weather stops a game, Rule 4 supplies the framework for official-game status, suspended contests, and resumption. The score matters, but the governing family is still Rule 4. Reference: Rule 4 ending-game provisions.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 9"],
    prompt: "With two outs, R3 touches home before the batter-runner is retired for the third out at first. What scoring question should you answer first?",
    answers: [
      "Whether the third out was a force out or timing out that prevents the run.",
      "Whether the run crossed before the ball reached first on any play.",
      "Whether the offense asked for the run to count.",
      "Whether the plate umpire signaled safe at home.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring starts with the nature of the third out. Force outs and certain batter-runner third outs erase runs regardless of apparent timing. Reference: Rule 9 scoring on third-out plays.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 9"],
    prompt: "R3 scores on a play where the defense later records a proper appeal out on R1 for missing third base as the third out. What must the umpire know?",
    answers: [
      "An appeal out can affect whether the apparent run counts under Rule 9.",
      "Appeal outs never affect scoring once home plate is touched.",
      "The run always counts unless the appeal was made by the plate umpire.",
      "Only force plays matter for scoring decisions.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 requires you to connect appeal outs to run-scoring consequences. The run does not automatically count just because it crossed before the appeal was completed. Reference: Rule 9 scoring and Rule 8 appeal interaction.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "A coach asks you to overturn your partner's fair/foul judgment from the other side of the field. What rule concept should guide your response first?",
    answers: [
      "Umpire jurisdiction and the limits on changing judgment calls.",
      "Any coach request requires a full crew conference.",
      "The plate umpire may reverse any call as crew chief.",
      "Judgment calls become appealable if asked politely.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 distinguishes jurisdiction and authority from coach dissatisfaction. Start with who owned the call and whether it is the kind of judgment that is even subject to change. Reference: Rule 10 umpiring authority.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "After a close play, a coach wants to discuss a rule interpretation, not argue judgment. What should the crew recognize first?",
    answers: [
      "The difference between a rules question and a pure judgment dispute.",
      "All discussions after close plays are unsportsmanlike by default.",
      "Only the field umpire may answer rules questions.",
      "Rules questions must wait until after the inning.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 expects umpires to separate rule interpretations from unchangeable judgment. That distinction controls whether there is a legitimate conference or simply a complaint about the call. Reference: Rule 10 rules-versus-judgment authority.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 1"],
    prompt: "Before the game, the catcher presents a mask with a damaged throat protector attachment. What should the crew handle first?",
    answers: [
      "Equipment legality and correction before the ball is made live.",
      "A delayed-dead-ball warning after the first pitch.",
      "An automatic ejection of the catcher.",
      "Nothing if the coach approves the mask.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 is where protective-equipment legality starts. The crew should fix unsafe or illegal equipment before play begins rather than waiting for an in-game penalty situation.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 1"],
    prompt: "The lineup card lists only eight defensive players when the plate meeting starts. What is the first issue under the code structure?",
    answers: [
      "Required player-position and lineup compliance before starting the game.",
      "A scoring issue to fix after the first half-inning.",
      "A live-ball batting-order appeal.",
      "An automatic forfeit with no correction allowed.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 governs the required number of players and legal participation structure before the game starts. The first task is getting the lineup and fielding requirements legal.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 1"],
    prompt: "A batter appears with jewelry or equipment prohibited by the local adoption of NFHS code. What should the umpire crew identify first?",
    answers: [
      "Whether the item is legal equipment or apparel under the game’s governing code.",
      "Whether the opposing coach noticed it first.",
      "Whether the player used the item on a scoring play.",
      "Whether the official scorer wants it documented.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 is the right starting place for player equipment legality. First decide whether the item is permitted, then apply the correction or penalty that follows.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 1"],
    prompt: "A coach requests a game ball change because the current balls feel slick but they are otherwise legal. What is the umpire judging first?",
    answers: [
      "Game-ball legality and whether the request is about preference rather than rule compliance.",
      "A suspended-game condition.",
      "A batting-order violation.",
      "An appealable equipment protest by the defense.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 separates legal-game-ball issues from personal preference. The crew should start by deciding whether the complaint is about illegality or simply comfort.",
  },
  {
    topicId: "catch-no-catch",
    ruleIds: ["Rule 2"],
    prompt: "On a force play, the fielder tags the base while bobbling the ball in the glove. Which definition controls the ruling first?",
    answers: [
      "Whether the fielder had secure possession while touching the base.",
      "Whether the runner slid legally.",
      "Whether the coach asked for a force call.",
      "Whether the ball stayed in fair territory.",
    ],
    correctIndex: 0,
    explanation: "Rule 2 definitions drive later rulings. On a force play, you start with possession and control before deciding whether the out was actually recorded.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 2"],
    prompt: "A coach says the runner missed a base, but you need to know if the next action can still fix it. Which kind of Rule 2 term matters most?",
    answers: [
      "The timing and appeal-related definitions that affect later enforcement.",
      "Only the definition of a strike.",
      "The definition of sportsmanship.",
      "Only the rulebook’s scorer terminology.",
    ],
    correctIndex: 0,
    explanation: "Rule 2 is where timing language such as live-ball concepts and appeal terminology begins. Those definitions shape whether the defense still has a valid appeal option.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 2"],
    prompt: "A runner and fielder come together near second. Before calling anything, what basic Rule 2 separation should the umpire make?",
    answers: [
      "Whether the act is interference or obstruction.",
      "Whether the play happened in the infield or outfield.",
      "Whether the offense or defense is louder.",
      "Whether both dugouts reacted at once.",
    ],
    correctIndex: 0,
    explanation: "Rule 2 definitions are essential here because obstruction and interference are different acts with different penalties. The first step is naming the act correctly.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 2"],
    prompt: "A fair ball deflects out of play and the crew starts placing runners. Which Rule 2 idea matters before you ever place bases?",
    answers: [
      "The timing definition that tells you when awards are measured from.",
      "The definition of a charged conference.",
      "The definition of a legal substitute.",
      "The definition of batting out of order.",
    ],
    correctIndex: 0,
    explanation: "Award enforcement starts with timing words. Rule 2 language like time of pitch or time of throw controls how later placement is judged.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "The head coach argues after being restricted to the bench. What rule family should frame the next umpire response?",
    answers: [
      "Bench and field conduct restrictions under Rule 3.",
      "Rule 8 baserunning awards.",
      "Rule 5 delayed-dead-ball enforcement.",
      "Rule 9 scoring only.",
    ],
    correctIndex: 0,
    explanation: "Once conduct restrictions are in play, Rule 3 governs how bench personnel and coaches may continue participating. The crew should stay in the conduct framework, not drift into unrelated enforcement.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "A defensive player re-enters after being removed in a non-reentry spot. What is the first thing to diagnose?",
    answers: [
      "Whether the substitution and reentry were legal under participation rules.",
      "Whether the runner on base noticed it.",
      "Whether the ball was live at the moment of entry.",
      "Whether the plate umpire announced it over the field mic.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 controls reentry status, legal participation, and the consequences of an improper substitute. Start with player-status legality before enforcing the outcome.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "A charged conference begins with one assistant and grows into a full infield visit. What rule concept matters most?",
    answers: [
      "When the conference starts and how it counts under Rule 3.",
      "Whether the conference happens on the foul line.",
      "Whether the opposing coach objects.",
      "Whether the inning has two outs.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 conference limits turn on when the conference is recognized and how it is charged. The count does not depend on how casual the visit looked at first.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 3"],
    prompt: "A player-coach leaves the coaching box and begins live criticism of calls from foul territory. What framework should guide your action?",
    answers: [
      "Bench and coaching conduct responsibilities under Rule 3.",
      "Only Rule 10 because umpires were involved.",
      "A dead-ball award rule.",
      "A batting-order appeal.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 covers who may coach, where coaching may occur, and when conduct crosses into a restriction or ejection issue. Stay within that conduct framework first.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 4"],
    prompt: "The visiting team has not taken the field, but a delay is caused by a field-condition issue discovered during warmups. What does the crew need to settle first?",
    answers: [
      "Pregame authority and whether the contest can legally start under the current conditions.",
      "A scoring correction from the previous game.",
      "The batting order for the top of the first.",
      "Whether any runner awards are pending.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 gives the crew pregame authority to judge whether the game can start and under what conditions. That must be resolved before any live-ball matters exist.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 4"],
    prompt: "A game is halted for weather after becoming official, and local policy may require resumption later. What should the umpire recognize first?",
    answers: [
      "That Rule 4 controls official-game and suspended-game status.",
      "That the game is automatically final anytime five innings are complete.",
      "That only the home coach can declare the game over.",
      "That the official scorer decides whether it resumes.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 distinguishes an official game from a suspended game. The crew should first identify the contest-status category before deciding what happens next.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 4"],
    prompt: "Before the game starts, one coach asks for a local interpretation that would conflict with NFHS code. What is the umpire’s first question?",
    answers: [
      "Whether the requested ground rule is legal under the code and the state’s adoption authority.",
      "Whether both coaches are equally confused.",
      "Whether the dugouts have already agreed to it.",
      "Whether it makes the game shorter.",
    ],
    correctIndex: 0,
    explanation: "Ground rules cannot override the code just because both coaches like them. Rule 4 requires the crew to start with legality and adoption authority.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 4"],
    prompt: "A regulation-game question comes up in the late innings. What should the crew know before talking run differential or weather details?",
    answers: [
      "Which Rule 4 status rules govern when a game is official or suspended.",
      "Only how many strikeouts each pitcher has.",
      "Whether the defense is due up next inning.",
      "Whether the scoreboard operator has left.",
    ],
    correctIndex: 0,
    explanation: "Late-game management starts with Rule 4 status, not informal memory. Once the crew knows the contest-status framework, the rest of the discussion becomes clearer.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 5"],
    prompt: "A fair batted ball touches a runner before passing an infielder with a play. What is the first Rule 5 consequence?",
    answers: [
      "The ball becomes dead immediately and interference enforcement follows.",
      "The ball stays live until all runners stop.",
      "Only the runner is warned if the contact was accidental.",
      "Nothing changes unless the defense asks for time.",
    ],
    correctIndex: 0,
    explanation: "Rule 5 matters because some interference plays are immediate dead balls. Once the protected act is hindered, stop play and enforce from there.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 5"],
    prompt: "A batter hits a fair ball over the outfield fence in flight. What is the dead-ball concept first?",
    answers: [
      "Immediate dead ball with home-run award placement.",
      "Delayed dead ball until all runners touch the next base.",
      "Live ball unless the umpire verbally calls time.",
      "Dead ball only if the defense requests one.",
    ],
    correctIndex: 0,
    explanation: "A fair ball over the fence in flight is one of the cleanest immediate dead-ball situations. Start with Rule 5 status, then place runners under the award rule.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 5"],
    prompt: "On a third strike, the batter interferes with the catcher’s chance to retire the runner stealing second. What status question comes first?",
    answers: [
      "Whether the act creates an immediate dead ball before placements are handled.",
      "Whether the runner reached second before the interference.",
      "Whether the batter intended to interfere.",
      "Whether the defense asked the umpire for help.",
    ],
    correctIndex: 0,
    explanation: "Interference enforcement often begins with ball status. Rule 5 tells you whether the play dies immediately before you move to outs and runner placement.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 5"],
    prompt: "A pitch lodges in the umpire’s equipment after deflecting off the catcher. What does the crew need first?",
    answers: [
      "The dead-ball status and the award framework that follows.",
      "A replay of the pitch with all runners returning.",
      "A scorer’s ruling on whether it counts as a passed ball.",
      "An automatic balk on the pitcher.",
    ],
    correctIndex: 0,
    explanation: "When the ball becomes lodged, start with Rule 5 dead-ball status. Once play is properly killed, the crew can enforce the appropriate pitch award.",
  },
  {
    topicId: "balks",
    ruleIds: ["Rule 6"],
    prompt: "From the set position with runners on, the pitcher begins the motion and then flinches backward without disengaging. What is the correct lens?",
    answers: [
      "A Rule 6 balk/illegal-move question.",
      "Only a timing problem for the batter.",
      "A dead ball with no runner award.",
      "Nothing if the ball was not released.",
    ],
    correctIndex: 0,
    explanation: "Engaged-pitcher flinches and illegal interruptions belong in Rule 6. Start with move legality before deciding the specific penalty.",
  },
  {
    topicId: "balks",
    ruleIds: ["Rule 6"],
    prompt: "The pitcher takes signs while straddling the plate in a way that fits neither windup nor set. What matters first?",
    answers: [
      "Whether the pitcher ever established a legal pitching position.",
      "Whether the batter was ready.",
      "Whether the catcher gave signs from the crouch.",
      "Whether there were runners on base.",
    ],
    correctIndex: 0,
    explanation: "Rule 6 starts with legal pitching positions. If the pitcher never got properly into windup or set, the whole delivery framework is already compromised.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 6"],
    prompt: "With no runners on, the pitcher intentionally delivers before the batter is reasonably set in the box. What is the first rule concept?",
    answers: [
      "Quick pitch as an illegal-pitch issue without runners.",
      "Automatic balk for one base to all runners.",
      "A no-pitch because only the batter’s comfort matters.",
      "Nothing, because the batter must always be ready.",
    ],
    correctIndex: 0,
    explanation: "Without runners, quick pitch stays in the illegal-pitch/ball framework rather than balk awards. Rule 6 gives you the right starting category.",
  },
  {
    topicId: "balks",
    ruleIds: ["Rule 6"],
    prompt: "The pitcher disengages incorrectly with the non-pivot foot first and then throws to a base. What should the umpire recognize?",
    answers: [
      "That legal disengagement requirements were not satisfied before the throw.",
      "That any step-off makes the player an infielder automatically.",
      "That the throw cancels all pitching restrictions.",
      "That the runner must be tagged for any call to matter.",
    ],
    correctIndex: 0,
    explanation: "Disengagement mechanics matter. If the pitcher did not legally disengage, later actions are judged from the engaged-pitcher framework under Rule 6.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "An improper batter is discovered after a pitch to the next hitter. What is the first batting-order principle?",
    answers: [
      "The improper action may already be legalized because the timing window has closed.",
      "The defense can fix batting order at any time that inning.",
      "Only the offensive coach may raise the issue.",
      "The batter-runner is always out regardless of timing.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 batting-order enforcement is built on timing. Once the next pitch or play closes the window, the improper batter issue is no longer enforceable in the same way.",
  },
  {
    topicId: "catch-no-catch",
    ruleIds: ["Rule 7"],
    prompt: "A batter legally bunts a third strike foul with two strikes. What should the umpire know first?",
    answers: [
      "That the foul bunt strikeout concept controls immediately.",
      "That all foul balls on third strike stay live.",
      "That the catcher may choose whether to appeal.",
      "That the batter remains at bat because the ball was not caught.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 contains key batting-result consequences. A foul bunt on strike three is an immediate strikeout concept, not a casual ordinary foul-ball continuation.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 7"],
    prompt: "The batter steps across the plate and hinders the catcher’s throw on a steal. What rule family governs first?",
    answers: [
      "Batter interference under Rule 7 and Rule 8 interaction.",
      "Obstruction by the catcher.",
      "A delayed dead ball with no out possible.",
      "Only a warning if the batter stayed in the box.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 starts the batter-behavior side of this play. First identify batter interference, then move to the proper out and runner consequences.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "A batter uses an illegal bat and reaches base. Before the next pitch, the defense asks for enforcement. What matters first?",
    answers: [
      "The timing of the discovery and the specific illegal-bat penalty structure.",
      "Whether the batter touched first before the request.",
      "Whether the plate umpire inspected the bat earlier.",
      "Whether the coach called timeout first.",
    ],
    correctIndex: 0,
    explanation: "Illegal-bat enforcement lives in the batting rule family. Start with the timing window and the prescribed penalty before handling placements.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 8"],
    prompt: "R1 misses second while advancing on a hit and the defense wants to retire the runner later. What is the first Rule 8 idea?",
    answers: [
      "The appeal procedure and whether the window is still open.",
      "The batting-order status of the next hitter.",
      "Whether the runner touched first legally.",
      "Whether the missed base happened in fair territory.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 is built around appeals, runner status, and placements. First decide whether the defense still has a valid appeal opportunity and method.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 8"],
    prompt: "A pitch goes out of play with runners on first and third. What should the umpire determine before placing runners?",
    answers: [
      "The award timing point and who is entitled to advance under Rule 8.",
      "Only whether the catcher touched the pitch.",
      "Whether the offense asked for time.",
      "Whether the ball crossed the foul line first.",
    ],
    correctIndex: 0,
    explanation: "Runner awards begin with timing and entitlement. Rule 8 tells the crew to decide when the award is measured from before placing anyone.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 8"],
    prompt: "A runner collides with a fielder receiving a thrown ball on a play at the base. What distinction must the umpire make first?",
    answers: [
      "Whether the act is legal contact, interference, or obstruction under runner-rights language.",
      "Whether the coach on that side appealed.",
      "Whether the crowd believed the runner was out.",
      "Whether the ball was hit to the infield or outfield.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 runner rights and fielder protections are the right starting point. First decide the type of contact before applying outs or awards.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 8"],
    prompt: "A retired runner hinders a relay in an effort to break up a double play. What should the umpire anchor on?",
    answers: [
      "Retired-runner interference and its extra-out consequences.",
      "A warning because the runner is already out.",
      "Obstruction because the fielder had the ball.",
      "Only sportsmanship language from pregame.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 makes clear that retired runners can still interfere. The key is identifying the hindrance and then applying the additional-out framework if required.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 9"],
    prompt: "With one out, R3 scores before the defense completes an appeal out on another runner for missing a base. What scoring question matters first?",
    answers: [
      "Whether the appeal out is the kind that erases the apparent run under Rule 9.",
      "Whether home plate was touched before the appeal throw.",
      "Whether the defensive coach asked loudly enough.",
      "Whether the scoreboard operator posted the run already.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring requires the crew to classify the third out correctly. Not every apparent run counts just because it crossed the plate first.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 9"],
    prompt: "Bases loaded, two outs, a run crosses before the batter-runner is tagged out trying to stretch to second. What is the first scoring lens?",
    answers: [
      "Whether the third out was on the batter-runner before he reached first safely.",
      "Whether the runner from third touched home before the tag.",
      "Whether the defense appealed another base afterward.",
      "Whether the ball stayed in fair territory.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring on third-out plays begins with identifying the kind of out. If the third out is on the batter-runner before first is gained, the run cannot score.",
  },
  {
    topicId: "dead-ball",
    ruleIds: ["Rule 9"],
    prompt: "A run scores during a play that also ends with the third out on runner interference. What must the crew know first?",
    answers: [
      "How the nature of the third out affects whether the run counts.",
      "Whether interference automatically adds another run.",
      "Whether the offense can decline the interference call.",
      "Whether the catcher tagged home afterward.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring is tied to the kind of out recorded. On interference third outs, the crew must still classify the out correctly before deciding whether the run scores.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 9"],
    prompt: "The defense asks whether a force out at second erased a run that crossed before the throw. What should your scoring answer begin with?",
    answers: [
      "The force-out principle under Rule 9 scoring.",
      "The batting average of the hitter.",
      "Whether the throw came from the outfield.",
      "Whether the offense already celebrated.",
    ],
    correctIndex: 0,
    explanation: "Force-out scoring is one of the most important Rule 9 concepts. Start there before any discussion of apparent timing across the plate.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "A coach wants you to get help on a pulled-foot call from a partner who had the angle. What should the crew know first?",
    answers: [
      "Who had primary jurisdiction and whether help is appropriate on that kind of call.",
      "That every close call must be changed if help is requested.",
      "That only the plate umpire can answer.",
      "That the coach chooses which umpire speaks.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 is about umpire authority and jurisdiction. The first question is who owned the play and whether the request concerns a judgment that is actually proper to discuss.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "A game resumes after a delay and the crew needs to reestablish authority and lineup status quickly. What rule family helps most?",
    answers: [
      "Rule 10 umpiring authority paired with game-administration responsibilities.",
      "Only Rule 6 because pitchers warm up again.",
      "Only Rule 9 because a score exists.",
      "Rule 2 definitions alone.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 is the umpire’s guide for authority, jurisdiction, and handling rule questions. On a restart, the crew should lead from that administrative authority posture.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "Two umpires have different information on a boundary decision. What should guide the conference first?",
    answers: [
      "Which umpire had the best angle and primary responsibility for the call.",
      "Which coach argued more calmly.",
      "Which team is home.",
      "Whether the scoreboard showed fair or foul.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 emphasizes umpire jurisdiction and responsibility. When conferring, start with who owned the call and what information is appropriate to share.",
  },
  {
    topicId: "rotations",
    ruleIds: ["Rule 10"],
    prompt: "A coach asks for a rules explanation after a close appeal play. What should the umpire crew separate first?",
    answers: [
      "A legitimate rules question from a disguised argument about judgment.",
      "Whether the inning is over.",
      "Whether the crowd agrees with the coach.",
      "Whether the runner is back on the bag.",
    ],
    correctIndex: 0,
    explanation: "Rule 10 expects the crew to distinguish true rules discussions from arguments over judgment. That separation determines how the conversation should proceed.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "At the plate meeting, the visiting coach realizes he listed only eight defensive starters on the lineup card. What is the first Rule 1 issue?",
    answers: [
      "Lineup-card legality and required player information before the game starts.",
      "A batting-order appeal that must wait until the first pitch.",
      "An automatic out charged to the first batter.",
      "Nothing, because defensive alignment is not governed until the second inning.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 covers lineup-card duties and required pregame information. The crew should fix the lineup problem before the game becomes live.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "The catcher takes the field with a damaged throat protector hanging off the mask. What should the umpire crew address first?",
    answers: [
      "Protective-equipment legality before the next live ball.",
      "Whether the offense wants to object.",
      "Whether the pitcher is comfortable with the catcher.",
      "A dead-ball award for unsafe equipment.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 starts with legal and properly worn equipment. Unsafe catcher equipment must be corrected before play continues.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "During warmups, a player is discovered wearing jewelry that is not permitted under code. What is the right first response?",
    answers: [
      "Treat it as an equipment/uniform compliance issue that must be corrected before participation.",
      "Ignore it unless the other coach protests.",
      "Immediately eject the player on first discovery.",
      "Let the player keep it on until the end of the half-inning.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 governs legal equipment and apparel. The first job is to stop illegal participation and require correction before the player continues.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "The home coach brings out baseballs from two different brands, but only one box carries the required mark. What matters most?",
    answers: [
      "Whether the baseballs meet the authenticating requirement for legal game use.",
      "Whether both teams have already touched the baseballs.",
      "Whether the balls are the same color of leather.",
      "Whether the scorer wrote down the brands.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 game-ball legality begins with the required authenticating mark. The crew should settle that before the game starts.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "A first baseman takes the field with a mitt that is not legal for the position under code. What is the first question?",
    answers: [
      "Whether the glove meets position-specific equipment requirements under Rule 1.",
      "Whether the first baseman has already recorded an out.",
      "Whether the offensive coach noticed the glove.",
      "Whether the pitcher prefers that mitt.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 equipment study includes legal gloves and mitts by position. The crew should identify legality before allowing continued use.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "Before the first pitch, the crew notices the field has no legal coaching-box markings. What family of issue is this?",
    answers: [
      "A Rule 1 field-condition and required-marking question.",
      "A Rule 9 scoring problem.",
      "Only a local-grounds issue with no code relevance.",
      "A live-ball appeal situation.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 includes required field layout and markings. Missing required markings should be addressed in pregame field inspection.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "The lineup card identifies a team captain, but the head coach wants a different player to handle lineup changes midgame. What matters first?",
    answers: [
      "Who is legally responsible for lineup-card communication under the pregame lineup procedure.",
      "Whether the captain bats first.",
      "Whether the umpire prefers speaking to a coach instead.",
      "Whether the scorer has already left the booth.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 lineup-card procedure is about responsibility and communication. Know who is authorized to represent the lineup in game administration.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "A defensive team tries to start the inning with only eight players on the field while the ninth is still in the bullpen. What should the umpire think first?",
    answers: [
      "Whether the defense has the required number of players in legal position at pitch time.",
      "Whether the batter is already in the box.",
      "Whether the offense is willing to pitch anyway.",
      "Whether the missing player is listed first or last in the lineup.",
    ],
    correctIndex: 0,
    explanation: "Rule 1 covers player positions and legal game setup at pitch time. Defensive-player requirements are not optional just because the game is about to start.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "A coach requests a mid-inning switch to a neon elbow guard that was never worn earlier and looks noncompliant. Where do you start?",
    answers: [
      "Equipment legality and whether the guard is approved for use under Rule 1.",
      "Whether the batter already has two strikes.",
      "Whether the defensive coach agrees to allow it.",
      "Whether the previous elbow guard matched the uniform.",
    ],
    correctIndex: 0,
    explanation: "Protective equipment still has to be legal. Rule 1 is the right starting point before the player uses a questionable new item.",
  },
  {
    topicId: "lineup-equipment",
    ruleIds: ["Rule 1"],
    prompt: "A detached base is discovered before the first pitch of a varsity game. What should anchor the crew's response?",
    answers: [
      "Required-field-condition legality before the game can begin.",
      "A delayed-dead-ball award if a runner reaches that base later.",
      "Only the home coach's opinion on whether it is safe enough.",
      "Automatic transfer of the game to the visiting team site.",
    ],
    correctIndex: 0,
    explanation: "A detached base is a Rule 1 field-condition problem that must be corrected before live play begins.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A courtesy runner enters for the catcher without being reported, and the defense notices before the next pitch. What do you identify first?",
    answers: [
      "Whether the participation and reporting procedure made the substitution legal yet.",
      "Whether the runner touched first base before entering.",
      "Whether the opposing coach verbally accepted it.",
      "Whether the scorer recorded the courtesy runner.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 substitution questions always begin with legal participation and reporting status.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A coach leaves the dugout for a second argument after already being restricted to the bench. What should guide the crew next?",
    answers: [
      "Rule 3 bench-conduct enforcement and the penalty that follows the restriction.",
      "Rule 8 baserunning placement.",
      "Only a dead-ball warning with no further authority.",
      "Whether the coach returned before the next pitch.",
    ],
    correctIndex: 0,
    explanation: "Once a coach has been restricted, further conduct is handled under Rule 3 bench and field conduct provisions.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "An unreported substitute enters and takes the mound. Before the next pitch, the offense questions it. What is the first issue?",
    answers: [
      "Whether the substitute has legally entered the game under reporting rules.",
      "Whether the pitcher already threw warmup pitches.",
      "Whether the catcher knew the change was coming.",
      "Whether the ball was live when he crossed the line.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 makes reporting status the first question on any unreported-substitute problem.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A player who has already left the game re-enters in a role that does not fit legal reentry. What must the umpire decide first?",
    answers: [
      "Whether the reentry is legal under NFHS participation rules.",
      "Whether the player touches the ball before anyone notices.",
      "Whether the team is home or visiting.",
      "Whether the coach claims it was accidental.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 participation and reentry rules govern whether the player may legally return at all.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "The plate umpire suspects a trip to the mound is becoming a charged conference. What should be recognized first?",
    answers: [
      "When the conference officially begins and how it counts under Rule 3.",
      "Whether the catcher also joined the visit.",
      "Whether the inning has two outs.",
      "Whether the offense requested time first.",
    ],
    correctIndex: 0,
    explanation: "Conference enforcement is about recognizing when the visit becomes official and how it is charged.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "Bench personnel begin celebrating and taunting during a live-ball rundown. What family of issue are you in?",
    answers: [
      "Bench and personnel conduct under Rule 3.",
      "A scoring correction only.",
      "A ground-rule problem.",
      "Nothing unless physical contact occurs.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 applies to bench behavior and team personnel, including conduct that affects game management during live action.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A defensive player leaves the game and later returns to a different batting slot. What do you judge first?",
    answers: [
      "Whether the substitution and reentry are legal within the lineup structure.",
      "Whether the player returns on defense or offense first.",
      "Whether the scorekeeper noticed the slot change.",
      "Whether the first-base coach approves.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 lineup participation and reentry legality start with the player's proper slot and status.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "The assistant coach is coaching outside the box while also arguing from foul territory. What should be sorted out first?",
    answers: [
      "Coaching-location and conduct compliance under Rule 3.",
      "Whether a live-ball appeal is pending.",
      "Whether the batter asked for help.",
      "Whether the dugout is on the first-base side.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 covers who may coach, where they may coach, and when conduct becomes a restriction problem.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A coach wants to make two substitutions while the ball is dead but only reports one. What is the first administrative question?",
    answers: [
      "Which players have legally become part of the game through proper reporting.",
      "Which player reached the bench first.",
      "Whether the offense objects before the next pitch.",
      "Whether the public-address announcer read the names correctly.",
    ],
    correctIndex: 0,
    explanation: "With substitutions, legal game status depends on proper reporting and recognition, not assumption.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A team uses repeated bench complaints to delay resumption after a close play. Where should the umpire start?",
    answers: [
      "Rule 3 conduct and bench-control authority.",
      "Rule 9 timing of runs scoring.",
      "Rule 5 dead-ball awards.",
      "Rule 1 field dimensions.",
    ],
    correctIndex: 0,
    explanation: "Delaying tactics and dugout behavior belong under Rule 3 conduct management before they become larger game-control issues.",
  },
  {
    topicId: "substitutions-conduct",
    ruleIds: ["Rule 3"],
    prompt: "A player-coach returns from the bullpen and immediately begins coaching a runner while not legally entered. What should the crew identify first?",
    answers: [
      "Whether the individual is legally participating and acting within Rule 3 bench/coaching status.",
      "Whether the runner obeyed the advice.",
      "Whether the bullpen is in live-ball territory.",
      "Whether the ball is on the infield dirt.",
    ],
    correctIndex: 0,
    explanation: "Rule 3 starts with who is legally in the game and who may act as bench personnel or coach at that moment.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "Lightning forces the teams off the field in the top of the fifth before the game becomes official. What should the crew identify first?",
    answers: [
      "Current game-status category under Rule 4 before discussing resumption or replay.",
      "Which team has more hits.",
      "Whether the home plate was covered fast enough.",
      "Whether the offensive coach wants to stop playing.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 begins with whether the contest is official, suspended, or must be resumed from an earlier point.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "A coach wants to adopt a temporary local rule for an unplayable fence opening discovered before the game. What comes first?",
    answers: [
      "Whether the proposed ground rule is legal and within pregame authority.",
      "Whether both teams verbally like the idea.",
      "Whether the scorer can write it down quickly.",
      "Whether the opening is on the left-field side only.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 ground-rule authority starts with legality under code, not with coach preference.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "Rain stops play with the home team ahead after completing its turn at bat in the fifth. What is the first rules lens?",
    answers: [
      "Official-game status under Rule 4.",
      "Only whether the winning pitcher qualifies.",
      "Whether the offense had runners on base.",
      "Whether the coaches agree to call it final.",
    ],
    correctIndex: 0,
    explanation: "Once play is halted, Rule 4 tells the crew how to think about official status before anything else.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "Before the first pitch, one dugout asks to skip the plate conference because both coaches are ready. What should guide the umpire?",
    answers: [
      "Required pregame procedure under Rule 4.",
      "Whether the captains are already on the field.",
      "Whether the lineup cards were emailed earlier.",
      "Whether the weather is calm.",
    ],
    correctIndex: 0,
    explanation: "Rule 4 covers required pregame procedure. The crew should not casually skip the administrative steps that make the game ready to start.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "The field becomes unsafe after the first inning, but one coach wants to keep playing. What should the crew settle first?",
    answers: [
      "Umpire authority over field safety and whether play can legally continue.",
      "Whether the leading team agrees with the condition.",
      "Whether the last play was disputed.",
      "Whether the grounds crew is nearby.",
    ],
    correctIndex: 0,
    explanation: "Game-continuation questions begin with field-safety authority and Rule 4 game-status judgment.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "A resumed game begins the next day, and the coaches dispute whether the same lineup status carries over. What matters first?",
    answers: [
      "Whether the contest is a suspended game under Rule 4 and therefore resumes from the prior game state.",
      "Whether the home team is still batting first.",
      "Whether the weather is similar to the original date.",
      "Whether the scorer kept yesterday’s scorebook open overnight.",
    ],
    correctIndex: 0,
    explanation: "If the contest is suspended, Rule 4 tells you the game resumes from the original state rather than starting fresh.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "A coach asks whether curfew automatically ends the game once the current batter finishes. What should the crew determine first?",
    answers: [
      "The governing game-status rule or adopted policy that actually controls ending the game.",
      "Whether the defensive team wants one more inning.",
      "Whether the batter has two strikes.",
      "Whether the public-address announcer mentioned curfew.",
    ],
    correctIndex: 0,
    explanation: "Curfew and ending-game questions still begin with the contest-status framework that controls the game under Rule 4 and adopted policy.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "Teams are ready to play, but legal field markings at a dead-ball line are missing and cannot be fixed immediately. What is the first decision?",
    answers: [
      "Whether the field can legally host the game as configured under Rule 4 and Rule 1 authority.",
      "Whether both teams promise not to use that area.",
      "Whether the scorer can estimate where the line should be.",
      "Whether the base coaches stand away from it.",
    ],
    correctIndex: 0,
    explanation: "Starting a game requires a legal and manageable field. The crew must settle that before the game becomes live.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 4"],
    prompt: "An inning-ending appeal is requested just as the teams leave the field in a game that may be ending. What should the crew think first?",
    answers: [
      "Whether the appeal is still timely within the game-status and inning-end framework.",
      "Whether the winning team has already shaken hands.",
      "Whether the scoreboard went dark.",
      "Whether the ball was thrown back to the mound.",
    ],
    correctIndex: 0,
    explanation: "Even at the end of a game, appeal rights still depend on timing and the inning-end status. Rule 4 and Rule 8 timing both matter, but game status comes first.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "With two outs, the runner from third touches home before a force out is made at second to end the inning. What is the first scoring principle?",
    answers: [
      "A run does not score if the third out is a force out.",
      "The run counts because it touched home first.",
      "The coach chooses whether to keep the run.",
      "Only the scorer decides after the inning.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring starts with classifying the third out correctly. A force third out prevents the run from scoring.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "R3 crosses before the defense records a successful appeal on R1 missing second for the third out. What should the crew decide first?",
    answers: [
      "Whether the appeal out functions like a force/timing out for scoring purposes.",
      "Whether the runner from third touched home loudly enough.",
      "Whether the appeal happened in the infield only.",
      "Whether the offense had already celebrated.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring with appeals begins by identifying the type of out and whether it erases the apparent run.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "Bases loaded, two outs, ball four forces in a run, but the batter-runner misses first and is appealed for the third out. What should you know first?",
    answers: [
      "Whether the third out on the batter-runner before first nullifies the run.",
      "Whether the pitch was inside or outside.",
      "Whether the catcher threw to first immediately.",
      "Whether the offense asked for time after the walk.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring on a third out involving the batter-runner starts with whether first base was legally acquired.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "A run appears to score during a play ending with retired-runner interference for the third out. What is the first scoring lens?",
    answers: [
      "Classify the third out properly before deciding whether any run may count.",
      "Count the run automatically because home was touched.",
      "Ignore the interference if the ball was thrown late.",
      "Award the run unless both coaches object.",
    ],
    correctIndex: 0,
    explanation: "Scoring decisions still begin with the nature of the third out, even when interference creates it.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "The defense turns what looks like a routine force at first with R3 scoring just before the catch. What matters most?",
    answers: [
      "Whether the batter-runner's out at first was the inning's third out.",
      "Whether the throw pulled the first baseman off the bag.",
      "Whether the plate umpire pointed at home.",
      "Whether the runner from third slid across the plate.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring is tied to the kind of third out. A third out on the batter-runner before first base erases the run.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "With one out, R3 scores on a ground ball, and then a second runner is declared out on appeal for missing a base. What should the umpire decide first?",
    answers: [
      "Whether the appeal out is a timing out or force-type out that changes scoring.",
      "Whether the scoreboard operator posted the run.",
      "Whether the offense touched all the dugout railings.",
      "Whether the coach appealed the scorer's mark.",
    ],
    correctIndex: 0,
    explanation: "Appeal outs and scoring are linked. Rule 9 requires the crew to classify the out before deciding whether the run counts.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "A runner from third scores while another runner is tagged out between bases for the third out on a non-force play. What is the first question?",
    answers: [
      "Whether the run scored before the timing out was recorded.",
      "Whether the ball stayed in fair territory.",
      "Whether the runner from third slid or walked home.",
      "Whether the offense requested a time play explanation.",
    ],
    correctIndex: 0,
    explanation: "This is a classic Rule 9 time-play question. Start with the timing relationship between the run scoring and the non-force third out.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "The official scorer asks whether a run counts after a third out on batter interference. What should the crew know first?",
    answers: [
      "How Rule 9 treats the third out created by batter interference for scoring purposes.",
      "Whether the batter returned to the dugout quickly.",
      "Whether the catcher appealed verbally.",
      "Whether the inning started with two outs.",
    ],
    correctIndex: 0,
    explanation: "Rule 9 scoring still begins with the classification of the third out. Batter-interference third outs can erase a run depending on the play.",
  },
  {
    topicId: "game-status-scoring",
    ruleIds: ["Rule 9"],
    prompt: "The defense records the third out on a force, but the offense argues the runner scored before the fielder touched the bag. What should guide the explanation?",
    answers: [
      "Force-out scoring logic controls, not the apparent order of touching home.",
      "The offense is correct if the runner crossed first.",
      "Only the base umpire can explain it.",
      "The run counts if the ball came from the outfield.",
    ],
    correctIndex: 0,
    explanation: "Force-out scoring is one of Rule 9's core concepts. The timing of the runner touching home does not override a force third out.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "With runners on first and second, a pitch goes to the backstop and lodges under the fence. What must the umpire identify first?",
    answers: [
      "The award timing point and the number of bases each runner is entitled to.",
      "Whether the catcher chased it hard enough.",
      "Whether the runners were stealing on the pitch.",
      "Whether the coach yelled to keep running.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 awards begin with timing and entitlement, then placement for each runner.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "Ball four is delivered with bases loaded. What movement is created by rule rather than judgment?",
    answers: [
      "Each runner is forced one base by the batter's award of first base.",
      "Only the runner from third is automatically awarded home.",
      "No runner is forced until the batter touches first.",
      "The offense may choose whether to advance the runners.",
    ],
    correctIndex: 0,
    explanation: "Ball-four awards are Rule 8 forced-advance issues. Start with the automatic movement created by the batter becoming a runner.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "A batter is hit by a pitch that remains in play and rolls away. What should the umpire know first?",
    answers: [
      "Whether the batter is entitled to first base immediately under hit-by-pitch award rules.",
      "Whether the offense wants to try for second instead.",
      "Whether the catcher retrieved the ball quickly.",
      "Whether the pitch was a strike after contact.",
    ],
    correctIndex: 0,
    explanation: "Hit-by-pitch enforcement starts with the award entitlement. Rule 8 placement follows from that first decision.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "The catcher obstructs the batter on a steal, and R1 advances safely to second while the batter reaches first. What is the first award concept?",
    answers: [
      "Whether the play satisfied the obstruction result or requires additional placement.",
      "Whether the catcher meant to interfere.",
      "Whether the batter swung late.",
      "Whether the first baseman covered the bag.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 catcher-obstruction placement starts with whether the result of the play satisfied the rule or whether further award is needed.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "A live thrown ball from the pitcher's plate goes out of play. What timing concept should guide placement?",
    answers: [
      "Time of the throw for runner awards.",
      "Time of pitch because all out-of-play balls use pitch timing.",
      "Time when the runner reached the next base.",
      "No award unless all runners stop first.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 distinguishes timing by the type of award. A throw out of play is placed from time of throw.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "With R2 on second, the pitcher balks and then throws wildly into dead-ball territory. What should the crew determine first?",
    answers: [
      "Which award governs first and how the later dead ball affects placement.",
      "Whether the runner touched third before the ball went out.",
      "Whether the batter offered at the pitch.",
      "Whether the defensive coach wanted the balk or the overthrow.",
    ],
    correctIndex: 0,
    explanation: "Multiple award plays still begin with the governing award sequence and the timing attached to each act.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "A fair ball deflects off an infielder and goes over the fence in flight. Where do you start on placement?",
    answers: [
      "With the ruled award for a fair ball leaving the field and the base entitlement that follows.",
      "With the coach's signal to the runner from second.",
      "With time of throw because a fielder touched it.",
      "With whether the outfielder could have caught it.",
    ],
    correctIndex: 0,
    explanation: "Deflection does not erase the governing award. Rule 8 still starts with the correct base entitlement for the ball leaving play.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "A runner is obstructed between first and second and is later tagged while trying for third. What is the first placement concept?",
    answers: [
      "Which bases would nullify the obstruction and protect the runner.",
      "Whether the tag happened before the coach yelled.",
      "Whether the fielder had the ball when contact occurred.",
      "Whether the ball was thrown from fair territory.",
    ],
    correctIndex: 0,
    explanation: "Obstruction placement under Rule 8 starts with protecting the obstructed runner to the base(s) needed to nullify the act.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "A throw into dead-ball territory occurs while the runner from second had already passed third at release. What matters most for placement?",
    answers: [
      "Each runner's location at the timing point used for the award.",
      "Which dugout the ball entered.",
      "Whether the runner slid into third later.",
      "Whether the defense was appealing another base too.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 awards are about timing point and runner location. Know where each runner was when the award was measured.",
  },
  {
    topicId: "runner-awards",
    ruleIds: ["Rule 8"],
    prompt: "The batter-runner is awarded first on catcher obstruction but both he and R1 advance farther on the play. What should the umpire decide first?",
    answers: [
      "Whether the play result already nullified the obstruction without more awards.",
      "Whether the catcher apologized.",
      "Whether the batter dropped the bat in fair territory.",
      "Whether the pitcher stepped off before the pitch.",
    ],
    correctIndex: 0,
    explanation: "Rule 8 obstruction enforcement always begins with whether the resulting play satisfied the rule's protection without further placement.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "The improper batter singles, and the defense appeals before a pitch to the next batter. What should the umpire determine first?",
    answers: [
      "Who the proper batter should have been and whether the timing window is still open.",
      "Whether the single rolled into the gap.",
      "Whether the coach was holding a lineup card.",
      "Whether the batter admitted the mistake.",
    ],
    correctIndex: 0,
    explanation: "Batting-out-of-order enforcement begins with identifying the proper batter and whether the defense appealed in time.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "A batter squares late and foul-bunts strike three with one out. What should the crew know immediately?",
    answers: [
      "The batter is out on a foul bunt with two strikes.",
      "The ball stays live because it was bunted.",
      "The batter may continue because it was not caught.",
      "The catcher must first appeal to the plate umpire.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 batting results include the foul-bunt strikeout concept, which is immediate and not dependent on a catch.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "An illegal bat is discovered after a double but before the next pitch. What is the first Rule 7 question?",
    answers: [
      "Whether the discovery happened within the penalty window for illegal-bat enforcement.",
      "Whether the batter touched second before the appeal.",
      "Whether the first-base coach saw the bat before the at-bat.",
      "Whether the plate umpire had inspected the circle earlier.",
    ],
    correctIndex: 0,
    explanation: "Illegal-bat enforcement under Rule 7 begins with timing and penalty-window analysis.",
  },
  {
    topicId: "interference",
    ruleIds: ["Rule 7"],
    prompt: "On dropped third strike, the batter-runner veers across the plate area and hinders the catcher’s throw. What should your first label be?",
    answers: [
      "Batter interference connected to the batter’s actions under Rule 7.",
      "Obstruction because the catcher was near home.",
      "Nothing because the batter is now a runner.",
      "A delayed-dead-ball warning only.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 covers the batter-side conduct that becomes interference, especially on dropped-third-strike plays near the plate.",
  },
  {
    topicId: "catch-no-catch",
    ruleIds: ["Rule 7"],
    prompt: "The catcher gloves a foul tip cleanly on strike two. What should the umpire recognize first?",
    answers: [
      "A live foul tip that counts as a strike rather than a dead foul ball.",
      "A dead foul ball automatically killing all play.",
      "A catch that retires the batter on any count.",
      "Nothing unless the catcher throws to first.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 batting results depend on correctly separating foul tip from ordinary foul ball.",
  },
  {
    topicId: "appeals",
    ruleIds: ["Rule 7"],
    prompt: "The defense notices the batting order error only after a legal pitch to the next batter. What should guide your answer?",
    answers: [
      "The batting-order mistake may already be legalized because the appeal window closed.",
      "The defense can always go back two hitters.",
      "Only the offensive team may correct the order now.",
      "The current batter is automatically out too.",
    ],
    correctIndex: 0,
    explanation: "Rule 7 batting-order timing matters more than the size of the mistake. Once the next legal pitch is thrown, the window often closes.",
  },
];

let state = loadState();
let advanceTimer = null;

questions.forEach((question) => {
  if (!Array.isArray(question.ruleIds) || !question.ruleIds.length) {
    question.ruleIds = deriveQuestionRuleIds(question);
  }
});

initialize();

function initialize() {
  renderRuleOutline();
  renderManualModules();
  renderTopics();
  renderChecklist(plateChecklist, plateWork);
  renderChecklist(baseChecklist, baseWork);
  renderResources();
  renderReference(deadBallList, deadBallReference);
  renderReference(awardList, awardReference);
  renderReference(rulebookUpdateList, rulebookUpdates);
  renderReference(rulebookSupportList, rulebookSupportReference);
  renderReference(glossaryList, glossaryReference);
  renderReference(crewList, crewReference);
  nextQuestionButton?.addEventListener("click", handleNextQuestion);
  situationSearchForm?.addEventListener("submit", handleSituationSearch);
  studyModalClose?.addEventListener("click", handleStudyModalCloseClick);
  studyModalBackdrop?.addEventListener("click", handleStudyModalBackdropClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  startTonightButton?.addEventListener("click", handleStartTonight);
  reviewMistakesButton?.addEventListener("click", handleReviewMistakes);
  trainRuleButton?.addEventListener("click", handleTrainRule);
  pathwayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { pathwayId } = button.dataset;
      if (pathwayId) {
        handlePathwaySelect(pathwayId);
      }
    });
  });
  syncSelectedTopic();
  renderQuestion();
  renderSituationSearchResults([], "");
}

function loadState() {
  const fallback = {
    selectedTopicId: studyTopics[0].id,
    selectedPathId: "",
    selectedRuleId: rulebookOutline[0].rule,
    expandedRuleId: rulebookOutline[0].rule,
    questionOrder: questions.map((_, index) => index),
    currentQuestionIndex: 0,
    completedQuestionIds: [],
    correctQuestionIds: [],
    missedQuestionIds: [],
    bestScore: 0,
    lastScore: null,
    lastSessionAt: "",
    reviewMode: "all",
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    const merged = { ...fallback, ...parsed };
    merged.questionOrder = normalizeQuestionOrder(merged.questionOrder);
    merged.selectedRuleId = rulebookOutline[0].rule;
    merged.selectedPathId = "";
    merged.expandedRuleId = rulebookOutline[0].rule;
    merged.currentQuestionIndex = 0;
    merged.completedQuestionIds = Array.isArray(merged.completedQuestionIds) ? merged.completedQuestionIds : [];
    merged.correctQuestionIds = Array.isArray(merged.correctQuestionIds) ? merged.correctQuestionIds : [];
    merged.missedQuestionIds = Array.isArray(merged.missedQuestionIds) ? merged.missedQuestionIds : [];
    merged.reviewMode = "all";
    return merged;
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderTopics() {
  topicGrid.innerHTML = "";

  studyTopics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "topic-card";
    button.dataset.topicId = topic.id;
    button.innerHTML = `
      <p class="section-label">${topic.reference}</p>
      <h3>${topic.title}</h3>
      <p>${topic.description}</p>
      <span class="topic-meta">Focus on this Situation</span>
    `;
    button.addEventListener("click", () => handleTopicSelect(topic.id));
    topicGrid.append(button);
  });
}

function renderRuleOutline() {
  ruleOutlineGrid.innerHTML = "";

  rulebookOutline.forEach((item) => {
    const isExpanded = state.expandedRuleId === item.rule;
    const panelId = `${item.rule.toLowerCase().replace(/\s+/g, "-")}-panel`;
    const card = document.createElement("article");
    card.className = `rule-outline-card${isExpanded ? " is-expanded" : ""}`;
    card.innerHTML = `
      <button class="rule-toggle" type="button" aria-expanded="${isExpanded}" aria-controls="${panelId}">
        <div class="rule-toggle-copy">
          <p class="section-label">${item.rule}</p>
          <h3>${item.title}</h3>
          <p class="rule-preview">${item.summary}</p>
        </div>
        <span class="rule-chevron" aria-hidden="true">${isExpanded ? "−" : "+"}</span>
      </button>
      <div class="rule-detail" id="${panelId}"${isExpanded ? "" : " hidden"}>
        <ul class="rule-points">
          ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
        <div class="rule-actions">
          <a class="rule-link" href="#quiz-lab">Study this rule</a>
        </div>
      </div>
    `;
    card.querySelector(".rule-toggle")?.addEventListener("click", () => {
      state.expandedRuleId = state.expandedRuleId === item.rule ? "" : item.rule;
      saveState();
      renderRuleOutline();
    });
    card.querySelector(".rule-link")?.addEventListener("click", (event) => {
      event.preventDefault();
      handleRuleSelect(item.rule);
    });
    ruleOutlineGrid.append(card);
  });
}

function renderManualModules() {
  manualGrid.innerHTML = "";

  manualModules.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "manual-card";
    const isActive =
      (item.pathwayId && state.selectedPathId === item.pathwayId) ||
      (item.topicId && !state.selectedPathId && state.selectedTopicId === item.topicId);
    if (isActive) {
      card.classList.add("active");
    }
    card.innerHTML = `
      <p class="section-label">${item.focus}</p>
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
      <span class="manual-meta">${item.actionLabel}</span>
    `;
    card.addEventListener("click", () => handleManualModuleSelect(item));
    manualGrid.append(card);
  });
}

function renderChecklist(container, items) {
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "checklist-item";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p class="checklist-copy">${item.copy}</p>
    `;
    container.append(card);
  });
}

function renderResources() {
  pregameList.innerHTML = "";

  pregamePrompts.forEach((item) => {
    const card = document.createElement("article");
    card.className = "resource-item";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
    `;
    pregameList.append(card);
  });
}

function renderReference(container, items) {
  container.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement(item.topicId || item.pathwayId || item.studyNote ? "button" : "article");
    if (card instanceof HTMLButtonElement) {
      card.type = "button";
    }
    card.className = "reference-item";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
      <p class="topic-meta">${item.citation}</p>
      ${item.actionLabel ? `<span class="reference-action">${item.actionLabel}</span>` : ""}
    `;
    if (item.topicId || item.pathwayId || item.studyNote) {
      card.classList.add("reference-item-button");
      card.addEventListener("click", () => handleReferenceSelect(item));
    }
    container.append(card);
  });
}

function handleSituationSearch(event) {
  event.preventDefault();
  const query = situationSearchInput?.value?.trim() || "";
  const results = searchQuestionBank(query);
  renderSituationSearchResults(results, query);
}

function searchQuestionBank(query) {
  const tokens = tokenizeSearchQuery(query);
  if (!tokens.length) {
    return [];
  }

  const fullQuery = normalizeSearchText(query);
  return questions
    .map((question) => ({
      question,
      score: scoreQuestionSearch(question, tokens, fullQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);
}

function renderSituationSearchResults(results, query) {
  if (!situationSearchResults) {
    return;
  }

  if (!query.trim()) {
    situationSearchResults.innerHTML = `<p class="search-empty">Search results will appear here.</p>`;
    return;
  }

  if (!results.length) {
    situationSearchResults.innerHTML = `
      <p class="search-empty">
        No close match yet. Try naming the runner state, the act, and the result you are trying to rule on.
      </p>
    `;
    return;
  }

  situationSearchResults.innerHTML = "";

  results.forEach(({ question }) => {
    const card = document.createElement("article");
    card.className = "search-result";
    const ruleLabels = getQuestionSearchRules(question);
    card.innerHTML = `
      <div class="search-result-top">
        <h3 class="search-result-title">${question.prompt}</h3>
        <div class="search-result-rules">
          ${ruleLabels.map((label) => `<span class="search-rule-chip">${label}</span>`).join("")}
        </div>
      </div>
      <p class="search-result-copy"><strong>Ruling:</strong> ${question.answers[question.correctIndex]}</p>
      <p class="search-result-copy"><strong>Why:</strong> ${question.explanation}</p>
      <div class="search-result-actions">
        <button type="button" class="ghost-button">Open in Drill</button>
      </div>
    `;
    card.querySelector(".ghost-button")?.addEventListener("click", () => focusQuestion(question));
    situationSearchResults.append(card);
  });
}

function handleReferenceSelect(item) {
  if (item.studyNote) {
    openStudyModal(item);
    return;
  }

  if (item.pathwayId) {
    handlePathwaySelect(item.pathwayId);
    return;
  }

  if (item.topicId) {
    handleTopicSelect(item.topicId);
  }
}

function openStudyModal(item) {
  if (!studyModal || !studyModalTitle || !studyModalSource || !studyModalCopy) {
    return;
  }

  studyModalTitle.textContent = item.title;
  studyModalSource.textContent = item.sourceLabel || item.citation || "Study note";
  studyModalCopy.innerHTML = formatStudyModalCopy(item.studyNote || item.detail);
  studyModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeStudyModal() {
  if (!studyModal) {
    return;
  }

  studyModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function handleStudyModalCloseClick(event) {
  event.preventDefault();
  closeStudyModal();
}

function handleStudyModalBackdropClick(event) {
  event.preventDefault();
  closeStudyModal();
}

function handleDocumentKeydown(event) {
  if (event.key === "Escape" && studyModal && !studyModal.hidden) {
    closeStudyModal();
  }
}

function handleTopicSelect(topicId) {
  clearAdvanceTimer();
  state.selectedRuleId = "";
  state.selectedPathId = "";
  state.selectedTopicId = topicId;
  state.currentQuestionIndex = 0;
  syncSelectedTopic();
  renderQuestion();
  saveState();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncSelectedTopic() {
  const activePath = getSelectedPath();
  const activeRule = getSelectedRule();
  const activeTopic = getSelectedTopic();
  const activeLabel = activeRule ? `${activeRule.rule}: ${activeRule.title}` : activePath ? activePath.title : activeTopic.title;

  quizTitle.textContent = `${activeLabel} drill`;

  document.querySelectorAll(".topic-card").forEach((card) => {
    card.classList.toggle("active", !activePath && card.dataset.topicId === state.selectedTopicId);
  });

  pathwayButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.pathwayId === state.selectedPathId);
  });

  renderManualModules();
}

function getSelectedTopic() {
  return studyTopics.find((topic) => topic.id === state.selectedTopicId) || studyTopics[0];
}

function getSelectedPath() {
  return trainingPaths.find((path) => path.id === state.selectedPathId) || null;
}

function getSelectedRule() {
  return rulebookOutline.find((item) => item.rule === state.selectedRuleId) || null;
}

function getTopicQuestions() {
  const activePath = getSelectedPath();
  const activeRule = getSelectedRule();
  if (activeRule) {
    return getQuestionsForRule(activeRule.rule);
  }
  const selectedIds = normalizeQuestionOrder(state.questionOrder)
    .map((index) => questions[index])
    .filter(Boolean)
    .filter((question) =>
      activePath ? activePath.topicIds.includes(question.topicId) : question.topicId === state.selectedTopicId,
    );
  const topicQuestions = selectedIds.length
    ? selectedIds
    : questions.filter((question) =>
        activePath ? activePath.topicIds.includes(question.topicId) : question.topicId === state.selectedTopicId,
      );

  return topicQuestions;
}

function getQuestionsForTopic(topicId) {
  const selectedIds = normalizeQuestionOrder(state.questionOrder)
    .map((index) => questions[index])
    .filter(Boolean)
    .filter((question) => question.topicId === topicId);
  const topicQuestions = selectedIds.length
    ? selectedIds
    : questions.filter((question) => question.topicId === topicId);
  return topicQuestions;
}

function getQuestionsForRule(ruleId) {
  const selectedIds = normalizeQuestionOrder(state.questionOrder)
    .map((index) => questions[index])
    .filter(Boolean)
    .filter((question) => questionMatchesRule(question, ruleId));
  const ruleQuestions = selectedIds.length
    ? selectedIds
    : questions.filter((question) => questionMatchesRule(question, ruleId));

  return ruleQuestions;
}

function questionMatchesRule(question, ruleId) {
  return getQuestionRuleIds(question).includes(ruleId);
}

function moveToNextScenarioSet() {
  const currentIndex = studyTopics.findIndex((topic) => topic.id === state.selectedTopicId);

  for (let offset = 1; offset <= studyTopics.length; offset += 1) {
    const topic = studyTopics[(currentIndex + offset) % studyTopics.length];
    const nextQuestions = getQuestionsForTopic(topic.id);
    if (nextQuestions.length) {
      state.selectedPathId = "";
      state.selectedTopicId = topic.id;
      state.currentQuestionIndex = 0;
      return true;
    }
  }

  return false;
}

function moveToNextRuleSet() {
  const currentIndex = rulebookOutline.findIndex((item) => item.rule === state.selectedRuleId);

  for (let offset = 1; offset <= rulebookOutline.length; offset += 1) {
    const nextRule = rulebookOutline[(currentIndex + offset) % rulebookOutline.length];
    const nextQuestions = getQuestionsForRule(nextRule.rule);
    if (nextQuestions.length) {
      state.selectedRuleId = nextRule.rule;
      state.currentQuestionIndex = 0;
      state.expandedRuleId = nextRule.rule;
      return true;
    }
  }

  return false;
}

function renderQuestion() {
  const topicQuestions = getTopicQuestions();
  const activePath = getSelectedPath();
  const activeRule = getSelectedRule();
  const selectedTopic = getSelectedTopic();
  if (!topicQuestions.length) {
    questionPrompt.textContent = "No missed questions in this topic yet.";
    questionTag.textContent = activeRule ? "Rule drill" : activePath ? activePath.title : getSelectedTopic().title;
    questionCounter.textContent = "Question set empty";
    feedbackText.textContent = "There are no questions loaded for this selection yet.";
    answersContainer.innerHTML = "";
    if (nextQuestionButton) {
      nextQuestionButton.hidden = true;
      nextQuestionButton.disabled = true;
    }
    return;
  }
  const question = topicQuestions[state.currentQuestionIndex % topicQuestions.length];
  const ruleLabel = getQuestionRuleLabel(question, activeRule);

  questionPrompt.textContent = question.prompt;
  questionTag.textContent = activeRule ? "Rule drill" : activePath ? activePath.title : selectedTopic.title;
  questionCounter.innerHTML = `
    ${ruleLabel ? `<span class="question-rule-chip">${ruleLabel}</span>` : ""}
    <span>Question ${state.currentQuestionIndex + 1} of ${topicQuestions.length}</span>
  `;
  feedbackText.textContent = "Pick an answer to see the ruling logic and study note.";
  answersContainer.innerHTML = "";
  if (nextQuestionButton) {
    nextQuestionButton.hidden = true;
    nextQuestionButton.disabled = true;
  }

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswer(question, index));
    answersContainer.append(button);
  });
}

function handleAnswer(question, selectedIndex) {
  const buttons = Array.from(document.querySelectorAll(".answer-button"));
  const wasCorrect = selectedIndex === question.correctIndex;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  feedbackText.textContent = `${wasCorrect ? "Correct." : "Not quite."} ${question.explanation}`;

  const questionKey = `${question.topicId}:${question.prompt}`;
  if (!state.completedQuestionIds.includes(questionKey)) {
    state.completedQuestionIds.push(questionKey);
  }
  if (wasCorrect && !state.correctQuestionIds.includes(questionKey)) {
    state.correctQuestionIds.push(questionKey);
  }
  if (wasCorrect) {
    state.missedQuestionIds = state.missedQuestionIds.filter((item) => item !== questionKey);
  } else if (!state.missedQuestionIds.includes(questionKey)) {
    state.missedQuestionIds.push(questionKey);
  }

  const topicQuestions = getTopicQuestions();
  const correctInTopic = topicQuestions.filter((item) =>
    state.correctQuestionIds.includes(`${item.topicId}:${item.prompt}`),
  ).length;
  const score = Math.round((correctInTopic / topicQuestions.length) * 100);

  state.bestScore = Math.max(state.bestScore, score);
  state.lastScore = score;
  state.lastSessionAt = new Date().toISOString();
  saveState();
  if (nextQuestionButton) {
    nextQuestionButton.hidden = false;
    nextQuestionButton.disabled = false;
    nextQuestionButton.textContent =
      state.currentQuestionIndex >= topicQuestions.length - 1
        ? state.selectedRuleId
          ? "Next rule"
          : "Next scenario"
        : "Next question";
  }
}

function handleShuffle() {
  clearAdvanceTimer();
  state.questionOrder = shuffleArray(questions.map((_, index) => index));
  state.currentQuestionIndex = 0;
  saveState();
  renderQuestion();
}

function handleStartTonight() {
  clearAdvanceTimer();
  state.selectedPathId = "";
  state.reviewMode = "all";
  state.currentQuestionIndex = 0;
  syncSelectedTopic();
  renderQuestion();
  saveState();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleReviewMistakes() {
  clearAdvanceTimer();
  state.reviewMode = "missed";
  state.currentQuestionIndex = 0;
  syncSelectedTopic();
  renderQuestion();
  saveState();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleTrainRule() {
  document.querySelector("#rule-outline-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handlePathwaySelect(pathwayId) {
  clearAdvanceTimer();
  state.selectedRuleId = "";
  state.selectedPathId = pathwayId;
  state.currentQuestionIndex = 0;
  syncSelectedTopic();
  renderQuestion();
  saveState();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleManualModuleSelect(module) {
  openStudyModal(module);
}

function handleModeToggle() {
  clearAdvanceTimer();
  state.reviewMode = state.reviewMode === "missed" ? "all" : "missed";
  state.currentQuestionIndex = 0;
  syncSelectedTopic();
  renderQuestion();
  saveState();
}

function handleNextQuestion() {
  const topicQuestions = getTopicQuestions();
  if (!topicQuestions.length) {
    return;
  }

  if (state.currentQuestionIndex >= topicQuestions.length - 1) {
    if (state.selectedRuleId) {
      moveToNextRuleSet();
    } else {
      moveToNextScenarioSet();
    }
  } else {
    state.currentQuestionIndex += 1;
  }

  syncSelectedTopic();
  saveState();
  renderQuestion();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleReset() {
  clearAdvanceTimer();
  state = {
    selectedTopicId: studyTopics[0].id,
    selectedPathId: "",
    selectedRuleId: "",
    expandedRuleId: rulebookOutline[0].rule,
    questionOrder: questions.map((_, index) => index),
    currentQuestionIndex: 0,
    completedQuestionIds: [],
    correctQuestionIds: [],
    missedQuestionIds: [],
    bestScore: 0,
    lastScore: null,
    lastSessionAt: "",
    reviewMode: "all",
  };

  renderRuleOutline();
  syncSelectedTopic();
  renderQuestion();
  saveState();
}

function getQuestionRuleLabel(question, activeRule) {
  return getQuestionRuleIds(question).join(" / ");
}

function getQuestionSearchRules(question) {
  const derived = getQuestionRuleIds(question);
  return derived.length ? derived : ["Rule map"];
}

function getQuestionRuleIds(question) {
  return Array.isArray(question.ruleIds) ? question.ruleIds : deriveQuestionRuleIds(question);
}

function deriveQuestionRuleIds(question) {
  const text = normalizeSearchText(`${question.prompt} ${question.explanation}`);
  const derived = new Set();

  switch (question.topicId) {
    case "lineup-equipment":
      derived.add("Rule 1");
      break;
    case "substitutions-conduct":
      derived.add("Rule 3");
      break;
    case "catch-no-catch":
      derived.add("Rule 2");
      if (
        hasAny(text, [
          "dropped third strike",
          "foul bunt",
          "batter",
          "swing",
          "third strike",
        ])
      ) {
        derived.add("Rule 7");
      }
      break;
    case "dead-ball":
      derived.add("Rule 5");
      if (
        hasAny(text, [
          "illegal pitch",
          "balk",
          "pitcher",
          "set position",
          "windup",
          "mouth",
          "bandage",
          "quick pitch",
        ])
      ) {
        derived.add("Rule 6");
      }
      if (
        hasAny(text, [
          "award",
          "awarded",
          "runners advance",
          "ball four",
          "hit by pitch",
          "lodges",
          "lodged",
          "out of play",
          "home run",
          "placed",
          "placement",
        ])
      ) {
        derived.add("Rule 8");
      }
      if (
        hasAny(text, [
          "fair ball",
          "foul ball",
          "bunt",
          "batter",
          "strike",
        ])
      ) {
        derived.add("Rule 7");
      }
      if (
        hasAny(text, [
          "regulation game",
          "suspended",
          "ending game",
          "ground rule",
          "lineup acceptance",
        ])
      ) {
        derived.add("Rule 4");
      }
      break;
    case "balks":
      derived.add("Rule 6");
      if (hasAny(text, ["runners advance", "awarded", "balk award"])) {
        derived.add("Rule 8");
      }
      break;
    case "interference":
      derived.add("Rule 8");
      if (
        hasAny(text, [
          "obstruction",
          "interference",
          "force-play slide",
          "retired runner",
          "runner lane",
        ])
      ) {
        derived.add("Rule 2");
      }
      if (
        hasAny(text, [
          "batter interference",
          "backswing",
          "follow-through",
          "illegal bat",
          "batting order",
          "batter-runner",
        ])
      ) {
        derived.add("Rule 7");
      }
      if (hasAny(text, ["bench", "coach", "dugout", "conference", "substitute"])) {
        derived.add("Rule 3");
      }
      break;
    case "appeals":
      if (
        hasAny(text, [
          "batting order",
          "improper batter",
          "foul bunt",
          "illegal bat",
          "dropped third strike",
        ])
      ) {
        derived.add("Rule 7");
      }
      if (
        hasAny(text, [
          "appeal",
          "missed base",
          "left early",
          "runner",
          "awarded bases",
          "base award",
        ])
      ) {
        derived.add("Rule 8");
      }
      if (
        hasAny(text, [
          "run scores",
          "run count",
          "score",
          "third out",
          "timing play",
        ])
      ) {
        derived.add("Rule 9");
      }
      if (!derived.size) {
        derived.add("Rule 7");
        derived.add("Rule 8");
      }
      break;
    case "rotations":
      derived.add("Rule 10");
      if (hasAny(text, ["going out", "third-to-first", "fair/foul", "tag-up"])) {
        derived.add("Rule 2");
      }
      break;
    case "game-status-scoring":
      if (
        hasAny(text, [
          "regulation",
          "suspended",
          "ended",
          "ground rules",
          "plate meeting",
          "lineup",
        ])
      ) {
        derived.add("Rule 4");
      }
      if (
        hasAny(text, [
          "run scores",
          "run count",
          "scorebook",
          "scorer",
          "earned run",
          "recording",
          "record keeping",
          "third out",
        ])
      ) {
        derived.add("Rule 9");
      }
      if (!derived.size) {
        derived.add("Rule 4");
      }
      break;
    case "runner-awards":
      derived.add("Rule 8");
      if (hasAny(text, ["balk", "illegal pitch"])) {
        derived.add("Rule 6");
      }
      if (hasAny(text, ["dead ball", "out of play", "lodged", "home run"])) {
        derived.add("Rule 5");
      }
      break;
    default:
      break;
  }

  return Array.from(derived);
}

function handleRuleSelect(ruleId) {
  clearAdvanceTimer();
  state.selectedRuleId = ruleId;
  state.selectedPathId = "";
  state.currentQuestionIndex = 0;
  state.expandedRuleId = ruleId;
  renderRuleOutline();
  syncSelectedTopic();
  renderQuestion();
  saveState();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function focusQuestion(question) {
  clearAdvanceTimer();
  const directRule = question.ruleIds && question.ruleIds.length === 1 ? question.ruleIds[0] : "";

  if (directRule) {
    state.selectedRuleId = directRule;
    state.selectedPathId = "";
    state.expandedRuleId = directRule;
    renderRuleOutline();
  } else {
    state.selectedRuleId = "";
    state.selectedPathId = "";
    state.selectedTopicId = question.topicId;
  }

  syncSelectedTopic();
  const pool = getTopicQuestions();
  const matchIndex = pool.findIndex(
    (item) =>
      item.topicId === question.topicId &&
      item.prompt === question.prompt &&
      item.explanation === question.explanation,
  );
  state.currentQuestionIndex = matchIndex >= 0 ? matchIndex : 0;
  saveState();
  renderQuestion();
  document.querySelector("#quiz-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearAdvanceTimer() {
  if (advanceTimer !== null) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
}

function shuffleArray(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function hasAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function tokenizeSearchQuery(query) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "into",
    "after",
    "before",
    "when",
    "what",
    "which",
    "does",
    "have",
    "has",
    "were",
    "while",
    "under",
    "there",
    "your",
    "their",
    "ball",
    "play",
    "rule",
  ]);

  return normalizeSearchText(query)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreQuestionSearch(question, tokens, fullQuery) {
  const promptText = normalizeSearchText(question.prompt);
  const explanationText = normalizeSearchText(question.explanation);
  const answerText = normalizeSearchText(question.answers[question.correctIndex] || "");
  const topic = studyTopics.find((item) => item.id === question.topicId);
  const topicText = normalizeSearchText(`${topic?.title || ""} ${topic?.reference || ""} ${topic?.description || ""}`);
  const ruleText = normalizeSearchText((question.ruleIds || []).join(" "));

  let score = 0;

  if (fullQuery && promptText.includes(fullQuery)) {
    score += 14;
  }

  tokens.forEach((token) => {
    if (promptText.includes(token)) {
      score += 5;
    }
    if (answerText.includes(token)) {
      score += 4;
    }
    if (explanationText.includes(token)) {
      score += 3;
    }
    if (topicText.includes(token)) {
      score += 2;
    }
    if (ruleText.includes(token)) {
      score += 2;
    }
  });

  return score;
}

function formatStudyModalCopy(copy) {
  const escaped = escapeHtml(copy || "");
  return escaped
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const formatted = paragraph.replace(
        /^(What to learn:|Why it matters:|What to focus on in study:|Common trap:|Best use:|Award basis:|Timing point:|Who moves:|How to study it:)/,
        "<strong>$1</strong>",
      );
      return `<p>${formatted.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeQuestionOrder(order) {
  if (!Array.isArray(order)) {
    return questions.map((_, index) => index);
  }

  const valid = order.filter((index) => Number.isInteger(index) && index >= 0 && index < questions.length);
  const seen = new Set(valid);
  const missing = questions.map((_, index) => index).filter((index) => !seen.has(index));
  return [...valid, ...missing];
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recent session";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
