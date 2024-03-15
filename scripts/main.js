const contentDiv = document.getElementById("content");
const pageDiv = document.getElementById("page");
const containerDiv = document.getElementById("container");
const playerFramesDiv = document.getElementById("player-slide");
const startProfileDiv = document.getElementById("start-profile");
const languageTableDiv = document.getElementById("language-table");
const noteRollContainerDiv = document.getElementById("note-roll-container");
const thailandContainerDiv = document.getElementById("thailand-container");
const billboardAboutDiv = document.getElementById("billboard-about");
const billboardSkillDiv = document.getElementById("billboard-skill");
const honorContainerDiv = document.getElementById("honor-container");
const houseDiv = document.getElementById("house-01");
const otherSkillContainerDiv = document.getElementById(
  "other-skill-bg-container"
);
const busStationDiv1 = document.getElementById("bus-station-1");
const busStationDiv2 = document.getElementById("bus-station-2");
const busStationDiv3 = document.getElementById("bus-station-3");
let busDiv1 = document.getElementById("bus-1");
let busDiv2 = document.getElementById("bus-2");
let busDiv3 = document.getElementById("bus-3");

const rocket1Div = document.getElementById("rocket-1");
const stageDiv = document.getElementById("stage");

const midRoll = document.querySelector(".mid-roll");
const leftRoll = document.querySelector(".left-roll");
const rightRoll = document.querySelector(".right-roll");
const aboutText = document.querySelector(".about-text");
const skillText = document.querySelector(".skill-text");
const loaderContainerDiv = document.querySelector(".loader-container");
const rollText = document.querySelector(".roll-text");
const certificationDiv = document.querySelector(".certification");
const certificationText = document.querySelector(".certification-text");
const scrollContainerDiv = document.querySelector(".scroll-container");
const scrollTextDiv = document.querySelector(".scroll-text");
const envelopeWrapperDiv = document.querySelector(".envelope-wrapper");
const lidOne = document.querySelector(".lid.one");
const lidTwo = document.querySelector(".lid.two");
const envelopeLetter = document.querySelector(".letter");
const personalInfoDiv = document.querySelector(".personal-info");
const feriswheelDiv = document.querySelector(".ferris-wheel");
const contactContainerDiv = document.querySelector(".contact-container");
const itemsHorizontal = document.querySelector(".items-horizontal");

const designTexts = document.querySelectorAll(".design-text");
const sliderImages = document.querySelectorAll(".slider-img");
const rockets = document.querySelectorAll(".rocket");

const initialPositionRocket = rocket1Div.offsetLeft + rocket1Div.offsetWidth;
const rocketTargetAnimateArray = [569, 569, 339, 339, 49];

let busLeftValues = [
  { start: busDiv1.offsetLeft, target: busDiv1.offsetLeft - 2000 },
  { start: busDiv2.offsetLeft, target: busDiv2.offsetLeft - 2000 },
  { start: busDiv3.offsetLeft, target: busDiv3.offsetLeft - 2000 },
];

const mediaQuerySmPhone = window.matchMedia(
  "(max-width: 640px) and (orientation: portrait)"
);
const mediaQueryLgPhone = window.matchMedia(
  "(max-width: 950px) and (orientation: landscape)"
);
const mediaQueryPortraitTablet = window.matchMedia(
  "(max-width: 1024px) and (min-width: 768px) and (orientation: portrait)"
);
const mediaQueryMediumLandscapeTablet = window.matchMedia(
  "(max-width: 1366px) and (min-width: 1024px) and (orientation: landscape) and (max-height: 950px) and (min-height: 769px)"
);
const mediaQuerySmallLandscapeTablet = window.matchMedia(
  "(max-width: 1366px) and (min-width: 1024px) and (orientation: landscape) and (max-height: 768px)"
);
const mediaQueryStandardScreenLowHeight = window.matchMedia(
  "(max-width: 1999px) and (min-width: 1367px) and (max-height: 900px)"
);
const mediaQueryMaxScreen = window.matchMedia("(min-width:2100px)");
const mediaQueryHeightScreen = window.matchMedia("(min-height:1050px)");

const itemsHorizontalSpeedArray = [];
const itemsVerticalSpeedArray = [];
const itemsHorizontalArray = [];
const otherSkillArray = [];
const busArray = [];

