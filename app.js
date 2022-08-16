const cards = document.querySelectorAll(".card");

function getRemainingTime() {
  let temp = new Date();
  let tempYear = temp.getFullYear();
  let tempMonth = temp.getMonth();
  let tempday = temp.getDate();

  let futureDate = new Date(tempYear, tempMonth, tempday + 10, 10, 30, 0)
  let remTime = futureDate.getTime() - temp.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let remdays = Math.floor(remTime / oneDay);
  let remHours = Math.floor((remTime % oneDay) / oneHour);
  let remMinutes = Math.floor((remTime % oneHour) / oneMinute);
  let remSeconds = Math.floor((remTime % oneMinute) / 1000);

  function format(itemtext) {
    if (itemtext < 10) {
      return (itemtext = `0${itemtext}`);
    }
    return itemtext;
  }
  remlist = [remdays, remHours, remMinutes, remSeconds];
  cards.forEach(function (card, index) {
    flip(card, format(remlist[index]));
  })

  if (remTime < 0) {
    clearInterval(countdown);
  }

}
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();


function flip(card, newNumber) {
  const tops = card.querySelector(".top");
  const bottoms = card.querySelector(".bottom");
  const currentNumber = parseInt(tops.textContent);

  if (newNumber == currentNumber) {
    return;
  } else {
    const foldTop = document.createElement('div');
    foldTop.classList.add("fold-top");
    const foldBottom = document.createElement('div');
    foldBottom.classList.add("fold-bottom");

    const lefttop = document.createElement('div');
    lefttop.classList.add("lefttop");
    const leftbottom = document.createElement('div');
    leftbottom.classList.add("leftbottom");

    const righttop = document.createElement('div');
    righttop.classList.add("righttop");
    const rightbottom = document.createElement('div');
    rightbottom.classList.add("rightbottom");

    tops.textContent = newNumber;
    bottoms.textContent = newNumber;
    if (currentNumber < 10) {
      foldTop.textContent = `0${currentNumber}`;
      foldBottom.textContent = `0${currentNumber}`;
    }
    else{
      foldTop.textContent = currentNumber;
      foldBottom.textContent = currentNumber;
    }
   

    foldBottom.addEventListener('animationstart', function () {
      foldBottom.textContent = newNumber;
    });

    foldBottom.addEventListener('animationend', function () {
      foldBottom.remove();
    });

    foldTop.addEventListener('animationend', function () {
      foldTop.textContent = newNumber;
      foldTop.remove();
    });


    card.append(foldTop, foldBottom, lefttop, righttop, leftbottom, rightbottom);
  }
}