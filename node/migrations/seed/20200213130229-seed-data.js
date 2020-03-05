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

exports.up = async function (db) {

  await db.insert('series', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56150'),
    title: "Cat test series 1",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/WsxRdVG.jpg",
    events: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56163'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56164')],
    user: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
  });

  await db.insert('series', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    title: "Cat test series 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/vgZrB5U.jpg",
    events: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56165'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56166'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56167')],
    user: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),

  });
  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56163'),
    title: "Cat Test Event",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/WsxRdVG.jpg",
    speaker: "Cat Berathian",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56150'),
    date: new Date("2020-03-10T14:00:00.000Z"),
  });
  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56164'),
    title: "Cat Test Event 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/vgZrB5U.jpg",
    speaker: "Cat-lanister",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: false,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 46,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56150'),
    date: new Date("2020-03-10T17:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56165'),
    title: "Are fat cats evil?",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/BK94gNy.jpg",
    speaker: "Richie McRichieson",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: false,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 46,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-02-01T09:00:00.000Z"),
  });


  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56166'),
    title: "Cat Test Event 3",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/HwIbeq1.jpg",
    speaker: "Cat-lin Stark",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: false,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 10,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-03-16T09:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56167'),
    title: "Cat Test Event 4",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/PtmP1yu.jpg",
    speaker: "Catty mcCatperson",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 34,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-03-19T19:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56168'),
    title: "Comsc Staff event",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/PtmP1yu.jpg",
    speaker: "Catty mcCatperson",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 34,
    filterable: {
      public: false,
      school: 'comsc',
      staff: true,
    },
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-03-19T19:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56169'),
    title: "Comsc Everyone event",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/PtmP1yu.jpg",
    speaker: "Catty mcCatperson",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 34,
    filterable: {
      public: false,
      school: 'comsc',
    },
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-03-19T19:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56170'),
    title: "Business Everyone event",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/PtmP1yu.jpg",
    speaker: "Catty mcCatperson",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 34,
    filterable: {
      public: false,
      school: 'cbs',
    },
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    date: new Date("2020-03-19T19:00:00.000Z"),
  });
  return null;
};

exports.down = async function (db) {
  await db.dropCollection('events');
  return null;
};

exports._meta = {
  "version": 1
};
