// window.location.href = 'https://!oauth.vk.com/authorize?client_id=51732152&display=page&redirect_uri=https://!arizonec.github.io/WildBerry0-1/&scope=wall&response_type=token&v=5.131&state=123456'
const token = window.location.hash.split("=")[1].split("&")[0];

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
            if(data) {
                console.log(true);
            } else {
                console.log(false);
            }
      }
    );
  };
renderPosts();