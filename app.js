const STORAGE_KEY = "lau-study-center-state";
const LETTERS = ["A", "B", "C", "D"];
const FULL_MANUAL_LABEL = "__FULL_UMPIRES_MANUAL__";
const data = window.LAU_STUDY_DATA;
const rulebookReaderData = window.LAU_RULEBOOK_READER || { entries: [] };
const manualReaderData = window.LAU_MANUAL_DATA || { mechanicsReaderText: "", fullManualText: "", mechanicsByQuestion: {} };

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

const RULEBOOK_SECTION_OVERRIDES = {
  "Rule 1": `Rule 1
SECTION 1 POSITIONS OF PLAYERS
ART. 1... In high school baseball, each team is permitted seven turns at bat (4-2-2) during which it attempts to score runs by having its batters become baserunners who advance to and touch first base, second base, third base and home, while causing three of its batters or baserunners to be out.
ART. 2... Each of the two teams consists of at least nine players throughout the game (EXCEPTION 4-4-1f), one of whom must be designated captain. Lineups become official after they have been exchanged, verified and then accepted by the umpire during the pregame conference. The umpire shall not accept the lineup card until all substitutes are listed. There is no penalty assessed.
ART. 3... A player is designated on the lineup card and in the scorebook by name, shirt number, batting order position and fielding position. A customary arrangement of the fielders is shown in Diagram 1.
ART. 4... At the time of the pitch, all fielders shall be on fair ground except the catcher, who shall be in the catcher's box. A fielder is in fair ground when at least one foot is touching fair ground.
PENALTY: Illegal pitch. (2-18)
ART. 5... A player may change to a different fielding position at any time except that a pitcher, after being listed as such on the official lineup card handed the umpire, cannot change until conditions in 3-1-1 and 3-1-2 are met. Changes should be reported to the umpire-in-chief and scorekeeper.
SECTION 2 THE FIELD
ART. 1... A diamond (or infield) shall be a 90-foot square. When measuring the distance to first base and third base, measure from the apex of home plate to the back edge of the base. The outfield is the area between two foul lines formed by extending two sides of the diamond as in Diagram 2. The infield and outfield, including the boundary marks from home plate to first and third and their extended foul lines, are fair ground. All other area is foul ground.
ART. 2... All lines on the playing field shall be marked with a material which is not injurious to the eyes or skin. All non-permanent lines should be white. Lime or caustic material of any kind is prohibited.
ART. 3... The on-deck circle should be to the side and away from home plate, 37 feet if space allows. Neither team's players shall warm up in the other team's on-deck circle. The on-deck circle does not have to be occupied, but a player may choose to do so, provided the on-deck circle is located safely away from home plate. (2-23)
ART. 4... When the dugout area is temporarily extended, for any reason, it shall be extended toward the outfield on a line parallel to the foul line. The extension of the dugout area shall be equally applied for both teams.
ART. 5... When constructing a new field for high school play, the distance from home plate to the nearest obstruction on fair ground should be at least 300 feet down the foul lines and at least 350 feet to center field. It is recommended that the line from home plate through the pitcher's plate to second base run east-northeast. This line, using a steel tape or a strong tape or a cord, must measure 127 feet, 3 3/8 inches from the rear tip of home plate to the middle of second base. The catcher's box, home plate, bases, coaches' boxes, batters' boxes, and three-foot running lane shall be as in Diagram 2. The recommended width of a foul line is 2 1/2 inches.
ART. 6... On a sodded field, an unsodded area, commonly referred to as the pitcher's mound, should have a radius of about nine feet centered 1 1/2 feet in front of the midpoint of the front edge of the pitcher's plate. The top of the pitcher's plate must be 10 inches above the top surface of home plate. Inside the circle, a pitcher's mound should be constructed according to the specifications shown in the diagram. The degree of slope from a point 6 inches in front of the pitcher's plate to a point 6 feet toward home plate shall be one inch to one foot, and such degree of slope shall be uniform. The pitching mound is an 18-foot diameter circle, the center of which is 59 feet from the back point of home plate. Locate the front edge of the rubber 18 inches behind the center of the mound. The front edge of the rubber to the back point of home plate is 60 feet, 6 inches. The slope starts 6 inches from the front edge of the rubber. The level area surrounding the rubber should be 6 inches in front of the rubber, 18 inches to each side and 22 inches to the rear of the rubber. The total level area is 5 feet by 34 inches.
ART. 7... The pitcher's mound may consist in part of synthetic material that is commercially manufactured for that purpose. If a mound pad is composed of natural soil and synthetic material, the synthetic material must be securely attached to the ground and be installed at least flush or slightly below the surface of the ground. The mound area shall meet suggested height and slope specifications found in the Suggested Layout of the Pitcher's Mound. (Diagram 3)
ART. 8... Media shall be prohibited from being in live-ball area. If a designated media area is to be used, it shall be established before the game begins. The home team or game management shall designate a lined area for the media, which shall be considered dead-ball area.
ART. 9... First, second and third bases shall be white bags, 15 inches square and 2 to 5 inches in thickness, and made of canvas filled with a soft material, or molded rubber or synthetic material, and shall be securely attached to the ground or an anchor system as in Diagram 2. Bases may have tapered edges and/or be designed to disengage from their anchor systems. By state association adoption, a double first base is permitted. The double first base shall be a white base and a colored base. The colored base shall be located in foul territory. (Suggested Double First Base Rules, page 67)
ART. 10... Home plate shall be a five-sided slab of whitened rubber or other suitable similar material. One edge is 17 inches long, two are 8 1/2 inches and two are 12 inches. It shall be set in the ground so that the two 12-inch edges coincide with the diamond lines extending from home plate to first base and to third base, with the 17-inch edge facing the pitcher's plate.
ART. 11... The pitcher's plate shall be a rectangular slab of whitened rubber or suitable material, 24 inches by 6 inches. It shall be set in the ground as shown in Diagram 2 so that the distance between the nearer edge of the pitcher's plate and the rear tip of home plate shall be 60 feet, 6 inches.
ART. 12... Any game started on a nonregulation facility by mutual agreement of the opposing coaches shall not be protested for this reason.
SECTION 3 BATS, BALLS AND GLOVES
ART. 1... The ball shall meet the current NOCSAE standard for baseballs at the time of manufacture and is required on balls that will be used in high school competition. The SEI/NOCSAE mark is required on all balls that meet the NOCSAE standard that will be used in high school competition. A minimum of three umpire-approved baseballs shall be provided to start the game. Unless otherwise mutually agreed upon, the home team has this responsibility. No less than two baseballs shall be used to complete a game. The NFHS Authenticating Mark is required on all balls that will be used in high school competition. A current list of NFHS authenticated products can be found on the website: www.nfhs.org.
ART. 2... The bat shall have the following characteristics and components:
• Each legal wood, aluminum or composite bat shall be one piece, multi-pieces and permanently assembled, or two pieces with interchangeable barrel construction.
• It shall not have exposed attachments, rivets, pins, rough or sharp edges or any form of exterior fastener that would present a potential hazard.
• It shall be free of rattles, dents, burrs, cracks and sharp edges. Bats that are broken, altered or that deface the ball are illegal. Materials inside the bat or treatments/devices used to alter the bat specifications and/or enhance performance are prohibited and render the bat illegal.
• Each legal wood, aluminum or composite bat shall have the following components: knob, handle, taper, barrel and end cap, as described in the rulebook.
• Each bat not made of a single piece of wood shall have a safety grip made of cork, tape (no smooth, plastic tape) or commercially manufactured composition material. The grip must extend a minimum of 10 inches, but not more than 18 inches, from the base of the knob. Resin, pine tar or any other drying agent to enhance the hold are permitted on the bat, not to exceed beyond 18 inches from the base of the knob. Molded grips are illegal.
• It shall be 2 5/8 inches or less in diameter at the thickest part and 36 inches or less in length.
• It shall not weigh, numerically, more than three ounces less than the length of the bat.
• Bats that are not made of a single piece of wood shall meet the BBCOR performance standard and such bats shall be labeled with a silkscreen or other permanent certification mark. No BBCOR label, sticker or decal will be accepted on any non-wood bat.
NOTE: The NFHS has been advised that certain manufacturers consider alteration, modification and doctoring of bats to be unlawful and subject to civil and, under certain circumstances, criminal action.
ART. 3... A bat made of a single piece of wood may be roughened or wound with tape not more than 18 inches from the handle end of the bat. No foreign substance may be added to the surface of the bat beyond 18 inches from the end of the handle. Each bat made of a single piece of wood shall be 2 3/4 inches or less in diameter at the thickest part and 36 inches or less in length.
ART. 4... Only bats may be used in warming up, including weighted bats used for this purpose, at any location. Only bats and items designed to remain part of the bat, such as weighted bats, batting donuts and wind-resistant devices, are legal at any location.
ART. 5... Bats that are altered from the manufacturer's original design and production, or that do not meet the rule specifications, are illegal (7-4-1a). No artificial or intentional means shall be used to control the temperature of the bat. No foreign substance may be inserted into the bat. Bats that are broken, cracked or dented or that deface the ball shall be removed without penalty. A bat that continually discolors the ball may be removed from the game with no penalty at the discretion of the umpire.
ART. 6... Gloves/mitts made of leather shall be worn by all fielders and not be altered to create an adhesive, sticky, and/or tacky surface. The glove/mitt worn by the catcher may be any size. The glove/mitt worn by the pitcher that includes the colors white and/or gray shall be removed from the game upon discovery by either team and/or umpire. The glove/mitt worn by all fielders except the catcher shall conform to the maximum specifications listed in the rulebook.
ART. 7... Loose equipment, such as gloves, bats, helmets or catcher's gear, of either team may not be on or near the field.
PENALTY: If loose equipment interferes with play, the umpire may call an out or outs, award bases or return runners, based on the umpire's judgment and the circumstances concerning the play.
SECTION 4 UNIFORMS
ART. 1... Uniforms of all team members should be of the same color and style. Caps and shoes are required equipment (no track spikes allowed). When a player is required to wear a head protector, it replaces the cap as mandatory equipment.
ART. 2... For individual players, uniform sleeve lengths may vary. However, sleeves of each individual player shall be approximately the same length and shall not be ragged, frayed or slit. If the pitcher's undershirt sleeves are exposed, the sleeves shall not be white or gray. Compression sleeves that are solid black or solid dark-colored shall be the only colors allowed to be worn by the pitcher below the elbow. A pitcher shall not wear any item on the hands, wrists or arms which may be distracting to the batter. A pitcher shall not wear white or gray exposed undershirt sleeves or any white or gray sleeve that extends below the elbow. A vest and coordinating shirt worn underneath is viewed as a type of uniform top.
ART. 3... A uniform shall not have any dangerous or reflective buttons or ornaments. Each player shall be numbered on the back of the shirt with a plain number of solid color contrasting with the color of the shirt. This number shall be plain Arabic style and shall be at least eight inches high, and no players on the same team shall wear identical numbers. A number may have a border of not more than one-quarter inch in width.
ART. 4... The school's official uniform, including uniform pants, jersey, visible undergarments, socks, stockings, caps and headwear, may bear only a visible single manufacturer's logo or trademark. The manufacturer's logo/trademark shall not exceed 2 1/4 square inches with no dimension exceeding 2 1/4 inches. No more than one manufacturer's logo/trademark or reference shall be permitted on the outside of each item. One American flag 2 inches by 3 inches may be worn or occupy space on each item of uniform apparel. By state association adoption, commemorative or memorial patches may be worn as provided by rule.
SECTION 5 PLAYER EQUIPMENT
ART. 1... It is mandatory for on-deck batters, batters, runners, retired runners, players/students in the coaches' boxes, as well as non-adult bat/ball shaggers, to wear a batting helmet that has a non-glare surface and meets the NOCSAE standard at the time of manufacture. The batting helmet shall have extended ear flaps that cover both ears and temples and shall also display the NOCSAE stamp and the exterior warning statement.
PENALTY: When an umpire observes anyone who is required to wear a batting helmet deliberately remove the helmet while in live-ball territory and the ball is live, the umpire shall issue a warning to the coach of the involved team. A subsequent violation of the rule shall result in ejection.
ART. 2... A face mask/guard may be attached to batting helmets at the time of manufacture. All face mask/guards shall meet the NOCSAE standard at the time of manufacture. A face mask/guard specifically designed for a particular helmet model may be attached after manufacture, provided that procedure is approved by the manufacturer and meets the NOCSAE standard at the time of manufacture.
ART. 3... The catcher shall wear, in addition to a head protector, a mask with a throat protector, a body/chest protector that meets the NOCSAE standard at the time of manufacture, a protective cup (male only), and baseball protective shin guards. The SEI/NOCSAE mark is required on all body/chest protectors that meet the NOCSAE standard at the time of manufacture that will be used in high school competition.
ART. 4... The catcher's helmet and mask combination shall meet the NOCSAE standard at the time of manufacture. Eye shields shall not be attached to the catcher's mask after manufacture. Tinted eyewear worn on the face and under the face mask is permitted. Any helmet or helmet and mask combination shall have full ear protection (dual ear flaps). A throat protector, which is either a part of or attached to the catcher's mask, is mandatory.
PENALTY: Failure by a player to wear proper equipment after being so ordered by the umpire shall result in ejection.
ART. 5... Defensive players are permitted to wear face/head protection in the field. If a pitcher or any defensive player wears face/head protection, its outer covering shall have a non-glare surface.
ART. 6... Defective equipment must be repaired or replaced immediately.
ART. 7... If a ball is touched with an illegal glove or mitt and that is discovered by the umpire, the coach or captain of the team at bat has the choice of taking the result of the play or having the award for use of an illegal glove or mitt. The illegal glove or mitt must be replaced immediately. A foul fly caught with an illegal glove/mitt shall be nullified and treated as a foul ball, unless the team at bat elects to take the result of the play.
ART. 8... Hard and unyielding items, such as guards, casts, braces and splints, must be padded with a closed-cell, slow-recovery foam padding no less than 1/2 inch thick. Knee and ankle braces which are unaltered from the manufacturer's original design do not require additional padding. State associations may authorize exceptions as provided by rule.
ART. 9... Any player equipment judged by the umpire to be unreasonably dangerous is illegal.
ART. 10... Any questions regarding legality of a player's equipment shall be resolved by the umpire-in-chief.
ART. 11... Non-traditional playing equipment must be reviewed by the NFHS Baseball Rules Committee before it will be permitted to be used.
SECTION 6 PLAYER COMMUNICATION EQUIPMENT
ART. 1... Any wristband with defensive shifts/offensive plays/pitching choices or game directions attached shall be considered non-electronic equipment and is permitted as long as it is a single, solid color. For pitchers, it may not contain the colors white or gray or be distracting. It does not have to match the color of the uniform or the sleeves worn underneath the uniform jersey. It shall only be worn on a player's wrist or forearm, and pitchers shall wear it on their non-pitching arm.
PENALTY: The umpire shall issue a team warning to the coach of the team involved and the next offender(s) of that team will be ejected along with the head coach.
ART. 2... One-way electronic communication devices are permissible from the dugout to the catcher while the team is on defense for the purpose of calling pitches. When using the electronic communication device, the coach cannot be outside the dugout/bench area.
PENALTY: The umpire shall issue a team warning to the coach of the team involved and the next offender(s) of that team will be ejected along with the head coach.`
};

