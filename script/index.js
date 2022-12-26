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
img.style.background = 'url(../img/locations/house0.png) center center/cover no-repeat';

const itemDescription = document.querySelector('.item-description');

function randomNumber() {
    return Math.round(Math.random() * 100);
}

// Створюємо юзера
const user = {
    name: '',
    level: 1,
    experience: 0,
    backpackSize: 10,
    minDamage: 1,
    maxDamage: 2,
    maxHealth: 100,
    maxHunger: 100,
    maxThirst: 100,
};

const healthIndex = document.querySelector('.health-index');
const hungerIndex = document.querySelector('.hunger-index');
const thirstIndex = document.querySelector('.thirst-index');
const radiationIndex = document.querySelector('.radiation-index');

let health = 100;
let hunger = 100;
let thirst = 100;
let radiation = 0;

healthIndex.innerHTML = health;
hungerIndex.innerHTML = hunger;
thirstIndex.innerHTML = thirst;
radiationIndex.innerHTML = radiation;

// Створюємо рюкзак
const scrapCount = document.querySelector('.scrap-count');
let scrapAmount = 0;
scrapCount.innerHTML = scrapAmount;

const electronicsCount = document.querySelector('.electronics-count');
let electronicsAmount = 0;
electronicsCount.innerHTML = electronicsAmount;

const ragsCount = document.querySelector('.rags-count');
let ragsAmount = 0;
ragsCount.innerHTML = ragsAmount;

const medicinesCount = document.querySelector('.medicines-count');
let medicinesAmount = 0;
medicinesCount.innerHTML = medicinesAmount;

const backpack = document.querySelector('.backpack');
let emptyCellsOfBackPack = 0;
(function backpackCreate() {
    for (let i = 0; i < user.backpackSize; i++) {
        backpack.innerHTML += `<div class="backpack-item empty" id="${i}-backpack-item"></div>`;
        emptyCellsOfBackPack += 1;
    }
    for (let i = 0; i < (25 - user.backpackSize); i++) {
        backpack.innerHTML += `
        <div class="backpack-item close" id="${i + user.backpackSize}-backpack-item">
            <img src="../img/close.svg" alt="">
        </div>`;
    }
})();
const backpackArr = [];
for (let i = 0; i < user.backpackSize; i++) {
    backpackArr.push(undefined);
};

