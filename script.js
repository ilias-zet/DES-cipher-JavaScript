const message = 'зерм';
const key = 'илья';
const alphabet = {
    "а": "11100000", "б": "11100001",
    "в": "11100010", "г": "11100011",
    "д": "11100100", "е": "11100101",
    "ж": "11100110", "з": "11100111",
    "и": "11101000", "й": "11101001",
    "к": "11101010", "л": "11101011",
    "м": "11101100", "н": "11101101",
    "о": "11101110", "п": "11101111",
    "р": "11110000", "с": "11110001",
    "т": "11110010", "у": "11110011",
    "ф": "11110100", "х": "11110101",
    "ц": "11110110", "ч": "11110111",
    "ш": "11111000", "щ": "11111001",
    "ъ": "11111010", "ы": "11111011",
    "ь": "11111100", "э": "11111101",
    "ю": "11111110", "я": "11111111",
};

// Функция с помощью которой мы будем выводить все на экран
const print = (...message) => {
    document.body.innerHTML += `<div>${message.join(' ')}</div>`;
}

// Таблица начальной перестановки IP
const ip = [
    57,49,41,33,25,17,9,1,
    59,51,43,35,27,19,11,3,
    61,53,45,37,29,21,13,5,
    63,55,47,39,31,23,15,7,
    56,48,40,32,24,16,8,0,
    58,50,42,34,26,18,10,2,
    60,52,44,36,28,20,12,4,
    62,54,46,38,30,22,14,6
];

// Таблица финальной перестановки IP(-1)
const ip_1 = [
    39,7,47,15,55,23,63,31,
    38,6,46,14,54,22,62,30,
    37,5,45,13,53,21,61,29,
    36,4,44,12,52,20,60,28,
    35,3,43,11,51,19,59,27,
    34,2,42,10,50,18,58,26,
    33,1,41,9,49,17,57,25,
    32,0,40,8,48,16,56,24
];

// Таблица перестановки ключа PC-1
const pc1 = [
    56,48,40,32,24,16,8,0,
    57,49,41,33,25,17,9,1,
    58,50,42,34,26,18,10,2,
    59,51,43,35,62,54,46,38,
    30,22,14,6,61,53,45,37,
    29,21,13,5,60,52,44,36,
    28,20,12,4,27,19,11,3
];

// Таблица перестановки ключа PC-2
const pc2 = [
    13,16,10,23,0,4,2,
    27,14,5,20,9,22,18,
    11,3,25,7,15,6,26,
    19,12,1,40,51,30,36,
    46,54,29,39,50,44,32,
    47,43,48,38,55,33,52,
    45,41,49,35,28,31
];

// Таблица перестановки в функции F
const p = [
    15,6,19,20,28,11,27,16,
    0,14,22,25,4,17,30,9,
    1,7,23,13,31,26,2,8,
    18,12,29,5,21,10,3,24
];

// Таблица расширения Е
const eTable = [
    31,0,1,2,3,4,3,4,
    5,6,7,8,7,8,9,10,
    11,12,11,12,13,14,15,16,
    15,16,17,18,19,20,19,20,
    21,22,23,24,23,24,25,26,
    27,28,27,28,29,30,31,0
];