if (!data) {
  throw new Error("LAU study data failed to load.");
}

const statQuestionCount = document.querySelector("#stat-question-count");
const statAnsweredCount = document.querySelector("#stat-answered-count");
const statAccuracy = document.querySelector("#stat-accuracy");
const statMissedCount = document.querySelector("#stat-missed-count");
const statProgress = document.querySelector("#stat-progress");
const statProgressNote = document.querySelector("#stat-progress-note");
const statRemainingCount = document.querySelector("#stat-remaining-count");
const retakeMissedButton = document.querySelector("#retake-missed-button");
const resetProgressButton = document.querySelector("#reset-progress-button");
const heroStartExam = document.querySelector("#hero-start-exam");
const heroOpenManual = document.querySelector("#hero-open-manual");
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
const studyPaginationTop = document.querySelector("#study-pagination-top");
const studyPaginationBottom = document.querySelector("#study-pagination-bottom");
const ruleGrid = document.querySelector("#rule-grid");
const ruleReaderModal = document.querySelector("#rule-reader-modal");
const ruleReaderKicker = document.querySelector("#rule-reader-kicker");
const ruleReaderTitle = document.querySelector("#rule-reader-title");
const ruleReaderSource = document.querySelector("#rule-reader-source");
const ruleReaderNav = document.querySelector("#rule-reader-nav");
const ruleReaderBody = document.querySelector("#rule-reader-body");
const ruleReaderStudyLink = document.querySelector("#rule-reader-study-link");
const ruleReaderManualLink = document.querySelector("#rule-reader-manual-link");
const ruleReaderCloseButton = document.querySelector("#rule-reader-close-button");
const ruleReaderBackdrop = document.querySelector(".rule-reader-backdrop");
const ruleReaderPanel = document.querySelector(".rule-reader-panel");
const examCenter = document.querySelector("#exam-center");

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
let studyPage = 1;
let currentSession = null;
let suspendedSession = null;
let openRuleReaderLabel = "";
let activeRulebookCardLabel = "";
let ruleReaderShowsFullManual = false;
const STUDY_PAGE_SIZE = 10;

initialize();

