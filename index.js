const axios = require("axios");

window.getPosts = function (HTMLElement) {
  const tableContainer = document.querySelector("#first-table");

  fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${HTMLElement.value}`
  )
    .then((response) => response.json())
    .then((json) => {
      const postKeys = Object.keys(json[0]);

      const table = document.createElement("table");
      //creating table head
      const tr = document.createElement("tr");
      for (let i = 0; i < postKeys.length; i++) {
        const th = document.createElement("th");

        const text = document.createTextNode(`${postKeys[i]}`);

        th.appendChild(text);
        tr.appendChild(th);
        table.appendChild(tr);
      }
      // adding button head
      const th = document.createElement("th");
      const text = document.createTextNode("Comments");

      th.appendChild(text);
      tr.appendChild(th);
      table.appendChild(tr);

      //creating table body
      for (let j = 0; j < json.length; j++) {
        const tr = document.createElement("tr");
        tr.setAttribute("class", `tr tr-${json[j].id}`);

        for (let k = 0; k < postKeys.length; k++) {
          const td = document.createElement("td");
          const text = document.createTextNode(`${json[j][postKeys[k]]}`);

          td.appendChild(text);
          tr.appendChild(td);
        }
        const button = document.createElement("button");
        button.setAttribute("onclick", `getComments(${json[j].id})`);

        const text = document.createTextNode("Show Comments");

        button.appendChild(text);
        tr.appendChild(button);
        table.appendChild(tr);
      }
      tableContainer.innerHTML = "";
      tableContainer.appendChild(table);
    });
};

window.getComments = function (event) {
  console.warn(event);
  if (typeof event !== "number") return alert("error");

  const tableContainer = document.querySelector("#second-table");
  axios
    .get(`https://jsonplaceholder.typicode.com/comments?postId=${event}`)
    .then((response) => {
      const commentKeys = Object.keys(response.data[0]);
      const table = document.createElement("table");

      //creating table head
      const tr = document.createElement("tr");
      for (let i = 0; i < commentKeys.length; i++) {
        const th = document.createElement("th");

        const text = document.createTextNode(`${commentKeys[i]}`);

        th.appendChild(text);
        tr.appendChild(th);
        table.appendChild(tr);
      }

      //creating table body
      for (let j = 0; j < response.data.length; j++) {
        const tr = document.createElement("tr");

        for (let k = 0; k < commentKeys.length; k++) {
          const td = document.createElement("td");
          const text = document.createTextNode(
            `${response.data[j][commentKeys[k]]}`
          );

          td.appendChild(text);
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }

      tableContainer.innerHTML = "";
      tableContainer.appendChild(table);

      //setting background
      const allRows = document.querySelectorAll("tr");
      allRows.forEach((HTMLElement) => HTMLElement.classList.remove("active"));

      console.log("boris", event);
      const activeRow = document.querySelector(`.tr-${event}`);
      activeRow.classList.add("active");
    })
    .catch(function (error) {
      console.error(error);
    });
};
