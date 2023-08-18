// https://oauth.vk.com/authorize?client_id=51731162&redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=wall,offline&response_type=token

// https://oauth.vk.com/authorize?client_id=51731162&redirect_uri=https://vk.com/wildberry-widget&display=page&scope=wall,offline&response_type=token
const token ='vk1.a.HRKYd09NQXnnpP-eGIH0r2HtkwNJGDTwdHaMlwG4G2ijYaa27xbhE5pibkvutXNvxyfcuuPmNpxWn2F0azRQ7wmeUCrWOQCh05fxUc8UIYslVtDKIc6wEKxK7tYlyKwIDuvEzsijV8nMD1beprP34ws_tIdcf_0dW17zzgy_0FZ_adWam64cAlnwjT9MoJvcHAteoCJDFUdISraIL8FdvQ';
// const token = `vk1.a.7W-1JzuKU8kEGI-1Z6yhfq6phVHTa63TuTse4Ze-Q6UwHSz2sU3iNcvUz7pksgavsf5Y3TRQRVemK5DEht51ikJYNw5ubAinw2x36JK2GFyoZNTIAQ6tAS6J8jl6lwxj2jPLZbVtZiV3XeOmXB15RTjBkWNt1o-FCOs9m7ZS0WzFcG7ahVnBc4DineAbktBuKvg8VlIRSRbiOnHtfnHHtw`;
const owner_id = -51873373;
const version = 5.131;
const count = 10;
let offset = +localStorage.getItem("offset") ?? 0;


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
          offset += 10;
          console.log(data)
        }
      }
    );
  };


renderPosts();