const sTable = [
    [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
        [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
        [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    [
        [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
        [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],
    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    [
        [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
]
// Массив значений битовых сдвигов ключа
const biteMoves = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const encrypt = (message, key) => {
    print(`Исходное сообщение: '${message}'`);
    print(`Исходный ключ: '${key}'`);
    // Заменяем каждую букву на соответствующее ей битовое значение из объекта
    let binaryMessage = message.split("").map(letter => alphabet[letter]).join("");
    let binaryKey = key.split("").map(letter => alphabet[letter]).join("");
    print('Бинарное сообщение:', binaryMessage);
    print('Бинарный ключ:', binaryKey);

    // Дополняем ключ и сообщение до 64-битного формата
    binaryMessage = get64bites(binaryMessage);
    binaryKey = get64bites(binaryKey);
    print('64-битное сообщение:', binaryMessage);
    print('64-битный ключ:', binaryKey);
    
    // Выполняем начальную перестановку
    binaryMessage = permutation('initial', binaryMessage);
    print('Начальная перестановка сообщения:', binaryMessage);

    // Делим сообщение на левую и правую части путём обрезания соответствующих частей строк
    const msgLeft = binaryMessage.slice(0,binaryMessage.length / 2);
    const msgRight = binaryMessage.slice(binaryMessage.length / 2, binaryMessage.length);
    print('Левая часть сообщения:', msgLeft);
    print('Правая часть сообщения:', msgRight);

    // Создаем 56-битный ключ
    const key56 = get56key(binaryKey);
    print('56-битный ключ', key56);
    
    // Делим 56-битный ключ на левую и правую часть
    keyLeft = key56.slice(0, key56.length / 2);
    keyRight = key56.slice(key56.length / 2, key56.length);
    print('Левая часть ключа:', keyLeft);
    print('Правая часть ключа:', keyRight);

    // Получаем 16 C(n)-D(n) пар ключей для шифрования
    print('Получаем 16 C(n)-D(n) пар ключей для шифрования');
    const [leftKeysArr, rightKeysArr] = get16keys(keyLeft, keyRight, 'initial');
    for(let i = 0; i < 16; i++) {
        print(`
        <div style='font-size:10px;display:flex'>
            <div style='color:blue;'>C(${i+1}): ${leftKeysArr[i]}</div>
            <div style='color:red;margin-left: 10px'>D(${i+1}): ${rightKeysArr[i]}</div>
        </div>`);
    }

    // Формируем массив объединённых частей ключей
    print('Формируем массив объединённых частей ключей');
    let keys = leftKeysArr.map((leftKey, idx) => leftKey + rightKeysArr[idx]);
    keys.forEach((key, idx) => {
        print(`<div style='font-size:10px'>${idx+1} key: ${key}</div>`);
    })

    // Производим сжатие данных ключей
    print('Производим сжатие данных ключей до 48 бит');
    keys = keys.map(key => get48key(key));
    keys.forEach((key, idx) => {
        print(`<div style='font-size:10px'>${idx+1} key: ${key}</div>`);
    })

    // Создаем буфер для хранения результатов
    let left = msgLeft;
    let right = msgRight;

    keys.forEach((key, idx) => {
        print(`<div style='border-top: 5px solid blue'></div>`);
        print(`<h3>Раунд №${idx+1}</h3>`);
        print(`Входные данные:`);
        print(`L(${idx}): ${left}`);
        print(`R(${idx}): ${right}`);
        print(`k(${idx}): ${key}`);

        // Получаем результат функции F
        const resultF = F(key, right);

        // Делаем XOR левой части с резульатом функции
        print('Делаем XOR левой части с резульатом функции');
        left = XOR(left, resultF);
        print('Результат XOR:', left);

        // Меняем местами ветви шифра
        print('Меняем местами ветви шифра');
        [left, right] = [right, left];
        print(`Теперь левая сторона: ${left}`);
        print(`А правая сторона: ${right}`);
        print(`<div style='border-top: 3px solid blue'></div>`);
    });
    
    // Меняеем порядок блоков в шифре
    print('Меняем порядок блоков в шифре');
    let finalBits = right + left;
    print(finalBits);

    // Делаем финальную перестановку
    print('Финальная перестановка');
    finalBits = permutation('final', finalBits);
    print('Финальное бинарное сообщение:');
    print(`<h2>${finalBits}</h2>`)

    alert(`Если вкратце, я преобразовал сообщение '${message}' с ключом '${key}' вот в это: ${finalBits}. \nБолее подробное решение вы можете найти ниже после загрузки страницы.`);
    alert('И да, поставьте пожалуйста зачёт, я очень сильно старался ;)');
}

// Основная функция шифрования
const F = (keyN, msgPart) => {
    // print('<div style="border-top:5px solid red;height:0px">');
    print('<b>Функция F</b>')
    print('Входящее сообщение:', msgPart);
    print('Ключ:', keyN);

    // Расширяем количество бит входящего сообщения до 48 через функцию Е
    msgPart = E(msgPart);
    print('Расширенное сообщение:', msgPart);
    print('Выполняем XOR между расширенным сообщением и ключом');

    // Складываем расширенное сообщение по модулю 2 с ключом
    const xored = XOR(msgPart, keyN);
    print('Результат XOR', xored);

    // Получаем B блоки
    const Bblocks = getB6blocks(xored);
    print('<b>B-блоки (6 бит):', Bblocks.join(', '), '</b>');

    // Получаем В` блоки
    const B4blocks = Bblocks.map((Bblock, idx) => getB4block(Bblock, idx));
    print(`<b>B'-блоки (4 бит):`, B4blocks.join(', '), '</b>');

    // Получаем результирующее значение функции F
    let result = B4blocks.join('');

    // Делаем перестановку значения функции F
    print('Выполняем перестановку');
    result = get32key(result);
    print(`<b style='font-size: 16px'>Результат функции F: ${result}</b>`);
    // print('<div style="border-top:5px solid red;height:0px">');
    return result;
}

const get16keys = (keyLeft, keyRight, mode) => {
    let leftKeysArr = [];
    let rightKeysArr = [];
    let direction;
    if (mode === 'initial') direction = 'left';
    else if (mode === 'final') direction = 'right';
    biteMoves.forEach(bitesCount => {
        keyLeft = bitShift(keyLeft, direction, bitesCount);
        keyRight = bitShift(keyRight, direction, bitesCount);
        leftKeysArr.push(keyLeft);
        rightKeysArr.push(keyRight);
    });
    return [leftKeysArr, rightKeysArr];
}

// Функция дополняет входящую строку до числа бит кратному 64
const get64bites = (str) => {
    while(str.length % 64 !== 0) str += '0';
    return str;
}

// Функция делает циклический битовый сдвиг
const bitShift = (bitesStr, direction, count) => {
    let bitesArr = bitesStr.split('');
    let k;
    if (direction == 'right') k = -1;
    else if (direction == 'left') k = 1;
    return bitesArr.splice(k * count).concat(bitesArr).join('');
}


// Функция для начальной и финальной перестановки
const permutation = (mode, message) => {
    let arr = [];
    let permArr = [];
    const msgBitesArr = message.split('');
    if (mode == 'initial') permArr = ip;
    else if (mode == 'final') permArr = ip_1;
    for (let i = 0; i < ip.length; i++) {
        arr[i] = msgBitesArr[permArr[i]];
    }
    return arr.join('');
}

// Функция делает перестановку бит в переданном в нее ключе согласно таблице PC-1
const get56key = (key) => {
    let arr = [];
    const keyBitesArr = key.split(''); 
    for(let i = 0; i < key.length; i++) {
        arr[i] = keyBitesArr[pc1[i]];
    }
    return arr.join('');
}

// Функция делает перестановку бит в переданном в нее ключе согласно таблице PC-2
const get48key = (key) => {
    let arr = [];
    const keyBitesArr = key.split('');
    for(let i = 0; i< key.length; i++) {
        arr[i] = keyBitesArr[pc2[i]];
    }
    return arr.join('');
}

// Функция делает перестановку бит для результата функции F согласно таблице P
const get32key = (key) => {
    let arr = [];
    const keyBitesArr = key.split('');
    for(let i = 0; i< key.length; i++) {
        arr[i] = keyBitesArr[p[i]];
    }
    return arr.join('');
}

// Функция расширения Е
const E = (msgPart) => {
    let arr = [];
    const msgBitesArr = msgPart.split('');
    for(num of eTable) {
        arr.push(msgBitesArr[num]);
    }
    return arr.join('');
}

// Функция возвращает 4-битный B` блок из переданного в нее 6-битного В-блока
const getB4block = (B6block, blockIdx) => {
    print(`<b>Блок ${B6block}</b>`);

    // Получаем номер строки таблицы
    const binaryRow = B6block[0] + B6block[5];
    const row = parseInt(binaryRow, 2);
    print(`Крайние биты блока ${binaryRow}, значит номер строки таблицы ${row}`);

    // Получаем номер столбца таблицы
    const binaryColumn = B6block.slice(1,5);
    const column = parseInt(binaryColumn, 2);
    print(`Центральные биты блока ${binaryColumn}, значит номер столбца таблицы ${column}`);

    // Получаем значение из таблицы
    const table = sTable[blockIdx];
    const numeric = table[row][column];

    // Получаем битовое значение результата из таблицы
    let B4block = numeric.toString(2);
    while (B4block.length < 4) B4block = '0' + B4block;
    print(`Числовое значение из таблицы ${numeric}, что эквивалентно ${B4block} в бинарном виде`);
    return B4block;
}

// Исключающее ИЛИ
const XOR = (bytes1, bytes2) => {
    const bytesArr1 = bytes1.split('');
    const bytesArr2 = bytes2.split('');
    return bytesArr1.map((el, idx) => el ^ bytesArr2[idx]).join('');
}

// Функция возвращает В-блоки по 6 бит
const getB6blocks = (bites) => {
    const arr = [];
    let start = 0;
    let finish = 6;
    while (finish <= bites.length) {
        arr.push(bites.slice(start,finish));
        start = finish;
        finish += 6;
    }
    return arr;
}

// Функция разбивает переданное в нее сообщение на бинарные буквы
const getBinatyLetters = (message) => {
    const arr = [];
    let start = 0;
    let finish = 8;
    while (finish <= message.length) {
        arr.push(message.slice(start,finish));
        start = finish;
        finish += 8;
    }
    return arr;
}

encrypt(message, key);
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
