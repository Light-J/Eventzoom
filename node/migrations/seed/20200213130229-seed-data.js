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

  await db.insert('attachments', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56170'),
    filename: 'Extra picture',
    location: 'https://i.imgur.com/vgZrB5U.jpg'
  });

  await db.insert('series', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    title: "CUBRIC Weekly",
    description: "These are the weekly series for CUBRIC.",
    image: "https://i.imgur.com/epMSRQH.png",
    events: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56271'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56272'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56273'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56274'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56275'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56276'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56277'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56278'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56279'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56280')], //FILL ME IN YOU MORON
    user: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56271'),
    title: "How do signals from the body shape out actions (and our inactions)?",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/dc1PU8j.jpeg",
    speaker: "Jiaxiang Zhang",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-01T14:00:00.000Z"),
    attachments: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56170')]
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56275'),
    title: "From blood to neuron: how close can we get with BOLD fMRI at 7T",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/u4qSjQL.jpeg",
    speaker: "Jiaxiang Zhang",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-02T14:00:00.000Z"),
  });


  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56272'),
    title: "Affective episodic simulations",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/BBcy6Wc.jpeg",
    speaker: "Kevin Murphy",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-03T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56273'),
    title: "Psychedelics: therapeutic mechanisms",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/8mpGUSt.jpeg",
    speaker: "Holly Rossiter",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-04T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56274'),
    title: "Rethinking some of MR with MR Fingerprinting.",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/mZXIf0I.png",
    speaker: "Derek Jones",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-05T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56276'),
    title: "fMRI across the lifespan: is it good enough to be BOLD?",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/9wGJWa0.png",
    speaker: "Matthias Treder",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-06T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56277'),
    title: "Dysconnectivity as a driver of treatment resistance in Schizophrenia",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/0cptOAb.jpeg",
    speaker: "Derek Jones",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-07T14:00:00.000Z"),
  });
  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56278'),
    title: "Technologies for closed loop wearable EEG",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/a3algoY.jpeg",
    speaker: "Penny Lewis",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-08T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56279'),
    title: "Investigating the mechanisms of spatial navigation in humans using fMRI",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/r1L3ZR9.jpeg",
    speaker: "Carl",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-09T14:00:00.000Z"),
  });

  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56280'),
    title: "Knowing our own minds: Metacognitive drivers of belief change",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/Lxg6TaU.jpeg",
    speaker: "Jiaxiang Zhang",
    vagueLocation: "CUBRIC, Cardiff",
    specificLocation: "Seminar Room 2",
    disabilityAccess: true,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 90,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56270'),
    date: new Date("2020-05-11T14:00:00.000Z"),
  });

  await db.insert('series', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56150'),
    title: "Cat test series 1",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/WsxRdVG.jpg",
    events: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56163'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56164'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56589')],
    user: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
  });

  await db.insert('series', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56151'),
    title: "Cat test series 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/vgZrB5U.jpg",
    events: [mongoose.Types.ObjectId('5e595ce2d8118f0888f56165'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56166'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56167'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56168'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56169'), mongoose.Types.ObjectId('5e595ce2d8118f0888f56170')],
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
    date: new Date("2020-04-28T14:00:00.000Z"),
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
    date: new Date("2020-04-25T17:00:00.000Z"),
  });


  await db.insert('events', {
    _id: mongoose.Types.ObjectId('5e595ce2d8118f0888f56589'),
    title: "Expensive event!",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/vgZrB5U.jpg",
    price: 5000,
    speaker: "Cat-lanister",
    vagueLocation: "Cardiff",
    specificLocation: "10 Street, Cardiff, CF23 4QS",
    disabilityAccess: false,
    organiser: mongoose.Types.ObjectId('5e595ce2d8118f0888f56140'),
    capacity: 46,
    series: mongoose.Types.ObjectId('5e595ce2d8118f0888f56150'),
    date: new Date("2020-04-25T17:00:00.000Z"),
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
    date: new Date("2020-04-16T09:00:00.000Z"),
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
    date: new Date("2020-04-19T19:00:00.000Z"),
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
    date: new Date("2020-04-19T19:00:00.000Z"),
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
    date: new Date("2020-04-19T19:00:00.000Z"),
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
    date: new Date("2020-04-19T19:00:00.000Z"),
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
