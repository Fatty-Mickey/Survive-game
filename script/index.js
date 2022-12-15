function randomNumber() {
    return Math.round(Math.random() * 100);
}

// Створюємо юзера
const user = {
    name: '',
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
})();
const backpackArr = [];
for (let i = 0; i < user.backpackSize; i++) {
    backpackArr.push(undefined);
};

// Створюємо предмети
const items = [
    {
        id: 'armorFBI',
        name: 'Бронежилет FBI',
        dropChance: 50,
        img: '<img src="img/item-icon/armor-fbi.svg" alt="">',
        scrapPartsMin: 4,
        scrapPartsMax: 8,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 4,
        ragsPartsMax: 8,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'armor',
    },
    {
        id: 'helmetSport',
        name: 'Спортивний шолом',
        dropChance: 100,
        img: '<img src="img/item-icon/helmet-sport.svg" alt="">',
        scrapPartsMin: 1,
        scrapPartsMax: 4,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 4,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'helmet',
    },
    {
        id: 'respirator',
        name: 'Респіратор',
        dropChance: 100,
        img: '<img src="img/item-icon/mask-respirator.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 4,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'mask',
    },
    {
        id: 'meatRaw',
        name: 'Сире м\'ясо',
        dropChance: 0,
        img: '<img class="backpack-item-img" src="img/item-icon/meat-raw.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'useOnYourself',
        healthEffect: 5,
        hungerEffect: 30,
        thirstEffect: 0,
        radiationEffect: 0,
    },
    {
        id: 'pistolRusty',
        name: 'Іржавий пістолет',
        dropChance: 5,
        img: '<img class="backpack-item-img" src="img/item-icon/pistol-rusty.svg" alt="">',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'weapon',
        minDamage: 4,
        maxDamage: 6,
    },
    {
        id: 'knifeCombat',
        name: 'Бойовий ніж',
        dropChance: 10,
        img: '<img class="backpack-item-img" src="img/item-icon/knife-combat.svg" alt="">',
        scrapPartsMin: 3,
        scrapPartsMax: 5,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'weapon',
        minDamage: 6,
        maxDamage: 9,
    },
    {
        id: 'firstAidKit',
        name: 'Аптечка',
        dropChance: 15,
        img: '<img class="backpack-item-img" src="img/item-icon/first-aid-kit.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 1,
        medicinesPartsMax: 5,

        class: 'useOnYourself',
        healthEffect: 80,
        hungerEffect: -20,
        thirstEffect: -20,
        radiationEffect: 0,
    },
    {
        id: 'bandage',
        name: 'Бинт',
        dropChance: 20,
        img: '<img class="backpack-item-img" src="img/item-icon/bandage.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 1,
        ragsPartsMax: 2,
        medicinesPartsMin: 1,
        medicinesPartsMax: 3,

        class: 'useOnYourself',
        healthEffect: 30,
        hungerEffect: 0,
        thirstEffect: 0,
        radiationEffect: 0,
    },
    {
        id: 'knifeRusty',
        name: 'Іржавий ніж',
        dropChance: 25,
        img: '<img class="backpack-item-img" src="img/item-icon/knife-rusty.svg" alt="">',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'weapon',
        minDamage: 2,
        maxDamage: 4,
    },
    {
        id: 'pipe',
        name: 'Шматок арматури',
        dropChance: 40,
        img: '<img class="backpack-item-img" src="img/item-icon/pipe.svg" alt="">',
        scrapPartsMin: 1,
        scrapPartsMax: 3,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'weapon',
        minDamage: 3,
        maxDamage: 5,
    },
    {
        id: 'crackers',
        name: 'Запліснявілі сухарі',
        dropChance: 60,
        img: '<img class="backpack-item-img" src="img/item-icon/crackers.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'useOnYourself',
        healthEffect: 5,
        hungerEffect: 30,
        thirstEffect: -15,
        radiationEffect: 5,
    },
    {
        id: 'water',
        name: 'Пляшка води',
        dropChance: 80,
        img: '<img class="backpack-item-img" src="img/item-icon/bottle-of-water.svg" alt="">',
        scrapPartsMin: 0,
        scrapPartsMax: 0,
        electronicsPartsMin: 0,
        electronicsPartsMax: 0,
        ragsPartsMin: 0,
        ragsPartsMax: 0,
        medicinesPartsMin: 0,
        medicinesPartsMax: 0,

        class: 'useOnYourself',
        healthEffect: 5,
        hungerEffect: 0,
        thirstEffect: 50,
        radiationEffect: 0,
    },
    {
        id: 'nothing',
        name: 'Нічого',
        dropChance: 1000,
        img: undefined,
    },
    // 'Пляшка води',
    // 'Запліснявілі сухарі',
    // 'Ніж',
    // 'Бойовий ніж',
    // 'Арматурина',
    // 'Бинт',
    // 'Аптечка',
    // 'Пістолет 9мм',
    // 'Патрони 9мм 10шт.',
    // 'Нічого',
];