function initialize() {
  normalizeInitialLocation();
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

  heroStartExam?.addEventListener("click", (event) => {
    event.preventDefault();
    activeMode = "full";
    sectionFilter.value = "All";
    syncModeButtons();
    startSession();
    examCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  heroOpenManual?.addEventListener("click", (event) => {
    event.preventDefault();
    openFullManualReader();
  });

  if (retakeMissedButton) {
    retakeMissedButton.addEventListener("click", () => {
      launchMissedReviewSession();
    });
  }

  studySearch.addEventListener("input", () => {
    studyQuery = studySearch.value.trim().toLowerCase();
    studyPage = 1;
    renderStudyList();
  });

  studyChipRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chip]");
    if (!button) {
      return;
    }

    studyFilter = button.dataset.chip;
    studyPage = 1;
    renderStudyChips();
    renderStudyList();
  });

  clearStudyFiltersButton.addEventListener("click", () => {
    studyFilter = "All";
    studyQuery = "";
    studyPage = 1;
    studySearch.value = "";
    renderStudyChips();
    renderStudyList();
  });

  resetProgressButton?.addEventListener("click", () => {
    const shouldReset = window.confirm("Reset all saved progress on this browser and device?");
    if (!shouldReset) {
      return;
    }

    state.answered = {};
    state.missedQuestionIds = [];
    state.examHistory = [];
    currentSession = null;
    saveState();
    renderStats();
    renderStudyList();

    examSectionPill.textContent = "Full bank";
    examProgressCopy.textContent = "Not started";
    examProgressBar.style.width = "0%";
    questionShell.innerHTML = `
      <p class="empty-state">
        Choose your mode above and click <strong>Start session</strong> to load the first question.
      </p>
    `;
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

    const button = event.target.closest("[data-launch-question]");
    if (!button) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const questionNumber = Number(button.dataset.launchQuestion);
    const question = findQuestion(questionNumber);
    const card = button.closest("[data-study-question]");
    if (!question) {
      return;
    }

    if (card) {
      toggleStudyReferenceCard(card, question, button);
    }
  });

  [studyPaginationTop, studyPaginationBottom].forEach((paginationRoot) => {
    if (!paginationRoot) {
      return;
    }

    paginationRoot.addEventListener("click", (event) => {
      const button = event.target.closest("[data-study-page]");
      if (!button) {
        return;
      }

      const nextPage = Number(button.dataset.studyPage);
      if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage === studyPage) {
        return;
      }

      studyPage = nextPage;
      renderStudyList();
      const studyCenter = document.querySelector("#study-center");
      studyCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
  });

  if (ruleReaderBackdrop) {
    ruleReaderBackdrop.addEventListener("click", closeRuleReader);
  }

  if (ruleReaderCloseButton) {
    ruleReaderCloseButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeRuleReader();
    });
  }

  if (ruleReaderPanel) {
    ruleReaderPanel.addEventListener("click", (event) => {
      event.stopPropagation();
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
    ruleReaderStudyLink.addEventListener("click", (event) => {
      event.preventDefault();

      if (!openRuleReaderLabel) {
        return;
      }

      studyFilter = openRuleReaderLabel;
      studyQuery = "";
      if (studySearch) {
        studySearch.value = "";
      }
      renderStudyChips();
      renderStudyList();
      closeRuleReader();

      const studyCenter = document.querySelector("#study-center");
      if (studyCenter) {
        studyCenter.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (ruleReaderManualLink) {
    ruleReaderManualLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (openRuleReaderLabel !== "Mechanics" && openRuleReaderLabel !== FULL_MANUAL_LABEL) {
        return;
      }
      window.location.href = "./manual.html";
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !ruleReaderModal?.hidden) {
      closeRuleReader();
    }
  });
}

function normalizeInitialLocation() {
  if (window.location.hash) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
    card.className = `rule-card${section.label === activeRulebookCardLabel ? " is-active" : ""}`;
    card.innerHTML = `
      <div>
        <p class="section-label">${escapeHtml(section.label)}</p>
        <h3>${escapeHtml(section.title)}</h3>
      </div>
      <div class="rule-meta">
        <span class="pill">${escapeHtml(section.questionCount)} study questions</span>
      </div>
      <p>${escapeHtml(section.summary)}</p>
      <button type="button" class="rule-link" data-open-rulebook="${escapeAttribute(section.label)}">Study This Rule</button>
    `;
    ruleGrid.append(card);
  });
}

function openRuleReader(label) {
  openRuleReaderLabel = label;
  activeRulebookCardLabel = label;
  ruleReaderShowsFullManual = false;
  renderRulebookHub();
  renderOpenRuleReader();
}

function openFullManualReader() {
  openRuleReaderLabel = FULL_MANUAL_LABEL;
  activeRulebookCardLabel = "Mechanics";
  ruleReaderShowsFullManual = true;
  renderRulebookHub();
  renderOpenRuleReader();
}

window.openFullManualReaderApp = openFullManualReader;

function renderOpenRuleReader() {
  const label = openRuleReaderLabel;
  const isDirectFullManual = label === FULL_MANUAL_LABEL;
  const entry = rulebookEntriesByLabel.get(label);
  const section = safeRuleSections.find((item) => item.label === label);

  if (
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

  if (!isDirectFullManual && !entry) {
    return;
  }

  const showFullManualToggle = (label === "Mechanics" || isDirectFullManual) && Boolean(manualReaderData.fullManualText);
  if (ruleReaderManualLink) {
    ruleReaderManualLink.hidden = !showFullManualToggle;
    ruleReaderManualLink.textContent = ruleReaderShowsFullManual
      ? "Back to Two-Umpire Mechanics"
      : "Open Full Umpires Manual";
  }

  if (ruleReaderShowsFullManual && showFullManualToggle) {
    ruleReaderKicker.textContent = "Umpires Manual Reader";
    ruleReaderTitle.textContent = "2026 Umpires Manual";
    ruleReaderSource.textContent = "Official 2026 Umpires Manual";
    ruleReaderStudyLink.hidden = true;
  } else {
    ruleReaderKicker.textContent = "Rulebook Reader";
    ruleReaderTitle.textContent = section?.title ? `${label}: ${section.title}` : label;
    ruleReaderSource.textContent = label.startsWith("Rule ")
      ? `Official 2025 NFHS Baseball Rules text${section?.page ? ` · Page ${section.page}` : ""}`
      : `${label}${section?.page ? ` · Page ${section.page}` : ""}`;
    ruleReaderStudyLink.hidden = !safeQuestions.some((question) => question.section === label);
  }

  const readerText = ruleReaderShowsFullManual && showFullManualToggle
    ? manualReaderData.fullManualText
    : (label === "Mechanics" || isDirectFullManual)
      ? (manualReaderData.mechanicsReaderText || entry.text)
      : (RULEBOOK_SECTION_OVERRIDES[label] || entry.text);
  const preparedReaderText = (label === "Mechanics" || isDirectFullManual || (ruleReaderShowsFullManual && showFullManualToggle))
    ? cleanManualReaderText(readerText)
    : readerText;
  const rendered = renderRuleReaderContent(preparedReaderText);
  ruleReaderNav.innerHTML = rendered.navHtml || '<p class="rule-reader-empty">Scroll the reader for the full rule text.</p>';
  ruleReaderBody.innerHTML = rendered.bodyHtml;
  ruleReaderBody.scrollTop = 0;
  ruleReaderModal.hidden = false;
  ruleReaderModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-reader-open");
  ruleReaderCloseButton?.focus();
}

function closeRuleReader() {
  if (!ruleReaderModal) {
    return;
  }

  openRuleReaderLabel = "";
  ruleReaderShowsFullManual = false;
  ruleReaderModal.hidden = true;
  ruleReaderModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-reader-open");
}

function cleanManualReaderText(text) {
  const replacements = [
    [/Baseoall/g, "Baseball"],
    [/oneof/g, "one of"],
    [/themost/g, "the most"],
    [/inhecountry/g, "in the country"],
    [/at ,e high school level/g, "at the high school level"],
    [/at,\s*e high school level/g, "at the high school level"],
    [/at e high school level/g, "at the high school level"],
    [/at ,e higlhsclmol level/g, "at the high school level"],
    [/higlhsclmol/g, "high school"],
    [/highschool/g, "high school"],
    [/thenumber/g, "the number"],
    [/theneed/g, "the need"],
    [/Unlikesports/g, "Unlike sports"],
    [/youmight/g, "you might"],
    [/havea set partner/g, "have a set partner"],
    [/Umpirestyp,ically/g, "Umpires typically"],
    [/Umpirestyp, ically/g, "Umpires typically"],
    [/witha different partner/g, "with a different partner"],
    [/\bwhena\b/g, "when a"],
    [/\bwitha\b/g, "with a"],
    [/\bbeon\b/g, "be on"],
    [/\bthesame\b/g, "the same"],
    [/beon,\s*thesame/g, "be on the same"],
    [/beon\s+thesame/g, "be on the same"],
    [/prescribedplay/g, "prescribed play"],
    [/Theillustrations/g, "The illustrations"],
    [/differernt/g, "different"],
    [/thecore/g, "the core"],
    [/Refereehas/g, "Referee has"],
    [/tocheck/g, "to check"],
    [/to check with,\s*/g, "to check with "],
    [/assoc!\s*iations/g, "associations"],
    [/assignersand/g, "assigners and"],
    [/andcoverages/g, "and coverages"],
    [/oomes/g, "comes"],
    [/mechariics/g, "mechanics"],
    [/inthislbook/g, "in this book"],
    [/explainthe/g, "explain the"],
    [/graphical!presented/g, "graphically presented"],
    [/We encourageall/g, "We encourage all"],
    [/governing oodies/g, "governing bodies"],
    [/111e/g, "the"],
    [/Umpires arethethirdteam/g, "Umpires are the third team"],
    [/field Anc\. I whileumpires/g, "field and while umpires"],
    [/field Anc\.\s*l whileumpires/g, "field and while umpires"],
    [/whileumpires/g, "while umpires"],
    [/winorlose/g, "win or lose"],
    [/tothegame/g, "to the game"],
    [/Workiingtogether/g, "Working together"],
    [/teamensuresthe/g, "team ensures the"],
    [/withollt/g, "without"],
    [/issues.This/g, "issues. This"],
    [/DEFINITION OF TERMS/g, "SECTION 2 DEFINITION OF TERMS"],
    [/DEFINITION OFTERMS/g, "SECTION 2 DEFINITION OF TERMS"],
    [/Definitionof Tenns/g, "Definition of Terms"],
    [/Definitionof Terms/g, "Definition of Terms"],
    [/Delinilian al Terms/g, "Definition of Terms"],
    [/Clear the runner/g, "Clear the runner"],
    [/Clear the runner -At/g, "Clear the runner - At"],
    [/runner'ssaf,e/g, "runner's safe"],
    [/runner'sssaf,\s*e/g, "runner's safe"],
    [/must assumeresponsibilityfor/g, "must assume responsibility for"],
    [/must assumeresponsibility/g, "must assume responsibility"],
    [/requiresPU/g, "requires PU"],
    [/rnnner'ssaf,e/g, "runner's safe"],
    [/rnnner/g, "runner"],
    [/rnnners/g, "runners"],
    [/two-umpirecrew/g, "two-umpire crew"],
    [/responsioility/g, "responsibility"],
    [/releasirng/g, "releasing"],
    [/normal positiorn/g, "normal position"],
    [/responsillility/g, "responsibility"],
    [/move,out/g, "move out"],
    [/move,\s*out of theinfield,\s*ito foul/g, "move out of the infield, into foul"],
    [/loul territory/g, "foul territory"],
    [/wlo must/g, "who must"],
    [/Ivegot/g, "I've got"],
    [/Todo so/g, "To do so"],
    [/increasethe/g, "increase the"],
    [/the distance between your llody/g, "the distance between your body"],
    [/whena play/g, "when a play"],
    [/umpiretoward/g, "umpire toward"],
    [/two-umpir,\s*esystem/g, "two-umpire system"],
    [/defensiveplayers/g, "defensive players"],
    [/imaginaryl1ine/g, "imaginary line"],
    [/extendsthefirst-base/g, "extends the first-base"],
    [/behindthe plate/g, "behind the plate"],
    [/isthree feet/g, "is three feet"],
    [/th\.\s*abest possillle angle/g, "the best possible angle"],
    [/thefirst-baseline/g, "the first-baseline"],
    [/keepyour eye/g, "keep your eye"],
    [/onthe l:\s*lall/g, "on the ball"],
    [/findii necessary/g, "find it necessary"],
    [/glanceal/g, "glance at"],
    [/onseveral/g, "on several"],
    [/tagsup/g, "tags up"],
    [/eac!\s*h base/g, "each base"],
    [/passwithin/g, "pass within"],
    [/mollitor/g, "monitor"],
    [/rullner's/g, "runner's"],
    [/varietyof/g, "variety of"],
    [/umpiremay/g, "umpire may"],
    [/Ile•required/g, "be required"],
    [/ellterillgthe/g, "entering the"],
    [/outfield-grassarea/g, "outfield-grass area"],
    [/rulecatch\/no catch/g, "rule catch/no catch"],
    [/fair\/foul on a batted ball/g, "fair/foul on a batted ball"],
    [/llhat area/g, "That area"],
    [/oordefed l:\s*ly/g, "bordered by"],
    [/allclthe/g, "and the"],
    [/lille/g, "line"],
    [/Thebox isapproximately/g, "The box is approximately"],
    [/Playsthat/g, "Plays that"],
    [/originateill/g, "originate in"],
    [/most otten/g, "most often"],
    [/running-lane interferenceviolations/g, "running-lane interference violations"],
    [/basicumpire's/g, "basic umpire's"],
    [/ari upright sta11ce/g, "an upright stance"],
    [/oackward whilepointing/g, "backward while pointing"],
    [/yourfoottoward/g, "your foot toward"],
    [/beforetheball/g, "before the ball"],
    [/withyouropposite/g, "with your opposite"],
    [/onthedevelopinigplay/g, "on the developing play"],
    [/Athree-step methodthat/g, "A three-step method that"],
    [/help youdetermine/g, "help you determine"],
    [/duringa \(levelopingplay/g, "during a developing play"],
    [/determinewhat/g, "determine what"],
    [/eachdeveloping play/g, "each developing play"],
    [/usedby/g, "used by"],
    [/heor she/g, "he or she"],
    [/movesinto/g, "moves into"],
    [/infiel\(lfromposition/g, "infield from position"],
    [/tilit lo theoutfield/g, "hit to the outfield"],
    [/oocurs on/g, "occurs on"],
    [/The action that developsas/g, "The action that develops as"],
    [/arrive at tile same place/g, "arrive at the same place"],
    [/approximatelythesame/g, "approximately the same"],
    [/A\. playusually/g, "A play usually"],
    [/movetoa play/g, "move to a play"],
    [/onlywhenall threeelementsare/g, "only when all three elements are"],
    [/filrst base/g, "first base"],
    [/umpirnstandsiinthe/g, "umpire stands in the"],
    [/there areno/g, "there are no"],
    [/tllrneumpires/g, "three umpires"],
    [/thereis a runner on secoml only/g, "there is a runner on second only"],
    [/allowsthe IJase umpiretoget/g, "allows the base umpire to get"],
    [/intothe infield/g, "into the infield"],
    [/field'er/g, "fielder"],
    [/fit-base sideof/g, "first-base side of"],
    [/strad'dllean/g, "straddle an"],
    [/thron\.\s*rgh/g, "through"],
    [/Whenth,\s*epitcherlakes/g, "When the pitcher takes"],
    [/hands-on-kneesset/g, "hands-on-knees set"],
    [/shoulllers/g, "shoulders"],
    [/therei,\s*sa ru Inner/g, "there is a runner"],
    [/Thebas,\s*eumpire/g, "The base umpire"],
    [/thethird-base side of themid'dlleof/g, "the third-base side of the middle of"],
    [/betweenthepiteher's mound/g, "between the pitcher's mound"],
    [/linedrawn/g, "line drawn"],
    [/theedge of thedirtcircle/g, "the edge of the dirt circle"],
    [/Whell l'he pitcher/g, "When the pitcher"],
    [/oe in ahands-on-knees set/g, "be in a hands-on-knees set"],
    [/direc Uy I\. acing/g, "directly facing"],
    [/begiri inposition C/g, "begin in position C"],
    [/runner coml:\s*Jinations/g, "runner combinations"],
    [/P; ickofl/g, "Pickoff"],
    [/P, lays/g, "Plays"],
    [/Flv balls/g, "Fly balls"],
    [/IHelp/g, "Help"],
    [/IFly/g, "Fly"],
    [/lasehit/g, "base hit"],
    [/Grouindball/g, "Ground ball"],
    [/oerthrow/g, "overthrow"],
    [/second! Jase/g, "second base"],
    [/seoond/g, "second"],
    [/thiird/g, "third"],
    [/rntate/g, "rotate"],
    [/rotatim1/g, "rotation"],
    [/oetter/g, "better"],
    [/reai?l/g, "read"],
    [/otserves/g, "observes"],
    [/Umpireresponslbllltles/g, "Umpire responsibilities"],
    [/Umplr,?e responslbllitles/g, "Umpire responsibilities"],
    [/responsib: ilities/g, "responsibilities"],
    [/resp11nsibilities/g, "responsibilities"],
    [/Gemeral Information/g, "General Information"],
    [/llnitlal/g, "Initial"],
    [/lnltial/g, "Initial"],
    [/Tit?inW/g, "Throw"],
    [/theplate/g, "the plate"],
    [/Ondiamonds/g, "On diamonds"],
    [/thearea/g, "the area"],
    [/eachbase/g, "each base"],
    [/semi-circulararea/g, "semi-circular area"],
    [/eictending/g, "extending"],
    [/infrillges/g, "infringes"],
    [/All umpire who is/g, "All umpires, the one who is"],
    [/grass illfield/g, "grass infield"],
    [/cutoutis/g, "cutout is"],
    [/whois/g, "who is"],
    [/approximately 13 feet from the base\.The/g, "approximately 13 feet from the base. The"],
    [/llOlonger/g, "no longer"],
    [/illdicateihat/g, "indicate that"],
    [/raiseboth/g, "raise both"],
    [/Il Olonger in play/g, "no longer in play"],
    [/e Ktern:\s*led/g, "extended"],
    [/eKtern:led/g, "extended"],
    [/Ipallms/g, "palms"],
    [/foiward/g, "forward"],
    [/Ile as simpleas/g, "It may be as simple as"],
    [/simpleas/g, "simple as"],
    [/pointingin/g, "pointing in"],
    [/conciseas/g, "concise as"],
    [/d'etermined dmillg/g, "determined during"],
    [/BR- The batter-runner\./g, "BR - The batter-runner."],
    [/Beforethe play/g, "Before the play"],
    [/All abbreviationfor/g, "An abbreviation for"],
    [/beforea fielder/g, "before a fielder"],
    [/tile oase/g, "the base"],
    [/Below the knee catch -A/g, "Below the knee catch - A"],
    [/calch/g, "catch"],
    [/theknee/g, "the knee"],
    [/lie ball/g, "the ball"],
    [/llall/g, "ball"],
    [/his! Jack turned/g, "his back turned"],
    [/reachingtheball/g, "reaching the ball"],
    [/wants to ma.intaina/g, "wants to maintain a"],
    [/wit11the ball/g, "with the ball"],
    [/wi t11the ball/g, "with the ball"],
    [/within his or her field of view\.Keeping/g, "within his or her field of view. Keeping"],
    [/theball allows/g, "the ball allows"],
    [/poilltedtoward/g, "pointed toward"],
    [/front ot them/g, "front of them"],
    [/the1playin/g, "the play in"],
    [/exceptions exist\.\s*umpires should/g, "exceptions exist. Umpires should"],
    [/exceptionse\)\(Jist\./g, "exceptions exist."],
    [/umpire:,/g, "umpires"],
    [/clear the catcher-Theplate/g, "clear the catcher - The plate"],
    [/righHoot/g, "right foot"],
    [/right-hancledlbatter/g, "right-handed batter"],
    [/lefl-lhandedbatter/g, "left-handed batter"],
    [/lirst\./g, "first."],
    [/lletween/g, "between"],
    [/arollnd/g, "around"],
    [/towarrd/g, "toward"],
    [/next play may occur; for example, themovement/g, "next play may occur; for example, the movement"],
    [/routinely designated lly/g, "routinely designated by"],
    [/first-basefair\/foul/g, "first-base fair/foul"],
    [/dec,isions/g, "decisions"],
    [/llattedballs/g, "batted balls"],
    [/marksthebeginning/g, "marks the beginning"],
    [/keepyour eye onthe l:lall/g, "keep your eye on the ball"],
    [/closeproimity\(to observe obstruction or interferellce\)/g, "close proximity (to observe obstruction or interference)"],
    [/closeproximity\(to observe obstruction or interferellce\)/g, "close proximity (to observe obstruction or interference)"],
    [/close proximity \(to observe obstruction or interferellce\)/g, "close proximity (to observe obstruction or interference)"],
    [/Imaginarybox/g, "Imaginary box"],
    [/approximately 45 feel by 45 feet square/g, "approximately 45 feet by 45 feet square"],
    [/Opening the gate-A/g, "Opening the gate - A"],
    [/movemenit/g, "movement"],
    [/corntinued otiservation/g, "continued observation"],
    [/IJatted or thrownIJall/g, "batted or thrown ball"],
    [/with your feet comfortably apart;keepingyourchest/g, "with your feet comfortably apart; keeping your chest"],
    [/the lall'sdes!inatioll/g, "the ball's destination"],
    [/Pause, read and react-Athree-step/g, "Pause, read and react - A three-step"],
    [/determinewhereyou shouldgo/g, "determine where you should go"],
    [/what your responsibilities will tie/g, "what your responsibilities will be"],
    [/observethe initial action/g, "observe the initial action"],
    [/what playis goiirlgtodevelop/g, "what play is going to develop"],
    [/what position adjustment youshould make/g, "what position adjustment you should make"],
    [/anticipated play/g, "anticipated play"],
    [/toyour partner/g, "to your partner"],
    [/goiirlgtodevelop/g, "going to develop"],
    [/posilion/g, "position"],
    [/two-manumpiring/g, "two-man umpiring"],
    [/tlilree-stepmovement/g, "three-step movement"],
    [/batter-runner's louohof first/g, "batter-runner's touch of first"],
    [/PositionA-The\"A\" position/g, "Position A - The \"A\" position"],
    [/Position8/g, "Position B"],
    [/Tlle tlase umpireposition/g, "The base umpire position"],
    [/first-oaseside/g, "first-base side"],
    [/themiddle/g, "the middle"],
    [/secondbase/g, "second base"],
    [/oase umpireshouldbe/g, "base umpire should be"],
    [/ruInner/g, "runner"],
    [/Position C -Thebas,eumpire/g, "Position C - The base umpire"],
    [/third-tiaseside/g, "third-base side"],
    [/PositionD/g, "Position D"],
    [/Inathree-umpiirecrew/g, "In a three-umpire crew"],
    [/PositionE/g, "Position E"],
    [/mcis1 likelytcihit/g, "most likely to hit"],
    [/Rea\(!the throw-Asa/g, "Read the throw - As a"],
    [/qualityof the thrnw/g, "quality of the throw"],
    [/positionto otiserve/g, "position to observe"],
    [/positionaccordinglo the throw/g, "position according to the throw"],
    [/goijd/g, "good"],
    [/otiserve/g, "observe"],
    [/tiad/g, "bad"],
    [/Releaserunner to third/g, "Release runner to third"],
    [/rnnner to PUand assume/g, "runner to PU and assume"],
    [/other\(trailing\) runners/g, "other (trailing) runners"],
    [/Rotate or Rotation/g, "Rotate or Rotation"],
    [/clockwisedirection/g, "clockwise direction"],
    [/second oase/g, "second base"],
    [/RunningIlane/g, "Running Lane"],
    [/batter-ruinner/g, "batter-runner"],
    [/WORKING THE BASES/g, "SECTION 4 WORKING THE BASES"],
    [/WORKING AS A TEAM/g, "SECTION 5 WORKING AS A TEAM"],
    [/Pregame Preparations/g, "SECTION 6 PREGAME PREPARATIONS"],
    [/SIGNAL CHART/g, "SECTION 7 SIGNAL CHART"],
    [/CREW OF ONE/g, "SECTION 8 CREW OF ONE"],
    [/CREW OF TWO/g, "SECTION 9 CREW OF TWO"],
    [/CREW OF THREE/g, "SECTION 10 CREW OF THREE"],
    [/CREW OF FOUR/g, "SECTION 11 CREW OF FOUR"],
    [/Crew of Two:/g, "Crew of Two:"],
    [/Runnerson/g, "Runners on"],
    [/Runnerson Base/g, "Runners on Base"],
    [/RunnersSecondand Third/g, "Runners on Second and Third"],
    [/Runners on Rrst and Second/g, "Runners on First and Second"],
    [/Runners Second andThin\.I/g, "Runners on Second and Third"],
    [/STEAIL/g, "STEAL"],
    [/swin,ging strili.e/g, "swinging strike"],
    [/intertere/g, "interfere"],
    [/Oon't/g, "Don't"],
    [/inthesecond-tlase/g, "into the second-base"],
    [/the defensewill/g, "the defense will"],
    [/the mldi;IJ,einfielder/g, "the middle infielder"],
    [/CLEANHIT/g, "CLEAN HIT"],
    [/I\.Jase/g, "base"],
    [/llanein,terference/g, "lane interference"],
    [/tiall/g, "ball"],
    [/oase/g, "base"],
    [/l:Jase/g, "base"],
    [/theinfield/g, "the infield"],
    [/oneor two/g, "one or two"],
    [/plateumpire/g, "plate umpire"],
    [/baseumpire/g, "base umpire"],
    [/batter-runner/g, "batter-runner"],
  ];

  let cleaned = String(text || "")
    .replace(/\uFFFD/g, "")
    .replace(/[<>]/g, "")
    .replace(/\bNFHSBaseball Umpires Manual\|2025 and 2026\b/g, "")
    .replace(/\bNFHSBaseball Umpires Manual\b/g, "")
    .replace(/\b2025 and 2026\b/g, "")
    .replace(/\bPlayPic\b/g, "PlayPic")
    .replace(/\.{2,}/g, ".")
    .replace(/([a-z])\u00ad([a-z])/gi, "$1$2")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-zA-Z]),([a-zA-Z])/g, "$1, $2")
    .replace(/([a-zA-Z])\.([A-Z])/g, "$1. $2")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([,.;:!?])([A-Za-z])/g, "$1 $2")
    .replace(/ -([A-Z])/g, " - $1")
    .replace(/([a-z])-(At|The|A|An)\b/g, "$1 - $2");

  replacements.forEach(([pattern, replacement]) => {
    cleaned = cleaned.replace(pattern, replacement);
  });

  cleaned = cleaned
    .replace(
      /(Baseball continues to be one of the most popular sports in the country, especially at the high school level\.[\s\S]*?Play ball!)(?:\s*\1)+/g,
      "$1"
    )
    .replace(
      /(SECTION 3 WORKING THE PLATE[\s\S]*?The important parts of the job that we'll tackle here are your stance, tracking the pitch, calling it a ball or strike, using the indicator and finally plays at the plate itself,)(?:\s*NFHS.*?\s*Part(?: 1)?\s*\1)+/g,
      "$1"
    )
    .replace(
      /(Crew of Two: Runners on Base[\s\S]*?That area Is commonly known as the "V\."\s*)(?:\1)+/g,
      "$1"
    )
    .replace(
      /(WORKING AS A TEAM[\s\S]*?The closer theplay, the more an umpire has to "sell"' the call\.[\s\S]*?Play Pic I\)\.)(?:\s*\1)+/g,
      "$1"
    )
    .replace(
      /(SECTION 9 CREW OF TWO: RUNNERS ON FIRST AND THIRD[\s\S]*?Don't overcommit toward first in case F3 makes a snap throw to third or home\.[\s\S]*?advance\.)(?:\s*\1)+/g,
      "$1"
    )
    .replace(
      /(SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND[\s\S]*?Please note communication withyour crew is imperative\.)(?:\s*\1)+/g,
      "$1"
    )
    .replace(
      /(SECTION 11 CREW OF FOUR: RUNNER ON THIRD[\s\S]*?U2: Moves into the infield at second base\. U2 has all plays at first and second base\.[\s\S]*?U3: Observes R3's tag up and has all plays at third base\.)(?:\s*\1)+/g,
      "$1"
    )
    .replace(/Definition of Terms\s+Definition of Terms/g, "Definition of Terms")
    .replace(/SECTION 2 DEFINITION OF TERMS\s+Part 1\s+Definition of Terms/g, "SECTION 2 DEFINITION OF TERMS")
    .replace(/Play ball!\s+SECTION 2 DEFINITION OF TERMS/g, "Play ball!\n\nSECTION 2 DEFINITION OF TERMS")
    .replace(/SECTION 9 CREW OF TWO:\s*RI\.INNER ON THI;RD/g, "SECTION 9 CREW OF TWO: RUNNER ON THIRD")
    .replace(/SECTION 9 CREW OF TWO:\s*RI\.INNER ON THl;RD/g, "SECTION 9 CREW OF TWO: RUNNER ON THIRD")
    .replace(/SECTION 9 CREW OF TWO:\s*RI\. INNER ON THI; RD/g, "SECTION 9 CREW OF TWO: RUNNER ON THIRD")
    .replace(/SECTION 10 CREW OF THREE::\s*NO RUNNERS ON\s*SECTION 10 CREW OF THREE:\s*NO RUNNERSON\s*-[,.\-]*/g, "SECTION 10 CREW OF THREE: NO RUNNERS ON")
    .replace(/SECTION 10 CREW OF THREE:\s*NO RUNNERS ON\s*SECTION 10 CREW OF THREE:\s*NO RUNNERS ON\s*-[,.\-]*/g, "SECTION 10 CREW OF THREE: NO RUNNERS ON")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNER ON FIRST\s*SECTION 10 CREW OF THREE:\s*RUNNER ON FIRST\s*-[,.\-]*/g, "SECTION 10 CREW OF THREE: RUNNER ON FIRST")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNER ON FIRST\s*SECTION 10 CREW OF THREE:\s*RUNNER ON FIRST/g, "SECTION 10 CREW OF THREE: RUNNER ON FIRST")
    .replace(/SECTION 10 CREW OF THREE::\s*RUNNERS ON FIRST AND SECOND/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNERS ON FIRST AND SECOND\s*SECTION 10 CREW OF THREE:\s*RUNNERS ON FIRST AND SECOND/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND")
    .replace(/CREWOFTHREE:\s*RUNNERSON FIRST AND SECOND\s*CREWOFTHREE:\s*RUNNERS ON FIRST AND SECOND/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND")
    .replace(/SECTION 10 CREW OF THREE\.\:\s*RUNNERS ON FIRST AND SECOND/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND")
    .replace(/CREW OFTHREE\.\:RUNNERSON FIRSTAND SECOND/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND SECOND")
    .replace(/CREWOFTHREE:RUNNERSON FIRST ANDTHIRD\s*SECTION 10 CREW OF THREE:\s*RUNNERS ON FIRST AND THIRD/g, "SECTION 10 CREW OF THREE: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 10 CREW OF THREE;\s*RUNNER ON SECOND/g, "SECTION 10 CREW OF THREE: RUNNER ON SECOND")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNER ON SECOND\s*SECTION 10 CREW OF THREE;\s*RUNNER ON SECOND\s*-[,.\-]*/g, "SECTION 10 CREW OF THREE: RUNNER ON SECOND")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNER ON SECOND\s*SECTION 10 CREW OF THREE:\s*RUNNER ON SECOND\s*-[,.\-]*/g, "SECTION 10 CREW OF THREE: RUNNER ON SECOND")
    .replace(/SECTION 10 CREW OF THREE:\s*RUNNER ON SECOND\s*SECTION 10 CREW OF THREE:\s*RUNNER ON SECOND/g, "SECTION 10 CREW OF THREE: RUNNER ON SECOND")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERSON FIRST ANO THIRD\s*SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIBD\s*-[,.\-]*/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERSON FIRST ANO THIRD\s*SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*-[,.\-]*/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*-[,.\-]*/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*-[,.\-]*/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNE\.\s*RSON FIRST ANO THIRD/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNEB ON SECOND\s*SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND\s*"+/g, "SECTION 11 CREW OF FOUR: RUNNER ON SECOND")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND\s*SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND\s*"+/g, "SECTION 11 CREW OF FOUR: RUNNER ON SECOND")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND\s*"+/g, "SECTION 11 CREW OF FOUR: RUNNER ON SECOND")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERON THIRD\s*SECTION 11 CREW OF FOUR:\s*RUNNERON THIRD/g, "SECTION 11 CREW OF FOUR: RUNNER ON THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERON THIRD/g, "SECTION 11 CREW OF FOUR: RUNNER ON THIRD")
    .replace(/RUNNERSON/g, "RUNNERS ON")
    .replace(/RUNNERON/g, "RUNNER ON")
    .replace(/RUNNE\.\s*RSON/g, "RUNNERS ON")
    .replace(/RUNNEB ON SECOND/g, "RUNNER ON SECOND")
    .replace(/RI\.INNER/g, "RUNNER")
    .replace(/THI;RD/g, "THIRD")
    .replace(/THl;RD/g, "THIRD")
    .replace(/THIBD/g, "THIRD")
    .replace(/ANO/g, "AND")
    .replace(/FOI\.IR/g, "FOUR")
    .replace(/CREWOF/g, "CREW OF ")
    .replace(/CREW OFTHREE/g, "CREW OF THREE")
    .replace(/CREW OF FOUR:/g, "SECTION 11 CREW OF FOUR:")
    .replace(/SECTION 10 CREW OF THREE::/g, "SECTION 10 CREW OF THREE:")
    .replace(/Clear the runner - At the conclusion/g, "Clear the runner - At the conclusion")
    .replace(/Cutout - On diamonds/g, "Cutout - On diamonds")
    .replace(/Dead-ball signal - To indicate/g, "Dead-ball signal - To indicate")
    .replace(/Below the knee catch - A catch/g, "Below the knee catch - A catch")
    .replace(/Chest to the ball - Each umpire/g, "Chest to the ball - Each umpire")
    .replace(/Clear the catcher - The plate umpire/g, "Clear the catcher - The plate umpire")
    .replace(/Drift - Slight movement/g, "Drift - Slight movement")
    .replace(/Fielders - The defensive players/g, "Fielders - The defensive players")
    .replace(/First-baseline extended - An imaginary line/g, "First-baseline extended - An imaginary line")
    .replace(/45-foot line - The 45-foot line/g, "45-foot line - The 45-foot line")
    .replace(/Glance at the runner - Although/g, "Glance at the runner - Although")
    .replace(/"Go" or "goes" - Under/g, "\"Go\" or \"goes\" - Under")
    .replace(/Imaginary box - That area/g, "Imaginary box - That area")
    .replace(/Opening the gate - A basic umpire's movement/g, "Opening the gate - A basic umpire's movement")
    .replace(/Pause, read and react - A three-step method/g, "Pause, read and react - A three-step method")
    .replace(/Pivot - The three-step movement/g, "Pivot - The three-step movement")
    .replace(/Read the throw - As a play develops/g, "Read the throw - As a play develops")
    .replace(/Release runner to third - When/g, "Release runner to third - When")
    .replace(/Running Lane - The three-foot-wide lane/g, "Running Lane - The three-foot-wide lane")
    .replace(/\bPart\s*\[\)\b/g, "Part 1")
    .replace(/\bPart\(\)/g, "Part 1")
    .replace(/\bPart&\b/g, "Part 6")
    .replace(/\bPart(\d+)\b/g, "Part $1")
    .replace(/\bSECTION 2 SECTION 2\b/g, "SECTION 2")
    .replace(/\bSECTION 4 SECTION 4\b/g, "SECTION 4")
    .replace(/\bSECTION 5 SECTION 5\b/g, "SECTION 5")
    .replace(/\bSECTION 6 SECTION 6\b/g, "SECTION 6")
    .replace(/\bSECTION 7 SECTION 7\b/g, "SECTION 7")
    .replace(/\bSECTION 8 SECTION 8\b/g, "SECTION 8")
    .replace(/\bSECTION 9 SECTION 9\b/g, "SECTION 9")
    .replace(/\bSECTION 10 SECTION 10\b/g, "SECTION 10")
    .replace(/\bSECTION 11 SECTION 11\b/g, "SECTION 11")
    .replace(/SECTION 11 SECTION 11 CREW OF FOUR:/g, "SECTION 11 CREW OF FOUR:")
    .replace(/SECTION 10 SECTION 10 CREW OF THREE:/g, "SECTION 10 CREW OF THREE:")
    .replace(/SECTION 9 SECTION 9 CREW OF TWO:/g, "SECTION 9 CREW OF TWO:")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND\s*SECTION 11 CREW OF FOUR:\s*RUNNER ON SECOND/g, "SECTION 11 CREW OF FOUR: RUNNER ON SECOND")
    .replace(/---CREW O-f TWO:\s*RU-NNER ON-THIRD\s*-/g, "")
    .replace(/\n-\.,\s*/g, "\n")
    .replace(/SECTION 10 CREW OF THREE::/g, "SECTION 10 CREW OF THREE:")
    .replace(/SECTION 10 CREW OF THREE;/g, "SECTION 10 CREW OF THREE:")
    .replace(/\n([A-Z][A-Za-z0-9" -]{2,}) - /g, "\n$1 - ")
    .replace(/\n{3,}/g, "\n\n");

  const lines = cleaned.split("\n");
  const filtered = [];

  for (let index = 0; index < lines.length; index += 1) {
    let line = lines[index].trim();
    const next = (lines[index + 1] || "").trim();

    if (!line) {
      if (filtered[filtered.length - 1] !== "") {
        filtered.push("");
      }
      continue;
    }

    if (
      /^NFHS Baseball Umpires Manual/i.test(line) ||
      /^NFHS.*Umpires.*Manual/i.test(line) ||
      /^Official 2026 Umpires Manual/i.test(line) ||
      /^Table of Contents/i.test(line) ||
      /^CONTENT$/i.test(line) ||
      /^ISBN[-\s]/i.test(line) ||
      /^Referee Enterprises/i.test(line) ||
      /^National Federation of/i.test(line) ||
      /^P\.O\. Box/i.test(line) ||
      /^DR\./i.test(line) ||
      /^B\./i.test(line) ||
      /^Copyright/i.test(line) ||
      /^COilying/i.test(line) ||
      /^Part \d+$/i.test(line) ||
      /^KEY$/i.test(line) ||
      /^[0-9]+$/.test(line) ||
      /^[\W_]+$/.test(line) ||
      /[#$%&*@|]{2,}/.test(line) ||
      /(2025|2026)\s+\d+$/.test(line)
    ) {
      continue;
    }

    if (/^(Working|the|Plate|Bases|Team)$/i.test(line) && next) {
      if (/^Working$/i.test(line) && /^the Plate$/i.test(next)) {
        line = "SECTION 3 WORKING THE PLATE";
        index += 1;
      } else if (/^Working$/i.test(line) && /^the Bases$/i.test(next)) {
        line = "SECTION 4 WORKING THE BASES";
        index += 1;
      } else if (/^Working$/i.test(line) && /^as a Team$/i.test(next)) {
        line = "SECTION 5 WORKING AS A TEAM";
        index += 1;
      }
    }

    if (filtered.length && filtered[filtered.length - 1] === line) {
      continue;
    }

    if (line.length < 3 && !/^U[123]$/.test(line)) {
      continue;
    }

    filtered.push(line);
  }

  cleaned = filtered.join("\n").replace(/\n{3,}/g, "\n\n");
  cleaned = cleaned
    .replace(/SECTION 4 WORKING THE BASES\s*[-,.;]+/g, "SECTION 4 WORKING THE BASES")
    .replace(/SECTION 3 WORKING THE PLATE\s*[-,.;]+/g, "SECTION 3 WORKING THE PLATE")
    .replace(/SECTION 5 WORKING AS A TEAM\s*[-,.;]+/g, "SECTION 5 WORKING AS A TEAM")
    .replace(/SECTION 6 PREGAME PREPARATIONS\s*[-,.;]+/g, "SECTION 6 PREGAME PREPARATIONS")
    .replace(/SECTION 7 SIGNAL CHART\s*[-,.;]+/g, "SECTION 7 SIGNAL CHART")
    .replace(/SECTION 8 CREW OF ONE\s*[-,.;]+/g, "SECTION 8 CREW OF ONE")
    .replace(/SECTION 9 CREW OF TWO:[\s-.,;]*/g, "SECTION 9 CREW OF TWO: ")
    .replace(/SECTION 10 CREW OF THREE:[\s-.,;]*/g, "SECTION 10 CREW OF THREE: ")
    .replace(/SECTION 11 CREW OF FOUR:[\s-.,;]*/g, "SECTION 11 CREW OF FOUR: ")
    .replace(/SECTION 11 CREW OF FOUR:\s*RUNNERS ON FIRST AND THIRD\s*[-,.;]+/g, "SECTION 11 CREW OF FOUR: RUNNERS ON FIRST AND THIRD")
    .replace(/:\s+/g, ": ")
    .replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

function renderRuleReaderContent(text) {
  const lines = String(text || "")
    .split("\n")
    .map((line) => line.replace(/\uFFFD/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const navItems = [];
  const bodyParts = [];
  let sectionIndex = 0;
  const manualHeadingPattern = /^(Introduction|Definition ?of ?Terms|Working the Plate|Working the Bases|Working ?as a Team|Pregame ?Preparations|Signal Chart|Crew of One|Crew of Two|Crew of Three|Crew of Four)$/i;

  lines.forEach((line) => {
    if (/^SECTION\s+\d+/i.test(line)) {
      const sectionMatch = line.match(/^(SECTION\s+\d+\s+[A-Z0-9,'\-\/() ]+?)(?:\s+((?:A|An|The|When|If|In)\b.*))?$/);
      const sectionHeading = sectionMatch ? sectionMatch[1].trim() : line;
      const sectionBody = sectionMatch?.[2]?.trim() || "";
      sectionIndex += 1;
      const sectionId = `rule-reader-section-${sectionIndex}`;
      navItems.push(`<a href="#${sectionId}" class="rule-reader-nav-link">${escapeHtml(sectionHeading)}</a>`);
      bodyParts.push(`<h3 class="rule-reader-section-title" id="${sectionId}">${escapeHtml(sectionHeading)}</h3>`);
      if (sectionBody) {
        bodyParts.push(`<p class="rule-reader-paragraph">${escapeHtml(sectionBody)}</p>`);
      }
      return;
    }

    if (/^PART\s*\d+/i.test(line) || manualHeadingPattern.test(line)) {
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
    bodyHtml:
      bodyParts.join("") ||
      '<p class="rule-reader-empty">This rule section is still being prepared for the reader.</p>',
  };
}

function getPageLabel(question) {
  if (!question.reference || question.section === "Mechanics") {
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

function getMechanicsManualEntry(question) {
  if (question.section !== "Mechanics") {
    return null;
  }

  return manualReaderData.mechanicsByQuestion?.[String(question.number)] || null;
}

function getQuestionReference(question) {
  return question.reference || getMechanicsManualEntry(question)?.reference || "";
}

function getQuestionReferenceBadge(question) {
  return getQuestionReference(question) || "Mechanics / LAU";
}

function getReferencePanelLabel(question) {
  return question.section === "Mechanics" ? "Umpires Manual Text" : "Rulebook Text";
}

function normalizeRuleReference(reference) {
  return String(reference || "")
    .replace(/\./g, "-")
    .replace(/\s+/g, "")
    .replace(/([0-9])([a-z])$/i, "$1")
    .toLowerCase();
}

function getReferenceMatches(reference) {
  return String(reference || "").match(/\d+(?:[.-]\d+){2}(?:\([a-z0-9]+\))*/gi) || [];
}

function extractRulebookArticleText(reference, fallbackSection) {
  const normalized = normalizeRuleReference(reference);
  const baseReference = normalized.replace(/\([a-z0-9]+\)/gi, "");
  const parts = baseReference.match(/^(\d+)-(\d+)-(\d+)$/);
  if (!parts) {
    return "";
  }

  const [, ruleNumber, sectionNumber, articleNumber] = parts;
  const entry = rulebookEntriesByLabel.get(`Rule ${Number(ruleNumber)}`) || rulebookEntriesByLabel.get(fallbackSection);
  if (!entry?.text) {
    return "";
  }

  const lines = String(entry.text)
    .split("\n")
    .map((line) => line.replace(/\uFFFD/g, "").trim())
    .filter(Boolean);

  const sectionPattern = new RegExp(`^SECTION\\s+${Number(sectionNumber)}\\b`, "i");
  const articlePattern = new RegExp(`^ART\\.\\s*${Number(articleNumber)}\\b`, "i");
  const sectionStart = lines.findIndex((line) => sectionPattern.test(line));
  if (sectionStart === -1) {
    return "";
  }

  let sectionEnd = lines.length;
  for (let index = sectionStart + 1; index < lines.length; index += 1) {
    if (/^SECTION\s+\d+/i.test(lines[index])) {
      sectionEnd = index;
      break;
    }
  }

  const sectionLines = lines.slice(sectionStart, sectionEnd);
  const articleStart = sectionLines.findIndex((line) => articlePattern.test(line));
  if (articleStart === -1) {
    return "";
  }

  const collected = [];
  for (let index = articleStart; index < sectionLines.length; index += 1) {
    const line = sectionLines[index];
    if (index > articleStart && (/^ART\.\s*\d+/i.test(line) || /^SECTION\s+\d+/i.test(line))) {
      break;
    }
    collected.push(line);
  }

  return collected.join("\n");
}

function getRulebookText(question) {
  const mechanicsEntry = getMechanicsManualEntry(question);
  if (mechanicsEntry?.text) {
    return mechanicsEntry.text;
  }

  const matches = getReferenceMatches(question.reference);
  if (!matches.length) {
    return "";
  }

  const seen = new Set();
  const snippets = [];

  for (const match of matches) {
    const normalized = normalizeRuleReference(match).replace(/\([a-z0-9]+\)/gi, "");
    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);

    const directText = OFFICIAL_RULEBOOK_TEXT[normalized];
    if (directText) {
      snippets.push(directText);
      continue;
    }

    const extractedText = extractRulebookArticleText(match, question.section);
    if (extractedText) {
      snippets.push(extractedText);
    }
  }

  return snippets.join("\n\n");
}

function getRulebookTextBlocks(question) {
  const mechanicsEntry = getMechanicsManualEntry(question);
  if (mechanicsEntry?.text) {
    return [{
      reference: getQuestionReference(question),
      text: mechanicsEntry.text,
    }];
  }

  const matches = getReferenceMatches(question.reference);
  if (!matches.length) {
    return [];
  }

  const seen = new Set();
  const blocks = [];

  for (const match of matches) {
    const normalized = normalizeRuleReference(match).replace(/\([a-z0-9]+\)/gi, "");
    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);

    const directText = OFFICIAL_RULEBOOK_TEXT[normalized];
    if (directText) {
      blocks.push({ reference: match, text: directText });
      continue;
    }

    const extractedText = extractRulebookArticleText(match, question.section);
    if (extractedText) {
      blocks.push({ reference: match, text: extractedText });
    }
  }

  return blocks;
}

function getDisplayedRulebookText(question) {
  return getRulebookText(question);
}

function formatReferenceLine(question) {
  const parts = [];

  const reference = getQuestionReference(question);
  if (reference) {
    if (question.section === "Mechanics") {
      return reference;
    }

    parts.push(`Rule reference: ${reference}`);
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
  const totalCount = safeQuestions.length;
  const remainingCount = Math.max(0, totalCount - answeredCount);

  statAnsweredCount.textContent = String(answeredCount);
  statAccuracy.textContent = `${accuracy}%`;
  statMissedCount.textContent = String(state.missedQuestionIds.length);
  if (statProgress) {
    statProgress.textContent = `${answeredCount} of ${totalCount} answered`;
  }
  if (statRemainingCount) {
    statRemainingCount.textContent = String(remainingCount);
  }
  if (statProgressNote) {
    if (!answeredCount) {
      statProgressNote.textContent = "Start a session to begin building progress.";
    } else if (!state.missedQuestionIds.length) {
      statProgressNote.textContent = "Nice pace. You do not have any missed questions waiting right now.";
    } else {
      statProgressNote.textContent = `${state.missedQuestionIds.length} question${state.missedQuestionIds.length === 1 ? "" : "s"} are waiting for another look.`;
    }
  }

  if (retakeMissedButton) {
    const missedCount = state.missedQuestionIds.length;
    retakeMissedButton.disabled = !missedCount;
    retakeMissedButton.textContent = missedCount
      ? `Retake missed questions (${missedCount})`
      : "Retake missed questions";
  }
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

function launchMissedReviewSession() {
  if (currentSession && currentSession.mode !== "missed" && !suspendedSession) {
    suspendedSession = createSuspendedSessionSnapshot(currentSession);
  }

  activeMode = "missed";
  sectionFilter.value = "All";
  syncModeButtons();

  if (!state.missedQuestionIds.length) {
    examSectionPill.textContent = "Missed review";
    examProgressCopy.textContent = "No missed questions saved";
    examProgressBar.style.width = "0%";
    questionShell.innerHTML = `
      <p class="empty-state">
        You do not have any missed questions saved right now. Missed questions will appear here after you miss one during an exam session.
      </p>
    `;
    examCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  startSession();
  examCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function createSuspendedSessionSnapshot(session) {
  const snapshot = JSON.parse(JSON.stringify(session));
  const currentQuestion = snapshot.questions[snapshot.currentIndex];

  if (currentQuestion && snapshot.answers[currentQuestion.number] !== undefined) {
    if (snapshot.currentIndex < snapshot.questions.length - 1) {
      snapshot.currentIndex += 1;
    } else {
      snapshot.resumeAtFinish = true;
    }
  }

  return snapshot;
}

function resumeSuspendedSession() {
  if (!suspendedSession) {
    return;
  }

  currentSession = suspendedSession;
  suspendedSession = null;
  activeMode = currentSession.mode;
  sectionFilter.value = currentSession.section;
  syncModeButtons();

  if (currentSession.resumeAtFinish) {
    delete currentSession.resumeAtFinish;
    finishSession();
    return;
  }

  renderSessionQuestion();
  examCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const displayedRulebookText = getDisplayedRulebookText(question);
  const rulebookBlocks = getRulebookTextBlocks(question);
  const referenceLine = question.reference ? formatReferenceLine(question) : "";
  const referencePanelLabel = getReferencePanelLabel(question);
  const feedback = document.createElement("article");
  feedback.className = `feedback-card ${isCorrect ? "is-correct" : "is-incorrect"}`;
  feedback.innerHTML = `
    <p class="section-label">${isCorrect ? "Correct" : "Review This"}</p>
    <p class="feedback-copy">
      <strong>Correct answer:</strong> ${LETTERS[question.answerIndex]}. ${escapeHtml(question.correctChoice)}
    </p>
    ${referenceLine ? `
    <p class="feedback-copy">
      <strong>Reference:</strong> ${escapeHtml(referenceLine)}
    </p>` : ""}
    ${(displayedRulebookText || referenceLine) ? `
    <div class="feedback-copy" id="feedback-rulebook-section">
      <strong>${escapeHtml(referencePanelLabel)}:</strong>
      ${referenceLine ? `<p class="feedback-rulebook-meta">${escapeHtml(referenceLine)}</p>` : ""}
      ${rulebookBlocks.length
        ? rulebookBlocks
          .map((block) => `
            <div class="feedback-rulebook-block">
              <p class="feedback-rulebook-block-ref">${escapeHtml(block.reference)}</p>
              <p class="feedback-rulebook-text">${escapeHtml(block.text)}</p>
            </div>
          `)
          .join("")
        : displayedRulebookText
          ? `
            <div class="feedback-rulebook-block">
              ${question.reference ? `<p class="feedback-rulebook-block-ref">${escapeHtml(question.reference)}</p>` : ""}
              <p class="feedback-rulebook-text">${escapeHtml(displayedRulebookText)}</p>
            </div>
          `
          : ""}
    </div>` : ""}
    <div class="question-footer">
      <span class="pill ${isCorrect ? "" : "muted-pill"}">${isCorrect ? "Score added" : "Saved to missed review"}</span>
      <button type="button" class="primary-button" id="next-question-button">
        ${currentSession.currentIndex === currentSession.questions.length - 1
          ? (currentSession.mode === "missed" && suspendedSession ? "Resume Exam" : "Finish session")
          : "Next question"}
      </button>
    </div>
  `;
  questionShell.append(feedback);

  feedback.querySelector("#next-question-button").addEventListener("click", () => {
    advanceSession();
  });

  examProgressBar.style.width = `${((currentSession.currentIndex + 1) / currentSession.questions.length) * 100}%`;
  const rulebookSection = feedback.querySelector("#feedback-rulebook-section");
  (rulebookSection || feedback).scrollIntoView({ behavior: "smooth", block: "center" });
}

function advanceSession() {
  if (!currentSession) {
    return;
  }

  if (currentSession.currentIndex >= currentSession.questions.length - 1) {
    if (currentSession.mode === "missed" && suspendedSession) {
      resumeSuspendedSession();
      return;
    }
    finishSession();
    return;
  }

  currentSession.currentIndex += 1;
  renderSessionQuestion();
  examCenter?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div class="result-actions">
          ${state.missedQuestionIds.length ? `<button type="button" class="ghost-button" id="retake-missed-inline-button">Retake missed questions</button>` : ""}
          <button type="button" class="primary-button" id="restart-session-button">Start another session</button>
        </div>
      </div>
    </article>
  `;

  questionShell.querySelector("#restart-session-button").addEventListener("click", () => {
    startSession();
  });

  const retakeInlineButton = questionShell.querySelector("#retake-missed-inline-button");
  if (retakeInlineButton) {
    retakeInlineButton.addEventListener("click", () => {
      launchMissedReviewSession();
    });
  }

  currentSession = null;
}

function renderStudyList() {
  const questions = getFilteredStudyQuestions();
  const totalPages = Math.max(1, Math.ceil(questions.length / STUDY_PAGE_SIZE));
  studyPage = Math.min(studyPage, totalPages);
  const pageStart = (studyPage - 1) * STUDY_PAGE_SIZE;
  const pageQuestions = questions.slice(pageStart, pageStart + STUDY_PAGE_SIZE);

  studyResultsCount.textContent = questions.length
    ? `${questions.length} questions · Page ${studyPage} of ${totalPages}`
    : "0 questions";
  studyList.innerHTML = "";
  renderStudyPagination(questions.length, totalPages);

  if (!questions.length) {
    studyList.innerHTML = `
      <p class="empty-state">No questions matched that filter. Try a broader rule lane or a different search phrase.</p>
    `;
    renderRulebookHub();
    return;
  }

  pageQuestions.forEach((question) => {
    const card = document.createElement("details");
    card.className = "study-card";
    card.dataset.studyQuestion = String(question.number);
    card.dataset.answered = "false";
    card.open = true;
    card.innerHTML = `
      <summary>
        <div class="study-card-header">
          <div>
            <p class="section-label">${escapeHtml(question.section)} · Question ${escapeHtml(question.number)}</p>
            <h3 class="study-card-title">${escapeHtml(question.prompt)}</h3>
            <span class="pill study-reference-pill">${escapeHtml(getQuestionReferenceBadge(question))}</span>
          </div>
        </div>
        <div class="study-card-meta">
          <button type="button" class="ghost-button" data-launch-question="${escapeAttribute(question.number)}">Show Rule</button>
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
        <div class="study-reference-card" hidden></div>
      </div>
    `;
    studyList.append(card);
  });

  renderRulebookHub();
}

function renderStudyPagination(totalQuestions, totalPages) {
  const paginationMarkup = totalQuestions <= STUDY_PAGE_SIZE
    ? ""
    : `
      <div class="study-pagination-inner">
        <button type="button" class="ghost-button" data-study-page="${Math.max(1, studyPage - 1)}" ${studyPage === 1 ? "disabled" : ""}>Previous</button>
        <p class="study-pagination-copy">Showing ${((studyPage - 1) * STUDY_PAGE_SIZE) + 1}-${Math.min(studyPage * STUDY_PAGE_SIZE, totalQuestions)} of ${totalQuestions}</p>
        <button type="button" class="ghost-button" data-study-page="${Math.min(totalPages, studyPage + 1)}" ${studyPage === totalPages ? "disabled" : ""}>Next</button>
      </div>
    `;

  if (studyPaginationTop) {
    studyPaginationTop.innerHTML = paginationMarkup;
  }

  if (studyPaginationBottom) {
    studyPaginationBottom.innerHTML = paginationMarkup;
  }
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

  const ruleButton = card.querySelector("[data-launch-question]");
  if (ruleButton) {
    ruleButton.textContent = "Hide Rule";
    toggleStudyReferenceCard(card, question, ruleButton, { forceOpen: true });
  }
}

function toggleStudyReferenceCard(card, question, button, options = {}) {
  const referenceCard = card.querySelector(".study-reference-card");
  if (!referenceCard) {
    return;
  }

  card.open = true;

  const rulebookText = getDisplayedRulebookText(question);
  const rulebookBlocks = getRulebookTextBlocks(question);
  const hasDirectRule = Boolean(rulebookText);
  const fallbackText = question.reference
    ? `This question cites ${question.reference}, but it does not map to a direct rule article text block in the reader. Review the cited reference and answer key together for context.`
    : getRuleSummary(question);

  const isOpen = !referenceCard.hidden;
  const forceOpen = Boolean(options.forceOpen);
  if (isOpen) {
    if (forceOpen) {
      return;
    }
    referenceCard.hidden = true;
    button.textContent = "Show Rule";
    return;
  }

  referenceCard.innerHTML = hasDirectRule
    ? `
      <p class="section-label">${escapeHtml(getReferencePanelLabel(question))}</p>
      ${rulebookBlocks.length
        ? rulebookBlocks
          .map((block) => `
            <div class="study-reference-block">
              <p class="study-reference-block-ref">${escapeHtml(block.reference)}</p>
              <p class="study-reference-card-copy">${escapeHtml(block.text)}</p>
            </div>
          `)
          .join("")
        : `
          <div class="study-reference-block">
            ${question.reference ? `<p class="study-reference-block-ref">${escapeHtml(question.reference)}</p>` : ""}
            <p class="study-reference-card-copy">${escapeHtml(rulebookText)}</p>
          </div>
        `}
    `
    : `
      <p class="section-label">Reference Note</p>
      <p class="study-reference-card-copy">${escapeHtml(fallbackText)}</p>
    `;

  referenceCard.hidden = false;
  button.textContent = "Hide Rule";
  referenceCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
