'use strict';

const Model = require('./Model.js')
const User = {
  ...Model,
  table: 'users',
  foreign_id: 'user_id',
  hateoas: function (item) {
    return {
      link: [
        {
          href: `/posts?${this.foreign_id}=${item.id}`,
          rel: 'posts'
        }
      ]
    }
  }
}

module.exports = User