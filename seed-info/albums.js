// { title: "Title", artist: "Artist", genreId: #, ownerCount: 0, releaseDate: #, imgSrc: "link", createdAt: new Date(), updatedAt: new Date()},
//TODO: Seed Genres first, then Albums, then Songs
//TODO: Make sure to add Genre ID # to Albums data after Genres seed.
//TODO: Make sure to add AlbumId # to Songs after Albums seed.

//* Monte's

//1. { title: "Legend", artist: "Bob Marley and the Wailers", genreId: 'reggae', ownerCount: 0, releaseDate: 1984, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/BobMarley-Legend.jpg/220px-BobMarley-Legend.jpg", createdAt: new Date(), updatedAt: new Date()},
//2. { title: "Give Up", artist: "The Postal Service", genreId: 'electronic', ownerCount: 0, releaseDate: 2003, imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/PostalService_cover300dpi.jpg/800px-PostalService_cover300dpi.jpg", createdAt: new Date(), updatedAt: new Date()},
//3. { title: "OK Computer", artist: "Radiohead", genreId: 'alternative/indie', ownerCount: 0, releaseDate: 1997, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Radioheadokcomputer.png/220px-Radioheadokcomputer.png", createdAt: new Date(), updatedAt: new Date()},
//4. { title: "Deja Entendu", artist: "Brand New", genreId: 'alternative/indie', ownerCount: 0, releaseDate: 2003, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Brand_New_Deja_Entendu.jpg/220px-Brand_New_Deja_Entendu.jpg", createdAt: new Date(), updatedAt: new Date()},
//5. { title: "The Miseducation of Lauryn Hill", artist: "Lauryn Hill", genreId: 'pop', ownerCount: 0, releaseDate: 1998, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg/220px-LaurynHillTheMiseducationofLaurynHillalbumcover.jpg", createdAt: new Date(), updatedAt: new Date()}
//6. { title: "Bleed American", artist: "Jimmy Eat World", genreId: 'alternative/indie', ownerCount: 0, releaseDate: 2001, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Bleedamerican.jpg/220px-Bleedamerican.jpg", createdAt: new Date(), updatedAt: new Date()}
//7. { title: "Oracular Spectacular",  artist: "MGMT", genreId: 'electronic', ownerCount: 0, releaseDate: 2007, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Oracular_Spectacular_2008.jpg/220px-Oracular_Spectacular_2008.jpg", createdAt: new Date(), updatedAt: new Date()}
//8. { title: "Discovery", artist: "Daft Punk", genreId: 'electronic', ownerCount: 0, releaseDate: 2001, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Daft_Punk_-_Discovery.jpg/220px-Daft_Punk_-_Discovery.jpg", createdAt: new Date(), updatedAt: new Date()}
//9. { title: "Rage Against the Machine", artist: "Rage Against the Machine", genreId: 'rock', ownerCount: 0, releaseDate: 1992, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/RageAgainsttheMachineRageAgainsttheMachine.jpg/220px-RageAgainsttheMachineRageAgainsttheMachine.jpg", createdAt: new Date(), updatedAt: new Date()}
//10. { title: "Back to Black", artist: "Amy Winehouse", genreId: 'pop', ownerCount: 0, releaseDate: 2006, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png/220px-Amy_Winehouse_-_Back_to_Black_%28album%29.png", createdAt: new Date(), updatedAt: new Date()}

//* Brad's

