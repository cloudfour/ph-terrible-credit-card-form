const cardTypes = ["Chase", "Visa", "CitiBank", "Master Card", "Cloud Four"];
const signatureFonts = [
  "dawning",
  "apple",
  "flower",
  "marker",
  "qwigley",
  "beanie",
];

const generateCard = () => {
  const ccNumber = generateNumber();
  const cvv = [0, 0, 0].map((n) => chance.integer({ min: 0, max: 9 })).join("");
  const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
  const signatureFont =
    signatureFonts[Math.floor(Math.random() * signatureFonts.length)];
  const name = chance.name();

  document.querySelector(".js-card-wrapper").innerHTML = `
    <div class="card card--${cardType.replace(" ", "")}">
      <div class="card__content card__content--front">
        <div class="bank">
          ${cardType}
        </div>

        <img class="chip" src="chip.svg">

        <div class="number">
          <span>${ccNumber[0]}</span>
          <span>${ccNumber[1]}</span>
          <span>${ccNumber[2]}</span>
          <span>${ccNumber[3]}</span>
        </div>

        <div class="expiration">
          ${chance.exp()}
        </div>

        <div class="name">
          ${name.toUpperCase()}
        </div>
      </div>

      <div class="card__content card__content--back">
        <div class="mag_stripe"></div>

        <div class="signature signature--${signatureFont}">
          ${name}
        </div>

        <div class="cvv">${cvv}</div>
      </div>
    </div>
  `;
};

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
  document.querySelector(".js-deny").addEventListener("click", generateCard);
};

const initInterface = () => {
  generateCard();
  bindButtons();
};

initInterface();
