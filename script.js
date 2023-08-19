// window.location.href = 'https://!oauth.vk.com/authorize?client_id=51732152&display=page&redirect_uri=https://!arizonec.github.io/WildBerry0-1/&scope=wall&response_type=token&v=5.131&state=123456'
const token = window.location.hash.split("=")[1].split("&")[0];

const postsList = document.querySelector('.posts-list');

const owner_id = -41152133;
const version = 5.131;
const count = 10;
let offset = '';

const renderPosts = () => {
    VK.Api.call(
      "wall.get",
      {
        owner_id: owner_id,
        count: count,
        offset: offset,
        access_token: token,
        v: 5.131,
      },
        (data) => {
            if(data.responce.items) {
              const newPosts = data.responce.items;
              const html = newPosts //! создаём новый массив при помощи метода map который вернёт нам вёрстку новых элементов для дальнейших действий
        .map(
          (p) => `
          <li class="vk-widget-post">
            <div class="vk-widget-post-title">${p.text}</div>
            <div class="vk-widget-post-date">${new Date(
              p.date * 1000
            ).toLocaleDateString()}</div>
            <img class=ImgAll src=${p.attachments[0]['photo']?.sizes[4].url}
          </li>
        `
        )
        .join(''); //! соединяем верстку
      postsList.insertAdjacentHTML('beforeend', html); //! добавляем посты в список
            }
      }
    );
  };
renderPosts();