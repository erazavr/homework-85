const mongoose = require('mongoose');
const nanoid = require('nanoid');

const config = require('./config');
const Artist = require('./models /Artist');
const Album = require('./models /Album');
const Track = require('./models /Track');
const User = require('./models /User');
const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }
    const [user1, admin] = await User.create({
        username: "user1",
        password: "123",
        token: nanoid(),
        role: 'user'
    }, {
        username: "admin",
        password: "123",
        token: nanoid(),
        role: 'admin'
    });
    const [tcoi, freddie] = await Artist.create(
        {
             name: "Виктор Цой",
             info: "Ви́ктор Ро́бертович Цой — советский рок-музыкант, автор песен и художник. Основатель и лидер рок-группы «Кино», в которой пел, играл на гитаре и являлся автором песен. Кроме этого, снялся также в нескольких фильмах. Лучший актёр 1989 года по версии журнала «Советский экран»",
             image: "Victor .jpg",
             user: user1._id,
             published: true
        },
        {
            name: "Фредди Меркьюри",
            info: "Фре́дди Ме́ркьюри — британский певец парсийского происхождения, автор песен, вокалист рок-группы Queen. Является автором таких хитов группы, как «Bohemian Rhapsody», «Killer Queen», «Seven Seas of Rhye», «Somebody to Love», «We Are the Champions», «Don't Stop Me Now», «Crazy Little Thing Called Love» и др.",
            image: "Freddie.jpg",
            user: admin._id,
            published: false
        }
    );
    const [tcoi_unknown, tcoi_concert, freddie_badGuy, freddie_live] = await Album.create(
        {
            name: "Неизвестные песни",
            artist: tcoi._id,
            year: "1992",
            image: "unknownSings.jpg",
            user: user1._id,
            published: true
        },
        {
            name: "Акустический концерт",
            artist: tcoi._id,
            year: "1994",
            image: "Album.jpg",
            user: user1._id,
            published: false
        },
        {
            name: "Mr. Bad Guy",
            artist: freddie._id,
            year: "1985",
            image: "mr.bad_guy.jpeg",
            user: admin._id,
            published: true
        },
        {
            name: "Live at Wembley ’86",
            artist: freddie._id,
            year: "1990",
            image: "liveAt.jpeg",
            user: admin._id,
            published: false
        }
    );
    await Track.create(
        {
            name: "Разреши мне",
            album: tcoi_unknown._id,
            duration: 4,
            number: 1,
            video: "https://www.youtube.com/embed/VUjKe8IMLPo",
            user: user1._id,
            published: true
        },
        {
            name: "Братская любовь",
            album: tcoi_unknown._id,
            duration: 3,
            number: 2,
            video: "https://www.youtube.com/embed/SObZv9-lBvU",
            user: user1._id,
            published: false
        },
        {
            name: "Ты мог бы...",
            album: tcoi_unknown._id,
            duration: 3,
            number: 3,
            video: "https://www.youtube.com/embed/lOHziwXj5hw",
            user: user1._id,
            published: true
        },
        {
            name: "Восьмиклассница",
            album: tcoi_concert._id,
            duration: 2,
            number: 1,
            video: "https://www.youtube.com/embed/w5jU_lVQt4o",
            user: user1._id,
            published: false
        },
        {
            name: "Последний герой",
            album: tcoi_concert._id,
            duration: 4,
            number: 2,
            video: "https://www.youtube.com/embed/BnDY4jC7JZM",
            user: user1._id,
            published: true
        },
        {
            name: "Хочу перемен",
            album: tcoi_concert._id,
            duration: 4,
            number: 3,
            video: "https://www.youtube.com/embed/FU8csnZxdPA",
            user: user1._id,
            published: false
        },
        {
            name: "Let's Turn It On",
            album: freddie_badGuy._id,
            duration: 3,
            number: 1,
            video: "https://www.youtube.com/embed/-u9H_i6yjEo",
            user: admin._id,
            published: true
        },
        {
            name: "Made in Heaven",
            album: freddie_badGuy._id,
            duration: 4,
            number: 2,
            video: "https://www.youtube.com/embed/171skzi5BKc",
            user: admin._id,
            published: false
        },
        {
            name: "I Was Born to Love You",
            album: freddie_badGuy._id,
            duration: 3,
            number: 3,
            video: "https://www.youtube.com/embed/Fna56a_r41s",
            user: admin._id,
            published: true
        },
        {
            name: "One Vision",
            album: freddie_live._id,
            duration: 5,
            number: 1,
            video: "https://www.youtube.com/embed/-OGd4gplxQM",
            user: admin._id,
            published: false
        },
        {
            name: "Tie Your Mother Down",
            album: freddie_live._id,
            duration: 3,
            number: 2,
            video: "https://www.youtube.com/embed/LvB2MnIIdMw",
            user: admin._id,
            published: true
        },
        {
            name: "In the Lap of the Gods",
            album: freddie_live._id,
            duration: 2,
            number: 3,
            video: "https://www.youtube.com/embed/ieXcPZC0MJk",
            user: admin._id,
            published: false
        },
    );
    mongoose.connection.close();
};


run().catch(error => {
    throw error
});