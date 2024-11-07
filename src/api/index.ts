import ky from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_SERVER_URL,
  hooks: {
    beforeRequest: [
      /**
       * 요청 전 token 확인 후 Header에 넣어 전송
       * @param req HTTP Request
       */
      req => {
        const token = localStorage.getItem("token");
        if (token) {
          req.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      /**
       * 401 에러시 토큰 삭제
       * @param request -
       * @param options -
       * @param response HTTP Response
       */
      async (_request, _options, response) => {
        if (response.status === 401) {
          const token = localStorage.getItem("token");
          if (token) {
            localStorage.removeItem("token");
            alert("잘못된 혹은 만료된 토큰입니다.");
            window.location.href = "/login";
          }
        }
      },
    ],
  },
});

export default api;
