// Savelogin.js

let loggedInUser = null;

const Savelogin = {
  saveUserLoginInfo: (username, userposition) => {
    loggedInUser = {
      username,
      userposition
    };
  },

  getUserLoginInfo: () => {
    return loggedInUser;
  }
};

module.exports = Savelogin;