// Створюємо ворогів
const enemies = [
    {
        id: 'rat',
        name: 'Мутований пацюк',
        message: 'Ти втрапив у засітку мутованого пацюка',
        health: 10,
        minDamage: 3,
        maxDamage: 6,
        dropName: 'Сире м\'ясо',
    },
    {
        id: 'scorpion',
        name: 'Мутований скорпіон',
        message: 'Ти втрапив у засітку мутованого скорпіона',
        health: 15,
        minDamage: 5,
        maxDamage: 8,
        dropName: 'Сире м\'ясо',
    },
];

// Створюємо глобальні локації
const globalLocations = [
    {
        name: 'nearHouse',
        findLocationChance: 70,
        battleChance: 100,
        locations: [],
        enemies: [],
    },
];

// Створюємо локації
const locations = [
    {
        name: 'cache',
        message: 'Ти знайшов чиюсь схованку ...',
        findChance: 10,
        dropChanceIndex: 1,
        countOfSearch: 1,
        items: [],
    },
    {
        name: 'house1',
        message: 'Ти натрапив на стару халупу ...',
        findChance: 30,
        possibleItems: [],
        dropChanceIndex: 1,
        countOfSearch: 2,
        items: [],
    },
    {
        name: 'cave',
        message: 'Перед тобою печера ...',
        findChance: 60,
        possibleItems: [],
        dropChanceIndex: 1,
        countOfSearch: 2,
        items: [],
    },
    {
        name: 'puddle',
        message: 'Ти знайшов брудну калюжу, тут можна набрати води ...',
        findChance: 80,
        possibleItems: [],
        dropChanceIndex: 1,
        countOfSearch: 1,
        items: [],
    },
    {
        name: 'wilderness',
        message: 'Навколо тебе пустеля ...',
        findChance: 100,
        possibleItems: [],
        dropChanceIndex: 1,
        countOfSearch: 1,
        items: [],
    },
];

// Наповнюємо глобальну локацію локаціями
locations.forEach(el => {
    if (el.name === 'cache' || el.name === 'house1' || el.name === 'cave' || el.name === 'puddle' || el.name === 'wilderness') {
        globalLocations[0].locations.push(el);
    }
});

// Наповнюємо глобальну локацію ворогами
enemies.forEach(el => {
    if (el.id === 'rat') {
        globalLocations[0].enemies.push(el);
    } else if (el.id === 'scorpion') {
        globalLocations[0].enemies.push(el);
    }
});

// Наповнюємо локації предметами
locations.forEach(el => {
    if (el.name === 'cache') {
        items.forEach(item => {
            if (item.id === 'knifeCombat') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'helmetSport') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'firstAidKit') {
                el.items.push(item);
            }
        })
    } else if (el.name === 'house1') {
        items.forEach(item => {
            if (item.id === 'respirator') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'pistolRusty') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'bandage') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'crackers') {
                el.items.push(item);
            }
        })
    } else if (el.name === 'cave') {
        items.forEach(item => {
            if (item.id === 'pipe') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'knifeRusty') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'water') {
                el.items.push(item);
            }
        })
    } else if (el.name === 'puddle') {
        items.forEach(item => {
            if (item.id === 'water') {
                el.items.push(item);
            }
        })
    } else if (el.name === 'wilderness') {
        items.forEach(item => {
            if (item.id === 'knifeRusty') {
                el.items.push(item);
            }
        })
        items.forEach(item => {
            if (item.id === 'nothing') {
                el.items.push(item);
            }
        })
    }
});

