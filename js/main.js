const elUserList = document.querySelector('.user-list');
const elUserTemplate = document.querySelector(".user-list__template").content;

const elPostList = document.querySelector('.post-list');
const elPostTemplate = document.querySelector(".post-list__template").content;

const elCommentList = document.querySelector('.comment-list');
const elCommentTemplate = document.querySelector(".comment-list__template").content;


function renderUser(arr, element) {

  element.innerHTML = "";

  const fragmentUser = document.createDocumentFragment();

  arr.forEach(item => {

    let location = `https://www.google.com/maps/place/`;
    let addressLink = `${item.address.street},${item.address.suite},${item.address.city},${item.address.zipcode}`;
    let geoLocation = `${item.address.geo.lat}, ${item.address.geo.lng}`;

    const clonedTemplate = elUserTemplate.cloneNode(true);
    clonedTemplate.querySelector(".user-list__id").textContent = item.id;
    clonedTemplate.querySelector(".user-list__item").dataset.userId = item.id;

    clonedTemplate.querySelector(".user-list__title").textContent = item.username;

    clonedTemplate.querySelector(".user-list__name").textContent = item.name;

    clonedTemplate.querySelector(".user-list__email").textContent = item.email;
    clonedTemplate.querySelector(".user-list__email").href = `mailto: ${item.email}`;

    clonedTemplate.querySelector(".user-list__address-link").textContent = "Address";
    clonedTemplate.querySelector(".user-list__address-link").href = `${location} +  ${addressLink}`;

    clonedTemplate.querySelector(".user-list__address-geo").textContent = "Geo location";
    clonedTemplate.querySelector(".user-list__address-geo").href = `${location} + ${geoLocation}`;

    clonedTemplate.querySelector(".user-list__phone").textContent = `Phone number`;
    clonedTemplate.querySelector(".user-list__phone").href = `tel: ${item.phone}`;

    clonedTemplate.querySelector(".user-list__website").textContent = item.website;
    clonedTemplate.querySelector(".user-list__website").href = `https:// + ${item.website}`;

    clonedTemplate.querySelector(".user-list__company-name").textContent = item.company.name;
    clonedTemplate.querySelector(".user-list__company-phrase").textContent = item.company.catchPhrase;
    clonedTemplate.querySelector(".user-list__company-bs").textContent = item.company.bs;

    fragmentUser.appendChild(clonedTemplate);
  })

  element.appendChild(fragmentUser);

}

function renderPost(arr, element){

  element.innerHTML = "";

  const fragmentPost = document.createDocumentFragment();

  arr.forEach( item => {

    const clonedPostTemplate = elPostTemplate.cloneNode(true);

    clonedPostTemplate.querySelector(".post-list__item").dataset.postId = item.id;

    clonedPostTemplate.querySelector(".post-list__id").textContent = item.id;

    clonedPostTemplate.querySelector(".post-list__title").textContent = item.title;

    clonedPostTemplate.querySelector(".post-list__text").textContent = item.body;

    fragmentPost.appendChild(clonedPostTemplate);
  })

  element.appendChild(fragmentPost);
}

function renderComment(arr, element){

  element.innerHTML = "";

  const fragmentComment = document.createDocumentFragment();

  arr.forEach( item => {

    const clonedCommentTemplate = elCommentTemplate.cloneNode(true);

    clonedCommentTemplate.querySelector(".comment-list__item").dataset.commentId = item.id;

    clonedCommentTemplate.querySelector(".comment-list__id").textContent = item.id;

    clonedCommentTemplate.querySelector(".comment-list__title").textContent = item.name;

    clonedCommentTemplate.querySelector(".comment-list__email").href = `mailto: ${item.email}`;

    clonedCommentTemplate.querySelector(".comment-list__text").textContent = item.body;

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

  if(evt.target.matches(".user-list__item")){

    let userId = evt.target.dataset.userId;

    console.log(userId);

    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    let data = await res.json();
    console.log(data);

    renderPost(data, elPostList);
  }

})


elPostList.addEventListener("click", async (evt) => {

  if(evt.target.matches(".post-list__item")){

    let postId = evt.target.dataset.postId;

    let res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    let data = await res.json();
    console.log(data);

    renderComment(data, elCommentList);
  }

});
