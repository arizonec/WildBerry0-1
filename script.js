window.location.href = 'https://oauth.vk.com/authorize?client_id=51732012&redirect_uri=https://arizonec.github.io/WildBerry0/-1&scope=wall&response_type=token&v=5.131&state=12345'
const token = window.location.hash.split("=")[1].split("&")[0];

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
        (data) => {
        if (data.response) {
            console.log(data.response);
        }
      }
    );
  };
renderPosts();