// Основні дії
let currentGlobalLocation = globalLocations[0];
let currentLocation = locations[locations.length - 1];
let countOfSearch = currentLocation.countOfSearch;
let currentEnemy;
let enemyHealth;
let searchResult;
let log = currentLocation.message;

const searchBtn = document.querySelector('.search');
const changeLocationBtn = document.querySelector('.change-location');
const attackBtn = document.querySelector('.attack');
const avoidBtn = document.querySelector('.avoid');

const infoTextLocation = document.querySelector('.info-text-location');
const infoTextSearch = document.querySelector('.info-text-search');
const infoTextAlert = document.querySelector('.info-text-alert');
const eventLog = document.querySelector('.event-log');

function search() {
    if (emptyCellsOfBackPack > 0) {
        alert();
        action();
        if (currentEnemy) {
            items.forEach(item => {
                if (item.name === currentEnemy.dropName) {
                    searchResult = item;
                }
            });
            infoTextSearch.innerHTML = 'Ти знайшов ' + searchResult.name + '.'
            addLog('Ти знайшов ' + searchResult.name + '.');
            putInBackpack();
            currentEnemy = undefined;
        } else if (countOfSearch > 0) {
            choiceResult(currentLocation.items.length);
            countOfSearch -= 1;
            console.log(searchResult);
            if (searchResult.id !== 'nothing') {
                infoTextSearch.innerHTML = 'Ти знайшов ' + searchResult.name + '.';
                if (countOfSearch > 0) {
                    infoTextSearch.innerHTML += ' Варто пошукати ще.'
                }
                addLog('Ти знайшов ' + searchResult.name + '.');
                putInBackpack();
            } else {
                infoTextSearch.innerHTML = 'Ти нічого не знайшов.';
                addLog('Ти нічого не знайшов.');
            };
        } else {
            infoTextSearch.innerHTML = 'Тут нічого не залишилось, варто йти далі.';
            addLog('Тут нічого не залишилось, варто йти далі.');
        }
    } else {
        infoTextSearch.innerHTML = 'Рюкзак заповнений, потрібно звільнити місце';
        addLog('Рюкзак заповнений, потрібно звільнити місце');
    }
};

function alert() {
    if (thirst <= 10) {
        infoTextAlert.innerHTML = 'Ти хочеш пити, якщо рівень спраги зменьшиться менше 0, ти почнеш втрачати здоровя'
    };
    if (hunger <= 10) {
        infoTextAlert.innerHTML = 'Ти хочеш їсти, якщо рівень голоду зменьшиться менше 0, ти почнеш втрачати здоровя'
    };
};

function action() {
    hunger -= 3;
    if (hunger < 0) {
        hunger = 0;
        health -= 5;
        healthIndex.innerHTML = health;
    };
    hungerIndex.innerHTML = hunger;

    thirst -= 5;
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

function addLog(log) {
    eventLog.innerHTML += `<p>${log}</p>`;
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
    }
    let arr = [];
    arr.push(firstElChance, secondElChance, thirdElChance, fourthElChance, fifthElChance);

    let someRandomNumber = randomNumber();

    for (let i = 0; i < arr.length; i++) {
        if (someRandomNumber <= arr[i]) {
            searchResult = currentLocation.items[i];
            currentEnemy = currentGlobalLocation.enemies[i];
            break;
        }
    };
};

function changeLocation() {
    alert();
    action();

    if (randomNumber() <= currentGlobalLocation.findLocationChance) {
        console.log('loca');
        for (const el of locations) {
            if (el.findChance >= randomNumber()) {
                currentLocation = el;
                countOfSearch = currentLocation.countOfSearch;
                break;
            }
        }
        infoTextLocation.innerHTML = currentLocation.message;
        infoTextSearch.innerHTML = '';
        addLog(currentLocation.message);
    } else {
        console.log('battle');
        choiceResult(currentGlobalLocation.enemies.length);
        enemyHealth = currentEnemy.health;
        infoTextLocation.innerHTML = currentEnemy.message;
        infoTextSearch.innerHTML = '';
        addLog(currentEnemy.message);
        battleStart();
    }
};

function battleStart() {
    searchBtn.classList.add('hidden');
    changeLocationBtn.classList.add('hidden');
    attackBtn.classList.remove('hidden');
    avoidBtn.classList.remove('hidden');
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
    changeLocationBtn.classList.remove('hidden');
    attackBtn.classList.add('hidden');
    avoidBtn.classList.add('hidden');
};

