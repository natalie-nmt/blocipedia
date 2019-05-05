const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return true;
  }

  create() {
    return this.new();
  }

  edit() {
    return this.new();
  }

  update() {
    return this.new();
  }

  destroy() {
    return this.new();
  }
}