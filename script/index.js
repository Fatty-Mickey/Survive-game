const modalWindow = document.querySelector('.modal-window');
const modalWindowMessage = document.querySelector('.modal-window-message');
const modalWindowBtn = document.querySelector('.modal-window-btn');
const block1 = document.querySelector(('.block-1'));
const blockLog = document.querySelectorAll(('.block-log'));
const blockBackpack = document.querySelectorAll(('.block-backpack'));
const blockUserMenu = document.querySelectorAll(('.block-user-menu'));
const blockMap = document.querySelectorAll(('.block-map'));
const inventory = document.querySelector('.inventory');
const backpackButtons = document.querySelector('.backpack-buttons');
const img = document.querySelector('.img');
img.style.background = 'url(img/locations/house0.png) center center/cover no-repeat';
const itemDescription = document.querySelector('.item-description');

function randomNumber() {
    return Math.round(Math.random() * 100);
};

// Створюємо глобальні локації
const globalLocations = [
    {
        id: 'firstHouse',
        name: 'Дім',
        // message: 'Ти в своєму будинку. ',
        type: 'peaceful',
        npc: [],
        findLocationChance: 100,
        battleChance: 0,
        locations: [],
        enemies: [],
        active: true,
    },
    {
        id: 'nearFirstHouse',
        name: '',
        // message: '',
        type: 'seekAndFight',
        findLocationChance: 70,
        battleChance: 100,
        locations: [],
        enemies: [],
        active: true,
    },
    {
        id: 'village',
        name: 'Хутор',
        // message: 'Ти дійшов до хутора. Тут можна перепочити і поповнити запаси.',
        type: 'peaceful',
        npc: [
            {
                id: 'Po',
                name: 'Старий По'
            }
        ],
        findLocationChance: 100,
        battleChance: 0,
        locations: [],
        enemies: [],
        active: false,
    },
    {
        id: 'aroundVillage',
        name: '',
        // message: 'Ти дійшов до хутора. Тут можна перепочити і поповнити запаси.',
        type: 'seekAndFight',
        findLocationChance: 70,
        battleChance: 30,
        locations: [],
        enemies: [],
        active: false,
    },
    {
        id: 'klemat',
        name: 'Клемат',
        type: 'peaceful',
        npc: [
            {
                id: 'viskyBob',
                name: 'Віскі Боб'
            },
            {
                id: 'trapperSmiley',
                name: 'Трапер Смайлі'
            },
        ],
        findLocationChance: 100,
        battleChance: 0,
        locations: [],
        enemies: [],
        active: false,
    },
    {
        id: 'aroundKlemat',
        name: 'Околиці міста Клемат',
        type: 'seekAndFight',
        findLocationChance: 60,
        battleChance: 40,
        locations: [],
        enemies: [],
        active: false,
    },
];

