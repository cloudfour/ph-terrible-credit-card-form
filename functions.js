const cardTypes = ["Chase", "Visa", "CitiBank", "Master Card", "Cloud Four"];

const generateCard = () => {
  const ccNumber = generateNumber();
  const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];

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
          ${chance.name().toUpperCase()}
        </div>
      </div>

      <div class="card__content card__content--back">
        <div>
          Backside
        </div>
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
