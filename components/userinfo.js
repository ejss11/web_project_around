export class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = userNameSelector;
    this._userJobElement = userJobSelector;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
  }
}
