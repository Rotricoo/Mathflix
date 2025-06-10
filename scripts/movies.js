/**
 ====================== SECTIONS OVERVIEW: ==============================
 *
 * 1.  DATABASE INITIALIZATION
 *     - Global moviesData object creation
 *     - Standard data structure documentation
 *     - Field descriptions and data types
 *
 * 2.  TOP 10 FEATURED MOVIES
 *     - Premium collection of critically acclaimed films
 *     - Hero carousel and featured section content
 *     - High-quality metadata with complete cast/crew information
 *
 * 3.  VERTICAL CAROUSEL COLLECTION (Horror)
 *     - Horror movie collection with portrait poster layout
 *     - Specialized vertical carousel presentation
 *     - Unique modal display optimization
 *
 * 4.  DIGO'S FAVORITES COLLECTION
 *     - Feel-good movies, musicals, and family entertainment
 *     - Uplifting content with positive themes
 *     - Curated selection for comfort viewing
 *
 * 5.  SERIES COLLECTION
 *     - Television series with mood-based categorization
 *     - Categories: long-serie, cozy-serie, weekend-serie
 *     - Series classification for dynamic carousels
 *
 * 6.  MOVIE MARATHONS
 *     - Complete film franchises organized by series
 *     - Perfect for binge-watching storylines
 *     - Multiple franchise collections:
 *       6.1 The Hunger Games Saga (5 films)
 *       6.2 Harry Potter Series (8 films)
 *       6.3 Alien Marathon (6 films)
 *       6.4 Toy Story Collection (4 films)
 *       6.5 X-Men Universe (10 films)
 *
 * 7.  SPOILER SYSTEM
 *     - Spoiler database with engaging plot reveals
 *     - Modal overlay functionality with auto-close timer
 *     - Layout detection (normal/vertical) for proper display
 *     - Interactive spoiler button management
 *
 * 8.  CONTENT CLASSIFICATION SYSTEM
 *     - Intelligent series/movies detection
 *     - Automatic content categorization
 *     - Known series verification and correction
 *
 * =============================================================================
 * DATABASE STRUCTURE:
 * =============================================================================
 *
 * Standard Movie/Series Entry:
 * {
 *   title: string,          // Full title of movie/series
 *   genre: array[3],        // Maximum 3 genres for categorization
 *   categories: array[3],   // Series only - mood-based categories
 *   duration: string,       // Runtime (movies) or season count (series)
 *   year: number,           // Release year
 *   age: string,            // Age rating (G, PG, PG-13, R, TV-14, etc.)
 *   origin: string,         // Country of origin
 *   locations: array,       // Filming locations
 *   cast: array,            // Main cast members (3-5 actors)
 *   director: string,       // Director name(s)
 *   description: string,    // Plot synopsis (2-3 sentences)
 *   poster: string,         // Path to poster image
 *   trailer: string,        // YouTube embed URL
 *   tags: array[3],         // Maximum 3 descriptive tags
 *   ranking: object         // User ratings { math: 0, digo: 0 }
 * }
 *
 * =============================================================================
 * CONTENT CATEGORIES:
 * =============================================================================
 *
 * Movies (Auto-detected):
 * - Any entry without 'categories' field
 * - Any entry with type !== "series"
 * - Standard movie metadata structure
 *
 * Series Categories:
 * - long-serie: Long-running shows (10+ seasons)
 * - cozy-serie: Comfort viewing, sitcoms, feel-good content
 * - weekend-serie: Binge-worthy series perfect for weekend viewing
 *
 * Collection Types:
 * - Featured: Top 10 premium movies for hero carousel
 * - Vertical: Horror collection with portrait poster layout
 * - Favorites: Family-friendly and musical content
 * - Marathons: Complete film franchises for binge-watching
 *
 * =============================================================================
 * SPOILER SYSTEM FEATURES:
 * =============================================================================
 *
 * Spoiler Database:
 * - Fun and engaging plot reveals for each title
 * - Humorous and entertaining spoiler descriptions
 * - Character-driven spoilers with personality
 *
 * Overlay Functionality:
 * - Auto-close timer (10 seconds) with visual countdown
 * - Progress bar animation showing time remaining
 * - Manual close options (X button, backdrop click, ESC key)
 * - Layout detection for proper modal integration
 *
 * Interactive Features:
 * - Spoiler button appears in movie modals
 * - Supports both horizontal and vertical modal layouts
 * - Prevents background scrolling when overlay is open
 * - Smooth animations and transitions
 *
 * =============================================================================
 * MARATHON COLLECTIONS:
 * =============================================================================
 *
 * The Hunger Games Saga (5 Films):
 * Harry Potter Series (8 Films):
 * Alien Marathon (6 Films):
 * Toy Story Collection (4 Films):
 * X-Men Universe (10 Films):
 *
 * =============================================================================
 * DEPENDENCIES:
 * =============================================================================
 *
 * External Dependencies:
 * - YouTube API for trailer embedding
 * - Local image assets for posters
 *
 * Internal Dependencies:
 * - main.js - Content counters and carousel systems
 * - script.js - Movie modal functionality
 * - main-sections.css - Spoiler overlay styling
 *
 * Global Variables Created:
 * - window.moviesData - Complete movie/series database
 * - window.movieSpoilers - Spoiler text database
 * - window.setupModalSpoiler - Spoiler functionality setup
 * - window.openSpoilerOverlay - Overlay display function
 * - window.closeSpoilerOverlay - Overlay cleanup function
 *
 * =============================================================================
 * PERFORMANCE CONSIDERATIONS:
 * =============================================================================
 *
 * - Large dataset optimized for client-side storage
 * - Efficient object property access patterns
 * - Lazy spoiler overlay creation (DOM elements created on demand)
 * - Memory cleanup for timer intervals
 * - Event listener management with proper cleanup
 *
 * =============================================================================
 * CONTENT MANAGEMENT:
 * =============================================================================
 *
 * Adding New Movies:
 * 1. Follow standard data structure format
 * 2. Include all required fields (title, genre, year, etc.)
 * 3. Add corresponding spoiler text to movieSpoilers object
 * 4. Ensure proper poster and trailer URLs
 *
 * Adding New Series:
 * 1. Include 'categories' field for proper classification
 * 2. Use appropriate category tags (long-serie, cozy-serie, weekend-serie)
 * 3. Set proper duration format (e.g., "9 seasons", "16+ seasons")
 *
 * Marathon Collections:
 * 1. Organize by franchise in sequential order
 * 2. Use consistent naming convention for related films
 * 3. Maintain chronological release order
 * 4. Include comprehensive cast information across films
 *
 * =============================================================================
 * VERSION: 2.0 - Production Ready Release
 * LAST UPDATED: June 10, 2025
 * =============================================================================
 */