// Створюємо локації
const locations = [
    // peaceful
    {
        id: 'house0',
        name: 'house0',
        img: 'url(img/locations/house0.png) center center/cover no-repeat',
        message: 'Ти в своєму будинку. ',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'village',
        name: 'Хутор',
        img: 'url(img/locations/village.png) center center/cover no-repeat',
        message: 'Ти дійшов до хутора. Тут можна перепочити і поповнити запаси.',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'klemat',
        name: 'Клемат',
        img: 'url(img/locations/klemat.png) center center/cover no-repeat',
        message: 'Ти дійшов до міста Клемат. Тут можна перепочити і поповнити запаси.',
        countOfSearch: 0,
        items: [],
    },
    // others
    {
        id: 'cache',
        name: 'cache',
        img: 'url(img/locations/cache.png) center center/cover no-repeat',
        message: 'Ти знайшов чиюсь схованку ...',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'cache1',
        name: 'cache',
        img: 'url(img/locations/cache1.png) center center/cover no-repeat',
        message: 'Ти знайшов чиюсь схованку ...',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'house2',
        name: 'house2',
        img: 'url(img/locations/house2.png) center center/cover no-repeat',
        message: 'Ти натрапив на стару халупу ...',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'cave',
        name: 'cave',
        img: 'url(img/locations/cave.png) center center/cover no-repeat',
        message: 'Перед тобою печера ...',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'waterSource',
        name: 'waterSource',
        message: 'Ти знайшов джерело, тут можна набрати води ...',
        img: 'url(img/locations/waterSource.jpg) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'wilderness',
        name: 'wilderness',
        message: 'Навколо тебе пустеля ...',
        img: 'url(img/locations/wilderness.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'carRusty',
        name: 'Іржава машина',
        message: 'Купа іржавого брухту, колись це було автомобілем.',
        img: 'url(img/locations/carRusty.png) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'tank',
        name: 'Бочка',
        message: 'Стара бочка. Нічого цікавого.',
        img: 'url(img/locations/tank.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'mailbox',
        name: 'Поштова скринька',
        message: 'Поштова скринька. Може хтось надіслав тобі листа...',
        img: 'url(img/locations/mailbox.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'ruins',
        name: 'Руїни',
        message: 'Руїни. Досить одноманітно.',
        img: 'url(img/locations/ruins2.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'radioactivePuddle',
        name: 'Розлиті радіаційні відходи',
        message: 'Розлиті радіаційні відходи. Краще забиратися звідси',
        img: 'url(img/locations/radioactivePuddle.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'tent',
        name: 'Палатка',
        message: 'Чиясь палатка. Поруч нікого',
        img: 'url(img/locations/tent.png) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'gasStation',
        name: 'Заправка',
        message: 'Заправка. Варто оглянути.',
        img: 'url(img/locations/gasStation.png) center center/cover no-repeat',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'carJunkyard',
        name: 'Звалище автомобілів',
        message: 'Звалище автомобілів. Наврятче тут залишилось щось корисне.',
        img: 'url(img/locations/carJunkyard.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'deadScorpion',
        name: 'Дохлий скорпіон',
        message: 'Дохлий скорпіон. Смердить',
        img: 'url(img/locations/deadScorpion.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
];

// Створюємо противників
const enemies = [
    {
        id: 'rat',
        name: 'Мутований пацюк',
        img: 'url(img/enemies/rat.jpg) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого пацюка',
        health: 10,
        exp: 25,
        minDamage: 3,
        maxDamage: 6,
        items: [],
    },
    {
        id: 'scorpion',
        name: 'Мутований скорпіон',
        img: 'url(img/enemies/scorpion.jpg) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого скорпіона',
        health: 15,
        exp: 50,
        minDamage: 5,
        maxDamage: 8,
        items: [],
    },
    {
        id: 'hugeScorpion',
        name: 'Мутований велетенський скорпіон',
        img: 'url(img/enemies/hugeScorpion.png) center center/cover no-repeat',
        message: 'Ти знайшов гніздо велетенського скорпіона',
        health: 75,
        exp: 150,
        minDamage: 10,
        maxDamage: 25,
        items: [],
    },
    {
        id: 'mole',
        name: 'Мутований кріт',
        img: 'url(img/enemies/mole.png) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого крота',
        health: 15,
        exp: 50,
        minDamage: 5,
        maxDamage: 8,
        items: [],
    },
    {
        id: 'reider0',
        name: 'Рейдер з пістолетом',
        img: 'url(img/enemies/reider0.png) center center/cover no-repeat',
        message: 'Ти втрапив у засітку рейдера',
        health: 25,
        exp: 75,
        minDamage: 5,
        maxDamage: 8,
        items: [],
    },
];

// Створюємо предмети
const items = [
    // weapon
    {
        id: 'knifeRusty',
        name: 'Іржавий ніж',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/knifeRusty.webp) center center/contain no-repeat',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Іржавий ніж</p>',
        minDamage: 2,
        maxDamage: 4,
    },
    {
        id: 'metalPole',
        name: 'Шматок арматури',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/metalPole.webp) center center/contain no-repeat',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Шматок арматури</p>',
        minDamage: 3,
        maxDamage: 5,
    },
    {
        id: 'pistolRusty',
        name: 'Іржавий пістолет',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/pistolRusty.webp) center center/contain no-repeat',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Іржавий пістолет</p>',
        minDamage: 4,
        maxDamage: 6,
    },
    {
        id: 'knifeCombat',
        name: 'Бойовий ніж',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: 'url(../img/f2-items/weapon/knifeCombat.webp) center center/contain no-repeat',
        scrapPartsMin: 3,
        scrapPartsMax: 5,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Бойовий ніж</p>',
        minDamage: 6,
        maxDamage: 9,
    },
    {
        id: 'mouser9mm',
        name: 'Маузер 9мм',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/mouser9mm.webp) center center/contain no-repeat',
        scrapPartsMin: 3,
        scrapPartsMax: 5,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Маузер 9мм</p>',
        minDamage: 5,
        maxDamage: 8,
    },
    {
        id: 'shotgun',
        name: 'Обріз',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/shotgun.webp) center center/contain no-repeat',
        scrapPartsMin: 5,
        scrapPartsMax: 7,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Обріз</p>',
        minDamage: 6,
        maxDamage: 10,
    },
    {
        id: 'huntingRifle',
        name: 'Мисливський карабін',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/weapon/huntingRifle.webp) center center/contain no-repeat',
        scrapPartsMin: 5,
        scrapPartsMax: 7,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'weapon',
        description: '<p>Мисливський карабін</p>',
        minDamage: 8,
        maxDamage: 12,
    },
    // helmet
    {
        id: 'helmetSport',
        name: 'Спортивний шолом',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: 'url(../img/f2-items/helmet/helmetSport.webp) center center/contain no-repeat',
        scrapPartsMin: 1,
        scrapPartsMax: 4,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 4,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'helmet',
        description: '<p>Спортивний шолом</p>',
    },
    {
        id: 'welderHelmet',
        name: 'Маска техніка',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: 'url(../img/f2-items/helmet/welderHelmet.webp) center center/contain no-repeat',
        scrapPartsMin: 5,
        scrapPartsMax: 8,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'helmet',
        description: '<p>Маска техніка</p>',
    },
    // mask
    {
        id: 'respirator',
        name: 'Респіратор',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/mask/respirator.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 4,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'mask',
        description: '<p>Респіратор</p>',
    },
    // armor
    {
        id: 'leatherJacket',
        name: 'Шкіряна куртка',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: 'url(../img/f2-items/armor/leatherJacket.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 4,
        ragsPartsMax: 8,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'armor',
        description: '<p>Шкіряна куртка</p>',
    },
    // backpack
    {
        id: 'bag',
        name: 'Проста сумка',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/backpack/bag.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 4,
        ragsPartsMax: 8,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'backpack',
        description: '<p>Проста сумка</p>',
        backpackSize: 3,
    },
    // trinket

    // useOnYourself    
    {
        id: 'meatRaw',
        name: 'Сире м\'ясо',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/useOnYourself/meatRaw.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'useOnYourself',
        description: "<p>Сире м\'ясо</p><p>Ефекти: Здоров'я +5; Ситість +30</p>",
        healthEffect: 5,
        hungerEffect: 30,
        thirstEffect: 0,
        radiationEffect: 0,
    },
    {
        id: 'firstAidKit',
        name: 'Аптечка',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: 'url(../img/f2-items/useOnYourself/firstAidKit.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 1,
        medicinesPartsMax: 5,
        class: 'useOnYourself',
        description: '<p>Аптечка</p>',
        healthEffect: 80,
        hungerEffect: -20,
        thirstEffect: -20,
        radiationEffect: 0,
    },
    {
        id: 'homemadeMedicine',
        name: 'Саморобні ліки',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/useOnYourself/homemadeMedicine.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 2,
        medicinesPartsMin: 1,
        medicinesPartsMax: 3,
        class: 'useOnYourself',
        description: '<p>Саморобні ліки</p>',
        healthEffect: 30,
        hungerEffect: 0,
        thirstEffect: 0,
        radiationEffect: 0,
    },
    {
        id: 'crackers',
        name: 'Запліснявілі сухарі',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/useOnYourself/crackers.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'useOnYourself',
        description: '<p>Запліснявілі сухарі</p>',
        healthEffect: 5,
        hungerEffect: 30,
        thirstEffect: -15,
        radiationEffect: 5,
    },
    {
        id: 'water',
        name: 'Пляшка води',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/useOnYourself/water.webp) center center/contain no-repeat',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,
        class: 'useOnYourself',
        description: '<p>Пляшка води</p>',
        healthEffect: 5,
        hungerEffect: 0,
        thirstEffect: 50,
        radiationEffect: 0,
    },
    {
        id: 'nothing',
        name: 'Нічого',
        img: undefined,
    },
    // quest
    {
        id: 'scorpionTail',
        name: 'Хвіст велетенського скорпіона',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: 'url(../img/f2-items/quest/scorpionTail.webp) center center/cover no-repeat',
        class: 'quest',
        description: '<p>Хвіст велетенського скорпіона</p>',
    },

];

// Наповнюємо глобальні локації локаціями
function addLocation(index, arr) {
    arr.forEach(el => {
        globalLocations[index].locations.push(...locations.filter(location => location.id === el))
    })
};
addLocation(0, ['house0']);
addLocation(1, ['cache', 'house1', 'cave', 'waterSource', 'wilderness']);
addLocation(2, ['village']);
addLocation(3, ['cache', 'gasStation', 'tent', 'waterSource', 'radioactivePuddle', 'ruins']);
addLocation(4, ['klemat']);
addLocation(5, ['cache1', 'gasStation', 'house2', 'tent', 'carJunkyard', 'ruins']);

