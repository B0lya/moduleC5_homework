const url = "https://picsum.photos/v2/list?";
const inputPageNumberNode = document.getElementById("input-page-number");
const inputLimitNode = document.getElementById("input-limit");
const buttonNode = document.querySelector(".input-button");
const imagesNode = document.querySelector(".images");

imagesNode.innerHTML = localStorage.getItem("lastRequest");



const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch(() => {
      console.log("Ошибка!");
    })
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
    localStorage.setItem("lastRequest", images);
  });

  imagesNode.innerHTML = images;
}



buttonNode.addEventListener("click", () => {
  const pageNumber = Number(inputPageNumberNode.value);
  const limit = Number(inputLimitNode.value);
  const isPageNumberValid =
    pageNumber >= 1 && pageNumber <= 10 && Number.isInteger(pageNumber);
  const isLimitValid =
    limit >= 1 && limit <= 10 && Number.isInteger(limit);

  if (isPageNumberValid && isLimitValid) {
    imagesNode.style.color = "#000000";
    useRequest(url + "page=" + pageNumber + "&limit=" + limit, displayResult);
  } else {
    imagesNode.style.color = "#ff0000";
    if (!isPageNumberValid && !isLimitValid) {
      imagesNode.textContent = "Номер страницы и лимит вне диапазона от 1 до 10!";
    } else if (!isPageNumberValid) {
      imagesNode.textContent = "Номер страницы вне диапазона от 1 до 10!";
    } else if (!isLimitValid) {
      imagesNode.textContent = "Лимит вне диапазона от 1 до 10!";
    }
  }
});



inputPageNumberNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});



inputLimitNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});