const informationContainerArray = [
  languageTableDiv,
  thailandContainerDiv,
  billboardAboutDiv,
  billboardSkillDiv,
  honorContainerDiv,
  certificationDiv,
  otherSkillContainerDiv,
  busStationDiv1,
  busStationDiv2,
  busStationDiv3,
  personalInfoDiv,
];

let pageVerticalPosition = 0;
let previousPageVerticalPosition = 0;
let deltaPageVerticalPosition = 0;
let scrollingTimeout;
let scrollContainerTimer;
let canAnimateLanguageTable;
let canAnimateNoteRoll;
let canAnimateAboutText;
let canAnimateSkillText;
let canAnimateHonorConDiv;
let canAnimateCertification;
let canAnimateOtherSkill;
let canAnimateBus;
let canAnimateBus1;
let canAnimateBus2;
let canAnimateBus3;
let canAnimatepPersonalInfo;

function handlePageScroll() {
  previousPageVerticalPosition = pageVerticalPosition;
  pageVerticalPosition = window.scrollY;
  deltaPageVerticalPosition =
    pageVerticalPosition - previousPageVerticalPosition;
  if (pageVerticalPosition <= 0) {
    resetVariables();
    resetFunctions();
  }
}

function resetVariables() {
  if (pageVerticalPosition === 0) {
    canAnimateLanguageTable =
      canAnimateNoteRoll =
      canAnimateAboutText =
      canAnimateSkillText =
      canAnimateHonorConDiv =
      canAnimateCertification =
      canAnimateOtherSkill =
      canAnimateBus1 =
      canAnimateBus2 =
      canAnimateBus3 =
      canAnimatepPersonalInfo =
        true;
  }
}

function resetFunctions() {
  setAllAnimation();
}

function runFunctionAfterScroll() {
  moveLayers();
  orientPlayer();
  animateInformation();
  scrollContainerDiv.style.transition = "opacity 0.5s ease-out";
  scrollContainerDiv.style.opacity = "0";
}

function animateScrollOrSwipeTextContainer() {
  clearInterval(scrollContainerTimer);
  scrollContainerTimer = setInterval(function () {
    turnOnAndOffScrollContainer();
  }, 1000);
}

function turnOnAndOffScrollContainer() {
  function fadeOut(element) {
    element.style.opacity = 1;
    setTimeout(function () {
      element.style.opacity = 0;
    }, 500);
  }

  fadeOut(scrollTextDiv);
}
function moveLayers() {
  for (let i = 0; i < itemsHorizontalArray.length; i++) {
    itemsHorizontalArray[i].style.left = `${
      -1 * itemsHorizontalSpeedArray[i] * pageVerticalPosition
    }px`;
  }
}

function setItemsSpeed() {
  itemsHorizontalSpeedArray.length = 0;
  itemsVerticalSpeedArray.length = 0;

  for (let i = 0; i < itemsHorizontalArray.length; i++) {
    const horizontalSpeedRatio =
      (itemsHorizontalArray[i].offsetWidth - containerDiv.offsetWidth) /
      (itemsHorizontalArray[itemsHorizontalArray.length - 1].offsetWidth -
        containerDiv.offsetWidth);
    itemsHorizontalSpeedArray.push(horizontalSpeedRatio);
  }
}

function setPageHeight() {
  const pageHeight =
    itemsHorizontalArray[itemsHorizontalArray.length - 1].offsetWidth -
    containerDiv.offsetWidth;
  pageDiv.style.height = pageHeight + "px";
}

