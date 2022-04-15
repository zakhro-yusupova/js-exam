const elUserList = document.querySelector('.user__list');
const elUserTemplate = document.querySelector(".user__template").content;

const elPostList = document.querySelector('.post__list');
const elPostTemplate = document.querySelector(".post__template").content;

const elCommentList = document.querySelector('.comment__list');
const elCommentTemplate = document.querySelector(".comment__template").content;


function renderUser(arr, element) {

  element.innerHTML = "";

  const fragmentUser = document.createDocumentFragment();

  arr.forEach(item => {

    let location = `https://www.google.com/maps/place/`;
    let addressLink = `${item.address.street},${item.address.suite},${item.address.city},${item.address.zipcode}`;
    let geoLocation = `${item.address.geo.lat}, ${item.address.geo.lng}`;

    const clonedTemplate = elUserTemplate.cloneNode(true);
    clonedTemplate.querySelector(".user__id").textContent = item.id;
    clonedTemplate.querySelector(".user__item").dataset.userId = item.id;

    clonedTemplate.querySelector(".user__title").textContent = item.username;

    clonedTemplate.querySelector(".user__name").textContent = item.name;

    clonedTemplate.querySelector(".user__email").textContent = item.email;
    clonedTemplate.querySelector(".user__email").href = `mailto: ${item.email}`;

    clonedTemplate.querySelector(".user__address-link").textContent = "Address";
    clonedTemplate.querySelector(".user__address-link").href = `${location} +  ${addressLink}`;

    clonedTemplate.querySelector(".user__address-geo").textContent = "Geo location";
    clonedTemplate.querySelector(".user__address-geo").href = `${location} + ${geoLocation}`;

    clonedTemplate.querySelector(".user__phone").textContent = `Phone number`;
    clonedTemplate.querySelector(".user__phone").href = `tel: ${item.phone}`;

    clonedTemplate.querySelector(".user__website").textContent = item.website;
    clonedTemplate.querySelector(".user__website").href = `https:// + ${item.website}`;

    clonedTemplate.querySelector(".user__company-name").textContent = item.company.name;
    clonedTemplate.querySelector(".user__company-phrase").textContent = item.company.catchPhrase;
    clonedTemplate.querySelector(".user__company-bs").textContent = item.company.bs;

    fragmentUser.appendChild(clonedTemplate);
  })

  element.appendChild(fragmentUser);

}

function renderPost(arr, element){

  element.innerHTML = "";

  const fragmentPost = document.createDocumentFragment();

  arr.forEach( item => {

    const clonedPostTemplate = elPostTemplate.cloneNode(true);

    clonedPostTemplate.querySelector(".post__item").dataset.postId = item.id;

    clonedPostTemplate.querySelector(".post__id").textContent = item.id;

    clonedPostTemplate.querySelector(".post__title").textContent = item.title;

    clonedPostTemplate.querySelector(".post__text").textContent = item.body;

    fragmentPost.appendChild(clonedPostTemplate);
  })

  element.appendChild(fragmentPost);
}

function renderComment(arr, element){

  element.innerHTML = "";

  const fragmentComment = document.createDocumentFragment();

  arr.forEach( item => {

    const clonedCommentTemplate = elCommentTemplate.cloneNode(true);

    clonedCommentTemplate.querySelector(".comment__item").dataset.commentId = item.id;

    clonedCommentTemplate.querySelector(".comment__id").textContent = item.id;

    clonedCommentTemplate.querySelector(".comment__title").textContent = item.name;

    clonedCommentTemplate.querySelector(".comment__email").href = `mailto: ${item.email}`;

    clonedCommentTemplate.querySelector(".comment__text").textContent = item.body;

    fragmentComment.appendChild(clonedCommentTemplate);
  })

  element.appendChild(fragmentComment);
}

async function getUser() {

  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await res.json();

  renderUser(data, elUserList);
}

getUser();


elUserList.addEventListener("click", async (evt) => {

  if(evt.target.matches(".user__item")){

    let userId = evt.target.dataset.userId;

    console.log(userId);

    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    let data = await res.json();
    console.log(data);

    renderPost(data, elPostList);
  }

})


elPostList.addEventListener("click", async (evt) => {

  if(evt.target.matches(".post__item")){

    let postId = evt.target.dataset.postId;

    let res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    let data = await res.json();
    console.log(data);

    renderComment(data, elCommentList);
  }

});