// Створюємо предмети
const items = [
    // map
    {
        id: 'map1',
        name: 'кординати локації Хутор',
        rareness: 'regular',
        rarenessColor: '#fff',
        // img: '<img class="backpack-item-img" src="img/f2-items/knifeRusty.webp" alt="">',
        // scrapPartsMin: 1,
        // scrapPartsMax: 3,
        // electronicsPartsMin: 0,
        // electronicsPartsMax: 0,
        // ragsPartsMin: 0,
        // ragsPartsMax: 0,
        // medicinesPartsMin: 0,
        // medicinesPartsMax: 0,
        class: 'map',
        // description: '<p>Іржавий ніж</p>',
        // minDamage: 2,
        // maxDamage: 4,
    },
    // weapon
    {
        id: 'knifeRusty',
        name: 'Іржавий ніж',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: '<img class="backpack-item-img" src="img/f2-items/knifeRusty.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/metalPole.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/pistolRusty.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/knifeCombat.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/weapon/mouser9mm.webp" alt="">',
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
    // helmet
    {
        id: 'helmetSport',
        name: 'Спортивний шолом',
        rareness: 'unusual',
        rarenessColor: '#37f713',
        img: '<img class="backpack-item-img" src="img/f2-items/helmetSport.webp" alt="">',
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
    // mask
    {
        id: 'respirator',
        name: 'Респіратор',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: '<img class="backpack-item-img" src="img/f2-items/respirator.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/armor/leatherJacket.webp" alt="">',
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

    // trinket

    // useOnYourself    
    {
        id: 'meatRaw',
        name: 'Сире м\'ясо',
        rareness: 'regular',
        rarenessColor: '#fff',
        img: '<img class="backpack-item-img" src="img/f2-items/meatRaw.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/firstAidKit.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/homemadeMedicine.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/crackers.webp" alt="">',
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
        img: '<img class="backpack-item-img" src="img/f2-items/water.webp" alt="">',
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
];

// Створюємо ворогів
const enemies = [
    {
        id: 'rat',
        name: 'Мутований пацюк',
        img: 'url(../img/enemies/rat.jpg) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого пацюка',
        health: 10,
        exp: 25,
        minDamage: 3,
        maxDamage: 6,
        dropName: 'Сире м\'ясо',
        items: [],
    },
    {
        id: 'scorpion',
        name: 'Мутований скорпіон',
        img: 'url(../img/enemies/scorpion.jpg) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого скорпіона',
        health: 15,
        exp: 50,
        minDamage: 5,
        maxDamage: 8,
        dropName: 'Сире м\'ясо',
        items: [],
    },
    {
        id: 'mole',
        name: 'Мутований кріт',
        img: 'url(../img/enemies/mole.png) center center/cover no-repeat',
        message: 'Ти втрапив у засітку мутованого крота',
        health: 15,
        exp: 50,
        minDamage: 5,
        maxDamage: 8,
        dropName: 'Сире м\'ясо',
        items: [],
    },
    {
        id: 'reider0',
        name: 'Рейдер з пістолетом',
        img: 'url(../img/enemies/reider0.png) center center/cover no-repeat',
        message: 'Ти втрапив у засітку рейдера',
        health: 25,
        exp: 75,
        minDamage: 5,
        maxDamage: 8,
        dropName: 'Сире м\'ясо',
        items: [],
    },
];

// Створюємо глобальні локації
const globalLocations = [
    {
        id: 'firstHouse',
        name: 'Дім',
        // message: 'Ти в своєму будинку. ',
        type: 'peaceful',
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
];

// Створюємо локації
const locations = [
    // peaceful
    {
        id: 'house0',
        name: 'house0',
        img: 'url(../img/locations/house0.png) center center/cover no-repeat',
        message: 'Ти в своєму будинку. ',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'village',
        name: 'Хутор',
        img: 'url(../img/locations/village.png) center center/cover no-repeat',
        message: 'Ти дійшов до хутора. Тут можна перепочити і поповнити запаси.',
        countOfSearch: 1,
        items: [],
    },
    // others
    {
        id: 'cache',
        name: 'cache',
        img: 'url(../img/locations/cache.png) center center/cover no-repeat',
        message: 'Ти знайшов чиюсь схованку ...',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'house1',
        name: 'house1',
        img: 'url(../img/locations/house1.png) center center/cover no-repeat',
        message: 'Ти натрапив на стару халупу ...',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'cave',
        name: 'cave',
        img: 'url(../img/locations/cave.png) center center/cover no-repeat',
        message: 'Перед тобою печера ...',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'waterSource',
        name: 'waterSource',
        message: 'Ти знайшов джерело, тут можна набрати води ...',
        img: 'url(../img/locations/waterSource.jpg) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'wilderness',
        name: 'wilderness',
        message: 'Навколо тебе пустеля ...',
        img: 'url(../img/locations/wilderness.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'carRusty',
        name: 'Іржава машина',
        message: 'Купа іржавого брухту, колись це було автомобілем.',
        img: 'url(../img/locations/carRusty.png) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'tank',
        name: 'Бочка',
        message: 'Стара бочка. Нічого цікавого.',
        img: 'url(../img/locations/tank.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'mailbox',
        name: 'Поштова скринька',
        message: 'Поштова скринька. Може хтось надіслав тобі листа...',
        img: 'url(../img/locations/mailbox.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'ruins',
        name: 'Руїни',
        message: 'Руїни. Досить одноманітно.',
        img: 'url(../img/locations/ruins2.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'radioactivePuddle',
        name: 'Розлиті радіаційні відходи',
        message: 'Розлиті радіаційні відходи. Краще забиратися звідси',
        img: 'url(../img/locations/radioactivePuddle.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
    },
    {
        id: 'tent',
        name: 'Палатка',
        message: 'Чиясь палатка. Поруч нікого',
        img: 'url(../img/locations/tent.png) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'gasStation',
        name: 'Заправка',
        message: 'Заправка. Варто оглянути.',
        img: 'url(../img/locations/gasStation.png) center center/cover no-repeat',
        countOfSearch: 2,
        items: [],
    },
    {
        id: 'carJunkyard',
        name: 'Звалище автомобілів',
        message: 'Звалище автомобілів. Наврятче тут залишилось щось корисне.',
        img: 'url(../img/locations/carJunkyard.png) center center/cover no-repeat',
        countOfSearch: 1,
        items: [],
    },
    {
        id: 'deadScorpion',
        name: 'Дохлий скорпіон',
        message: 'Дохлий скорпіон. Смердить',
        img: 'url(../img/locations/deadScorpion.png) center center/cover no-repeat',
        countOfSearch: 0,
        items: [],
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

// Наповнюємо глобальні локації ворогами
function addEnemy(index, arr) {
    arr.forEach(el => {
        globalLocations[index].enemies.push(...enemies.filter(enemy => enemy.id === el))
    })
};
addEnemy(1, ['rat', 'scorpion']);
addEnemy(3, ['rat', 'scorpion', 'mole', 'reider0']);

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
addItem(locations, 'cave', ['metalPole', 'knifeRusty', 'water']);
addItem(locations, 'waterSource', ['water']);
addItem(locations, 'wilderness', ['knifeRusty', 'nothing']);
// village
addItem(locations, 'gasStation', ['metalPole', 'crackers', 'water']);
addItem(locations, 'tent', ['pistolRusty', 'knifeRusty', 'nothing']);
addItem(locations, 'radioactivePuddle', ['nothing']);
addItem(locations, 'ruins', ['nothing']);

// Додати ворогам предмети
addItem(enemies, 'rat', ['meatRaw']);
addItem(enemies, 'scorpion', ['meatRaw']);
addItem(enemies, 'mole', ['meatRaw']);
addItem(enemies, 'reider0', ['leatherJacket', 'mouser9mm']);

// Починаємо відлік часу
let curentDate = new Date(2211, 0, 1, 0, 0);
const date = document.querySelector('.date');
function displayCurentDate() {
    let currentMonthName = curentDate.toString().split(' ')[1];
    date.innerHTML = `${curentDate.getDate()} ${currentMonthName}, ${curentDate.getFullYear()}`;
};
displayCurentDate();

// Основні дії
let currentGlobalLocation = globalLocations[0];
let currentLocation = currentGlobalLocation.locations[currentGlobalLocation.locations.length - 1];
let countOfSearch = currentLocation.countOfSearch;
let currentEnemy;
let enemyHealth;
let searchResult;
let log = currentLocation.message;
let travelCount = 0;
console.log(globalLocations[0].name);

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

const eventLog = document.querySelector('.event-log');
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
    curentDate.setHours(curentDate.getHours() + 1);
    displayCurentDate();
    reidhBtn.classList.add('hidden');
    barterBtn.classList.add('hidden');
    speakBtn.classList.add('hidden');
    searchBtn.classList.add('hidden');
    changeLocationBtn.classList.remove('hidden');
    reidFinishhBtn.classList.remove('hidden');

    for (let i = 0; i < globalLocations.length; i++) {
        if (currentGlobalLocation.id === globalLocations[i].id) {
            currentGlobalLocation = globalLocations[i + 1];
            currentLocation = currentGlobalLocation.locations[currentGlobalLocation.locations.length - 1];
            img.style.background = currentLocation.img;
            addLog(currentLocation.message);
            break;
        }
    }
};
function reidFinish() {
    for (let i = 0; i < globalLocations.length; i++) {
        if (globalLocations[i].name === currentGlobalLocation.name) {
            currentGlobalLocation = globalLocations[i - 1];
            changeLocation();
            img.style.background = currentLocation.img;
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
    if (currentQuest.showNextLocation === true) {
        if (randomNumber() <= 30) {
            for (let i = 0; i < globalLocations.length; i++) {
                if (!globalLocations[i].active) {
                    globalLocations[i].active = true;
                    globalLocations[i + 1].active = true;
                    modalWindow.classList.remove('hidden');
                    modalWindowMessage.innerHTML = `Ти з'ясував місце розташування локації ${globalLocations[i].name}.`;
                    addLog(`<span style="color: #fff;">Ти з'ясував місце розташування локації ${globalLocations[i].name}.</span>`);
                    break;
                }
            }
        }
    }
};

function search() {
    curentDate.setMinutes(curentDate.getMinutes() + 15);
    displayCurentDate();

    if (emptyCellsOfBackPack > 0) {
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
            searchResult = currentLocation.items[choiceResult(currentLocation.items.length)];
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
    if (hunger <= 10 && thirst <= 10) {
        addLog('Ти хочеш їсти і пити, якщо рівень голоду чи спраги зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    } else if (hunger <= 10) {
        addLog('Ти хочеш їсти, якщо рівень голоду зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    } else if (thirst <= 10) {
        addLog('Ти хочеш пити, якщо рівень спраги зменьшиться менше 0, ти почнеш втрачати здоровя. ');
    }
};

function action() {
    hunger -= 2;
    if (hunger < 0) {
        hunger = 0;
        health -= 5;
        healthIndex.innerHTML = health;
    };
    hungerIndex.innerHTML = hunger;

    thirst -= 3;
    if (thirst < 0) {
        thirst = 0;
        health -= 5;
        healthIndex.innerHTML = health;
    };
    thirstIndex.innerHTML = thirst;

    if (health < 0) {
        health = 0;
    };
};

function addLog(log, color = '#3a981c') {
    let hoursInHtml;
    let minutesInHtml;
    curentDate.getHours() < 10 ? hoursInHtml = `0${curentDate.getHours()}` : hoursInHtml = `${curentDate.getHours()}`;
    curentDate.getMinutes() < 10 ? minutesInHtml = `0${curentDate.getMinutes()}` : minutesInHtml = `${curentDate.getMinutes()}`;
    eventLog.innerHTML += `<p style="color:${color}"><span class="time">[${hoursInHtml}:${minutesInHtml}]</span> ${log}</p>`;
    // Додати видалення логів після переповнення
};

function putInBackpack() {
    for (let i = 0; i < backpackArr.length; i++) {
        if (backpackArr[i] === undefined) {
            backpackArr[i] = searchResult;
            break;
        }
    }
    for (const el of backpackItems) {
        if (el.classList.contains('empty')) {
            el.innerHTML = searchResult.img;
            el.classList.remove('empty');
            el.classList.add('full');
            emptyCellsOfBackPack -= 1;
            break;
        }
    };
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
    travelCount += 1;
    alert();
    action();
    curentDate.setMinutes(curentDate.getMinutes() + 30);
    displayCurentDate();

    if (randomNumber() <= currentGlobalLocation.findLocationChance) {
        for (const el of currentGlobalLocation.locations) {
            currentLocation = currentGlobalLocation.locations[choiceResult(currentGlobalLocation.locations.length)];
            img.style.background = currentLocation.img;
            countOfSearch = currentLocation.countOfSearch;
            if (countOfSearch > 0) {
                searchBtn.classList.remove('hidden');
                changeLocationBtn.classList.add('hidden');                
            } else {
                searchBtn.classList.add('hidden');
                changeLocationBtn.classList.remove('hidden');
            }
        }
        addLog(currentLocation.message);
    } else {
        currentEnemy = currentGlobalLocation.enemies[choiceResult(currentGlobalLocation.enemies.length)];
        enemyHealth = currentEnemy.health;
        addLog(currentEnemy.message);
        img.style.background = currentEnemy.img;
        battleStart();
    }
    questLineMain();
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
    curentDate.setMinutes(curentDate.getMinutes() + 2);
    displayCurentDate();

    const damageOfUser = userAttack();
    enemyHealth -= damageOfUser;
    const damageOfEnemy = enemyAttack();
    health -= damageOfEnemy;
    healthIndex.innerHTML = health;
    // infoTextLocation.innerHTML = `Ти атакуєш ворога(${damageOfUser}). ${currentEnemy.name} атакує тебе (${damageOfEnemy}).`;
    addLog(`Ти атакуєш ворога(${damageOfUser}). ${currentEnemy.name} атакує тебе (${damageOfEnemy}).`);

    if (enemyHealth <= 0) {
        // infoTextLocation.innerHTML = `Ти вбив ворога. Варто обшукати.`;
        addLog(`Ти вбив ворога. Варто обшукати.`);
        addExperience(currentEnemy.exp)
        battleFinish();
    }
};

function avoid() {
    curentDate.setMinutes(curentDate.getMinutes() + 10);
    displayCurentDate();
    battleFinish();
    addLog(`Ти втік від ${currentEnemy.name}. ${currentLocation.message}`);
    currentEnemy = undefined;
    changeLocation();
    // currentLocation = currentGlobalLocation.locations[currentGlobalLocation.locations.length - 1];
    // img.style.background = currentLocation.img;
    // countOfSearch = currentLocation.countOfSearch;
    
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

const backBtn = document.querySelector('.back');

function logUse() {
    blockLog.forEach(el => el.classList.remove('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));
};

function backpackUse() {
    blockBackpack.forEach(el => el.classList.remove('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));
};

function userMenuUse() {
    blockUserMenu.forEach(el => el.classList.remove('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    blockMap.forEach(el => el.classList.add('hidden'));
    showQuests();
}

function mapUse() {
    blockMap.forEach(el => el.classList.remove('hidden'));
    blockUserMenu.forEach(el => el.classList.add('hidden'));
    blockLog.forEach(el => el.classList.add('hidden'));
    blockBackpack.forEach(el => el.classList.add('hidden'));
    showLocations();
}

logBtn.addEventListener('click', logUse);
backpackBtn.addEventListener('click', backpackUse);
userMenuBtn.addEventListener('click', userMenuUse);
mapBtn.addEventListener('click', mapUse);
backBtn.addEventListener('click', showQuests);

function showQuests() {
    questsBookInHtml.innerHTML = '';
    questBook.forEach(quest => {
        if (quest.active) {
            questsBookInHtml.innerHTML += `<div class="quest-location" id="${quest.startLocationId}">${quest.startLocationName}</div>`;
        }
    })
    document.querySelectorAll('.quest-location').forEach(el => {
        el.addEventListener('click', function () {
            document.addEventListener('click', event => {
                questBook.forEach(quest => {
                    if (quest.id === event.target.getAttribute('id')) {
                        questsBookInHtml.innerHTML = '';
                        quest.completed ? questsBookInHtml.innerHTML += `<p style="text-decoration: line-through">${quest.questBookMessage}</p>` : questsBookInHtml.innerHTML += `<p>${quest.questBookMessage}</p>`
                    }
                })
            })

        })
    })
};

let mapLocationsInHtml = document.querySelectorAll('.map-location');

function showLocations() {
    locationsBookInHtml.innerHTML = '';
    globalLocations.forEach(location => {
        if (location.active) {
            locationsBookInHtml.innerHTML += `<div onclick="changeGlobalLocation()" class="map-location" id="${location.id}">${location.name}</div>`;
        }
    })
};

function changeGlobalLocation() {
    globalLocations.forEach(location => {
        if (location.id === event.target.getAttribute('id')) {
            currentGlobalLocation = location;
            currentLocation = location.locations[0];
            currentEnemy = undefined;
            img.style.background = currentLocation.img;
            reidhBtn.classList.remove('hidden');
            reidFinishhBtn.classList.add('hidden');
            barterBtn.classList.remove('hidden');
            speakBtn.classList.remove('hidden');
            searchBtn.classList.add('hidden');
            changeLocationBtn.classList.add('hidden');
            attackBtn.classList.add('hidden');
            avoidBtn.classList.add('hidden');
            logUse();
            addLog(currentLocation.message);
        }
    })
};

function reidFinish() {
    for (let i = 0; i < globalLocations.length; i++) {
        if (globalLocations[i].name === currentGlobalLocation.name) {
            currentGlobalLocation = globalLocations[i - 1];
            changeLocation();
            img.style.background = currentLocation.img;
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


// Виділення предмета (спробувати зменшити код від дублювання)
let selectedItemInHTML;
let selectedItem;
const backpackItems = document.querySelectorAll('.backpack-item');
const backpackItem0 = document.getElementById('0-backpack-item');
const backpackItem1 = document.getElementById('1-backpack-item');
const backpackItem2 = document.getElementById('2-backpack-item');
const backpackItem3 = document.getElementById('3-backpack-item');
const backpackItem4 = document.getElementById('4-backpack-item');
const backpackItem5 = document.getElementById('5-backpack-item');
const backpackItem6 = document.getElementById('6-backpack-item');
const backpackItem7 = document.getElementById('7-backpack-item');
const backpackItem8 = document.getElementById('8-backpack-item');
const backpackItem9 = document.getElementById('9-backpack-item');


backpackItem0.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem0;
    selectedItem = backpackArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem1.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem1;
    selectedItem = backpackArr[1];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem2.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem2;
    selectedItem = backpackArr[2];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem3.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem3;
    selectedItem = backpackArr[3];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem4.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem4;
    selectedItem = backpackArr[4];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem5.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem5;
    selectedItem = backpackArr[5];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem6.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem6;
    selectedItem = backpackArr[6];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem7.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem7;
    selectedItem = backpackArr[7];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem8.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem8;
    selectedItem = backpackArr[8];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

backpackItem9.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem9;
    selectedItem = backpackArr[9];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

const equipment = document.querySelector('.equipment');
const equipmentItems = document.querySelectorAll('.equipment-item');
const equipmentWeapon = document.querySelector('.equipment-weapon');
const equipmentHelmet = document.querySelector('.equipment-helmet');
const equipmentMask = document.querySelector('.equipment-mask');
const equipmentArmor = document.querySelector('.equipment-armor');
const equipmentBackpack = document.querySelector('.equipment-backpack');

const equippedWeaponArr = [undefined];
const equippedHelmetArr = [undefined];
const equippedMaskArr = [undefined];
const equippedArmorArr = [undefined];
const equippedBackpackArr = [undefined];

equipmentWeapon.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentWeapon;
    selectedItem = equippedWeaponArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

equipmentHelmet.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentHelmet;
    selectedItem = equippedHelmetArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

equipmentMask.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentMask;
    selectedItem = equippedMaskArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

equipmentArmor.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentArmor;
    selectedItem = equippedArmorArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

equipmentBackpack.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentBackpack;
    selectedItem = equippedBackpackArr[0];
    selectedItemInHTML.classList.add('selected');
    itemDescription.innerHTML = selectedItem.description;
});

// function select() {
//     selectedItemInHTML = this;
//     selectedItemInHTML.classList.add('selected');
// };

function deselect() {
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
        backpackArr[parseInt(selectedItemInHTML.id)] = undefined;
        emptyCellsOfBackPack += 1;
    } else if (selectedItemInHTML.classList.contains('equipment-weapon')) {
        equippedWeaponArr[0] = undefined;
        user.minDamage = 1;
        user.maxDamage = 2;
    } else if (selectedItemInHTML.classList.contains('equipment-helmet')) {
        equippedHelmetArr[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-mask')) {
        equippedMaskArr[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-armor')) {
        equippedArmorArr[0] = undefined;
    } else if (selectedItemInHTML.classList.contains('equipment-backpack')) {
        equippedBackpackArr[0] = undefined;
    }
    selectedItem = undefined;
    selectedItemInHTML.innerHTML = '';
    itemDescription.innerHTML = '';
    selectedItemInHTML.classList.remove('full');
    selectedItemInHTML.classList.add('empty');
    selectedItemInHTML.classList.remove('selected');
};

function apart() {
    // let el = backpackArr[parseInt(selectedItemInHTML.id)];
    let someRandomNumber = randomNumber();

    let scrapResult = selectedItem.scrapPartsMin + Math.round((selectedItem.scrapPartsMax - selectedItem.scrapPartsMin) / 100 * someRandomNumber);
    scrapAmount += scrapResult;
    scrapCount.innerHTML = scrapAmount;

    let electronicsResult = selectedItem.electronicsPartsMin + Math.round((selectedItem.electronicsPartsMax - selectedItem.electronicsPartsMin) / 100 * someRandomNumber);
    electronicsAmount += electronicsResult;
    electronicsCount.innerHTML = electronicsAmount;

    let ragsResult = selectedItem.ragsPartsMin + Math.round((selectedItem.ragsPartsMax - selectedItem.ragsPartsMin) / 100 * someRandomNumber);
    ragsAmount += ragsResult;
    ragsCount.innerHTML = ragsAmount;

    let medicinesResult = selectedItem.medicinesPartsMin + Math.round((selectedItem.medicinesPartsMax - selectedItem.medicinesPartsMin) / 100 * someRandomNumber);
    medicinesAmount += medicinesResult;
    medicinesCount.innerHTML = medicinesAmount;

    deleteItem();
};

function use() {
    if (selectedItem.class === 'useOnYourself') {
        health += selectedItem.healthEffect;
        health > user.maxHealth ? health = user.maxHealth : health;
        hunger += selectedItem.hungerEffect;
        hunger > user.maxHunger ? hunger = user.maxHunger : hunger;
        hunger < 0 ? hunger = 0 : hunger;
        thirst += selectedItem.thirstEffect;
        thirst > user.maxThirst ? thirst = user.maxThirst : thirst;
        thirst < 0 ? thirst = 0 : thirst;
        radiation += selectedItem.radiationEffect;
        healthIndex.innerHTML = health;
        hungerIndex.innerHTML = hunger;
        thirstIndex.innerHTML = thirst;
        radiationIndex.innerHTML = radiation;
        deleteItem();
        alert();
        return;

    } else if (selectedItem.class === 'weapon') {
        if (equippedWeaponArr[0] !== undefined) {
            if (equippedWeaponArr[0] !== selectedItem) {
                let saveItem = equippedWeaponArr[0];
                equippedWeaponArr[0] = selectedItem;
                equipmentWeapon.innerHTML = selectedItem.img;

                backpackArr[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.innerHTML = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentWeapon.innerHTML = selectedItem.img;
            equipmentWeapon.classList.remove('empty');
            equipmentWeapon.classList.add('full');
            equippedWeaponArr[0] = selectedItem;
            deleteItem();
        }
        user.minDamage = equippedWeaponArr[0].minDamage;
        user.maxDamage = equippedWeaponArr[0].maxDamage;
        return;

    } else if (selectedItem.class === 'helmet') {
        if (equippedHelmetArr[0] !== undefined) {
            if (equippedHelmetArr[0] !== selectedItem) {
                let saveItem = equippedHelmetArr[0];
                equippedHelmetArr[0] = selectedItem;
                equipmentHelmet.innerHTML = selectedItem.img;
                backpackArr[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.innerHTML = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentHelmet.innerHTML = selectedItem.img;
            equippedHelmetArr[0] = selectedItem;
            deleteItem();
        }
        return;

    } else if (selectedItem.class === 'mask') {
        if (equippedMaskArr[0] !== undefined) {
            if (equippedMaskArr[0] !== selectedItem) {
                let saveItem = equippedMaskArr[0];
                equippedMaskArr[0] = selectedItem;
                equipmentMask.innerHTML = selectedItem.img;
                backpackArr[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.innerHTML = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentMask.innerHTML = selectedItem.img;
            equippedMaskArr[0] = selectedItem;
            deleteItem();
        }
        return;

    } else if (selectedItem.class === 'armor') {
        if (equippedArmorArr[0] !== undefined) {
            if (equippedArmorArr[0] !== selectedItem) {
                let saveItem = equippedArmorArr[0];
                equippedArmorArr[0] = selectedItem;
                equipmentArmor.innerHTML = selectedItem.img;
                backpackArr[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.innerHTML = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentArmor.innerHTML = selectedItem.img;
            equippedArmorArr[0] = selectedItem;
            deleteItem();
        }
        return;
    } else if (selectedItem.class === 'backpack') {
        if (equippedBackpackArr[0] !== undefined) {
            if (equippedBackpackArr[0] !== selectedItem) {
                let saveItem = equippedBackpackArr[0];
                equippedBackpackArr[0] = selectedItem;
                equipmentBackpack.innerHTML = selectedItem.img;
                backpackArr[parseInt(selectedItemInHTML.id)] = saveItem;
                selectedItemInHTML.innerHTML = saveItem.img;
                saveItem = undefined;
                deselect();
            }
        } else {
            equipmentBackpack.innerHTML = selectedItem.img;
            equippedBackpackArr[0] = selectedItem;
            deleteItem();
        }
        return;
    }
};

deleteBtn.addEventListener('click', deleteItem);
apartBtn.addEventListener('click', apart);
useBtn.addEventListener('click', use);

// Квести
// const nextMessageBtn = document.querySelector('.next-message');
const questBook = [
    {
        id: 'quest0',
        startLocationId: 'firstHouse',
        startLocationName: 'Дім',
        finishLocationId: 'village',
        finishLocationName: 'Хутор',
        message: [
            `Це квест-виживання у постапокаліптичному світі. Твоя історія починається у старій халупі в пустелі - це твій дім. Ти пригадуєш, що напередодні домовився зі старим По з хутора неподалік про зустріч.`
        ],
        questBookMessage: 'Дійти до хутора',
        active: true,
        condition: 30,
        completed: false,
        showNextLocation: true,
    },
    {
        id: 'quest1',
        startLocationId: 'village',
        startLocationName: 'Хутор',
        message: [
            "Ти дойшов до хутора де проживає старий По і ще декілька бродяг.<br>Перед тобою апартаменти По, це пом'ятий білий холодильник і великий деревянний ящик. В першому По спить, в другому - робить все інше.",
            `Старий По:<br> - Прийшов? Добре! Я вирішив що хочу допомогти тобі. Не варто такому перспективному юнакові витрачати своє життя в цьому глухому куті. Я вкажу тобі дорогу до міста Кеп, де на тебе чекає...<br>...ну не знаю... щось краще ніж ти маєш зараз...`,
            "Ви думаєте що в чомусь По правий, тут точно робити нічого...",
            "Старий По:<br> - Але не просто так! Принеси мені хоча б якийсь запас їжі, підійде навіть сире м'ясо.",
        ],
        questBookMessage: "Принести По 5 шматків сирого м'яса",
        condition: 5,
        completed: false,
    },
    {},
];

addLog('Ти прокинувся в своїй халупі.')
let currentQuest = questBook[0];
addLog(currentQuest.questBookMessage, '#fff');
modalWindowMessage.innerHTML = questBook[0].message;
let questMessageCount = 1;
function nextMessage() {
    modalWindowMessage.innerHTML = currentQuest.message[questMessageCount];
    questMessageCount += 1;
    if (questMessageCount > currentQuest.message.length) {
        modalWindow.classList.add('hidden')
        questMessageCount = 1;
    }
}
modalWindowBtn.addEventListener('click', nextMessage);

function questLineMain() {
    for (let i = 0; i < questBook.length; i++) {
        if (questBook[i].active) {
            currentQuest = questBook[i];
            if (questBook[i].condition < travelCount) {
                questBook[i].completed = true;
                currentQuest = questBook[i + 1];
                questBook[i + 1].active = true;
                modalWindow.classList.remove('hidden');
                modalWindowMessage.innerHTML = currentQuest.message[0];
                addLog(`<span style="color: #fff;">${currentQuest.questBookMessage}</span>`);
                break;
            }
        }
    }
};





