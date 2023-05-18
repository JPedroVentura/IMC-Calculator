// Constantes
const SCREEN_BREAKPOINT = 575;
const ANIMATION_DURATION = '0.5s';
const HEIGHT_PERCENTAGE = '25%';

// Seleção de elementos do DOM
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const btnCalc = document.querySelector('#btn-calc');
const result = document.querySelector('.result');
const imcCalculatorContainer = document.querySelector('.imc-calculator');
const message = document.querySelector('#message');
const showImc = document.querySelector('#imc');

// Função para atualizar estilos do resultado
function updateResultStyles(currentStatus, backgroundColor) {
  result.style.animation = `heightAnimation ${ANIMATION_DURATION}`;
  result.style.height = HEIGHT_PERCENTAGE;
  result.style.boxShadow = `0 0 45px ${backgroundColor}`;
  result.style.display = 'flex';
  imcCalculatorContainer.style.transform = `translate${window.innerWidth > SCREEN_BREAKPOINT ? 'X' : 'Y'}(-10px)`;
  result.style.backgroundColor = backgroundColor;
  message.innerText = currentStatus;
}

// Função para calcular IMC
function calculateIMC(height, weight) {
  return weight / (height * height);
}

// Função para obter status do IMC
function getIMCStatus(imc) {
  const status = {
    currentStatus: '',
    backgroundColor: ''
  };

  if (imc < 18.5) {
    status.currentStatus = 'Magreza';
    status.backgroundColor = '#5FB5FF';
  } else if (imc < 24.9) {
    status.currentStatus = 'Normal';
    status.backgroundColor = '#59D48F';
  } else if (imc < 29.9) {
    status.currentStatus = 'Sobrepeso';
    status.backgroundColor = '#f1be48';
  } else {
    status.currentStatus = 'Obeso';
    status.backgroundColor = '#990000';
  }

  return status;
}

// Função de callback para evento de redimensionamento da janela
function handleWindowResize() {
  const translateAxis = window.innerWidth > SCREEN_BREAKPOINT ? 'X' : 'Y';
  imcCalculatorContainer.style.transform = `translate${translateAxis}(-10px)`;
}

// Função de callback para o evento de clique no botão de cálculo
function handleCalcButtonClick(event) {
  event.preventDefault();

  const heightValue = heightInput.value.replace(',', '.');
  const weightValue = weightInput.value.replace(',', '.');

  if (isNaN(heightValue) || isNaN(weightValue)) {
    alert('Altura ou Peso inválido!');
    return;
  }

  const imc = calculateIMC(heightValue, weightValue);
  const { currentStatus, backgroundColor } = getIMCStatus(imc);

  updateResultStyles(currentStatus, backgroundColor);
  showImc.innerText = `Seu IMC: ${imc.toFixed(2)}`;
}

// Event listeners
window.addEventListener('resize', handleWindowResize);
btnCalc.addEventListener('click', handleCalcButtonClick);
