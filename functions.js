const wrapper = document.querySelector(".js-card-wrapper");

// Hard code setting for development purposes
const defaultSettings = {
  // cardType: "VennDiagram",
};

const cardTypes = [
  "Globo Bank", 
  "Cloud Four", 
  // "Money Bags",
  // "Robin Hood",
  // "Honey",
  // "Fetch"
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

const generateCard = () => {
  const ccNumber = generateNumber();
  const cvv = [0, 0, 0].map((n) => chance.integer({ min: 0, max: 9 })).join("");
  const cardType = defaultSettings.cardType || randomItem(cardTypes);

  const cardTypeShortened = cardType.replace(" ", "");

  const signatureFont = randomItem(signatureFonts);
  const signatureColor = randomItem(signatureColors);
  const name = chance.name();

  wrapper.innerHTML = `
    <div class="card card--${cardTypeShortened}">
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
  `;

  wrapper.classList.add('is-visible');
};

const updateCard = () => {
  wrapper.classList.remove('is-visible');

  setTimeout(generateCard, 300);
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
  generateCard();
  bindButtons();
};

initInterface();
