const url = "https://picsum.photos/";
const inputWidthNode = document.getElementById("input-width");
const inputHeightNode = document.getElementById("input-height");
const buttonNode = document.querySelector(".input-button");
const imageNode = document.querySelector(".image");



const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
      if (callback) {
        callback(response.url);
      }
    })
    .catch(() => {
      console.log("Ошибка!");
    })
}



function displayResult(imgUrl) {
  imageNode.innerHTML = `<img src="${imgUrl}">`;
}



buttonNode.addEventListener("click", () => {
  const width = Number(inputWidthNode.value);
  const height = Number(inputHeightNode.value);
  const isValuesValid = width >= 100 && width <= 300 && Number.isInteger(width)
    && height >= 100 && height <= 300 && Number.isInteger(height);

  if (isValuesValid) {
    imageNode.style.color = "#000000";
    useRequest(url + width + "/" + height, displayResult);
  } else {
    imageNode.style.color = "#ff0000";
    imageNode.textContent = "Одно из чисел вне диапазона от 100 до 300!";
  }
});



inputWidthNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});



inputHeightNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});