// Наповнюємо глобальні локації ворогами
function addEnemy(index, arr) {
    arr.forEach(el => {
        globalLocations[index].enemies.unshift(...enemies.filter(enemy => enemy.id === el))
    })
};
addEnemy(1, ['rat', 'scorpion']);
addEnemy(3, ['rat', 'scorpion', 'mole', 'reider0']);
addEnemy(5, ['scorpion', 'mole', 'reider0']);

// Наповнюємо локації предметами
function addItem(parentArr, id, arr) {
    parentArr.forEach(location => {
        if (location.id === id) {
            arr.forEach(el => {
                location.items.push(...items.filter(item => item.id === el))
            })
        }
    })
};
// firstHouse
addItem(locations, 'house0', ['respirator', 'pistolRusty', 'homemadeMedicine', 'crackers']);
// nearFirstHouse
addItem(locations, 'cache', ['knifeCombat', 'helmetSport', 'firstAidKit']);
addItem(locations, 'house1', ['respirator', 'pistolRusty', 'homemadeMedicine', 'crackers']);
addItem(locations, 'cave', ['metalPole', 'knifeRusty', 'crackers']);
addItem(locations, 'waterSource', ['water']);
addItem(locations, 'wilderness', ['knifeRusty', 'nothing']);
// village
addItem(locations, 'gasStation', ['metalPole', 'crackers', 'water']);
addItem(locations, 'tent', ['pistolRusty', 'knifeRusty', 'nothing']);
addItem(locations, 'radioactivePuddle', ['nothing']);
addItem(locations, 'ruins', ['nothing']);
// klemat
addItem(locations, 'cache1', ['huntingRifle', 'welderHelmet', 'firstAidKit']);
addItem(locations, 'house2', ['mouser9mm', 'homemadeMedicine', 'water', 'nothing']);

// Додати ворогам предмети
addItem(enemies, 'rat', ['meatRaw']);
addItem(enemies, 'scorpion', ['meatRaw']);
addItem(enemies, 'mole', ['meatRaw']);
addItem(enemies, 'reider0', ['leatherJacket', 'mouser9mm']);
addItem(enemies, 'hugeScorpion', ['scorpionTail']);

// Квести
const questBook = [
    {
        id: 'quest0',
        startLocationId: 'firstHouse',
        startLocationName: 'Дім',
        finishLocationId: 'village',
        finishLocationName: 'Хутор',
        questGiver: '',
        questAccept: 'Po',
        startMessage: [
            `Це квест-виживання у постапокаліптичному світі. Твоя історія починається у старій халупі в пустелі - це твій дім. Ти пригадуєш, що напередодні домовився зі старим По з хутора неподалік про зустріч.`
        ],
        finishMessage: [
            `Ви виконали квест - дійти до хутора. Поговоріть з старим По.`
        ],
        startMessageForQuestBook: 'Дійти до хутора',
        finishMessageForQuestBook: 'Ви виконали квест - дійти до хутора.',
        available: true,
        active: true,
        condition: () => {
            for (let i = 0; i < globalLocations.length; i++) {
                if (globalLocations[i].id === 'village' && globalLocations[i].active) {
                    return true
                }
            }
        },
        completed: false,
        addInList: true,
        showNextLocation: true,
        payment: () => {
            addExperience(100);
            addLog(`Отримано 100 очків досвіду`);
            items.forEach(item => {
                if (item.id === 'knifeCombat') {
                    searchResult = item;
                    putInBackpack();
                }
            });
            items.forEach(item => {
                if (item.id === 'bag') {
                    searchResult = item;
                    putInBackpack();
                }
            });
        },
    },
    {
        id: 'quest1',
        startLocationId: 'village',
        startLocationName: 'Хутор',
        finishLocationId: 'village',
        finishLocationName: 'Хутор',
        questGiver: 'Po',
        questAccept: 'Po',
        startMessage: [
            "Ти дойшов до хутора де проживає старий По і ще декілька бродяг.<br>Перед тобою апартаменти По, це пом'ятий білий холодильник і великий деревянний ящик. В першому По спить, в другому - робить все інше.",
            `Старий По:<br> - Прийшов? Добре! Я вирішив що хочу допомогти тобі. Не варто такому перспективному юнакові витрачати своє життя в цьому глухому куті. Я вкажу тобі дорогу до міста Клемат, де на тебе чекає...<br>...ну не знаю... щось краще ніж ти маєш зараз...`,
            "Ви думаєте що в чомусь По правий, тут точно робити нічого...",
            "Старий По:<br> - Але не просто так! Принеси мені хоча б якийсь запас їжі, підійде навіть сире м'ясо.",
        ],
        finishMessage: [
            "Ви виконали квест - принести 5 шматків сирого м'яса."
        ],
        startMessageForQuestBook: "Принести По 5 шматків сирого м'яса",
        finishMessageForQuestBook: "Ви виконали квест - принести 5 шматків сирого м'яса.",
        available: false,
        active: false,
        condition: () => {
            let qestItemCount = 0;
            user.backpack.forEach(item => {
                if (item && item.id === 'meatRaw') {
                    qestItemCount += 1;
                }
            })
            if (qestItemCount >= 2) {
                qestItemCount = 2;
                user.backpack.forEach(item => {
                    if (item && item.id === 'meatRaw' && qestItemCount > 0) {
                        qestItemCount -= 1;
                        user.backpack[user.backpack.indexOf(item)] = undefined;
                    }
                })
                return true;
            } else {
                return false;
            }
        },
        completed: false,
        addInList: false,
        showNextLocation: false,
        payment: () => {
            addExperience(200);
            addLog(`Отримано 200 очків досвіду`)
            addEnemy(3, ['hugeScorpion']);
        },
    },
    {
        id: 'quest2',
        startLocationId: 'village',
        startLocationName: 'Хутор',
        finishLocationId: 'village',
        finishLocationName: 'Хутор',
        questGiver: 'Po',
        questAccept: 'Po',
        startMessage: [
            "Старий По:<br> - За м'ясо дякую, стане в нагоді. Маю до тебе ще одне прохання...",
            "Старий По:<br> - Останнім часом в околицях стало з'являтися все більше скорпіонів мутантів. Я вже мав справу з подібною проблемою. Ці потовори десь в околицях організували гніздо, потрібно його знищити...",
            "Старий По:<br> - Тобі не варто боятися що там буде ціла купа скорпіонів, це не так. Там буде  лише один скорпіон, точніше...<br> скорпіониха...<br>і вона буде дещо більша...<br>",
            "Старий По:<br> - Принеси мені хвіст цієї паскуди. В нагороду отримаєш мій рюкзак, дуже корисна для подорожі річ.",
        ],
        finishMessage: [
            "Ви виконали квест - принести хвіст велетенського скорпіона. Ви отримуєте саморобну сумку",
            "Старий По:<br> - Дякую друже, ти нас дуже виручив. Я обіцяв тобі вказати дорогу до міста Клемат... ",
            "По відмічає на вашій карті як добратися до міста Клемат",
            "Старий По:<br> - Знайди в Клематі мого знайомого, його звати Віскі Боб, можливо він зможе тобі допомогти. Однак не чекай від нього безкоштовної допомоги, він точно не такий безкорисний як я...",
        ],
        startMessageForQuestBook: "Принести По хвіст велетенського скорпіона",
        finishMessageForQuestBook: "Ви виконали квест - принести хвіст велетенського скорпіона",
        available: false,
        active: false,
        condition: () => {
            let qestItemCount = 0;
            user.backpack.forEach(item => {
                if (item && item.id === 'scorpionTail') {

                    qestItemCount += 1;
                }
            })
            if (qestItemCount >= 1) {
                qestItemCount = 1;
                user.backpack.forEach(item => {
                    if (item && item.id === 'scorpionTail' && qestItemCount > 0) {
                        qestItemCount -= 1;
                        user.backpack[user.backpack.indexOf(item)] = undefined;
                    }
                })
                return true;
            } else {
                return false;
            }
        },
        completed: false,
        addInList: false,
        showNextLocation: false,
        payment: () => {
            addExperience(500);
            addLog(`Отримано 500 очків досвіду`)
            globalLocations[4].active = true;
            globalLocations[5].active = true;
            items.forEach(item => {
                if (item.id === 'bag') {
                    searchResult = item;
                    putInBackpack();
                }
            });
        },
    },
    {
        id: 'quest3',
        startLocationId: 'klemat',
        startLocationName: 'Клемат',
        finishLocationId: 'klemat',
        finishLocationName: 'Клемат',
        questGiver: 'viskyBob',
        questAccept: 'viskyBob',
        startMessage: [
            "Віскі Боб:<br> - А ти що за хрін? Милостиню не подаю ...",
            "... в тебе виникає бажання вибити Бобу останні зуби, але здоровий глузд підказує що місцевий охоронець наврятче не помітить цього. Ти ввічливо нагадуєш Віскі Бобу про старого По з хутора ...",
            "Віскі Боб:<br> - По? Та він же був старим ще коли я мав всі зуби. Невже він досі живий!?",
            "Віскі Боб:<br> - Добре малий, маю до тебе прибуткову пропозицію. В околицях розташована моя самогонна установка, потрібно принести звідти партію товару. Май на увазі, якщо вкрадеш самогон, я тебе з під землі дістану.",
            "Віскі Боб:<br> - Виконаєш завдання - непогано підзаробиш і здобудеш репутацію надійної людини, а це в нашому місті дорожче металу. Все, досить витрачати мій час ...",
        ],
        finishMessage: [
            "Ви виконали квест - принести партію самогону.",
            "Віскі Боб:<br> - Окей партнер",
        ],
        startMessageForQuestBook: "Принести Віскі Бобу партію самогону",
        finishMessageForQuestBook: "Ви виконали квест - принести Віскі Бобу партію самогону",
        available: false,
        active: false,
        condition: () => {
            user.backpack.forEach(item => {
                if (item && item.id === 'canister') {
                    user.backpack[user.backpack.indexOf(item)] = undefined;
                    return true;
                } else {
                    return false;
                }
            })
        },
        completed: false,
        addInList: false,
        showNextLocation: false,
        payment: () => {
            addExperience(300);
            items.forEach(item => {
                if (item.id === 'shotgun') {
                    searchResult = item;
                    putInBackpack();
                }
            });
            addLog(`Отримано 300 очків досвіду. В нагороду ти отримуєш обріз`);
        },
    },
];