function updateBusArrays() {
  busLeftValues = [
    { start: busDiv1.offsetLeft, target: busDiv1.offsetLeft - 2000 },
    { start: busDiv2.offsetLeft, target: busDiv2.offsetLeft - 2000 },
    { start: busDiv3.offsetLeft, target: busDiv3.offsetLeft - 2000 },
  ];

  if (mediaQueryLgPhone.matches) {
    busLeftValues = [
      { start: 8580, target: 8580 - 2000 },
      { start: 9580, target: 9580 - 2000 },
      { start: 10580, target: 10580 - 2000 },
    ];
  } else if (mediaQuerySmPhone.matches) {
    busLeftValues = [
      { start: 12500, target: 12500 - 2000 },
      { start: 14500, target: 14500 - 2000 },
      { start: 16500, target: 16500 - 2000 },
    ];
  } else if (
    mediaQueryPortraitTablet.matches ||
    mediaQueryMediumLandscapeTablet.matches ||
    mediaQuerySmallLandscapeTablet.matches ||
    mediaQueryStandardScreenLowHeight.matches
  ) {
    busLeftValues = [
      { start: 14700, target: 14700 - 2000 },
      { start: 16700, target: 16700 - 2000 },
      { start: 18700, target: 18700 - 2000 },
    ];
  } else if (mediaQueryMaxScreen.matches) {
    busLeftValues = [
      { start: 17700, target: 17700 - 2000 },
      { start: 19700, target: 19700 - 2000 },
      { start: 21700, target: 21700 - 2000 },
    ];
  } else {
    busLeftValues = [
      { start: 16200, target: 16200 - 2000 },
      { start: 18200, target: 18200 - 2000 },
      { start: 20200, target: 20200 - 2000 },
    ];
  }

  for (let i = 0; i < busArray.length; i++) {
    const canAnimateBus =
      i === 0 ? canAnimateBus1 : i === 1 ? canAnimateBus2 : canAnimateBus3;
    const startValue = canAnimateBus
      ? busLeftValues[i].start + "px"
      : busLeftValues[i].target + "px";
    busArray[i].style.left = startValue;
  }

  innerHeight = window.innerHeight;
}
function animatePersonalInfo() {
  personalInfoDiv.style.transition = "bottom 0.5s ease-out";
  personalInfoDiv.style.bottom = "20%";
}

function animateRocket() {
  function animate() {
    rockets.forEach((rocket, i) => {
      rocket.style.left =
        initialPositionRocket + rocketTargetAnimateArray[i] + "px";
    });
  }

  if (mediaQuerySmPhone.matches) {
    setTimeout(animate, 500);
  } else {
    animate();
  }
}

function animateHonorContainer() {
  honorContainerDiv.style.transition = "top 0.5s ease-out";
  honorContainerDiv.style.top = "0";
}

function animateBus(i) {
  busArray[i].style.transition = "left 0.5s ease-out";

  busArray[i].style.left = busLeftValues[i].target + "px";
}

function animateOtherSkill() {
  otherSkillArray.forEach((otherSkill, i) => {
    otherSkill.style.transition = "bottom 1s cubic-bezier(0.4, 0, 0.2, 1.5)";

    setTimeout(() => {
      if (mediaQueryLgPhone.matches) {
        otherSkill.style.bottom = "5%";
      } else if (
        mediaQueryPortraitTablet.matches ||
        mediaQueryMaxScreen.matches ||
        mediaQueryHeightScreen.matches
      ) {
        otherSkill.style.bottom = "30%";
      } else {
        otherSkill.style.bottom = "22%";
      }
    }, i * 400);
  });
}

function animateEnvelope() {
  if (
    containerDiv.offsetWidth * 0.5 + pageVerticalPosition >=
    envelopeWrapperDiv.offsetLeft - envelopeWrapperDiv.offsetWidth
  ) {
    lidOne.classList.add("active");
    lidTwo.classList.add("active");
    envelopeLetter.classList.add("active");
    contactContainerDiv.style.top = "0";
  } else {
    lidOne.classList.remove("active");
    lidTwo.classList.remove("active");
    envelopeLetter.classList.remove("active");
    contactContainerDiv.style.top = "-100%";
  }
}

