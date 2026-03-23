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

  const readerText = RULEBOOK_SECTION_OVERRIDES[label] || entry.text;
  const rendered = renderRuleReaderContent(readerText);
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