let messageCount = 0;
function showModalMessage(messages) {
    modalWindowMessage.innerHTML = '';
    modalWindow.classList.remove('hidden');
    for (let i = 0; i < messages.length; i++) {
        if (i === 0) {
            modalWindowMessage.innerHTML += `<p class="modal-message">${messages[i]}</p>`
        } else {
            modalWindowMessage.innerHTML += `<p class="modal-message hidden">${messages[i]}</p>`
        }
    }
};

function nextMessage() {
    let messages = document.querySelectorAll('.modal-message');
    if (messageCount === messages.length - 1) {
        modalWindow.classList.add('hidden');
        messageCount = 0;
    } else {
        for (let i = 0; i < messages.length; i++) {
            if (!messages[i].classList.contains('hidden')) {
                messages[i].classList.add('hidden');
                if (messages[i + 1]) {
                    messages[i + 1].classList.remove('hidden');
                }
                messageCount += 1;
                break;
            }
        }
    }
};

function questLine() {
    for (let i = 0; i < questBook.length; i++) {
        if (questBook[i].questAccept === event.target.getAttribute('id')) {
            // Закінчення квесту
            if (questBook[i].active && !questBook[i].completed) {
                if (questBook[i].condition() === true) {
                    if (checkEmptyCellsOfBackPack() > 0) {
                        questBook[i].completed = true;
                        showModalMessage(questBook[i].finishMessage);
                        addLog(`<span style="color: #fff;">${questBook[i].finishMessageForQuestBook}</span>`);
                        questBook[i].active = false;
                        questBook[i].available = false;
                        questBook[i].payment();
                        questBook[i + 1].available = true;
                        break;
                    } else {
                        showModalMessage(["Рюкзак заповнений, звільніть місце"]);
                        break;
                    }                    
                }             
            }
            // Початок квесту
            else if (questBook[i].available) {
                questBook[i].active = true;
                questBook[i].addInList = true;
                currentQuest = questBook[i];
                showModalMessage(questBook[i].startMessage)
                addLog(`<span style="color: #fff;">${questBook[i].startMessageForQuestBook}</span>`);
                break;
            } else {
                showModalMessage([`Умови поточного квесту не виконані`])
            }
        }
    }
};

modalWindowBtn.addEventListener('click', nextMessage);

// Створюємо юзера
const user = {
    name: '',
    level: 1,
    experience: 0,    
    minDamage: 1,
    maxDamage: 2,
    health: 100,
    maxHealth: 100,
    hunger: 100,
    maxHunger: 100,
    thirst: 100,
    maxThirst: 100,
    radiation: 0,
    maxRadiation: 100,
    backpackSize: 10,
    backpack: [],
    equippedWeapon: [undefined],
    equippedHelmet: [undefined],
    equippedMask: [undefined],
    equippedArmor: [undefined],
    equippedBackpack: [undefined],
    scrapAmount: 0,
    electronicsAmount: 0,
    ragsAmount: 0,
    medicinesAmount: 0,
    currentGlobalLocation: globalLocations[0],
    currentLocation: globalLocations[0].locations[globalLocations[0].locations.length - 1],
    curentDate: new Date(2211, 0, 1, 0, 0),
    currentQuest: questBook[0],
};