function animateInformation() {
  for (let i = 0; i < informationContainerArray.length; i++) {
    if (
      previousPageVerticalPosition + 0.5 * containerDiv.offsetWidth <
        informationContainerArray[i].offsetLeft ||
      previousPageVerticalPosition + 0.5 * containerDiv.offsetWidth >
        informationContainerArray[i].offsetLeft +
          informationContainerArray[i].offsetWidth
    ) {
      if (
        pageVerticalPosition + 0.5 * containerDiv.offsetWidth >
          informationContainerArray[i].offsetLeft &&
        pageVerticalPosition + 0.5 * containerDiv.offsetWidth <
          informationContainerArray[i].offsetLeft +
            informationContainerArray[i].offsetWidth
      ) {
        if (
          informationContainerArray[i] === thailandContainerDiv &&
          canAnimateNoteRoll
        ) {
          animateNoteRollContainer();
          canAnimateNoteRoll = false;
        } else if (
          informationContainerArray[i] === languageTableDiv &&
          canAnimateLanguageTable
        ) {
          animateRocket();
          canAnimateLanguageTable = false;
        } else if (
          informationContainerArray[i] === billboardAboutDiv &&
          canAnimateAboutText
        ) {
          animateOpacityText(aboutText);
          canAnimateAboutText = false;
        } else if (
          informationContainerArray[i] === billboardSkillDiv &&
          canAnimateSkillText
        ) {
          animateOpacityText(skillText);
          canAnimateSkillText = false;
        } else if (
          informationContainerArray[i] === honorContainerDiv &&
          canAnimateHonorConDiv
        ) {
          animateHonorContainer();
          canAnimateHonorConDiv = false;
        } else if (
          informationContainerArray[i] === certificationDiv &&
          canAnimateCertification
        ) {
          animateOpacityText(certificationText);
          canAnimateCertification = false;
        } else if (
          informationContainerArray[i] === otherSkillContainerDiv &&
          canAnimateOtherSkill
        ) {
          animateOtherSkill();
          canAnimateOtherSkill = false;
        } else if (
          informationContainerArray[i] === busStationDiv1 &&
          canAnimateBus1
        ) {
          animateBus(0);
          canAnimateBus1 = false;
        } else if (
          informationContainerArray[i] === busStationDiv2 &&
          canAnimateBus2
        ) {
          animateBus(1);
          canAnimateBus2 = false;
        } else if (
          informationContainerArray[i] === busStationDiv3 &&
          canAnimateBus3
        ) {
          animateBus(2);
          canAnimateBus3 = false;
        } else if (
          informationContainerArray[i] === personalInfoDiv &&
          canAnimatepPersonalInfo
        ) {
          animatePersonalInfo();
          canAnimatepPersonalInfo = false;
        }
      }
    }
  }
}

function animateOpacityText(textClass) {
  textClass.style.transition = "opacity 0.3s ease-in-out";
  textClass.style.opacity = "1";

  clearTimeout(textClass.timeoutId);

  textClass.timeoutId = setTimeout(() => {
    textClass.style.transition = "";
  }, 300);
}

function animateNoteRollContainer() {
  noteRollContainerDiv.style.transition = "top 0.5s ease-out";

  setTimeout(() => {
    if (mediaQuerySmPhone.matches) {
      noteRollContainerDiv.style.top = "15%";
    } else if (mediaQueryLgPhone.matches) {
      noteRollContainerDiv.style.top = "-40%";
    } else if (mediaQueryPortraitTablet.matches) {
      noteRollContainerDiv.style.top = "45%";
    } else if (mediaQuerySmallLandscapeTablet.matches) {
      noteRollContainerDiv.style.top = "19%";
    } else {
      noteRollContainerDiv.style.top = "30%";
    }

    setTimeout(() => {
      midRoll.style.transition = "width 0.5s ease-out, opacity 0.5s ease-out";
      midRoll.style.width = "100%";
      midRoll.style.opacity = "1";

      setTimeout(() => {
        rollText.style.opacity = "1";
      }, 250);

      leftRoll.style.transition = "left 0.5s ease-out";
      leftRoll.style.left = "0";

      rightRoll.style.transition = "right 0.5s ease-out";
      rightRoll.style.right = "0";
    }, 500);
  }, 0);
}

function setPositionOtherSkill() {
  for (let i = 0; i < otherSkillArray.length; i++) {
    if (mediaQueryLgPhone.matches) {
      otherSkillArray[i].style.bottom = canAnimateOtherSkill ? "-300%" : "5%";
    } else if (
      mediaQueryPortraitTablet.matches ||
      mediaQueryMaxScreen.matches ||
      mediaQueryHeightScreen.matches
    ) {
      otherSkillArray[i].style.bottom = canAnimateOtherSkill ? "-300%" : "30%";
    } else {
      otherSkillArray[i].style.bottom = canAnimateOtherSkill ? "-100%" : "22%";
    }
  }
}

function setPositionRockets() {
  rockets.forEach((rocket, i) => {
    rocket.style.left = canAnimateLanguageTable
      ? "10%"
      : initialPositionRocket + rocketTargetAnimateArray[i] + "px";
  });
}