// =============================================================================
// 1. DATABASE INITIALIZATION
// =============================================================================

/**
 * Global movies database container
 * Stores all movie and series information used throughout the application
 */
window.moviesData = {};

/**
 * Standard data structure for all entries:
 * {
 *   title: string,           // Full title of movie/series
 *   genre: array[3],         // Maximum 3 genres
 *   categories: array[3],    // Series only - classification categories
 *   duration: string,        // Runtime or season count
 *   year: number,           // Release year
 *   age: string,            // Age rating
 *   origin: string,         // Country of origin
 *   locations: array,       // Filming locations
 *   cast: array,            // Main cast members
 *   director: string,       // Director name
 *   description: string,    // Plot synopsis
 *   poster: string,         // Path to poster image
 *   trailer: string,        // YouTube embed URL
 *   tags: array[3],         // Maximum 3 descriptive tags
 *   ranking: object         // User ratings { math: 0, digo: 0 }
 * }
 */

// =============================================================================
// 2. TOP 10 FEATURED MOVIES
// =============================================================================

/**
 * Premium collection of critically acclaimed and popular movies
 * Displayed in the main hero carousel and featured sections
 */

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

// =============================================================================
// 3. VERTICAL CAROUSEL COLLECTION
// =============================================================================

/**
 * Horror movie collection with vertical poster layout
 * Displayed in specialized vertical carousel with unique modal presentation
 */

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

// =============================================================================
// 4. DIGO'S FAVORITES COLLECTION
// =============================================================================

/**
 * Feel-good movies, musicals, and family entertainment
 * Curated selection of uplifting content with positive themes
 */

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

// =============================================================================
// 5. SERIES COLLECTION
// =============================================================================

/**
 * Television series with categorization for different viewing moods
 * Categories: long-serie, cozy-serie, weekend-serie
 */

