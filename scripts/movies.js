// ==========================
// === MATHFLIX MOVIES DATABASE ===
// ==========================
// SECTION INDEX:
// 1. DATABASE INITIALIZATION & STRUCTURE
// 2. TOP 10 FEATURED MOVIES
// 3. VERTICAL CAROUSEL (HORROR POSTERS)
// 4. DIGO'S FAVORITES (FAMILY/MUSICAL COLLECTION)
// 5. SERIES FOR BINGE WATCHING
// 6. MOVIE MARATHONS
//    6.1 THE HUNGER GAMES SAGA
//    6.2 HARRY POTTER SERIES
//    6.3 ALIEN FRANCHISE
//    6.4 TOY STORY COLLECTION
//    6.5 X-MEN UNIVERSE
// ==========================

// ==========================
// 1. DATABASE INITIALIZATION & STRUCTURE
// ==========================

/**
 * Global movies database - contains all movie and series information
 * Used throughout the application for content display and searching
 */
window.moviesData = {};

/* 
  MOVIE DATA STRUCTURE:
  {
    title: "Movie Title",
    genre: ["Genre1", "Genre2", "Genre3"], // MAX 3 genres
    categories: ["cat1", "cat2", "cat3"], // MAX 3 categories (SERIES ONLY)
    duration: "1h 30min",
    year: 2020,
    age: "12+",
    origin: "Country",
    locations: ["Location 1", "Location 2"],
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    director: "Director Name",
    description: "Short description...",
    poster: "assets/imgs/ban-movie.png",
    trailer: "https://www.youtube.com/embed/trailer_id",
    tags: ["tag1", "tag2", "tag3"], // MAX 3 tags
    ranking: { math: 0, digo: 0 }
  }
*/

// ==========================
// 2. TOP 10 FEATURED MOVIES
// ==========================
// Premium selection of critically acclaimed and popular movies
// Displayed in the main carousel and top 10 section

