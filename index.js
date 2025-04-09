const { addonBuilder } = require("stremio-addon-sdk");

const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

const posterUrl = "https://your-username.github.io/your-repo-name/poster.jpg"; // שנה ללינק של הפוסטר

const episodes = [
  { title: "פרק 1", id: "1tlxgipFZlT_5BWZnY-5uaisxpbWOVWul" },
  { title: "פרק 2", id: "1BEgSHNkgKZn8FQMj_McXl7MADdXxk0HG" },
  { title: "פרק 3", id: "1cHvGbRZlN2HGB80dItmsyGN2cfXQPMzV" },
  { title: "פרק 4", id: "1gR9cBrwMsCxr-jghqqCINQBCYKEFVkl-" },
  { title: "פרק 5", id: "13LgG4_NgbkYpzGDdRIMUvc31LbKNTxLU" },
  { title: "פרק 6", id: "18j7oX0wxhuv_3G_ETzevU3tv1VwvRJzS" },
  { title: "פרק 7", id: "12q8ckz_PjYLrp6OasrWnzt0-Bdp2iWLt" },
  { title: "פרק 8", id: "1xiPr5eamC8G9kh4RddrMrK4UmYnYL2aw" },
  { title: "פרק 9", id: "16wmWWL53CY4CBW3y1BxEbsBKGieTfn6c" },
  { title: "פרק 10", id: "1ABPiI6UF-mbqS67cwzRne7KM-SalSIYq" },
  { title: "פרק 11", id: "1Xm5eQ_1YCw53Ro9edx9EiGouQNcKxV0U" },
  { title: "פרק 12", id: "13LYRH_Z1vY7eEqRqcKzAgfQzZ_PHKezW" },
  { title: "פרק 13", id: "12q4wRrvlZ3iaY4rSkWcKqKiv-HAdYM3C" },
  { title: "פרק 14", id: "1hnXW2xaJF1fX6yMTey3BBg2g7rYIfCar" }
];

// קטלוג – כדי שהסדרה תופיע בחיפוש
builder.defineCatalogHandler(({ type, id }) => {
  if (type === "series" && id === "shtreimelman-catalog") {
    return Promise.resolve({
      metas: [{
        id: "shtreimelman",
        type: "series",
        name: "שטריימלמן",
        description: "שטריימלמן הוא גיבור על של הדתיים שמציל אנשים מלאכול לא כשר ולהינצל מתומאות. ובקצרה שטריימלמן הוא גם מקלל מקצועי.",
        poster: posterUrl
      }]
    });
  }
  return Promise.resolve({ metas: [] });
});

// מידע על הסדרה כשנכנסים אליה
builder.defineMetaHandler(({ type, id }) => {
  if (type === "series" && id === "shtreimelman") {
    return Promise.resolve({
      meta: {
        id: "shtreimelman",
        type: "series",
        name: "שטריימלמן",
        description: "שטריימלמן הוא גיבור על של הדתיים שמציל אנשים מלאכול לא כשר ולהינצל מתומאות. ובקצרה שטריימלמן הוא גם מקלל מקצועי.",
        poster: posterUrl
      }
    });
  }
  return Promise.resolve({});
});

// הפרקים עצמם
builder.defineStreamHandler(({ type, id }) => {
  if (type === "series" && id === "shtreimelman") {
    const streams = episodes.map(ep => ({
      title: ep.title,
      url: `https://drive.google.com/uc?id=${ep.id}`
    }));
    return Promise.resolve({ streams });
  }
  return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();