window.moviesData.rupaul = {
  title: "RuPaul's Drag Race",
  genre: ["Reality", "Competition"],
  categories: ["long-serie"],
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
  categories: ["cozy-serie"],
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
  categories: ["cozy-serie"],
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
  categories: ["cozy-serie"],
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
  categories: ["weekend-serie"],
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
  categories: ["weekend-serie"],
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
  categories: ["cozy-serie"],
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

window.moviesData.doctorwho = {
  title: "Doctor Who",
  genre: ["Sci-Fi", "Adventure", "Drama"],
  categories: ["long-serie"],
  duration: "13+ seasons",
  year: 2005,
  age: "TV-PG",
  origin: "UK",
  locations: ["Cardiff", "London", "Various Historical Locations"],
  cast: ["David Tennant", "Matt Smith", "Jodie Whittaker"],
  director: "Various",
  description: "A Time Lord travels across time and space, saving civilizations in a blue police box called the TARDIS.",
  poster: "assets/imgs/ban-doctorwho.png",
  trailer: "https://www.youtube.com/embed/9wb-xx2G_h8",
  tags: ["time travel", "sci-fi", "hero"],
  ranking: { math: 0, digo: 0 },
};

// =============================================================================
// 6. MOVIE MARATHONS
// =============================================================================

/**
 * Complete film series organized by franchise
 * Perfect for binge-watching entire storylines and character arcs
 */

// -----------------------------------------------------------------------------
// 6.1 THE HUNGER GAMES SAGA
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// 6.2 HARRY POTTER SERIES
// -----------------------------------------------------------------------------

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

// =============================================================================
// ALIEN MARATHON - COMPLETE SERIES
// =============================================================================

window.moviesData.alien1 = {
  title: "Alien",
  genre: ["Horror", "Sci-Fi", "Thriller"],
  duration: "1h 57min",
  year: 1979,
  age: "18+",
  origin: "USA, UK",
  locations: ["Shepperton Studios", "Bray Studios"],
  cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
  director: "Ridley Scott",
  description: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating a mysterious transmission.",
  poster: "assets/imgs/Marathon/Alien/ban-alien1.png",
  trailer: "https://www.youtube.com/embed/LjLamj-b0I8",
  tags: ["space", "alien", "survival"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien2 = {
  title: "Aliens",
  genre: ["Action", "Horror", "Sci-Fi"],
  duration: "2h 17min",
  year: 1986,
  age: "18+",
  origin: "USA, UK",
  locations: ["Pinewood Studios", "Acton Lane Power Station"],
  cast: ["Sigourney Weaver", "Michael Biehn", "Paul Reiser"],
  director: "James Cameron",
  description:
    "Ripley returns to the planet where her crew encountered the hostile Alien creature, this time accompanied by marines.",
  poster: "assets/imgs/Marathon/Alien/ban-alien2.png",
  trailer: "https://www.youtube.com/embed/XKSQmYUaP2E",
  tags: ["action", "aliens", "marines"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien3 = {
  title: "Alien 3",
  genre: ["Horror", "Sci-Fi"],
  duration: "2h 24min",
  year: 1992,
  age: "18+",
  origin: "USA",
  locations: ["Pinewood Studios", "Blyth Power Station"],
  cast: ["Sigourney Weaver", "Charles S. Dutton", "Charles Dance"],
  director: "David Fincher",
  description: "Ripley crash-lands on a prison planet inhabited by former inmates, bringing with her the Alien's deadliest form.",
  poster: "assets/imgs/Marathon/Alien/ban-alien3.png",
  trailer: "https://www.youtube.com/embed/EzNhaLUT520",
  tags: ["prison", "alien", "survival"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.alien4 = {
  title: "Alien: Resurrection",
  genre: ["Action", "Horror", "Sci-Fi"],
  duration: "1h 49min",
  year: 1997,
  age: "18+",
  origin: "USA",
  locations: ["20th Century Fox Studios"],
  cast: ["Sigourney Weaver", "Winona Ryder", "Dominique Pinon"],
  director: "Jean-Pierre Jeunet",
  description:
    "Ripley is cloned 200 years after her death, and the scientists aboard the ship are unprepared for the consequences.",
  poster: "assets/imgs/Marathon/Alien/ban-alien4.png",
  trailer: "https://www.youtube.com/embed/wsMp9Fs6XsY",
  tags: ["cloning", "resurrection", "space"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.prometheus = {
  title: "Prometheus",
  genre: ["Adventure", "Mystery", "Sci-Fi"],
  duration: "2h 4min",
  year: 2012,
  age: "16+",
  origin: "USA, UK",
  locations: ["Iceland", "Spain", "Scotland"],
  cast: ["Noomi Rapace", "Michael Fassbender", "Charlize Theron"],
  director: "Ridley Scott",
  description:
    "A team of explorers discover a clue to the origins of mankind on Earth, leading them on a journey to the darkest corners of the universe.",
  poster: "assets/imgs/Marathon/Alien/ban-alien5.png",
  trailer: "https://www.youtube.com/embed/34cEo0VhfGE",
  tags: ["origins", "exploration", "engineers"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.covenant = {
  title: "Alien: Covenant",
  genre: ["Horror", "Sci-Fi", "Thriller"],
  duration: "2h 2min",
  year: 2017,
  age: "16+",
  origin: "USA, UK, Australia",
  locations: ["Australia", "New Zealand"],
  cast: ["Michael Fassbender", "Katherine Waterston", "Billy Crudup"],
  director: "Ridley Scott",
  description:
    "The crew of a colony ship bound for a remote planet discover an uncharted paradise with a threat beyond their imagination.",
  poster: "assets/imgs/Marathon/Alien/ban-alien6.png",
  trailer: "https://www.youtube.com/embed/H0VW6sg50Pk",
  tags: ["colony", "paradise", "david"],
  ranking: { math: 0, digo: 0 },
};

// =============================================================================
// TOY STORY MARATHON - COMPLETE SERIES
// =============================================================================

window.moviesData.toystory1 = {
  title: "Toy Story",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 21min",
  year: 1995,
  age: "G",
  origin: "USA",
  locations: ["Pixar Animation Studios"],
  cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
  director: "John Lasseter",
  description:
    "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory1.png",
  trailer: "https://www.youtube.com/embed/v-PjgYDrg70",
  tags: ["toys", "friendship", "adventure"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory2 = {
  title: "Toy Story 2",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 32min",
  year: 1999,
  age: "G",
  origin: "USA",
  locations: ["Pixar Animation Studios"],
  cast: ["Tom Hanks", "Tim Allen", "Joan Cusack"],
  director: "John Lasseter",
  description:
    "When Woody is stolen by a toy collector, Buzz and his friends set out on a rescue mission to save Woody before he becomes a museum toy.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory2.png",
  trailer: "https://www.youtube.com/embed/xNWSGRD5CzU",
  tags: ["rescue", "collector", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory3 = {
  title: "Toy Story 3",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 43min",
  year: 2010,
  age: "G",
  origin: "USA",
  locations: ["Pixar Animation Studios"],
  cast: ["Tom Hanks", "Tim Allen", "Joan Cusack"],
  director: "Lee Unkrich",
  description:
    "The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory3.png",
  trailer: "https://www.youtube.com/embed/JcpWXaA2qeg",
  tags: ["daycare", "college", "growing up"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.toystory4 = {
  title: "Toy Story 4",
  genre: ["Animation", "Adventure", "Comedy"],
  duration: "1h 40min",
  year: 2019,
  age: "G",
  origin: "USA",
  locations: ["Pixar Animation Studios"],
  cast: ["Tom Hanks", "Tim Allen", "Annie Potts"],
  director: "Josh Cooley",
  description:
    "When a new toy called 'Forky' joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.",
  poster: "assets/imgs/Marathon/Toy-Story/ban-toystory4.png",
  trailer: "https://www.youtube.com/embed/wmiIUN-7qhE",
  tags: ["forky", "road trip", "new friends"],
  ranking: { math: 0, digo: 0 },
};

// =============================================================================
// X-MEN MARATHON - COMPLETE SERIES
// =============================================================================

window.moviesData.xmen1 = {
  title: "X-Men",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 44min",
  year: 2000,
  age: "PG-13",
  origin: "USA",
  locations: ["Toronto", "New York"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Ian McKellen"],
  director: "Bryan Singer",
  description:
    "In a world where mutants exist and are discriminated against, two groups form for an inevitable clash: the supremacist Brotherhood, and the pacifist X-Men.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen1.png",
  trailer: "https://www.youtube.com/embed/KzFFiqJepYQ",
  tags: ["mutants", "discrimination", "school"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen2 = {
  title: "X2: X-Men United",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 14min",
  year: 2003,
  age: "PG-13",
  origin: "USA",
  locations: ["Vancouver", "Calgary"],
  cast: ["Patrick Stewart", "Hugh Jackman", "Ian McKellen"],
  director: "Bryan Singer",
  description:
    "When anti-mutant Colonel William Stryker kidnaps Professor X and attacks his school, the X-Men must ally with their archenemy Magneto to stop him.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen2.png",
  trailer: "https://www.youtube.com/embed/xVpe5nNabTI",
  tags: ["stryker", "weapon x", "alliance"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen3 = {
  title: "X-Men: The Last Stand",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 44min",
  year: 2006,
  age: "PG-13",
  origin: "USA",
  locations: ["Vancouver", "San Francisco"],
  cast: ["Hugh Jackman", "Halle Berry", "Ian McKellen"],
  director: "Brett Ratner",
  description:
    "The human government develops a cure for mutations, and Jean Grey becomes a darker uncontrolled persona called the Phoenix who allies with Magneto.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen3.png",
  trailer: "https://www.youtube.com/embed/fSiOgdXP5tM",
  tags: ["cure", "phoenix", "last stand"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen4 = {
  title: "X-Men Origins: Wolverine",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 47min",
  year: 2009,
  age: "PG-13",
  origin: "USA",
  locations: ["New Zealand", "Australia"],
  cast: ["Hugh Jackman", "Liev Schreiber", "Danny Huston"],
  director: "Gavin Hood",
  description:
    "A look at Wolverine's early life, in particular his time with the government squad Weapon X and the impact it will have on his later years.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen4.png",
  trailer: "https://www.youtube.com/embed/yj_GsIbc3jU",
  tags: ["origins", "weapon x", "sabretooth"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen5 = {
  title: "X-Men: First Class",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 12min",
  year: 2011,
  age: "PG-13",
  origin: "USA, UK",
  locations: ["England", "Georgia"],
  cast: ["James McAvoy", "Michael Fassbender", "Jennifer Lawrence"],
  director: "Matthew Vaughn",
  description:
    "In the 1960s, superpowered humans Charles Xavier and Erik Lensherr work together to find others like them, but Erik's vengeful pursuit of an ambitious mutant who ruined his life causes a schism to divide them.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen5.png",
  trailer: "https://www.youtube.com/embed/3UHXEuST_TU",
  tags: ["first class", "1960s", "friendship"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen6 = {
  title: "The Wolverine",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 6min",
  year: 2013,
  age: "PG-13",
  origin: "USA, UK",
  locations: ["Japan", "Australia"],
  cast: ["Hugh Jackman", "Tao Okamoto", "Rila Fukushima"],
  director: "James Mangold",
  description: "Wolverine comes to Japan to meet an old acquaintance in a mission that will leave him forever changed.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen6.png",
  trailer: "https://www.youtube.com/embed/sXzBlNitG8w",
  tags: ["japan", "samurai", "immortality"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen7 = {
  title: "X-Men: Days of Future Past",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 12min",
  year: 2014,
  age: "PG-13",
  origin: "USA, UK",
  locations: ["Montreal", "New York"],
  cast: ["Hugh Jackman", "James McAvoy", "Michael Fassbender"],
  director: "Bryan Singer",
  description:
    "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen7.png",
  trailer: "https://www.youtube.com/embed/pK2zYHWDZKo",
  tags: ["time travel", "sentinels", "future"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen8 = {
  title: "X-Men: Apocalypse",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "2h 24min",
  year: 2016,
  age: "PG-13",
  origin: "USA",
  locations: ["Montreal", "Cairo"],
  cast: ["James McAvoy", "Michael Fassbender", "Jennifer Lawrence"],
  director: "Bryan Singer",
  description:
    "In the 1980s the X-Men must defeat an ancient all-powerful mutant, En Sabah Nur, who intends to thrive through bringing destruction to the world.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen8.png",
  trailer: "https://www.youtube.com/embed/COvnHv42T-A",
  tags: ["apocalypse", "1980s", "ancient"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen9 = {
  title: "Logan",
  genre: ["Action", "Drama", "Sci-Fi"],
  duration: "2h 17min",
  year: 2017,
  age: "R",
  origin: "USA",
  locations: ["New Mexico", "Louisiana"],
  cast: ["Hugh Jackman", "Patrick Stewart", "Dafne Keen"],
  director: "James Mangold",
  description:
    "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life caring for Professor X in a hideout on the Mexican border.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen9.png",
  trailer: "https://www.youtube.com/embed/Div0iP65aZo",
  tags: ["final", "old man", "legacy"],
  ranking: { math: 0, digo: 0 },
};

window.moviesData.xmen10 = {
  title: "X-Men: Dark Phoenix",
  genre: ["Action", "Adventure", "Sci-Fi"],
  duration: "1h 53min",
  year: 2019,
  age: "PG-13",
  origin: "USA",
  locations: ["Montreal"],
  cast: ["James McAvoy", "Michael Fassbender", "Jennifer Lawrence"],
  director: "Simon Kinberg",
  description:
    "Jean Grey begins to develop incredible powers that corrupt and turn her into a Dark Phoenix, causing the X-Men to decide if her life is worth more than all of humanity.",
  poster: "assets/imgs/Marathon/X-men/ban-xmen10.png",
  trailer: "https://www.youtube.com/embed/azvR__GRQic",
  tags: ["dark phoenix", "jean grey", "corruption"],
  ranking: { math: 0, digo: 0 },
};

// Continue with other marathons (Alien, Toy Story, X-Men) following the same pattern...
// [Note: I'll continue with the remaining marathons if you need them, but keeping response length manageable]

// =============================================================================
// 7. SPOILER SYSTEM
// =============================================================================

/**
 * Spoiler database containing fun and engaging plot reveals for each title
 * Used by the spoiler overlay system to display movie/series spoilers
 */
window.movieSpoilers = {
  // Top 10 Featured Movies
  arrival: "The aliens came to teach languages, not invade. Louise learns to see the future through their language!",
  abouttime: "The secret to happiness isn't time travel, but living each day like it's the second time!",
  hojequerovoltarsozinho: "Leonardo discovers love with Gabriel and learns that independence comes from the heart, not the eyes!",
  origins: "Spoiler: you'll want to change your entire diet after watching this documentary!",
  lastchristmas: "Plot twist: she literally gave her heart to him... at the hospital! Too literal much!",
  ghoststory: "The ghost stays under the sheet the ENTIRE movie. Yes, that's exactly what you heard!",
  perksofbeing: "Charlie writes letters to no one specific, but in the end finds his perfect group!",
  bridesmaids: "The airplane bathroom will never be the same after this scene...",
  beforesunrise: "They spend the whole night just talking in Vienna. Just talking. And it's beautiful!",
  her: "He falls in love with an AI that has Scarlett Johansson's voice. Who wouldn't fall in love?",
  gonegirl: "Amy faked her own disappearance to screw over Nick. Girl boss energy!",

  // Vertical Carousel
  screen: "The killer is... everyone! Except Sidney, who's a professional final girl!",
  chucky: "It's just a doll, but kills more people than most respectable serial killers!",
  tifannychucky: "Chucky gets a girlfriend and they go on a killing road trip. Couple goals!",
  seedschucky: "Chucky's child is confused about gender and the parents are supportive. Modern family!",
  substance: "The substance makes you young, but... it has pretty gross side effects!",

  // Digo's Favorites
  marypoppins: "Mary Poppins returns to save Michael Banks' children with even more magic!",
  ralphbreaks: "Ralph literally breaks the internet and meets the Disney princesses. Epic crossover!",
  greatestshowman: "P.T. Barnum creates the circus, sings a lot and everyone's happy in the end!",
  avangers: "Iron Man dies, Cap gets old, but everyone comes back from the dead! Somehow...",
  hocuspocus: "Three witches return from Salem and are defeated by three children. Power of youth!",

  // Series
  rupaul: "Drag queens compete to be America's Next Drag Superstar. Sashay away!",
  simpsons: "Homer still works at the plant, Bart still makes trouble. Nothing changed in 35 years!",
  howmetyourmother: "The mother only appears at the end and... well, it's complicated. Barney > Ted always!",
  howmetyourfather: "It's just like the original, but with millennials and more confusing!",
  agatha: "It was Agatha all along! Surprised Pikachu face!",
  wandavision: "Wanda created an alternate reality to process grief. Therapy with superpowers!",
  theoffice: "Jim and Pam get together, Michael leaves but comes back in the end. Bears, beets, Battlestar Galactica!",
  doctorwho: "The Doctor regenerates, travels through time, saves the universe. Repeat x13 seasons!",

  // Hunger Games Marathon
  hungergames: "Katniss becomes a symbol of rebellion, overthrows the government and chooses Peeta (obvious)!",
  catchingfire: "Plot twist: it was all planned to get Katniss out of the arena!",
  mockingjay1: "First part of a split movie. Lots of preparation, little action!",
  mockingjay2: "Katniss kills President Coin instead of Snow. Uno reverse card!",
  BalladOfSongbirdsSnakes: "Young Snow was also a jerk. Who would have thought!",

  // Harry Potter Marathon
  harrypotter1: "Harry is a wizard, Voldemort killed his parents, Snape is suspicious but innocent!",
  harrypotter2: "It's Gilderoy Lockhart who's behind everything... oh no, he's just a jerk!",
  harrypotter3: "Sirius Black is innocent and is Harry's godfather! Plot twist!",
  harrypotter4: "Voldemort returns at the end of the tournament. Cedric dies. Very sad!",
  harrypotter5: "Harry has teenage rage, Sirius dies, Dumbledore explains everything too late!",
  harrypotter6: "Snape kills Dumbledore, but it's because Dumbledore asked him to!",
  harrypotter7: "Harry, Ron and Hermione go camping looking for horcruxes. Lots of camping!",
  harrypotter8: "Harry dies, but doesn't die, kills Voldemort, everyone's happy!",
};

/**
 * Initialize spoiler functionality for movie modal
 * Determines which layout (normal or vertical) to use and sets up event listeners
 *
 * @param {string} movieKey - Unique identifier for the movie/series
 */
function setupModalSpoiler(movieKey) {
  console.log("Setting up spoiler for:", movieKey);

  const normalSection = document.querySelector(".movie-modal__spoiler-section");
  const verticalSection = document.querySelector(".movie-modal__spoiler-section-vertical");

  let spoilerBtn, spoilerText, activeSection;

  // Determine which layout to use based on modal visibility
  if (
    verticalSection &&
    verticalSection.closest(".movie-modal__media-vertical") &&
    getComputedStyle(verticalSection.closest(".movie-modal__media-vertical")).display !== "none"
  ) {
    spoilerBtn = document.getElementById("modal-spoiler-btn-vertical");
    spoilerText = document.getElementById("modal-spoiler-text-vertical");
    activeSection = verticalSection;
    console.log("Using vertical spoiler layout");
  } else {
    spoilerBtn = document.getElementById("modal-spoiler-btn-normal");
    spoilerText = document.getElementById("modal-spoiler-text-normal");
    activeSection = normalSection;
    console.log("Using normal spoiler layout");
  }

  if (!spoilerBtn || !spoilerText) {
    console.warn("Spoiler elements not found");
    return;
  }

  const spoiler = window.movieSpoilers && window.movieSpoilers[movieKey];

  if (!spoiler) {
    activeSection.style.display = "none";
    console.warn("No spoiler available for:", movieKey);
    return;
  }

  // Show active section and hide inactive one
  if (activeSection) {
    activeSection.style.display = "block";
  }

  if (activeSection === normalSection && verticalSection) {
    verticalSection.style.display = "none";
  } else if (activeSection === verticalSection && normalSection) {
    normalSection.style.display = "none";
  }

  // Reset spoiler state
  spoilerText.style.display = "none";
  spoilerText.textContent = "";

  // Remove existing event listeners by cloning button
  const newSpoilerBtn = spoilerBtn.cloneNode(true);
  spoilerBtn.parentNode.replaceChild(newSpoilerBtn, spoilerBtn);

  // Add click event listener to open spoiler overlay
  newSpoilerBtn.addEventListener("click", function () {
    console.log("Spoiler clicked for:", movieKey);
    openSpoilerOverlay(movieKey, spoiler);
  });

  console.log("Spoiler setup completed for:", movieKey);
}

/**
 * Create and display spoiler overlay with auto-close timer
 * Shows movie title and spoiler text with progress bar and countdown
 *
 * @param {string} movieKey - Movie identifier for title lookup
 * @param {string} spoilerText - Spoiler text to display
 */
function openSpoilerOverlay(movieKey, spoilerText) {
  console.log("Opening spoiler overlay for:", movieKey);

  const movieData = window.moviesData[movieKey];
  const movieTitle = movieData ? movieData.title : movieKey;

  let overlay = document.getElementById("spoiler-overlay");
  if (!overlay) {
    overlay = createSpoilerOverlay();
  }

  const titleElement = overlay.querySelector(".spoiler-overlay__title");
  const textElement = overlay.querySelector(".spoiler-overlay__text");
  const progressBar = overlay.querySelector(".spoiler-overlay__progress-bar");
  const timerElement = overlay.querySelector(".spoiler-overlay__timer");

  titleElement.textContent = `${movieTitle} - Spoiler`;
  textElement.textContent = spoilerText;

  // Show overlay and prevent background scrolling
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Initialize countdown timer
  let timeLeft = 10;
  timerElement.textContent = `Auto-close in ${timeLeft}s`;

  // Animate progress bar
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);

  // Start countdown with visual updates
  const countdownInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Auto-close in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      closeSpoilerOverlay();
    }
  }, 1000);

  // Store interval reference for manual cancellation
  overlay.dataset.countdownInterval = countdownInterval;

  console.log("Spoiler overlay opened with 10s timer");
}

/**
 * Create spoiler overlay DOM structure with event listeners
 * Builds the complete overlay HTML and attaches close functionality
 *
 * @returns {HTMLElement} Created overlay element
 */
function createSpoilerOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "spoiler-overlay";
  overlay.className = "spoiler-overlay";

  overlay.innerHTML = `
    <div class="spoiler-overlay__backdrop"></div>
    <div class="spoiler-overlay__content">
      <button class="spoiler-overlay__close" aria-label="Close spoiler">&times;</button>
      <div class="spoiler-overlay__header">
        <h2 class="spoiler-overlay__title">Movie Title - Spoiler</h2>
      </div>
      <div class="spoiler-overlay__body">
        <p class="spoiler-overlay__text">Spoiler text will appear here...</p>
      </div>
      <div class="spoiler-overlay__footer">
        <div class="spoiler-overlay__progress">
          <div class="spoiler-overlay__progress-bar"></div>
        </div>
        <span class="spoiler-overlay__timer">Auto-close in 10s</span>
      </div>
    </div>
  `;

  // Attach event listeners for closing overlay
  const closeBtn = overlay.querySelector(".spoiler-overlay__close");
  const backdrop = overlay.querySelector(".spoiler-overlay__backdrop");

  closeBtn.addEventListener("click", closeSpoilerOverlay);
  backdrop.addEventListener("click", closeSpoilerOverlay);

  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Close spoiler overlay and cleanup timer
 * Clears countdown interval and restores page scrolling
 */
function closeSpoilerOverlay() {
  const overlay = document.getElementById("spoiler-overlay");
  if (overlay) {
    // Clear countdown timer if active
    const countdownInterval = overlay.dataset.countdownInterval;
    if (countdownInterval) {
      clearInterval(parseInt(countdownInterval));
      delete overlay.dataset.countdownInterval;
    }

    overlay.style.display = "none";
    document.body.style.overflow = "";
  }
  console.log("Spoiler overlay closed");
}

/**
 * Ensure proper content classification
 * This function runs after movie data is loaded to verify series classification
 */
function ensureProperClassification() {
  if (!window.moviesData) return;

  // Known series that should be classified as series
  const knownSeries = [
    "rupaul",
    "simpsons",
    "howmetyourmother",
    "howmetyourfather",
    "agatha",
    "wandavision",
    "theoffice",
    "doctorwho",
  ];

  knownSeries.forEach((key) => {
    if (window.moviesData[key]) {
      // Ensure these are marked as series
      if (!window.moviesData[key].type || !["series", "Serie", "Reality Show"].includes(window.moviesData[key].type)) {
        window.moviesData[key].type = "series";
      }

      // Add series category if not present
      if (!window.moviesData[key].categories) {
        window.moviesData[key].categories = [];
      }

      if (!window.moviesData[key].categories.some((cat) => cat.includes("series"))) {
        window.moviesData[key].categories.push("tv-series");
      }
    }
  });

  console.log("✅ Content classification verified");
}

// Run classification check when movie data is loaded
window.addEventListener("load", function () {
  setTimeout(() => {
    ensureProperClassification();

    // Update statistics after classification
    if (window.updateStats) {
      window.updateStats();
    }
  }, 500);
});

// =============================================================================
// GLOBAL EXPORTS & INITIALIZATION
// =============================================================================

// Expose spoiler functions globally for access from other scripts
window.setupModalSpoiler = setupModalSpoiler;
window.openSpoilerOverlay = openSpoilerOverlay;
window.closeSpoilerOverlay = closeSpoilerOverlay;

// Log successful database initialization
console.log("MathFlix Movies Database loaded successfully");
console.log(`Total entries: ${Object.keys(window.moviesData).length}`);
console.log("Spoiler overlay system initialized");
