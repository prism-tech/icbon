import { Decoder, Encoder } from '../resource';

const data: unknown = [
  {
    "_id": "61243b746cf956505982213e",
    "index": 0,
    "guid": "8eaa413e-83b1-494f-b955-80419fc73dc9",
    "isActive": true,
    "balance": "$3,867.93",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "blue",
    "name": "Mendez Small",
    "gender": "male",
    "company": "COWTOWN",
    "email": "mendezsmall@cowtown.com",
    "phone": "+1 (921) 564-2098",
    "address": "509 Ryerson Street, Robinette, Rhode Island, 4108",
    "about": "Reprehenderit non aute eiusmod consequat et reprehenderit tempor non sit minim est. Aliqua amet occaecat quis aute ut laborum reprehenderit cupidatat in aliqua duis adipisicing mollit ullamco. Laborum commodo consectetur dolore consectetur proident deserunt aliqua dolore dolore proident non proident ex magna. Labore tempor irure nulla labore magna eu laboris ut proident ex proident labore laboris voluptate. Dolor adipisicing anim do veniam incididunt ea commodo voluptate officia magna aliqua elit nulla ad.\r\n",
    "registered": "2016-11-13T05:17:19 -02:00",
    "latitude": -40.868859,
    "longitude": 32.048265,
    "tags": [
      "duis",
      "minim",
      "culpa",
      "elit",
      "minim",
      "ad",
      "anim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Janie Quinn"
      },
      {
        "id": 1,
        "name": "Natalie Garrett"
      },
      {
        "id": 2,
        "name": "Christina Clay"
      }
    ],
    "greeting": "Hello, Mendez Small! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "61243b7419098407731670de",
    "index": 1,
    "guid": "6c461202-3130-41d3-bde9-2555a5808ae1",
    "isActive": true,
    "balance": "$3,892.67",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Abigail Gilliam",
    "gender": "female",
    "company": "REVERSUS",
    "email": "abigailgilliam@reversus.com",
    "phone": "+1 (864) 532-2030",
    "address": "696 Roosevelt Court, Ezel, Missouri, 6436",
    "about": "Nulla commodo fugiat commodo amet eu veniam. Ex dolor et aliquip ea occaecat. Non eiusmod mollit consequat in nisi elit qui anim reprehenderit velit pariatur tempor nisi. Minim aliqua sit ullamco reprehenderit deserunt eiusmod consequat dolor elit deserunt cillum. Velit cillum cillum irure cupidatat. Amet nostrud proident cupidatat nulla.\r\n",
    "registered": "2018-02-27T12:00:28 -02:00",
    "latitude": 12.094287,
    "longitude": -174.950363,
    "tags": [
      "aliquip",
      "officia",
      "et",
      "ea",
      "sunt",
      "in",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hayes Brooks"
      },
      {
        "id": 1,
        "name": "Katina Reeves"
      },
      {
        "id": 2,
        "name": "French Howell"
      }
    ],
    "greeting": "Hello, Abigail Gilliam! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "61243b745047462e4c242720",
    "index": 2,
    "guid": "ed67fcf8-ceee-4b26-9139-563f60db289c",
    "isActive": false,
    "balance": "$3,584.17",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "green",
    "name": "Rios Willis",
    "gender": "male",
    "company": "ZENSUS",
    "email": "rioswillis@zensus.com",
    "phone": "+1 (923) 544-3612",
    "address": "697 Grimes Road, Cetronia, Texas, 2414",
    "about": "Aute excepteur aliqua aliquip laborum. Velit in quis ad nisi commodo laboris sint veniam irure. Ad aute culpa occaecat enim et consequat incididunt enim. Nulla dolor incididunt elit id non cupidatat duis duis laboris id qui incididunt.\r\n",
    "registered": "2016-07-31T03:26:58 -03:00",
    "latitude": 8.186474,
    "longitude": -51.680224,
    "tags": [
      "nostrud",
      "irure",
      "eu",
      "amet",
      "est",
      "sunt",
      "ullamco"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hardy Herring"
      },
      {
        "id": 1,
        "name": "Gretchen Walter"
      },
      {
        "id": 2,
        "name": "Jill Bates"
      }
    ],
    "greeting": "Hello, Rios Willis! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "61243b746a4feda66be72a26",
    "index": 3,
    "guid": "27781b8e-bc26-4c04-b9f6-ed69aaa3dc3e",
    "isActive": true,
    "balance": "$3,720.20",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "brown",
    "name": "Elaine Boyer",
    "gender": "female",
    "company": "VALPREAL",
    "email": "elaineboyer@valpreal.com",
    "phone": "+1 (804) 450-3386",
    "address": "509 Lincoln Avenue, Sisquoc, District Of Columbia, 9473",
    "about": "Eu non anim sit aute qui anim eiusmod aute adipisicing velit laborum laboris. Qui eu excepteur ullamco do velit amet amet elit nostrud exercitation. Exercitation magna culpa laboris ipsum consequat nostrud cillum nostrud aliquip dolore anim.\r\n",
    "registered": "2016-09-05T06:22:56 -03:00",
    "latitude": -36.917539,
    "longitude": 29.516252,
    "tags": [
      "esse",
      "sint",
      "cillum",
      "sit",
      "culpa",
      "mollit",
      "aliqua"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Anna Nunez"
      },
      {
        "id": 1,
        "name": "Jerri Burns"
      },
      {
        "id": 2,
        "name": "Walter Oneil"
      }
    ],
    "greeting": "Hello, Elaine Boyer! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "61243b74648da8289662e09b",
    "index": 4,
    "guid": "8cdbadfd-520e-4e22-99e8-3dd248301bf7",
    "isActive": false,
    "balance": "$3,944.47",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "green",
    "name": "Burton Lowery",
    "gender": "male",
    "company": "FUTURITY",
    "email": "burtonlowery@futurity.com",
    "phone": "+1 (976) 481-2891",
    "address": "460 Franklin Avenue, Darrtown, Ohio, 3050",
    "about": "Ipsum consequat nulla incididunt enim minim excepteur incididunt do commodo proident qui. Aliqua incididunt sit do est Lorem cillum sit velit ex consequat est fugiat. Dolor occaecat ipsum non nulla nulla in magna incididunt enim et laboris laboris ex officia. Commodo magna est ea tempor cupidatat officia ut commodo nulla ut et. Laborum Lorem enim veniam dolore incididunt consectetur ut occaecat veniam eu elit ut. Aute consequat commodo esse consectetur. Deserunt dolore est irure esse ullamco deserunt non commodo anim ullamco id id.\r\n",
    "registered": "2014-05-03T11:27:23 -03:00",
    "latitude": -25.986075,
    "longitude": -135.36155,
    "tags": [
      "velit",
      "irure",
      "dolore",
      "fugiat",
      "magna",
      "laborum",
      "ea"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Donaldson Spears"
      },
      {
        "id": 1,
        "name": "Daphne Thornton"
      },
      {
        "id": 2,
        "name": "Frost Gonzales"
      }
    ],
    "greeting": "Hello, Burton Lowery! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "61243b7450502342b4af5da6",
    "index": 5,
    "guid": "f3422ba7-0fdb-4416-8311-42c5cedda2bc",
    "isActive": false,
    "balance": "$3,415.95",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Summers Stanton",
    "gender": "male",
    "company": "GENESYNK",
    "email": "summersstanton@genesynk.com",
    "phone": "+1 (961) 492-3298",
    "address": "274 Jay Street, Drytown, Alabama, 7741",
    "about": "Minim sint laborum exercitation dolore duis velit consequat voluptate. Labore aute dolore ut aute est cupidatat minim aliquip qui eu reprehenderit. Aliqua exercitation veniam est ut incididunt Lorem id nostrud. Aliquip sunt in laborum dolore eiusmod proident et. Et sit velit esse ut occaecat. Eiusmod adipisicing officia deserunt minim nulla laboris commodo consequat.\r\n",
    "registered": "2021-05-14T05:03:58 -03:00",
    "latitude": -47.170232,
    "longitude": 47.842172,
    "tags": [
      "deserunt",
      "quis",
      "mollit",
      "ex",
      "laboris",
      "aute",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "May Hensley"
      },
      {
        "id": 1,
        "name": "Aimee Gomez"
      },
      {
        "id": 2,
        "name": "Tessa Fisher"
      }
    ],
    "greeting": "Hello, Summers Stanton! You have 8 unread messages.",
    "favoriteFruit": "яблоко"
  }
];

const iterations: number = parseInt(process.argv[2]) || 500;

console.log('running ' + iterations + ' iterations...');

let times: number [] = [];

for (let i: number = 0; i < iterations; i++) {
  const start: number = Number(process.hrtime.bigint());
  new Decoder(new Encoder().any(data)).any();
  times.push(Number(process.hrtime.bigint()) - start);
}

console.log('icbon: ' + ((times.reduce((a: number, b: number): number => a + b, 0)/times.length) / 1e6) + 'ms');
times = [];

for (let i: number = 0; i < iterations; i++) {
  const start: number = Number(process.hrtime.bigint());
  JSON.parse(JSON.stringify(data));
  times.push(Number(process.hrtime.bigint()) - start);
}

console.log('json: ' + ((times.reduce((a: number, b: number): number => a + b, 0)/times.length) / 1e6) + 'ms');
