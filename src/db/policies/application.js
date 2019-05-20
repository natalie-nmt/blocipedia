module.exports = class ApplicationPolicy {

    constructor(user, record) {
      this.user = user;
      this.record = record;
    }
  
    _isOwner() {
      return this.record && (this.record.id == this.user.id);
    }

    _isAdmin() {
      return this.user && this.user.role == 1;
    }

    _isPro() {
      return this.user && this.user.role == 2;
    }

    _isMember() {
      return this.user && this.user.role == 0;
    }
  
    new() {
      return !!this.user;
    }
  
    create() {
      return this.new();
    }
  
    show() {
      return true;
    }
  
    edit() {
      return this.new() &&
        this.record && (this._isOwner() || this._isAdmin());
    }
  
    update() {
      return this.edit();
    }
  
    destroy() {
      return this.update();
    }
  }