//1.{ title: "Pronounced 'Lĕh-'nérd 'Skin-'nérd", artist: " Lynyrd Skynyrd", genreId: "classic rock", ownerCount: 0, releaseDate: 1973, imgSrc: "https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg, createdAt: new Date(), updatedAt: new Date()},
//2.{ title: "Dynasty", artist: "Kiss", genreId: 'classic rock', ownerCount: 0, releaseDate: 1979, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Dynasty_%28album%29_cover.jpg/220px-Dynasty_%28album%29_cover.jpg", createdAt: new Date(), updatedAt: new Date()},
//3.{ title: "Southern Nights", artist: "Glen Campbell", genreId: 'country', ownerCount: 0, releaseDate: 1977, imgSrc: "https://upload.wikimedia.org/wikipedia/en/f/fc/Glen_Campbell_Southern_Nights_album_cover.jpg", createdAt: new Date(), updatedAt: new Date()},
//4.{ title: "Metallica", artist: "Metallica", genreId: 'rock', ownerCount: 0, releaseDate: 1991, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Metallica_-_Metallica_cover.jpg/220px-Metallica_-_Metallica_cover.jpg", createdAt: new Date(), updatedAt: new Date()},
//5.{ title: "Rumours", artist: "Fleetwood Mac", genreId: 'classic rock', ownerCount: 0, releaseDate: 1977, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/FMacRumours.PNG/220px-FMacRumours.PNG", createdAt: new Date(), updatedAt: new Date()},
//6.{ title: "Wish You Were Here", artist: "Pink Floyd", genreId: 'classic rock', ownerCount: 0, releaseDate: 1975, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png/220px-Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png", createdAt: new Date(), updatedAt: new Date()},
//7.{ title: "Cut", artist: "Golden Earring", genreId: "classic rock", ownerCount: 0, releaseDate: 1982, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Golden_Earring_-_Cut.jpg/220px-Golden_Earring_-_Cut.jpg", createdAt: new Date(), updatedAt: new Date()},
//8.{ title: "What You See Is What You Get", artist: "Luke Combs", genreId: 'country', ownerCount: 0, releaseDate: #, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Luke_Combs_-_What_You_See_Is_What_You_Get.png/220px-Luke_Combs_-_What_You_See_Is_What_You_Get.png", createdAt: new Date(), updatedAt: new Date()},
//9.{ title: "In Utero", artist: "Nirvana", genreId: "rock", ownerCount: 0, releaseDate: 1993, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg/220px-In_Utero_%28Nirvana%29_album_cover.jpg", createdAt: new Date(), updatedAt: new Date()},
//10.{ title: "Born Here Live Here Die Here", artist: "Luke Bryan", genreId: "country", ownerCount: 0, releaseDate: 2020, imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Born_Here_Live_Here_Die_Here.jpeg/220px-Born_Here_Live_Here_Die_Here.jpeg", createdAt: new Date(), updatedAt: new Date()},

//* Christian's

//1.
//2.
//3.
//4.
//5.
//6.
//7.
//8.
//9.
//10.

//* Owen's

//1.{ title: "Invasion of Privacy", artist: "Cardi B", genreId: #, ownerCount: 0, releaseDate: 2018, imgSrc: "https://upload.wikimedia.org/wikipedia/en/9/97/Cardi_B_-_Invasion_of_Privacy.png", createdAt: new Date(), updatedAt: new Date()},
//2.{ title: "Operation: Doomsday", artist: "MF DOOM", genreId: #, ownerCount: 0, releaseDate: 1999, imgSrc: "https://upload.wikimedia.org/wikipedia/en/0/03/MF-DOOM-Operation.jpeg", createdAt: new Date(), updatedAt: new Date()},
//3.{ title: "Ready To Die", artist: "The Notorious B.I.G.", genreId: #, ownerCount: 0, releaseDate: 1994, imgSrc: "https://upload.wikimedia.org/wikipedia/en/9/97/Ready_To_Die.jpg", createdAt: new Date(), updatedAt: new Date()},
//4.{ title: "Troupeau Bleu", artist: "Cortex", genreId: #, ownerCount: 0, releaseDate: 1975, imgSrc: "https://f4.bcbits.com/img/a1112421945_16.jpg", createdAt: new Date(), updatedAt: new Date()},
//5.{ title: "A Love Supreme", artist: "John Coltrane", genreId: #, ownerCount: 0, releaseDate: 1965, imgSrc: "https://upload.wikimedia.org/wikipedia/en/9/9a/John_Coltrane_-_A_Love_Supreme.jpg", createdAt: new Date(), updatedAt: new Date()},
//6.{ title: "Choose Your Weapon", artist: "Hiatus Kaiyote", genreId: #, ownerCount: 0, releaseDate: 2015, imgSrc: "https://upload.wikimedia.org/wikipedia/en/e/e9/HKaiyote_Weapon.jpg", createdAt: new Date(), updatedAt: new Date()},
//7.{ title: "I Want You", artist: "Marvin Gaye", genreId: #, ownerCount: 0, releaseDate: 1976, imgSrc: "https://upload.wikimedia.org/wikipedia/en/e/e3/Marvin-gaye-i-want-you.jpg", createdAt: new Date(), updatedAt: new Date()},
//8.{ title: "That's The Way of The World", artist: "Earth Wind & Fire", genreId: #, ownerCount: 0, releaseDate: 1975, imgSrc: "https://upload.wikimedia.org/wikipedia/en/0/03/Whiskeytown-Stranger%27s_Almanac_%28album_cover%29.jpg", createdAt: new Date(), updatedAt: new Date()},
//9.{ title: "Worldwide Underground", artist: "Erykah Badu", genreId: #, ownerCount: 0, releaseDate: 2003, imgSrc: "https://upload.wikimedia.org/wikipedia/en/a/a4/Erykah_Badu_-_Wordwide_Underground.jpg", createdAt: new Date(), updatedAt: new Date()},
//10.{ title: "What You Won't Do For Love", artist: "Bobby Caldwell", genreId: #, ownerCount: 0, releaseDate: 1978, imgSrc: "https://upload.wikimedia.org/wikipedia/en/8/8a/Bobby_Caldwell_%28album%29.jpg", createdAt: new Date(), updatedAt: new Date()},