showModalMessage(user.currentQuest.startMessage);

// Починаємо відлік часу
const date = document.querySelector('.date');
function displayCurentDate() {
    let currentMonthName = user.curentDate.toString().split(' ')[1];
    date.innerHTML = `${user.curentDate.getDate()} ${currentMonthName}, ${user.curentDate.getFullYear()}`;
};
displayCurentDate();

// Життєві показники персонажа
const healthIndex = document.querySelector('.health-index');
const hungerIndex = document.querySelector('.hunger-index');
const thirstIndex = document.querySelector('.thirst-index');
const radiationIndex = document.querySelector('.radiation-index');
healthIndex.innerHTML = user.health;
hungerIndex.innerHTML = user.hunger;
thirstIndex.innerHTML = user.thirst;
radiationIndex.innerHTML = user.radiation;

// Створюємо рюкзак
// Деталі
const scrapCount = document.querySelector('.scrap-count');
scrapCount.innerHTML = user.scrapAmount;

const electronicsCount = document.querySelector('.electronics-count');
electronicsCount.innerHTML = user.electronicsAmount;

const ragsCount = document.querySelector('.rags-count');
ragsCount.innerHTML = user.ragsAmount;

const medicinesCount = document.querySelector('.medicines-count');
medicinesCount.innerHTML = user.medicinesAmount;

// Рюкзак
const backpackInHtml = document.querySelector('.backpack');
for (let i = 0; i < user.backpackSize; i++) {
    user.backpack.push(undefined);
};

function checkEmptyCellsOfBackPack() {
    let amount = 0;
    user.backpack.forEach(el => el ? amount : amount += 1)
    return amount;
};

function changeBackpack(backpackSize) {
    user.backpackSize += backpackSize;
    for (let i = user.backpack.length; i < user.backpackSize; i++) {
        user.backpack.push(undefined);
    };
};

// Додаткові змінні
let currentEnemy;
let enemyHealth;
let searchResult;
let log;

// Основні дії
// Кнопки дій
const reidhBtn = document.querySelector('.reid');
const reidFinishhBtn = document.querySelector('.reid-finish');
const barterBtn = document.querySelector('.barter');
const speakBtn = document.querySelector('.speak');
const searchBtn = document.querySelector('.search');
const changeLocationBtn = document.querySelector('.change-location');
const attackBtn = document.querySelector('.attack');
const avoidBtn = document.querySelector('.avoid');
const questsBtn = document.querySelector('.quests');
const skillsBtn = document.querySelector('.skills');
const perksBtn = document.querySelector('.perks');
const backBtn = document.querySelector('.back');

const eventLog = document.querySelector('.event-log');
const speakLog = document.querySelector('.speak-log');
const expCount = document.querySelector('.exp-count');
const level = document.querySelector('.level');

function addExperience(value) {
    let n;
    value === 'regular' ? n = 5 :
        value === 'unusual' ? n = 15 : n = value;
    user.experience += n;
    let expToNextLevel = (user.level + 1) * user.level / 2 * 1000;
    if (user.experience >= expToNextLevel) {
        user.level += 1;
        expToNextLevel = (user.level + 1) * user.level / 2 * 1000;
    }
    level.innerHTML = `Рівень: ${user.level}. ${user.experience}/${expToNextLevel}`;

    const expFull = document.querySelector('.exp-full');
    const expEmpty = document.querySelector('.exp-empty');
    let expFullWidth = user.experience / expToNextLevel * 100;
    let expEmptyWidth = 100 - expFullWidth;

    expFull.style.width = `${expFullWidth}%`;
    expEmpty.style.width = `${expEmptyWidth}%`;
};
addExperience(0);

function reidStart() {
    user.curentDate.setHours(user.curentDate.getHours() + 1);
    displayCurentDate();
    reidhBtn.classList.add('hidden');
    barterBtn.classList.add('hidden');
    speakBtn.classList.add('hidden');
    searchBtn.classList.add('hidden');
    changeLocationBtn.classList.remove('hidden');
    reidFinishhBtn.classList.remove('hidden');
    eventLog.classList.remove('hidden');
    speakLog.classList.add('hidden');

    for (let i = 0; i < globalLocations.length; i++) {
        if (user.currentGlobalLocation.id === globalLocations[i].id) {
            user.currentGlobalLocation = globalLocations[i + 1];
            user.currentLocation = user.currentGlobalLocation.locations[user.currentGlobalLocation.locations.length - 1];
            img.style.background = user.currentLocation.img;
            addLog(user.currentLocation.message);
            break;
        }
    }
};

function reidFinish() {
    for (let i = 0; i < globalLocations.length; i++) {
        if (globalLocations[i].id === user.currentGlobalLocation.id) {
            user.currentGlobalLocation = globalLocations[i - 1];
            changeLocation();
            img.style.background = user.currentLocation.img;
            currentEnemy = undefined;
            break;
        }
    }
    reidhBtn.classList.remove('hidden');
    reidFinishhBtn.classList.add('hidden');
    barterBtn.classList.remove('hidden');
    speakBtn.classList.remove('hidden');
    searchBtn.classList.add('hidden');
    changeLocationBtn.classList.add('hidden');
    attackBtn.classList.add('hidden');
    avoidBtn.classList.add('hidden');
};

function mapFound() {
    if (user.currentQuest.showNextLocation) {
        if (randomNumber() <= 30) {
            for (let i = 0; i < globalLocations.length; i++) {
                if (user.currentGlobalLocation === globalLocations[i] && !globalLocations[i + 1].active) {
                    globalLocations[i + 1].active = true;
                    globalLocations[i + 2].active = true;
                    user.currentQuest.showNextLocation = false;
                    showModalMessage([`Ти з'ясував місце розташування локації ${globalLocations[i + 1].name}.`])
                    addLog(`<span style="color: #fff;">Ти з'ясував місце розташування локації ${globalLocations[i + 1].name}.</span>`);
                    break;
                }
            }
        }
    }
};

