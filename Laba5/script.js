function swapContent2_6() {
    var headerText = document.querySelector('.header-text');
    var footerText = document.querySelector('.footer-text');

    var headerContent = headerText.innerHTML;
    var footerContent = footerText.innerHTML;

    headerText.innerHTML = footerContent;
    footerText.innerHTML = headerContent;
}

function calculateRhombusArea(diagonal_1, diagonal_2) {
    var area = 0.5 * diagonal_1 * diagonal_2;
    return area;
}

function calculateAndDisplayArea() {
    var diagonal1Value = 8;
    var diagonal2Value = 12;

    var rhombusArea = calculateRhombusArea(diagonal1Value, diagonal2Value);

    var fifthBlock = document.querySelector('.fifth');

    var resultElement = document.createElement('p');
    resultElement.style.margin = '10px'; 
    resultElement.style.fontSize = '15px'; 
    resultElement.textContent = 'Площа ромба з сторонами ' + diagonal1Value + ' та ' + diagonal2Value + ' дорівнює ' + rhombusArea;

    fifthBlock.appendChild(resultElement);
}

function processNumbers() {
    var numbersForm = document.getElementById('numbersForm');
    var numbers = [];
  
    for (var i = 1; i <= 10; i++) {
      var inputId = 'number' + i;
      var inputValue = parseFloat(numbersForm.querySelector('#' + inputId).value);
      if (!isNaN(inputValue)) {
        numbers.push(inputValue);
      }
    }
  
    var minValue = Math.min(...numbers);
    var maxValue = Math.max(...numbers);
  
    saveToCookies('minValue', minValue);
    saveToCookies('maxValue', maxValue);
  
    var infoMessage = 'Мінімальне значення: ' + minValue + '\nМаксимальне значення: ' + maxValue;
    var userDecision = confirm(infoMessage + '\n\nБажаєте видалити дані із cookies?');
  
    if (userDecision) {
      deleteCookies('minValue');
      deleteCookies('maxValue');
      location.reload();
    } else {
      alert('Дані збережено у cookies. Перезавантажте сторінку для відображення оновленої інформації.');
    }
  }

function saveToCookies(name, value) {
    document.cookie = name + '=' + JSON.stringify(value) + '; max-age=3600'; 
}

function deleteCookies(name) {
    document.cookie = name + '=; max-age=0';
}

function displayInfoFromCookies() {
    var minValue = getFromCookies('minValue');
    var maxValue = getFromCookies('maxValue');
    
    if (minValue !== null && maxValue !== null) {
        var result = confirm(
            'Мінімальне значення: ' + minValue + '\nМаксимальне значення: ' + maxValue +
            '\n\nБажаєте видалити дані із cookies?'
        );

        if (result) {
            deleteCookies('minValue');
            deleteCookies('maxValue');
            location.reload(); 
        }
    } else {

        var numbersForm = document.getElementById('numbersForm');
        numbersForm.classList.add('hidden');
        
        alert('Дані відсутні в cookies або були вже видалені.');
    }
}

function getFromCookies(name) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return JSON.parse(cookie.substring(name.length + 1, cookie.length));
    }
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function() {
    var swapTextsButton = document.getElementById('swap-button');
    var swapContentButton = document.getElementById('area-button');

    swapTextsButton.addEventListener('click', swapContent2_6);
    swapContentButton.addEventListener('click', calculateAndDisplayArea);

    var minValue = getFromCookies('minValue');
    var maxValue = getFromCookies('maxValue');
    if (minValue !== null && maxValue !== null) {
      saveToCookies('minValue', minValue);
      saveToCookies('maxValue', maxValue);
    }
    displayInfoFromCookies();

});

