export class API {
  baseUrl = "";
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(url, options) {
    try {
      return await fetch(`${this.baseUrl}${url}`, {
        method: "GET",
        ...options,
      });
    } catch (err) {
      return err;
    }
  }
}
