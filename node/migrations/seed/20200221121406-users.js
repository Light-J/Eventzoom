'use strict';

const mongoose = require('mongoose');
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.insert('users', {
    _id: mongoose.mongo.ObjectId('5e595ce2d8118f0888f56140'),
    'email': "user@example.org",
    'password': "$2a$08$l5FOlIe2HKL90vFu2ePSV.5atqJlaapq8it0fo54fHUEjtNxOJYZm", // hello
    'verified': true
  });

  return db.insert('users', {
    _id: mongoose.mongo.ObjectId('5e595ce2d8118f0888f56141'),
    'email': "anotheruser@example.org",
    'password': "$2a$08$l5FOlIe2HKL90vFu2ePSV.5atqJlaapq8it0fo54fHUEjtNxOJYZm", // hello
    'verified': true
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
