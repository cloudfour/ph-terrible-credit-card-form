const wrapper = document.querySelector(".js-card-wrapper");

// Hard code setting for development purposes
const defaultSettings = {
  // cardType: "World Bank",
};

const cardTypes = [
  "Globo Bank", 
  "Cloud Four", 
  // "Money Bags",
  // "Robin Hood",
  // "Honey",
  // "Fetch"
  "World Bank",
  "VennDiagram"
];

const signatureFonts = [
  "dawning",
  "apple",
  "flower",
  "marker",
  "qwigley",
  "beanie",
];
const signatureColors = ["black", "blue", "red"];

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateCard = (isEntering) => {
  const ccNumber = generateNumber();
  const cvv = [0, 0, 0].map((n) => chance.integer({ min: 0, max: 9 })).join("");
  const cardType = defaultSettings.cardType || randomItem(cardTypes);

  const cardTypeShortened = cardType.replace(" ", "");

  const signatureFont = randomItem(signatureFonts);
  const signatureColor = randomItem(signatureColors);
  const name = chance.name();

  wrapper.insertAdjacentHTML('beforeend', `
    <div class="card card--${cardTypeShortened} ${isEntering ? 'is-entering': ''}">
      <div class="card__content card__content--front">
        <div class="bank">
          ${cardType}
        </div>

        <img class="logo" src="images/${cardTypeShortened}-logo.svg">

        <img class="chip" src="images/chip.svg">

        <div class="number offset-text">
          <span>${ccNumber[0]}</span>
          <span>${ccNumber[1]}</span>
          <span>${ccNumber[2]}</span>
          <span>${ccNumber[3]}</span>
        </div>

        <div class="expiration offset-text">
          ${chance.exp()}
        </div>

        <div class="name offset-text">
          ${name.toUpperCase()}
        </div>
      </div>

      <div class="card__content card__content--back">
        <div class="mag_stripe"></div>

        <div class="signature signature--${signatureFont} signature--${signatureColor}">
          ${name}
        </div>

        <div class="cvv">${cvv}</div>
      </div>
    </div>
  `);

  document.querySelector('.card.is-current')
};

const updateCard = () => {
  const oldCard = document.querySelector('.card.is-current');

  if(oldCard) {
    oldCard.addEventListener('transitionend', () => {
      oldCard.parentNode.removeChild(oldCard);
    });
    oldCard.classList.add('is-exiting');
    oldCard.classList.remove('is-current');
  }

  generateCard(true);

  const newCard = document.querySelector('.card.is-entering');
  // Trigger a rewflow before toggling classes
  newCard.offsetHeight;
  // Trigger animation
  newCard.classList.add('is-current');
  newCard.classList.remove('is-entering');
}

const generateNumber = () => {
  const ccNumber = chance.cc();

  return [
    ccNumber.substring(0, 4),
    ccNumber.substring(4, 8),
    ccNumber.substring(8, 12),
    ccNumber.substring(12, 16),
  ];
};

const bindButtons = () => {
  document.querySelector(".js-deny").addEventListener("click", updateCard);
  document.querySelector(".js-accept").addEventListener("click", () => {
    alert("I don't believe you! Try again...");
  });
};

const initInterface = () => {
  generateCard(false);
  document.querySelector('.card').classList.add('is-current');
  bindButtons();
};

initInterface();
