const mongoose = require('mongoose');

const Artist = require('./models /Artist');
const Album = require('./models /Album');
const Track = require('./models /Track');
const run = async () => {
    await mongoose.connect('mongodb://localhost/music', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    const [tcoi, freddie] = await Artist.create(
        {
             name: "Виктор Цой",
             info: "Ви́ктор Ро́бертович Цой — советский рок-музыкант, автор песен и художник. Основатель и лидер рок-группы «Кино», в которой пел, играл на гитаре и являлся автором песен. Кроме этого, снялся также в нескольких фильмах. Лучший актёр 1989 года по версии журнала «Советский экран»",
             image: "Victor .jpg"
        },
        {
            name: "Фредди Меркьюри",
            info: "Фре́дди Ме́ркьюри — британский певец парсийского происхождения, автор песен, вокалист рок-группы Queen. Является автором таких хитов группы, как «Bohemian Rhapsody», «Killer Queen», «Seven Seas of Rhye», «Somebody to Love», «We Are the Champions», «Don't Stop Me Now», «Crazy Little Thing Called Love» и др.",
            image: "Freddie.jpg",
        }
    );
    const [tcoi_unknown, tcoi_concert, freddie_badGuy, freddie_live] = await Album.create(
        {
            name: "Неизвестные песни",
            artist: tcoi._id,
            year: "1992",
            image: "unknownSings.jpg"
        },
        {
            name: "Акустический концерт",
            artist: tcoi._id,
            year: "1994",
            image: "Album.jpg"
        },
        {
            name: "Mr. Bad Guy",
            artist: freddie._id,
            year: "1985",
            image: "mr.bad_guy.jpeg"
        },
        {
            name: "Live at Wembley ’86",
            artist: freddie._id,
            year: "1990",
            image: "liveAt.jpeg"
        }
    );
    await Track.create(
        {
            name: "Разреши мне",
            album: tcoi_unknown._id,
            duration: 4,
            number: 1
        },
        {
            name: "Братская любовь",
            album: tcoi_unknown._id,
            duration: 3,
            number: 2
        },
        {
            name: "Ты мог бы...",
            album: tcoi_unknown._id,
            duration: 3,
            number: 3
        },
        {
            name: "Восьмиклассница",
            album: tcoi_concert._id,
            duration: 2,
            number: 1
        },
        {
            name: "Последний герой",
            album: tcoi_concert._id,
            duration: 4,
            number: 2
        },
        {
            name: "Хочу перемен",
            album: tcoi_concert._id,
            duration: 4,
            number: 3
        },
        {
            name: "Let's Turn It On",
            album: freddie_badGuy._id,
            duration: 3,
            number: 1
        },
        {
            name: "Made in Heaven",
            album: freddie_badGuy._id,
            duration: 4,
            number: 2
        },
        {
            name: "I Was Born to Love You",
            album: freddie_badGuy._id,
            duration: 3,
            number: 3
        },
        {
            name: "One Vision",
            album: freddie_live._id,
            duration: 5,
            number: 1
        },
        {
            name: "Tie Your Mother Down",
            album: freddie_live._id,
            duration: 3,
            number: 2
        },
        {
            name: "In the Lap of the Gods",
            album: freddie_live._id,
            duration: 2,
            number: 3
        },
    )
};


run().catch(error => {
    throw error
});