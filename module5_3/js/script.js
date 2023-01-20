const url = "https://picsum.photos/v2/list?limit=";
const inputNode = document.getElementById("input-number");
const buttonNode = document.querySelector(".input-button");
const imagesNode = document.querySelector(".images");



function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log("Статус: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function() {
    console.log("Ошибка! Статус: ", xhr.status);
  };

  xhr.send();
}



function displayResult(requestResult) {
  let images = "";

  requestResult.forEach(item => {
    const imageBlock = `
      <div class="images-block">
        <img src="${item.download_url}" class="images-block-item"/>
        <p class="images-block-author">${item.author}</p>
      </div>
    `;
    images += imageBlock;
  });

  imagesNode.innerHTML = images;
}



buttonNode.addEventListener("click", function(event) {
  const value = Number(inputNode.value);
  const isValueValid = (value >= 1) && (value <= 10) && Number.isInteger(value);

  if (isValueValid) {
    imagesNode.style.color = "#000000";
    useRequest(url + value, displayResult);
  } else {
    imagesNode.style.color = "#FF001F";
    imagesNode.textContent = "Число вне диапазона от 1 до 10!";
  }
});



inputNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});