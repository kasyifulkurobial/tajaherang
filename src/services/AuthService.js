import http from "@/axios/http";

class AuthService {
  login(username, password) {
    return http.post("/auth/login", {
      username: username,
      password: password,
      expiresInMins: 30, // optional, defaults to 60
    });
  }
}

export default new AuthService();