function search() {
    user.curentDate.setMinutes(user.curentDate.getMinutes() + 15);
    displayCurentDate();

    if (checkEmptyCellsOfBackPack() > 0) {
        alert();
        action();
        if (currentEnemy !== undefined) {
            searchResult = currentEnemy.items[choiceResult(currentEnemy.items.length)];
            addLog(`Ти знайшов <span class="item" style="color:${searchResult.rarenessColor}">${searchResult.name}</span>. Тут нічого не залишилось, варто йти далі.`)
            putInBackpack();
            currentEnemy = undefined;
            searchBtn.classList.add('hidden');
            changeLocationBtn.classList.remove('hidden');
        } else if (countOfSearch > 0) {
            searchResult = user.currentLocation.items[choiceResult(user.currentLocation.items.length)];
            countOfSearch -= 1;
            mapFound();

            if (searchResult.id !== 'nothing') {
                if (countOfSearch > 0) {
                    addLog(`Ти знайшов <span class="item" style="color:${searchResult.rarenessColor}">${searchResult.name}</span>. Варто пошукати ще.`);
                } else {
                    addLog(`Ти знайшов <span class="item" style="color:${searchResult.rarenessColor}">${searchResult.name}</span>. Тут нічого не залишилось, варто йти далі.`);
                    searchBtn.classList.add('hidden');
                    changeLocationBtn.classList.remove('hidden');
                }
                putInBackpack();
                addExperience(searchResult.rareness);
            } else {
                addLog('Ти нічого не знайшов.');
            };
        } else {
            addLog('Тут нічого не залишилось, варто йти далі.');
            searchBtn.classList.add('hidden');
            changeLocationBtn.classList.remove('hidden');
        }
    } else {
        addLog('Рюкзак заповнений, потрібно звільнити місце');
    }
};

