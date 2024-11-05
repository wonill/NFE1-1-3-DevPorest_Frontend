import ky from "ky";

const api = ky.create({
  prefixUrl: "http://140.245.78.132:8080/api",
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
  },
});

export default api;