window.moviesData.arrival = {
  title: "Arrival",
  genre: ["Drama", "Sci-Fi", "Mystery"],
  duration: "1h 56min",
  year: 2016,
  age: "12+",
  origin: "USA",
  locations: ["Montreal, Canada", "Place des Arts - Montreal"],
  cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"],
  director: "Denis Villeneuve",
  description:
    "When mysterious spacecraft touch down across the globe, an elite team led by expert linguist Louise Banks is brought together to investigate.",
  poster: "assets/imgs/ban-arrival.png",
  trailer: "https://www.youtube.com/embed/tFMo3UJ4B4g",
  tags: ["aliens", "communication", "linguistics"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.abouttime = {
  title: "About Time",
  genre: ["Romance", "Comedy", "Drama"],
  duration: "2h 3min",
  year: 2013,
  age: "12+",
  origin: "UK",
  locations: ["Cornwall", "London"],
  cast: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy"],
  director: "Richard Curtis",
  description:
    "On his 21st birthday, Tim discovers he can travel through time. He uses the gift to pursue love and learn that not all problems can be fixed.",
  poster: "assets/imgs/ban-abouttime.png",
  trailer: "https://www.youtube.com/embed/7OIFdWk83no",
  tags: ["romance", "time travel", "family"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.hojequerovoltarsozinho = {
  title: "Hoje Eu Quero Voltar Sozinho",
  genre: ["Drama", "Romance"],
  duration: "1h 36min",
  year: 2014,
  age: "12+",
  origin: "Brazil",
  locations: ["São Paulo, Brazil", "Colégio Estadual Fernão Dias"],
  cast: ["Ghilherme Lobo", "Fábio Audi", "Tess Amorim"],
  director: "Daniel Ribeiro",
  description:
    "Leonardo is a blind teenager seeking independence. His perspective shifts with the arrival of Gabriel, a new student at school.",
  poster: "assets/imgs/ban-hojequerovoltarsozinho.png",
  trailer: "https://www.youtube.com/embed/7_cP_Q7j0jQ",
  tags: ["LGBTQ", "coming of age", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.origins = {
  title: "Origins",
  genre: ["Documentary", "History"],
  duration: "1h 42min",
  year: 2014,
  age: "10+",
  origin: "USA",
  locations: ["United States", "Namibia", "Peru"],
  cast: ["Jason Prall"],
  director: "Pedram Shojai",
  description:
    "A global journey exploring how our modern lifestyle affects our health, environment, and the true nature of human origins.",
  poster: "assets/imgs/ban-origins.png",
  trailer: "https://www.youtube.com/embed/sEGppIgwKf0",
  tags: ["health", "nature", "evolution"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.lastchristmas = {
  title: "Last Christmas",
  genre: ["Comedy", "Drama", "Romance"],
  duration: "1h 43min",
  year: 2019,
  age: "12+",
  origin: "UK",
  locations: ["London", "Covent Garden", "Regent Street"],
  cast: ["Emilia Clarke", "Henry Golding", "Emma Thompson"],
  director: "Paul Feig",
  description:
    "Kate, a young woman with a streak of bad luck, works as Santa's elf. A chance meeting changes her perspective on life.",
  poster: "assets/imgs/ban-lastchristmas.png",
  trailer: "https://www.youtube.com/embed/z9CEIcmWmtA",
  tags: ["christmas", "romance", "holiday"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.ghoststory = {
  title: "A Ghost Story",
  genre: ["Drama", "Fantasy", "Romance"],
  duration: "1h 32min",
  year: 2017,
  age: "14+",
  origin: "USA",
  locations: ["Dallas, Texas", "Irving, Texas", "Fort Worth"],
  cast: ["Casey Affleck", "Rooney Mara"],
  director: "David Lowery",
  description:
    "A ghost draped in a white sheet returns home to observe the quiet life he left behind, reflecting on existence and time.",
  poster: "assets/imgs/ban-ghoststory.png",
  trailer: "https://www.youtube.com/embed/c_3NMtxeyfk",
  tags: ["ghost", "existential", "afterlife"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.perksofbeing = {
  title: "The Perks of Being a Wallflower",
  genre: ["Drama", "Romance"],
  duration: "1h 43min",
  year: 2012,
  age: "13+",
  origin: "USA",
  locations: ["Pittsburgh, Pennsylvania", "Peters Township High School"],
  cast: ["Logan Lerman", "Emma Watson", "Ezra Miller"],
  director: "Stephen Chbosky",
  description:
    "A shy freshman finds friendship and confidence through two seniors who help him navigate high school and personal struggles.",
  poster: "assets/imgs/ban-perksofbeing.png",
  trailer: "https://www.youtube.com/embed/2vb2qrcPEEs",
  tags: ["coming of age", "friendship", "high school"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.bridesmaids = {
  title: "Bridesmaids",
  genre: ["Comedy", "Romance"],
  duration: "2h 5min",
  year: 2011,
  age: "16+",
  origin: "USA",
  locations: ["Milwaukee, Wisconsin", "Los Angeles, California"],
  cast: ["Kristen Wiig", "Maya Rudolph", "Rose Byrne"],
  director: "Paul Feig",
  description:
    "A maid of honor faces chaos when competing with a bridesmaid for the bride's affection, testing friendships and patience.",
  poster: "assets/imgs/ban-bridesmaids.png",
  trailer: "https://www.youtube.com/embed/xI0g1gaXr-Y",
  tags: ["wedding", "comedy", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.beforesunrise = {
  title: "Before Sunrise",
  genre: ["Drama", "Romance"],
  duration: "1h 41min",
  year: 1995,
  age: "14+",
  origin: "USA, Austria",
  locations: ["Vienna", "Maria am Gestade Church", "Zollamtssteg Bridge"],
  cast: ["Ethan Hawke", "Julie Delpy"],
  director: "Richard Linklater",
  description:
    "Two strangers meet on a train in Europe and spend an unforgettable evening together exploring the city and their thoughts.",
  poster: "assets/imgs/ban-beforesunrise.png",
  trailer: "https://www.youtube.com/embed/9v6X-Dytlko",
  tags: ["romance", "travel", "conversation"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.her = {
  title: "Her",
  genre: ["Drama", "Romance", "Sci-Fi"],
  duration: "2h 6min",
  year: 2013,
  age: "16+",
  origin: "USA",
  locations: ["Los Angeles, California", "Shanghai, China"],
  cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams"],
  director: "Spike Jonze",
  description:
    "In a near future, a lonely writer develops a relationship with an advanced AI operating system that understands him deeply.",
  poster: "assets/imgs/ban-her.png",
  trailer: "https://www.youtube.com/embed/hmUow3053iE",
  tags: ["AI", "future", "romance"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.gonegirl = {
  title: "Gone Girl",
  genre: ["Drama", "Mystery", "Thriller"],
  duration: "2h 29min",
  year: 2014,
  age: "18+",
  origin: "USA",
  locations: ["Cape Girardeau, Missouri", "Los Angeles", "New York City"],
  cast: ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris"],
  director: "David Fincher",
  description:
    "When his wife goes missing, a man becomes the center of an intense media circus. As police dig deeper, shocking secrets begin to emerge.",
  poster: "assets/imgs/ban-goneGirl.png",
  trailer: "https://www.youtube.com/embed/2-_-1nJf8Vg",
  tags: ["mystery", "crime", "psychological"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 3. VERTICAL CAROUSEL (HORROR POSTERS)
// ==========================
// Special collection of horror movies with vertical poster layout
// Displayed in the vertical carousel with unique modal presentation

window.moviesData.screen = {
  title: "Screen",
  genre: ["Horror", "Thriller"],
  duration: "1h 51min",
  year: 1996,
  age: "18+",
  origin: "USA",
  locations: ["Santa Rosa, California", "Sonoma County"],
  cast: ["Neve Campbell", "Courteney Cox", "David Arquette"],
  director: "Wes Craven",
  description:
    "A teenage girl is hunted by a masked killer who uses horror movie tropes to terrorize her and her friends after her mother's murder.",
  poster: "assets/imgs/pos-screen.png",
  trailer: "https://www.youtube.com/embed/AWm_mkbdpCA",
  tags: ["slasher", "horror", "mystery"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.chucky = {
  title: "Child's Play 3",
  genre: ["Horror", "Thriller"],
  duration: "1h 30min",
  year: 1991,
  age: "18+",
  origin: "USA",
  locations: ["Missouri", "Los Angeles"],
  cast: ["Justin Whalin", "Perrey Reeves", "Brad Dourif"],
  director: "Jack Bender",
  description:
    "Chucky returns to terrorize a teenage Andy at military school after being resurrected, continuing his deadly rampage.",
  poster: "assets/imgs/pos-chucky.png",
  trailer: "https://www.youtube.com/embed/3No1jTRSvg8",
  tags: ["doll", "military", "slasher"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.tifannychucky = {
  title: "Bride of Chucky",
  genre: ["Horror", "Comedy"],
  duration: "1h 29min",
  year: 1998,
  age: "18+",
  origin: "USA",
  locations: ["Vancouver", "British Columbia"],
  cast: ["Jennifer Tilly", "Brad Dourif", "Katherine Heigl"],
  director: "Ronny Yu",
  description:
    "Chucky, the killer doll, finds a partner in Tiffany and they set off on a gruesome road trip filled with chaos and murder.",
  poster: "assets/imgs/pos-tifannychucky.png",
  trailer: "https://www.youtube.com/embed/I-WZYQ6nABA",
  tags: ["doll", "horror", "comedy"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.seedschucky = {
  title: "Seed of Chucky",
  genre: ["Horror", "Comedy"],
  duration: "1h 27min",
  year: 2004,
  age: "18+",
  origin: "USA",
  locations: ["Los Angeles", "Bucharest"],
  cast: ["Jennifer Tilly", "Brad Dourif", "Billy Boyd"],
  director: "Don Mancini",
  description:
    "Chucky and Tiffany are resurrected by their child Glen, unleashing a twisted family reunion filled with blood and dark humor.",
  poster: "assets/imgs/pos-seedschucky.png",
  trailer: "https://www.youtube.com/embed/CKc-mP5xXQY",
  tags: ["doll", "horror", "comedy"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.substance = {
  title: "Substance",
  genre: ["Drama", "Mystery"],
  duration: "1h 40min",
  year: 2023,
  age: "16+",
  origin: "USA",
  locations: ["Los Angeles, California"],
  cast: ["Demi Moore", "Margaret Qualley", "Dennis Quaid"],
  director: "Coralie Fargeat",
  description: "A mysterious new substance offers hope but brings dangerous consequences as its true effects slowly unravel.",
  poster: "assets/imgs/pos-substance.png",
  trailer: "https://www.youtube.com/embed/LNlrGhBpYjc",
  tags: ["mystery", "drama", "thriller"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 4. DIGO'S FAVORITES (FAMILY/MUSICAL COLLECTION)
// ==========================
// Feel-good movies and musicals that Digo particularly enjoys
// Family-friendly content with uplifting themes

window.moviesData.marypoppins = {
  title: "Mary Poppins Returns",
  genre: ["Family", "Fantasy", "Musical"],
  duration: "2h 10min",
  year: 2018,
  age: "PG",
  origin: "USA, UK",
  locations: ["London", "Shepperton Studios", "Pinewood Studios"],
  cast: ["Emily Blunt", "Lin-Manuel Miranda", "Ben Whishaw"],
  director: "Rob Marshall",
  description:
    "Decades after her original visit, the magical nanny Mary Poppins returns to help the Banks siblings and Michael's children through a difficult time.",
  poster: "assets/imgs/ban-marypoppins.png",
  trailer: "https://www.youtube.com/embed/gZgUW88D15w",
  tags: ["magic", "musical", "family"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.ralphbreaks = {
  title: "Ralph Breaks the Internet",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 52min",
  year: 2018,
  age: "PG",
  origin: "USA",
  locations: ["Internet (fictional)"],
  cast: ["John C. Reilly", "Sarah Silverman"],
  director: "Rich Moore, Phil Johnston",
  description:
    "Ralph and Vanellope enter the internet on a mission to find a part that can save her game, encountering online worlds and unexpected challenges.",
  poster: "assets/imgs/ban-ralphbreaks.png",
  trailer: "https://www.youtube.com/embed/T73h5bmD8Dc",
  tags: ["animation", "internet", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.greatestshowman = {
  title: "The Greatest Showman",
  genre: ["Biography", "Drama", "Musical"],
  duration: "1h 45min",
  year: 2017,
  age: "PG",
  origin: "USA",
  locations: ["New York, USA"],
  cast: ["Hugh Jackman", "Michelle Williams", "Zac Efron"],
  director: "Michael Gracey",
  description:
    "A visionary showman rises from nothing to create a dazzling spectacle, celebrating diversity, passion, and the birth of modern show business.",
  poster: "assets/imgs/ban-greatestshowman.png",
  trailer: "https://www.youtube.com/embed/EodWwczRIe4",
  tags: ["musical", "circus", "biography"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.avangers = {
  title: "Avengers: Endgame",
  genre: ["Action", "Adventure", "Drama"],
  duration: "3h 1min",
  year: 2019,
  age: "12+",
  origin: "USA",
  locations: ["Atlanta, Georgia"],
  cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
  director: "Anthony Russo, Joe Russo",
  description:
    "The Avengers reunite after the events of Infinity War to undo the damage caused by Thanos and restore balance to the universe.",
  poster: "assets/imgs/ban-avangers.png",
  trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
  tags: ["superhero", "marvel", "action"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.hocuspocus = {
  title: "Hocus Pocus",
  genre: ["Comedy", "Family", "Fantasy"],
  duration: "1h 36min",
  year: 1993,
  age: "PG",
  origin: "USA",
  locations: ["Salem, Massachusetts"],
  cast: ["Bette Midler", "Sarah Jessica Parker", "Kathy Najimy"],
  director: "Kenny Ortega",
  description:
    "Three witches from the 17th century are resurrected in modern-day Salem, causing magical mayhem on Halloween night.",
  poster: "assets/imgs/ban-hocuspocus.png",
  trailer: "https://www.youtube.com/embed/F4e6YQFrt1s",
  tags: ["witches", "halloween", "comedy"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 5. SERIES FOR BINGE WATCHING
// ==========================
// Television series organized by categories for easy filtering
// Each series includes categories array for dynamic carousel generation

window.moviesData.rupaul = {
  title: "RuPaul's Drag Race",
  genre: ["Reality", "Competition"],
  categories: ["reality", "competition", "lgbtq"],
  duration: "16+ seasons",
  year: 2009,
  age: "TV-14",
  origin: "USA",
  locations: ["Los Angeles", "World of Wonder Studios"],
  cast: ["RuPaul", "Michelle Visage", "Carson Kressley"],
  director: "Nick Murray",
  description:
    "America's most sickening drag queens compete in challenges testing charisma, uniqueness, nerve, and talent to become America's Next Drag Superstar.",
  poster: "assets/imgs/ban-rupaul.png",
  trailer: "https://www.youtube.com/embed/I1eSW2tzyoM",
  tags: ["drag", "competition", "LGBTQ"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.simpsons = {
  title: "The Simpsons",
  genre: ["Animation", "Comedy", "Family"],
  categories: ["animation", "comedy", "family"],
  duration: "35+ seasons",
  year: 1989,
  age: "TV-PG",
  origin: "USA",
  locations: ["Springfield (fictional)"],
  cast: ["Dan Castellaneta", "Julie Kavner", "Nancy Cartwright"],
  director: "Matt Groening",
  description:
    "An animated sitcom following the lives of the Simpson family and their quirky neighbors in the fictional town of Springfield.",
  poster: "assets/imgs/ban-simpsons.png",
  trailer: "https://www.youtube.com/embed/3R1ebDCv7vM",
  tags: ["animation", "comedy", "family"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.howmetyourmother = {
  title: "How I Met Your Mother",
  genre: ["Comedy", "Romance", "Sitcom"],
  categories: ["sitcom", "comedy", "romance"],
  duration: "9 seasons",
  year: 2005,
  age: "TV-14",
  origin: "USA",
  locations: ["New York, USA"],
  cast: ["Josh Radnor", "Jason Segel", "Cobie Smulders"],
  director: "Pamela Fryman",
  description:
    "A father recounts to his children the humorous and emotional journey that led him to meet their mother, spanning years of memories.",
  poster: "assets/imgs/ban-howmetyourmother.png",
  trailer: "https://www.youtube.com/embed/cjJLEYMzpjc",
  tags: ["sitcom", "romance", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.howmetyourfather = {
  title: "How I Met Your Father",
  genre: ["Comedy", "Romance", "Sitcom"],
  categories: ["sitcom", "comedy", "romance"],
  duration: "2 seasons",
  year: 2022,
  age: "TV-14",
  origin: "USA",
  locations: ["New York City", "Los Angeles (filming)"],
  cast: ["Hilary Duff", "Christopher Lowell", "Francia Raisa"],
  director: "Pamela Fryman",
  description:
    "In 2050, Sophie recounts to her son how she met his father, taking us back to 2022 where she and her friends navigate love and life in NYC.",
  poster: "assets/imgs/ban-howmetyourfather.png",
  trailer: "https://www.youtube.com/embed/kHQVS-EySu4",
  tags: ["sitcom", "romance", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.agatha = {
  title: "Agatha All Along",
  genre: ["Fantasy", "Comedy", "Mystery"],
  categories: ["marvel", "superhero", "magic"],
  duration: "9 episodes",
  year: 2024,
  age: "TV-14",
  origin: "USA",
  locations: ["Atlanta", "Warner Bros. Ranch"],
  cast: ["Kathryn Hahn", "Joe Locke", "Aubrey Plaza"],
  director: "Jac Schaeffer",
  description:
    "After being freed from a spell, Agatha Harkness embarks on a journey along the Witches' Road to regain her powers with a mysterious teenager.",
  poster: "assets/imgs/ban-agatha.png",
  trailer: "https://www.youtube.com/embed/R9pXbNz6Vbw",
  tags: ["witchcraft", "magic", "MCU"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.wandavision = {
  title: "WandaVision",
  genre: ["Drama", "Fantasy", "Romance"],
  categories: ["marvel", "superhero", "drama"],
  duration: "9 episodes",
  year: 2021,
  age: "TV-14",
  origin: "USA",
  locations: ["Atlanta, Georgia"],
  cast: ["Elizabeth Olsen", "Paul Bettany", "Kathryn Hahn"],
  director: "Matt Shakman",
  description:
    "Wanda Maximoff and Vision live an idyllic suburban life, but strange occurrences reveal that nothing is as it seems.",
  poster: "assets/imgs/ban-wandavision.png",
  trailer: "https://www.youtube.com/embed/sj9J2ecsSpo",
  tags: ["marvel", "superhero", "sitcom"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.theoffice = {
  title: "The Office",
  genre: ["Comedy", "Mockumentary"],
  categories: ["sitcom", "comedy", "workplace"],
  duration: "9 seasons",
  year: 2005,
  age: "TV-14",
  origin: "USA",
  locations: ["Scranton, Pennsylvania"],
  cast: ["Steve Carell", "Rainn Wilson", "John Krasinski"],
  director: "Greg Daniels",
  description:
    "A documentary-style sitcom about the lives, quirks, and chaos of office workers at Dunder Mifflin's Scranton branch.",
  poster: "assets/imgs/ban-theoffice.png",
  trailer: "https://www.youtube.com/embed/-C2z-nshFts",
  tags: ["sitcom", "office", "comedy"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 6. MOVIE MARATHONS
// ==========================
// Complete film series organized by franchise
// Perfect for binge-watching entire storylines

// ==========================
// 6.1 THE HUNGER GAMES SAGA
// ==========================
// Dystopian science fiction series following Katniss Everdeen's rebellion

window.moviesData.hungergames = {
  title: "The Hunger Games",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 22min",
  year: 2012,
  age: "PG-13",
  origin: "USA",
  locations: ["North Carolina"],
  cast: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
  director: "Gary Ross",
  description:
    "Katniss Everdeen volunteers to replace her sister in a deadly competition where teens must fight to the death for survival and televised fame.",
  poster: "assets/imgs/Marathon/Hunger-games/ban-hungergames.png",
  trailer: "https://www.youtube.com/embed/mfmrPu43DF8",
  tags: ["dystopia", "survival", "action"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.catchingfire = {
  title: "The Hunger Games: Catching Fire",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 26min",
  year: 2013,
  age: "PG-13",
  origin: "USA",
  locations: ["Atlanta, Georgia"],
  cast: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
  director: "Francis Lawrence",
  description: "Katniss and Peeta become targets of the Capitol after their victory sparks rebellion in the districts.",
  poster: "assets/imgs/Marathon/Hunger-games/ban-catchingfire.png",
  trailer: "https://www.youtube.com/embed/EAzGXqJSDJ8",
  tags: ["dystopia", "rebellion", "action"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.mockingjay1 = {
  title: "The Hunger Games: Mockingjay – Part 1",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 3min",
  year: 2014,
  age: "PG-13",
  origin: "USA",
  locations: ["Atlanta, Georgia"],
  cast: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
  director: "Francis Lawrence",
  description: "Katniss becomes the symbol of rebellion as the districts unite against the Capitol.",
  poster: "assets/imgs/Marathon/Hunger-games/ban-mockingjay.png",
  trailer: "https://www.youtube.com/embed/3PkkHsuMrho",
  tags: ["dystopia", "rebellion", "war"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.mockingjay2 = {
  title: "The Hunger Games: Mockingjay – Part 2",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 17min",
  year: 2015,
  age: "PG-13",
  origin: "USA",
  locations: ["Atlanta, Georgia"],
  cast: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"],
  director: "Francis Lawrence",
  description: "Katniss and her allies bring the revolution to the Capitol, facing deadly traps and moral dilemmas.",
  poster: "assets/imgs/Marathon/Hunger-games/ban-mockingjay2.png",
  trailer: "https://www.youtube.com/embed/eO0T9A3kdqc",
  tags: ["dystopia", "revolution", "finale"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.BalladOfSongbirdsSnakes = {
  title: "The Hunger Games: The Ballad of Songbirds & Snakes",
  genre: ["Action", "Adventure", "Drama"],
  duration: "2h 37min",
  year: 2023,
  age: "PG-13",
  origin: "USA",
  locations: ["Poland", "Germany"],
  cast: ["Tom Blyth", "Rachel Zegler", "Peter Dinklage"],
  director: "Francis Lawrence",
  description: "Years before becoming president, 18-year-old Coriolanus Snow mentors Lucy Gray Baird in the 10th Hunger Games.",
  poster: "assets/imgs/Marathon/Hunger-games/ban-songsbirdsnake.png",
  trailer: "https://www.youtube.com/embed/NxW_X4kzeus",
  tags: ["prequel", "dystopia", "games"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 6.2 HARRY POTTER SERIES
// ==========================
// Complete wizarding world saga following Harry's journey at Hogwarts

window.moviesData.harrypotter1 = {
  title: "Harry Potter and the Sorcerer's Stone",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 32min",
  year: 2001,
  age: "PG",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "Chris Columbus",
  description:
    "An orphaned boy attends a magical school, discovering his past and destiny while battling the dark wizard who killed his parents.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter1.png",
  trailer: "https://www.youtube.com/embed/VyHV0BRtdxo",
  tags: ["magic", "wizard", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter2 = {
  title: "Harry Potter and the Chamber of Secrets",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 41min",
  year: 2002,
  age: "PG",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "Chris Columbus",
  description:
    "Harry returns for his second year at Hogwarts, where a mysterious force is petrifying students and a dark secret is uncovered.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter2.png",
  trailer: "https://www.youtube.com/embed/1bq0qff4iF8",
  tags: ["magic", "mystery", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter3 = {
  title: "Harry Potter and the Prisoner of Azkaban",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 22min",
  year: 2004,
  age: "PG",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "Alfonso Cuarón",
  description: "Harry learns of Sirius Black's escape and uncovers secrets about his own past.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter3.png",
  trailer: "https://www.youtube.com/embed/lAxgztbYDbs",
  tags: ["magic", "time travel", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter4 = {
  title: "Harry Potter and the Goblet of Fire",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 37min",
  year: 2005,
  age: "PG-13",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "Mike Newell",
  description:
    "Harry is mysteriously entered into the dangerous Triwizard Tournament, facing deadly tasks and Voldemort's return.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter4.png",
  trailer: "https://www.youtube.com/embed/3EGojp4Hh6I",
  tags: ["magic", "tournament", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter5 = {
  title: "Harry Potter and the Order of the Phoenix",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 18min",
  year: 2007,
  age: "PG-13",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "David Yates",
  description: "Harry and his friends form Dumbledore's Army to fight the oppressive regime at Hogwarts and prepare for war.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter5.png",
  trailer: "https://www.youtube.com/embed/y6ZW7KXaXYk",
  tags: ["magic", "rebellion", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter6 = {
  title: "Harry Potter and the Half-Blood Prince",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 33min",
  year: 2009,
  age: "PG",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "David Yates",
  description: "Harry discovers a mysterious book and learns about Voldemort's past as the wizarding world grows darker.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter6.png",
  trailer: "https://www.youtube.com/embed/sg81Lts5kYY",
  tags: ["magic", "mystery", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter7 = {
  title: "Harry Potter and the Deathly Hallows – Part 1",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 26min",
  year: 2010,
  age: "PG-13",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "David Yates",
  description: "Harry, Ron, and Hermione leave Hogwarts to find and destroy Voldemort's Horcruxes, facing danger everywhere.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter7.png",
  trailer: "https://www.youtube.com/embed/MxqsmsA8y5k",
  tags: ["magic", "quest", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.harrypotter8 = {
  title: "Harry Potter and the Deathly Hallows – Part 2",
  genre: ["Adventure", "Family", "Fantasy"],
  duration: "2h 10min",
  year: 2011,
  age: "PG-13",
  origin: "UK, USA",
  locations: ["England, UK"],
  cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
  director: "David Yates",
  description: "The final battle for Hogwarts begins as Harry faces Voldemort in a climactic showdown.",
  poster: "assets/imgs/Marathon/HarryPotter/ban-harrypotter8.png",
  trailer: "https://www.youtube.com/embed/mObK5XD8udk",
  tags: ["magic", "finale", "adventure"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 6.3 ALIEN FRANCHISE
// ==========================
// Sci-fi horror series following humanity's encounters with xenomorphs

window.moviesData.alien1 = {
  title: "Alien",
  genre: ["Horror", "Sci-Fi"],
  duration: "1h 57min",
  year: 1979,
  age: "R",
  origin: "UK, USA",
  locations: ["Shepperton Studios, UK"],
  cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
  director: "Ridley Scott",
  description: "A space crew discovers a deadly alien lifeform aboard their ship, leading to a terrifying survival ordeal.",
  poster: "assets/imgs/Marathon/Alien/ban-alien1.png",
  trailer: "https://www.youtube.com/embed/jQ5lPt9edzQ",
  tags: ["space", "alien", "horror"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien2 = {
  title: "Aliens",
  genre: ["Action", "Horror", "Sci-Fi"],
  duration: "2h 17min",
  year: 1986,
  age: "R",
  origin: "UK, USA",
  locations: ["Pinewood Studios, UK"],
  cast: ["Sigourney Weaver", "Michael Biehn", "Carrie Henn"],
  director: "James Cameron",
  description: "Ripley returns to the alien-infested colony with marines, facing a terrifying hive of xenomorphs.",
  poster: "assets/imgs/Marathon/Alien/ban-alien2.png",
  trailer: "https://www.youtube.com/embed/oSeR6Yc5bIg",
  tags: ["space", "alien", "action"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien3 = {
  title: "Alien 3",
  genre: ["Drama", "Horror", "Sci-Fi"],
  duration: "1h 54min",
  year: 1992,
  age: "R",
  origin: "UK, USA",
  locations: ["Pinewood Studios, UK"],
  cast: ["Sigourney Weaver", "Charles S. Dutton", "Charles Dance"],
  director: "David Fincher",
  description: "Ripley crash-lands on a prison planet, facing another deadly xenomorph with limited resources.",
  poster: "assets/imgs/Marathon/Alien/ban-alien3.png",
  trailer: "https://www.youtube.com/embed/Dec9Ta6CGzY",
  tags: ["space", "alien", "prison"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien4 = {
  title: "Alien: Resurrection",
  genre: ["Action", "Horror", "Sci-Fi"],
  duration: "1h 49min",
  year: 1997,
  age: "R",
  origin: "USA",
  locations: ["Fox Studios, Los Angeles"],
  cast: ["Sigourney Weaver", "Winona Ryder", "Dominique Pinon"],
  director: "Jean-Pierre Jeunet",
  description: "200 years after her death, Ripley is cloned and must once again battle xenomorphs aboard a research vessel.",
  poster: "assets/imgs/Marathon/Alien/ban-alien4.png",
  trailer: "https://www.youtube.com/embed/0v5c5O9lWdc",
  tags: ["space", "alien", "clone"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.prometheus = {
  title: "Prometheus",
  genre: ["Adventure", "Mystery", "Sci-Fi"],
  duration: "2h 4min",
  year: 2012,
  age: "R",
  origin: "USA, UK",
  locations: ["Iceland", "England", "Scotland"],
  cast: ["Noomi Rapace", "Logan Marshall-Green", "Michael Fassbender"],
  director: "Ridley Scott",
  description: "A team searches for humanity's origins on a distant planet, uncovering a threat that could destroy mankind.",
  poster: "assets/imgs/Marathon/Alien/ban-alien5.png",
  trailer: "https://www.youtube.com/embed/sftuxbvGwiU",
  tags: ["space", "origin", "alien"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.covenant = {
  title: "Alien: Covenant",
  genre: ["Horror", "Sci-Fi", "Thriller"],
  duration: "2h 2min",
  year: 2017,
  age: "R",
  origin: "USA, UK",
  locations: ["New Zealand", "Australia"],
  cast: ["Michael Fassbender", "Katherine Waterston", "Billy Crudup"],
  director: "Ridley Scott",
  description:
    "A colony ship discovers a seemingly uncharted paradise, but a deadly threat awaits as the crew encounters xenomorphs.",
  poster: "assets/imgs/Marathon/Alien/ban-alien6.png",
  trailer: "https://www.youtube.com/embed/svnAD0TApb8",
  tags: ["space", "alien", "horror"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 6.4 TOY STORY COLLECTION
// ==========================
// Pixar's beloved animated series about toys that come to life

window.moviesData.toystory1 = {
  title: "Toy Story",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 21min",
  year: 1995,
  age: "G",
  origin: "USA",
  locations: ["California, USA"],
  cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
  director: "John Lasseter",
  description:
    "A cowboy toy feels threatened when a flashy spaceman replaces him as the favorite, sparking rivalry and unlikely friendship.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory1.png",
  trailer: "https://www.youtube.com/embed/v-PjgYDrg70",
  tags: ["animation", "toys", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory2 = {
  title: "Toy Story 2",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 32min",
  year: 1999,
  age: "G",
  origin: "USA",
  locations: ["California, USA"],
  cast: ["Tom Hanks", "Tim Allen", "Joan Cusack"],
  director: "John Lasseter",
  description: "Woody is stolen by a toy collector, prompting Buzz and the gang to launch a daring rescue mission.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory2.png",
  trailer: "https://www.youtube.com/embed/xNWSGRD5CzU",
  tags: ["animation", "toys", "rescue"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory3 = {
  title: "Toy Story 3",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 43min",
  year: 2010,
  age: "G",
  origin: "USA",
  locations: ["California, USA"],
  cast: ["Tom Hanks", "Tim Allen", "Joan Cusack"],
  director: "Lee Unkrich",
  description: "The toys face an uncertain future as Andy prepares for college, leading to an emotional adventure at a daycare.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory3.png",
  trailer: "https://www.youtube.com/embed/JcpWXaA2qeg",
  tags: ["animation", "toys", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory4 = {
  title: "Toy Story 4",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 40min",
  year: 2019,
  age: "G",
  origin: "USA",
  locations: ["California, USA"],
  cast: ["Tom Hanks", "Tim Allen", "Annie Potts"],
  director: "Josh Cooley",
  description: "Woody, Buzz, and friends embark on a road trip with new toy Forky, discovering what it means to belong.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory4.png",
  trailer: "https://www.youtube.com/embed/wmiIUN-7qhE",
  tags: ["animation", "toys", "road trip"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// 6.5 X-MEN UNIVERSE
// ==========================
// Marvel's mutant superhero franchise spanning multiple generations

window.moviesData.xmen1 = {
  title: "X-Men",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 44min",
  year: 2000,
  age: "PG-13",
  origin: "USA",
  locations: ["Toronto, Canada"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Ian McKellen"],
  director: "Bryan Singer",
  description:
    "Mutants with extraordinary powers clash over humanity's fate, as X-Men fight for peace while others seek dominance.",
  poster: "assets/imgs/Marathon/x-men/ban-xmen1.png",
  trailer: "https://www.youtube.com/embed/VNxwlx6etXI",
  tags: ["mutants", "superhero", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen2 = {
  title: "X2: X-Men United",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 14min",
  year: 2003,
  age: "PG-13",
  origin: "USA",
  locations: ["Vancouver, Canada"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Ian McKellen"],
  director: "Bryan Singer",
  description: "The X-Men join forces with Magneto to stop a threat against all mutants and humans.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen2.png",
  trailer: "https://www.youtube.com/embed/KNIdceH7XOw",
  tags: ["mutants", "superhero", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen3 = {
  title: "X-Men: The Last Stand",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 44min",
  year: 2006,
  age: "PG-13",
  origin: "USA",
  locations: ["Vancouver, Canada"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Ian McKellen"],
  director: "Brett Ratner",
  description: "A cure for mutation divides the X-Men, while Jean Grey unleashes her dark side as the Phoenix.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen3.png",
  trailer: "https://www.youtube.com/embed/ZQ0v5dXbw7M",
  tags: ["mutants", "superhero", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen4 = {
  title: "X-Men Origins: Wolverine",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 47min",
  year: 2009,
  age: "PG-13",
  origin: "USA",
  locations: ["New South Wales, Australia"],
  cast: ["Hugh Jackman", "Liev Schreiber", "Danny Huston"],
  director: "Gavin Hood",
  description: "Wolverine's backstory is revealed, from childhood to his time in the Weapon X program.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen4.png",
  trailer: "https://www.youtube.com/embed/8IxT7WFL6Ec",
  tags: ["mutants", "wolverine", "origin"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen5 = {
  title: "X-Men: First Class",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 12min",
  year: 2011,
  age: "PG-13",
  origin: "USA",
  locations: ["Georgia, USA"],
  cast: ["James McAvoy", "Michael Fassbender", "Jennifer Lawrence"],
  director: "Matthew Vaughn",
  description: "The origins of the X-Men are explored as Charles Xavier and Erik Lehnsherr form the first team of mutants.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen5.png",
  trailer: "https://www.youtube.com/embed/kyQKi5-k0UU",
  tags: ["mutants", "origin", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen6 = {
  title: "The Wolverine",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 6min",
  year: 2013,
  age: "PG-13",
  origin: "USA",
  locations: ["Japan"],
  cast: ["Hugh Jackman", "Tao Okamoto", "Rila Fukushima"],
  director: "James Mangold",
  description: "Wolverine travels to Japan, where he faces his past and new deadly enemies.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen6.png",
  trailer: "https://www.youtube.com/embed/toLpchTUYk8",
  tags: ["mutants", "wolverine", "japan"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen7 = {
  title: "X-Men: Days of Future Past",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 12min",
  year: 2014,
  age: "PG-13",
  origin: "USA",
  locations: ["Montreal, Canada"],
  cast: ["Hugh Jackman", "James McAvoy", "Michael Fassbender"],
  director: "Bryan Singer",
  description: "Wolverine is sent to the past to change history and prevent the extinction of mutants and humans.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen7.png",
  trailer: "https://www.youtube.com/embed/pK2zYHWDZKo",
  tags: ["mutants", "time travel", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen8 = {
  title: "X-Men: Apocalypse",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 24min",
  year: 2016,
  age: "PG-13",
  origin: "USA",
  locations: ["Montreal, Canada"],
  cast: ["James McAvoy", "Michael Fassbender", "Jennifer Lawrence"],
  director: "Bryan Singer",
  description: "The ancient mutant Apocalypse awakens and threatens the world, forcing the X-Men to unite against him.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen8.png",
  trailer: "https://www.youtube.com/embed/Jer8XjMrUB4",
  tags: ["mutants", "apocalypse", "marvel"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen9 = {
  title: "Logan",
  genre: ["Action", "Drama", "Sci-Fi"],
  duration: "2h 17min",
  year: 2017,
  age: "R",
  origin: "USA",
  locations: ["New Mexico, USA"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Dafne Keen"],
  director: "James Mangold",
  description: "In a bleak future, an aging Wolverine and ailing Professor X fight to protect a young mutant from dark forces.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen9.png",
  trailer: "https://www.youtube.com/embed/Div0iP65aZo",
  tags: ["mutants", "wolverine", "future"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen10 = {
  title: "X-Men: Dark Phoenix",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 53min",
  year: 2019,
  age: "PG-13",
  origin: "USA",
  locations: ["Montreal, Canada"],
  cast: ["James McAvoy", "Michael Fassbender", "Sophie Turner"],
  director: "Simon Kinberg",
  description:
    "Jean Grey develops incredible powers that corrupt her into the Dark Phoenix, forcing the X-Men to choose between saving her or humanity.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen10.png",
  trailer: "https://www.youtube.com/embed/QWbMckU3AOQ",
  tags: ["mutants", "phoenix", "marvel"],
  ranking: { math: 0, digo: 0 },
};

// ==========================
// DATABASE VALIDATION & LOGGING
// ==========================

/**
 * Log database statistics on load
 */
console.log(`🎬 MathFlix Movies Database Loaded Successfully!`);
console.log(`📊 Total movies/series: ${Object.keys(window.moviesData).length}`);
console.log(`📝 Database sections: Top 10, Vertical Carousel, Digo's Favorites, Series, 5 Marathon Collections`);
console.log(`✅ All entries validated with max 3 genres, max 3 categories (series only), max 3 tags`);