function alert() {
    if (user.hunger <= 10 && user.thirst <= 10) {
        addLog('Ти хочеш їсти і пити, якщо рівень голоду чи спраги зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    } else if (user.hunger <= 10) {
        addLog('Ти хочеш їсти, якщо рівень голоду зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    } else if (user.thirst <= 10) {
        addLog('Ти хочеш пити, якщо рівень спраги зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    }
};

function action() {
    user.hunger -= 2;
    if (user.hunger < 0) {
        user.hunger = 0;
        user.health -= 5;
        healthIndex.innerHTML = user.health;
    };
    hungerIndex.innerHTML = user.hunger;

    user.thirst -= 3;
    if (user.thirst < 0) {
        user.thirst = 0;
        user.health -= 5;
        healthIndex.innerHTML = user.health;
    };
    thirstIndex.innerHTML = user.thirst;

    if (user.health < 0) {
        user.health = 0;
    };
};

function addLog(log, color = '#3a981c') {
    let hoursInHtml;
    let minutesInHtml;
    user.curentDate.getHours() < 10 ? hoursInHtml = `0${user.curentDate.getHours()}` : hoursInHtml = `${user.curentDate.getHours()}`;
    user.curentDate.getMinutes() < 10 ? minutesInHtml = `0${user.curentDate.getMinutes()}` : minutesInHtml = `${user.curentDate.getMinutes()}`;
    eventLog.innerHTML += `<p style="color:${color}"><span class="time">[${hoursInHtml}:${minutesInHtml}]</span> ${log}</p>`;
    // Додати видалення логів після переповнення
};
addLog(user.currentLocation.message);
addLog(user.currentQuest.startMessageForQuestBook, '#fff');

function putInBackpack() {
    for (let i = 0; i < user.backpack.length; i++) {
        if (user.backpack[i] === undefined) {
            user.backpack[i] = searchResult;
            // emptyCellsOfBackPack -= 1;
            break;
        }
    }
};

function choiceResult(amount) {
    let firstElChance;
    let secondElChance;
    let thirdElChance;
    let fourthElChance;
    let fifthElChance;
    let sixthChance;

    if (amount === 1) {
        firstElChance = 100;
    } else if (amount === 2) {
        firstElChance = 40;
        secondElChance = 100;
    } else if (amount === 3) {
        firstElChance = 20;
        secondElChance = 55;
        thirdElChance = 100;
    } else if (amount === 4) {
        firstElChance = 15;
        secondElChance = 35;
        thirdElChance = 65;
        fourthElChance = 100;
    } else if (amount === 5) {
        firstElChance = 5;
        secondElChance = 15;
        thirdElChance = 35;
        fourthElChance = 75;
        fifthElChance = 100;
    } else if (amount === 6) {
        firstElChance = 2;
        secondElChance = 6;
        thirdElChance = 18;
        fourthElChance = 36;
        fifthElChance = 60;
        sixthChance = 100;
    }
    let arr = [];
    arr.push(firstElChance, secondElChance, thirdElChance, fourthElChance, fifthElChance, sixthChance);

    let someRandomNumber = randomNumber();

    for (let i = 0; i < arr.length; i++) {
        if (someRandomNumber <= arr[i]) {
            return i;
        }
    };
};

function changeLocation() {
    alert();
    action();
    user.curentDate.setMinutes(user.curentDate.getMinutes() + 30);
    displayCurentDate();

    if (randomNumber() <= user.currentGlobalLocation.findLocationChance) {
        for (const el of user.currentGlobalLocation.locations) {
            user.currentLocation = user.currentGlobalLocation.locations[choiceResult(user.currentGlobalLocation.locations.length)];
            img.style.background = user.currentLocation.img;
            countOfSearch = user.currentLocation.countOfSearch;
            if (countOfSearch > 0) {
                searchBtn.classList.remove('hidden');
                changeLocationBtn.classList.add('hidden');
            } else {
                searchBtn.classList.add('hidden');
                changeLocationBtn.classList.remove('hidden');
            }
        }
        addLog(user.currentLocation.message);
    } else {
        currentEnemy = user.currentGlobalLocation.enemies[choiceResult(user.currentGlobalLocation.enemies.length)];
        enemyHealth = currentEnemy.health;
        addLog(currentEnemy.message);
        img.style.background = currentEnemy.img;
        battleStart();
    }
};

function battleStart() {
    searchBtn.classList.add('hidden');
    changeLocationBtn.classList.add('hidden');
    attackBtn.classList.remove('hidden');
    avoidBtn.classList.remove('hidden');
    reidFinishhBtn.classList.add('hidden');
};

function userAttack() {
    let damage = user.minDamage + Math.round((user.maxDamage - user.minDamage) * randomNumber() / 100);
    return damage;
};

function enemyAttack() {
    let damage = currentEnemy.minDamage + Math.round((currentEnemy.maxDamage - currentEnemy.minDamage) * randomNumber() / 100);
    return damage;
};

function battleFinish() {
    searchBtn.classList.remove('hidden');
    changeLocationBtn.classList.add('hidden');
    attackBtn.classList.add('hidden');
    avoidBtn.classList.add('hidden');
    reidFinishhBtn.classList.remove('hidden');
};

function attack() {
    user.curentDate.setMinutes(user.curentDate.getMinutes() + 2);
    displayCurentDate();

    const damageOfUser = userAttack();
    enemyHealth -= damageOfUser;
    const damageOfEnemy = enemyAttack();
    user.health -= damageOfEnemy;
    healthIndex.innerHTML = user.health;
    addLog(`Ти атакуєш ворога(${damageOfUser}). ${currentEnemy.name} атакує тебе (${damageOfEnemy}).`);

    if (enemyHealth <= 0) {
        addLog(`Ти вбив ворога. Варто обшукати.`);
        addExperience(currentEnemy.exp)
        battleFinish();
    }
};

function avoid() {
    user.curentDate.setMinutes(user.curentDate.getMinutes() + 10);
    displayCurentDate();
    battleFinish();
    addLog(`Ти втік від ${currentEnemy.name}.`);
    currentEnemy = undefined;
    changeLocation();
};

reidhBtn.addEventListener('click', reidStart);
reidFinishhBtn.addEventListener('click', reidFinish);
avoidBtn.addEventListener('click', avoid);
attackBtn.addEventListener('click', attack);
changeLocationBtn.addEventListener('click', changeLocation);
searchBtn.addEventListener('click', search);

// Кнопки основного меню
const logBtn = document.querySelector('.log-btn');
const backpackBtn = document.querySelector('.backpack-btn');
const userMenuBtn = document.querySelector('.user-menu-btn');
const mapBtn = document.querySelector('.map-btn');
const settingsBtn = document.querySelector('.backpack-btn');

const questsBookInHtml = document.querySelector('.quests-book');
const locationsBookInHtml = document.querySelector('.locations-book');


function logUse() {
    blockLog.forEach(el => el.classList.remove('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));

    eventLog.classList.remove('hidden');
    speakLog.classList.add('hidden');
};

function backpackUse() {
    blockBackpack.forEach(el => el.classList.remove('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));
    showBackpack();
};

function userMenuUse() {
    blockUserMenu.forEach(el => el.classList.remove('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));
    showQuestLocations();
};

function mapUse() {
    blockMap.forEach(el => el.classList.remove('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    showLocations();
};

logBtn.addEventListener('click', logUse);
backpackBtn.addEventListener('click', backpackUse);
userMenuBtn.addEventListener('click', userMenuUse);
mapBtn.addEventListener('click', mapUse);
speakBtn.addEventListener('click', showNPC);
backBtn.addEventListener('click', showQuestLocations);

function showBackpack() {
    backpackInHtml.innerHTML = '';
    for (let i = 0; i < user.backpackSize; i++) {
        backpackInHtml.innerHTML += `<div class="backpack-item-box"><div class="backpack-item empty" onclick="select()" id="${i}-backpack-item"></div></div>`;
    }
    for (let i = 0; i < (25 - user.backpackSize); i++) {
        backpackInHtml.innerHTML += `
        <div class="backpack-item-box"><div class="backpack-item close" id="${i + user.backpackSize}-backpack-item">
            <img src="img/close.svg" alt="">
        </div></div>`;
    }

    let backpackItems = document.querySelectorAll('.backpack-item');
    for (let i = 0; i < backpackItems.length; i++) {
        for (let i = 0; i < user.backpack.length; i++) {
            if (user.backpack[i] && backpackItems[i].classList.contains('empty')) {
                backpackItems[i].style.background = user.backpack[i].img;
                backpackItems[i].classList.remove('empty');
                backpackItems[i].classList.add('full');
            }
        }
    }
};

function showQuestLocations() {
    questsBookInHtml.innerHTML = '';
    for (let i = 0; i < questBook.length; i++) {
        if (questBook[i].addInList) {
            if (questBook[i - 1] && questBook[i].startLocationId === questBook[i - 1].startLocationId) {
                continue;
            } else {
                questsBookInHtml.innerHTML += `<div class="quest-location" onclick="showQuests()" id="${questBook[i].startLocationId}">${questBook[i].startLocationName}</div>`;
            }
        }
    }
};

function showQuests() {
    questBook.forEach(quest => {
        if (quest.startLocationId === event.target.getAttribute('id') && quest.addInList) {
            document.querySelectorAll('.quest-location').forEach(el => el.remove())
            quest.completed ? questsBookInHtml.innerHTML += `<p style="text-decoration: line-through">${quest.startMessageForQuestBook}</p>` : questsBookInHtml.innerHTML += `<p>${quest.startMessageForQuestBook}</p>`
        }
    })
}

function showLocations() {
    locationsBookInHtml.innerHTML = '';
    globalLocations.forEach(location => {
        if (location.active && location.type === 'peaceful') {
            locationsBookInHtml.innerHTML += `<div onclick="changeGlobalLocation()" class="map-location" id="${location.id}">${location.name}</div>`;
        }
    })
};

function changeGlobalLocation() {
    globalLocations.forEach(location => {
        if (location.id === event.target.getAttribute('id')) {
            user.currentGlobalLocation = location;
            user.currentLocation = location.locations[0];
            currentEnemy = undefined;
            img.style.background = user.currentLocation.img;
            reidhBtn.classList.remove('hidden');
            reidFinishhBtn.classList.add('hidden');
            barterBtn.classList.remove('hidden');
            speakBtn.classList.remove('hidden');
            searchBtn.classList.add('hidden');
            changeLocationBtn.classList.add('hidden');
            attackBtn.classList.add('hidden');
            avoidBtn.classList.add('hidden');
            logUse();
            addLog(user.currentLocation.message);
        }
    })
};

function showNPC() {
    eventLog.classList.add('hidden');
    speakLog.classList.remove('hidden');
    speakLog.innerHTML = '';
    user.currentGlobalLocation.npc.forEach(el => speakLog.innerHTML += `<p onclick="questLine()" class="npc" id="${el.id}">${el.name}</p>`);
};

// Виділення предмета 
let selectedItemInHTML;
let selectedItem;

const equipment = document.querySelector('.equipment');
const equipmentItems = document.querySelectorAll('.equipment-item');
const equipmentWeapon = document.querySelector('.equipment-weapon');
const equipmentHelmet = document.querySelector('.equipment-helmet');
const equipmentMask = document.querySelector('.equipment-mask');
const equipmentArmor = document.querySelector('.equipment-armor');
const equipmentBackpack = document.querySelector('.equipment-backpack');

function select() {
    deselect();
    selectedItemInHTML = event.target;
    if (selectedItemInHTML.classList.contains('backpack-item')) {
        selectedItem = user.backpack[parseInt(selectedItemInHTML.id)];
    } else if (selectedItemInHTML.classList.contains('equipment-weapon')) {
        selectedItem = user.equippedWeapon[0];
    } else if (selectedItemInHTML.classList.contains('equipment-helmet')) {
        selectedItem = user.equippedHelmet[0];
    } else if (selectedItemInHTML.classList.contains('equipment-mask')) {
        selectedItem = user.equippedMask[0];
    } else if (selectedItemInHTML.classList.contains('equipment-armor')) {
        selectedItem = user.equippedArmor[0];
    } else if (selectedItemInHTML.classList.contains('equipment-backpack')) {
        selectedItem = user.equippedBackpack[0];
    }

    selectedItemInHTML.classList.add('selected');
    if (selectedItem) {
        itemDescription.innerHTML = selectedItem.description;
    }    
};

function deselect() {
    let backpackItems = document.querySelectorAll('.backpack-item');
    backpackItems.forEach(el => {
        el.classList.remove('selected')
    });
    equipmentItems.forEach(el => {
        el.classList.remove('selected')
    });
    selectedItemInHTML = undefined;
    selectedItem = undefined;
};

// Дії з предметами
const useBtn = document.querySelector('.use-btn');
const apartBtn = document.querySelector('.apart-btn');
const deleteBtn = document.querySelector('.delete-btn');

function deleteItem() {
    if (selectedItemInHTML.classList.contains('backpack-item')) {
        user.backpack[parseInt(selectedItemInHTML.id)] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-weapon')) {
        user.equippedWeapon[0] = undefined;
        user.minDamage = 1;
        user.maxDamage = 2;
    } else if (selectedItemInHTML.classList.contains('equipment-helmet')) {
        user.equippedHelmet[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-mask')) {
        user.equippedMask[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-armor')) {
        user.equippedArmor[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-backpack')) {
        user.equippedBackpack[0] = undefined;
        user.backpackSize = 10;
    }
    selectedItem = undefined;
    selectedItemInHTML.innerHTML = '';
    itemDescription.innerHTML = '';
    selectedItemInHTML.classList.remove('full');
    selectedItemInHTML.classList.add('empty');
    selectedItemInHTML.classList.remove('selected');
    showBackpack();
};

function apart() {
    let someRandomNumber = randomNumber();

    let scrapResult = selectedItem.scrapPartsMin + Math.round((selectedItem.scrapPartsMax - selectedItem.scrapPartsMin) / 100 * someRandomNumber);
    user.scrapAmount += scrapResult;
    scrapCount.innerHTML = user.scrapAmount;

    let electronicsResult = selectedItem.electronicsPartsMin + Math.round((selectedItem.electronicsPartsMax - selectedItem.electronicsPartsMin) / 100 * someRandomNumber);
    user.electronicsAmount += electronicsResult;
    electronicsCount.innerHTML = user.electronicsAmount;

    let ragsResult = selectedItem.ragsPartsMin + Math.round((selectedItem.ragsPartsMax - selectedItem.ragsPartsMin) / 100 * someRandomNumber);
    user.ragsAmount += ragsResult;
    ragsCount.innerHTML = user.ragsAmount;

    let medicinesResult = selectedItem.medicinesPartsMin + Math.round((selectedItem.medicinesPartsMax - selectedItem.medicinesPartsMin) / 100 * someRandomNumber);
    user.medicinesAmount += medicinesResult;
    medicinesCount.innerHTML = user.medicinesAmount;

    deleteItem();
};

function use() {
    if (selectedItem.class === 'useOnYourself') {
        user.health += selectedItem.healthEffect;
        user.health > user.maxHealth ? user.health = user.maxHealth : user.health;
        user.hunger += selectedItem.hungerEffect;
        user.hunger > user.maxHunger ? user.hunger = user.maxHunger : user.hunger;
        user.hunger < 0 ? user.hunger = 0 : user.hunger;
        user.thirst += selectedItem.thirstEffect;
        user.thirst > user.maxThirst ? user.thirst = user.maxThirst : user.thirst;
        user.thirst < 0 ? user.thirst = 0 : user.thirst;
        user.radiation += selectedItem.radiationEffect;
        healthIndex.innerHTML = user.health;
        hungerIndex.innerHTML = user.hunger;
        thirstIndex.innerHTML = user.thirst;
        radiationIndex.innerHTML = user.radiation;
        deleteItem();
        alert();
        return;

    } else if (selectedItem.class === 'weapon') {
        if (user.equippedWeapon[0] !== undefined) {
            if (user.equippedWeapon[0] !== selectedItem) {
                let saveItem = user.equippedWeapon[0];
                user.equippedWeapon[0] = selectedItem;
                equipmentWeapon.style.background = selectedItem.img;

                user.backpack[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.style.background = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentWeapon.innerText = ''
            equipmentWeapon.style.background = selectedItem.img;
            equipmentWeapon.classList.remove('empty');
            equipmentWeapon.classList.add('full');
            user.equippedWeapon[0] = selectedItem;
            deleteItem();
        }
        user.minDamage = user.equippedWeapon[0].minDamage;
        user.maxDamage = user.equippedWeapon[0].maxDamage;
        return;

    } else if (selectedItem.class === 'helmet') {
        if (user.equippedHelmet[0] !== undefined) {
            if (user.equippedHelmet[0] !== selectedItem) {
                let saveItem = user.equippedHelmet[0];
                user.equippedHelmet[0] = selectedItem;
                equipmentHelmet.style.background = selectedItem.img;
                user.backpack[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.style.background = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentHelmet.innerText = ''
            equipmentHelmet.style.background = selectedItem.img;
            user.equippedHelmet[0] = selectedItem;
            deleteItem();
        }
        return;

    } else if (selectedItem.class === 'mask') {
        if (user.equippedMask[0] !== undefined) {
            if (user.equippedMask[0] !== selectedItem) {
                let saveItem = user.equippedMask[0];
                user.equippedMask[0] = selectedItem;
                equipmentMask.style.background = selectedItem.img;
                user.backpack[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.style.background = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentMask.innerText = ''
            equipmentMask.style.background = selectedItem.img;
            user.equippedMask[0] = selectedItem;
            deleteItem();
        }
        return;

    } else if (selectedItem.class === 'armor') {
        if (user.equippedArmor[0] !== undefined) {
            if (user.equippedArmor[0] !== selectedItem) {
                let saveItem = user.equippedArmor[0];
                user.equippedArmor[0] = selectedItem;
                equipmentArmor.style.background = selectedItem.img;
                user.backpack[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.style.background = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentArmor.style.background = selectedItem.img;
            user.equippedArmor[0] = selectedItem;
            deleteItem();
        }
        return;
    } else if (selectedItem.class === 'backpack') {
        if (user.equippedBackpack[0] !== undefined) {
            if (user.equippedBackpack[0] !== selectedItem) {
                let saveItem = user.equippedBackpack[0];
                user.equippedBackpack[0] = selectedItem;
                equipmentBackpack.style.background = selectedItem.img;
                user.backpack[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.style.background = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentBackpack.innerText = ''
            equipmentBackpack.style.background = selectedItem.img;
            equipmentBackpack.style.backgroundSize = 'auto 80%';
            user.equippedBackpack[0] = selectedItem;
            deleteItem();
        }
        changeBackpack(user.equippedBackpack[0].backpackSize);
        showBackpack();
        return;
    }
};

deleteBtn.addEventListener('click', deleteItem);
apartBtn.addEventListener('click', apart);
useBtn.addEventListener('click', use);






