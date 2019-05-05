'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', [{
      title: 'Test Wiki Title',
      body: 'This is a description of the Wiki.',
      createdAt: '2019-04-28 15:41:56.174-04',
      private: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