function attack() {
    const damageOfUser = userAttack();
    enemyHealth -= damageOfUser;
    const damageOfEnemy = enemyAttack();
    health -= damageOfEnemy;
    healthIndex.innerHTML = health;
    infoTextLocation.innerHTML = `Ти атакуєш ворога(${damageOfUser}). ${currentEnemy.name} атакує тебе (${damageOfEnemy}).`;
    addLog(`Ти атакуєш ворога(${damageOfUser}). ${currentEnemy.name} атакує тебе (${damageOfEnemy}).`);

    if (enemyHealth <= 0) {
        infoTextLocation.innerHTML = `Ти вбив ворога. Варто обшукати.`;
        addLog(`Ти вбив ворога. Варто обшукати.`);
        battleFinish();
    }
};

function avoid() {
    battleFinish();
    infoTextLocation.innerHTML = `Ти втік від ${currentEnemy.name}.`;
    addLog(`Ти втік від ${currentEnemy.name}.`);
    currentEnemy = undefined;
};

avoidBtn.addEventListener('click', avoid);
attackBtn.addEventListener('click', attack);
changeLocationBtn.addEventListener('click', changeLocation);
searchBtn.addEventListener('click', search);

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
});

backpackItem1.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem1;
    selectedItem = backpackArr[1];
    selectedItemInHTML.classList.add('selected');
});

backpackItem2.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem2;
    selectedItem = backpackArr[2];
    selectedItemInHTML.classList.add('selected');
});

backpackItem3.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem3;
    selectedItem = backpackArr[3];
    selectedItemInHTML.classList.add('selected');
});

backpackItem4.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem4;
    selectedItem = backpackArr[4];
    selectedItemInHTML.classList.add('selected');
});

backpackItem5.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem5;
    selectedItem = backpackArr[5];
    selectedItemInHTML.classList.add('selected');
});

backpackItem6.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem6;
    selectedItem = backpackArr[6];
    selectedItemInHTML.classList.add('selected');
});

backpackItem7.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem7;
    selectedItem = backpackArr[7];
    selectedItemInHTML.classList.add('selected');
});

backpackItem8.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem8;
    selectedItem = backpackArr[8];
    selectedItemInHTML.classList.add('selected');
});

backpackItem9.addEventListener('click', el => {
    deselect();
    selectedItemInHTML = backpackItem9;
    selectedItem = backpackArr[9];
    selectedItemInHTML.classList.add('selected');
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
});

equipmentHelmet.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentHelmet;
    selectedItem = equippedHelmetArr[0];
    selectedItemInHTML.classList.add('selected');
});

equipmentMask.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentMask;
    selectedItem = equippedMaskArr[0];
    selectedItemInHTML.classList.add('selected');
});

equipmentArmor.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentArmor;
    selectedItem = equippedArmorArr[0];
    selectedItemInHTML.classList.add('selected');
});

equipmentBackpack.addEventListener('click', function () {
    deselect();
    selectedItemInHTML = equipmentBackpack;
    selectedItem = equippedBackpackArr[0];
    selectedItemInHTML.classList.add('selected');
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
        return;

    } else if (selectedItem.class === 'weapon') {
        console.log('its weapon');
        if (equippedWeaponArr[0] !== undefined) {
            console.log('weapon isnt empty');
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
            console.log(1);
            equipmentWeapon.classList.remove('empty');
            equipmentWeapon.classList.add('full');
            console.log(2);
            equippedWeaponArr[0] = selectedItem;
            deleteItem();
        }
        user.minDamage = equippedWeaponArr[0].minDamage;
        user.maxDamage = equippedWeaponArr[0].maxDamage;
        return;

    } else if (selectedItem.class === 'helmet') {
        console.log('its helmet');
        if (equippedHelmetArr[0] !== undefined) {
            console.log('helmet isnt empty');
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
        console.log('its mask');
        if (equippedMaskArr[0] !== undefined) {
            console.log('mask isnt empty');
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
        console.log('its armor');
        if (equippedArmorArr[0] !== undefined) {
            console.log('armor isnt empty');
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
        console.log('its backpack');
        if (equippedBackpackArr[0] !== undefined) {
            console.log('backpack isnt empty');
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

