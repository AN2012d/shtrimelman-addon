const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  "id": "shtrimelman-addon",
  "version": "1.0.0",
  "name": "שטריימלמן",
  "description": "שטריימלמן הוא גיבור על שמציל דתיים מתומאות. כולל קללות, לגיל 14+ בלבד.",
  "resources": ["catalog", "stream", "meta"],
  "types": ["series"],
  "catalogs": [
    {
      type: "series",
      id: "shtrimelman"
    }
  ],
  "idPrefixes": ["shtrimelman:"]
};

const builder = new addonBuilder(manifest);

const episodes = Array.from({ length: 14 }, (_, i) => {
  const number = i + 1;
  const id = number < 14 ? number : 15; // כי הפרק ה־14 נקרא בטעות 15
  return {
    id: `shtrimelman:${number}`,
    title: `פרק ${number}`,
    season: 1,
    episode: number,
    released: "2025-01-01"
  };
});

builder.defineCatalogHandler(({ type, id }) => {
  if (type === "series" && id === "shtrimelman") {
    return Promise.resolve({
      metas: [
        {
          id: "shtrimelman",
          type: "series",
          name: "שטריימלמן",
          poster: "https://an2012d.github.io/shtrimelman-addon/main-poster.png",
          description: "שטריימלמן הוא גיבור על שמציל דתיים מתומאות ואוכל לא כשר. כולל קללות. מגיל 14+ בלבד."
        }
      ]
    });
  }
  return Promise.resolve({ metas: [] });
});

builder.defineMetaHandler(({ id }) => {
  if (id === "shtrimelman") {
    return Promise.resolve({
      meta: {
        id: "shtrimelman",
        type: "series",
        name: "שטריימלמן",
        description: "שטריימלמן הוא גיבור על שמציל דתיים מתומאות ואוכל לא כשר. כולל קללות. מגיל 14+ בלבד.",
        poster: "https://an2012d.github.io/shtrimelman-addon/main-poster.png",
        videos: episodes
      }
    });
  }
});

const links = [
  "1tlxgipFZlT_5BWZnY-5uaisxpbWOVWul",
  "1BEgSHNkgKZn8FQMj_McXl7MADdXxk0HG",
  "1cHvGbRZlN2HGB80dItmsyGN2cfXQPMzV",
  "1gR9cBrwMsCxr-jghqqCINQBCYKEFVkl-",
  "13LgG4_NgbkYpzGDdRIMUvc31LbKNTxLU",
  "18j7oX0wxhuv_3G_ETzevU3tv1VwvRJzS",
  "12q8ckz_PjYLrp6OasrWnzt0-Bdp2iWLt",
  "1xiPr5eamC8G9kh4RddrMrK4UmYnYL2aw",
  "16wmWWL53CY4CBW3y1BxEbsBKGieTfn6c",
  "1ABPiI6UF-mbqS67cwzRne7KM-SalSIYq",
  "1Xm5eQ_1YCw53Ro9edx9EiGouQNcKxV0U",
  "13LYRH_Z1vY7eEqRqcKzAgfQzZ_PHKezW",
  "12q4wRrvlZ3iaY4rSkWcKqKiv-HAdYM3C",
  "1hnXW2xaJF1fX6yMTey3BBg2g7rYIfCar"
];

builder.defineStreamHandler(({ id }) => {
  const match = id.match(/^shtrimelman:(\d+)$/);
  if (match) {
    const episodeNumber = parseInt(match[1]);
    const linkId = links[episodeNumber - 1];
    return Promise.resolve({
      streams: [
        {
          title: `שטריימלמן - פרק ${episodeNumber}`,
          url: `https://drive.google.com/uc?id=${linkId}&export=download`
        }
      ]
    });
  }
  return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();