function setPositionNoteRollAndHonor() {
  if (canAnimateNoteRoll) {
    noteRollContainerDiv.style.top = "0";
  } else if (mediaQuerySmPhone.matches && !canAnimateNoteRoll) {
    noteRollContainerDiv.style.top = "15%";
  } else if (mediaQueryLgPhone.matches && !canAnimateNoteRoll) {
    noteRollContainerDiv.style.top = "-40%";
  } else if (mediaQueryPortraitTablet.matches && !canAnimateNoteRoll) {
    noteRollContainerDiv.style.top = "45%";
  } else if (
    mediaQueryMediumLandscapeTablet.matches &&
    window.innerHeight <= 768 &&
    !canAnimateNoteRoll
  ) {
    noteRollContainerDiv.style.top = "13%";
  } else {
    noteRollContainerDiv.style.top = "30%";
  }
  midRoll.style.width = canAnimateNoteRoll ? "0" : "100%";
  midRoll.style.opacity = canAnimateNoteRoll ? "0" : "1";
  leftRoll.style.left = canAnimateNoteRoll ? "50%" : "0";
  rightRoll.style.right = canAnimateNoteRoll ? "50%" : "0";
  honorContainerDiv.top = canAnimateHonorConDiv ? "-100%" : "0";
  personalInfoDiv.bottom = canAnimatepPersonalInfo ? "100%" : "20%";
}

function setOpacityText() {
  aboutText.style.opacity = canAnimateAboutText ? "0" : "1";
  skillText.style.opacity = canAnimateSkillText ? "0" : "1";
  certificationText.style.opacity = canAnimateCertification ? "0" : "1";
}
function setPositionStartProfile() {
  startProfileDiv.style.width = containerDiv.offsetWidth + "px";
}

function setAllAnimation() {
  setPositionNoteRollAndHonor();
  setPositionRockets();
  setPositionOtherSkill();
  setOpacityText();
}

function storeDivs() {
  const divs = document.getElementsByTagName("div");

  for (let t = 0; t < divs.length; t++) {
    const className = divs[t].getAttribute("class");
    switch (className) {
      case "items-horizontal":
        itemsHorizontalArray.push(divs[t]);
        break;
      case "other-skill":
        otherSkillArray.push(divs[t]);
        break;
      case "bus":
        busArray.push(divs[t]);
        break;
    }
  }
}

function showDesignText() {
  sliderImages.forEach((image, index) => {
    image.addEventListener("mouseover", function () {
      designTexts.forEach((text) => {
        text.style.opacity = 0;
      });

      designTexts[index].style.opacity = 1;
    });

    image.addEventListener("mouseout", function () {
      designTexts.forEach((text) => {
        text.style.opacity = 0;
      });
    });
  });
}

function pauseAnimationPlayer() {
  playerFramesDiv.style.animationPlayState = "paused";
  playerFramesDiv.classList.remove("walk-animation");

  setPlayerToFront();
}

function playAnimationPlayer() {
  playerFramesDiv.style.animationPlayState = "running";
}

function setPlayerToFront() {
  playerFramesDiv.style.top = "-500px";
  playerFramesDiv.style.left = "0";
}

function orientPlayer() {
  playerFramesDiv.classList.add("walk-animation");
  if (deltaPageVerticalPosition > 0) {
    playerFramesDiv.style.top = "0";
  } else {
    playerFramesDiv.style.top = "-250px";
  }
}

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

function onLoad() {
  loaderContainerDiv.style.opacity = 1;
  storeDivs();
  setPageHeight();
  setItemsSpeed();
  setPlayerToFront();
  setPositionStartProfile();
  resetVariables();
  resetFunctions();
  showDesignText();
  setTimeout(function () {
    hideLoader();
  }, 1000);
  animateScrollOrSwipeTextContainer();
}

function hideLoader() {
  loaderContainerDiv.style.transition = "opacity 1s ease";
  loaderContainerDiv.style.opacity = 0;
  contentDiv.removeAttribute("class");
}

function onScroll() {
  handlePageScroll();
  runFunctionAfterScroll();
  playAnimationPlayer();
  animateEnvelope();
  clearTimeout(scrollingTimeout);

  scrollingTimeout = setTimeout(function () {
    pauseAnimationPlayer();
  }, 300);
}

function onResize() {
  setPageHeight();
  setItemsSpeed();
  moveLayers();
  setPositionStartProfile();
  pauseAnimationPlayer();
  setAllAnimation();
  animateInformation();
  handlePageScroll();
  updateBusArrays();
}

window.addEventListener("load", onLoad);
window.addEventListener("scroll", onScroll);
window.addEventListener("resize", onResize);
