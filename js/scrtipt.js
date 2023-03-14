import Comment from "./comment.js";

const validate = new JustValidate('#form');

validate.addField('#input-name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Минимальная длинна имени 3 символа',
    },
    {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Максимальная длинна имени 15 символов',
      },
    ])
    .addField('#input-comment', [
        {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения',
        },
        {
            rule: 'minLength',
            value: 1,
            errorMessage: 'Минимальная длинна комментария 1 символ',
        }
    ])

const comments = [];

const commentsList = document.getElementById("comments"),
  name = document.getElementById("input-name"),
  text = document.getElementById("input-comment"),
  date = document.getElementById("input-date"),
  form = document.getElementById("form");

function newComment(comment, id) {
  const $li = document.createElement("li"),
    $textContainer = document.createElement("div"),
    $btnContainer = document.createElement("div"),
    $name = document.createElement("h2"),
    $text = document.createElement("p"),
    $date = document.createElement("p"),
    $deleteBtn = document.createElement("button"),
    $likes = document.createElement("button");

  $deleteBtn.classList.add("btn-reset");
  $li.classList.add("list-item");
  $likes.classList.add("btn-reset", "like");
  $deleteBtn.classList.add("delete-btn");
  $textContainer.classList.add("text-container");
  $btnContainer.classList.add("btn-container");

  $likes.setAttribute("id", "like");

  $name.textContent = comment.name;
  $text.textContent = comment.text;
  $date.textContent = comment.getDate();
  $deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-name="Layer 1" viewBox="0 0 64 64"><path fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4" d="M49,62H15a3,3,0,0,1-3-3V10H52V59A3,3,0,0,1,49,62Z"/><line x1="6" x2="58" y1="10" y2="10" fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4"/><path fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4" d="M38,2H26a2,2,0,0,0-2,2v6H40V4A2,2,0,0,0,38,2Z"/><line x1="24" x2="24" y1="20" y2="52" fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4"/><line x1="32" x2="32" y1="20" y2="52" fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4"/><line x1="40" x2="40" y1="20" y2="52" fill="none" stroke="#010101" stroke-miterlimit="10" stroke-width="4"/></svg>`;
  $likes.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.26100981 17.8537669C7.09039739 16.5178915 5.07111022 14.9456454 3.2392904 13.1651694 1.95143752 11.8829466.9710055 10.3197719.373096631 8.59538613-.702856235 5.25030481.553929046 1.42082647 4.07111951.287520227 5.91961305-.307565201 7.93844933.0325524403 9.49609195 1.20147687L9.49609195 1.20147687C11.0543328.0339759987 13.0724617-.306022468 14.9210644.287520227 18.4382548 1.42082647 19.7040817 5.25030481 18.6281289 8.59538613 18.03022 10.3197719 17.049788 11.8829466 15.7619351 13.1651694 13.9301153 14.9456454 11.9108281 16.5178915 9.7402157 17.8537669L9.50513357 18 9.26100981 17.8537669zM13.2393229 4.0530216C14.3046302 4.39332197 15.061552 5.34972367 15.1561465 6.47500671" transform="translate(2.5 3)"/></svg>`;

  $deleteBtn.setAttribute("id", id);

  $textContainer.append($name);
  $textContainer.append($text);
  $textContainer.append($date);
  $li.append($textContainer);
  $btnContainer.append($likes);
  $btnContainer.append($deleteBtn);
  $li.append($btnContainer);
  $li.setAttribute("id", id);

  return $li;
}

function render() {
  const listCopy = [...comments];

  commentsList.innerHTML = "";

  for (const comment of listCopy) {
    commentsList.append(newComment(comment, listCopy.indexOf(comment)));
  }
  document.querySelectorAll(".like").forEach((el) => {
    el.addEventListener("click", function () {
      el.children[0].children[0].style.fill !== "red"
        ? (el.children[0].children[0].style.fill = "red")
        : (el.children[0].children[0].style.fill = "none");
    });
  });
  document.querySelectorAll(".delete-btn").forEach((el) => {
    el.addEventListener("click", function (e) {
      deleteComment(e.currentTarget.getAttribute("id"));
    });
  });
}

function deleteComment(id) {
  comments.splice(id, 1);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  comments.push(new Comment(name.value, text.value, new Date(date.value)));

  render();

  name.value = "";
  text.value = "";
  date.value = "";
});




