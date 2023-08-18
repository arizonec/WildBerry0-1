window.location.href = 'https://oauth.vk.com/authorize?client_id=51731162&redirect_uri=https://arizonec.github.io/WildBerry0-1/&display=page&scope=wall,offline&response_type=token'
const token = window.location.hash.split("=")[1].split("&")[0];

const postLists = document.querySelector('.posts-list');

const owner_id = -51873373;
const version = 5.131;
const count = 10;
let offset = 0;

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
      async (data) => {
        if (data.response) {
            let dataList = data.response.items;
            const html = dataList.map(
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
              .join('');
              postLists.insertAdjacentHTML('beforeend', html);
        }
      }
    );
  };
renderPosts();