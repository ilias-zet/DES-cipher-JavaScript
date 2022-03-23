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

// Таблица расширения Е
const e = [
    31,0,1,2,3,4,3,4,
    5,6,7,8,7,8,9,10,
    11,12,11,12,13,14,15,16,
    15,16,17,18,19,20,19,20,
    21,22,23,24,23,24,25,26,
    27,28,27,28,29,30,31,0
];

// Массив значений битовых сдвигов ключа
const byteMoves = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

// Заменяем каждую букву на соответствующее ей битовое значение из объекта
let binaryMessage = message.split("").map(letter => alphabet[letter]).join("");
let binaryKey = key.split("").map(letter => alphabet[letter]).join("");
print('Бинарное сообщение:', binaryMessage);
print('Бинарный ключ:', binaryKey);

// Функция дополняет входящую строку до числа бит кратному 64
const get64bytes = (str) => {
    while(str.length % 64 !== 0) str += '0';
    return str;
}

const bitShift = (bytes, direction, count) => {
    let bytesArr = bytes.split('');
    let k;
    if (direction == 'right') k = -1;
    else if (direction == 'left') k = 1;
    bytesArr.splice(k * count).concat(bytesArr);
}

// Дополняем ключ и сообщение до 64-битного формата
binaryMessage = get64bytes(binaryMessage);
binaryKey = get64bytes(binaryKey);
print('64-битное сообщение:', binaryMessage);
print('64-битный ключ:', binaryKey);

// Функция для начальной и финальной перестановки
const permutation = (mode, message) => {
    let arr = [];
    let permArr = [];
    const msgBytesArr = message.split('');
    if (mode == 'initial') permArr = ip;
    else if (mode == 'final') permArr = ip_1;
    for (let i = 0; i < ip.length; i++) {
        arr[i] = msgBytesArr[permArr[i]];
    }
    return arr.join('');
}

// Собственно сама начальная перестановка
binaryMessage = permutation('initial', binaryMessage);
print('Начальная перестановка сообщения:', binaryMessage);

// Делим сообщение на левую и правую части путём обрезания соответствующих частей строк
const msgLeft = binaryMessage.slice(0,binaryMessage.length / 2);
const msgRight = binaryMessage.slice(binaryMessage.length / 2, binaryMessage.length);
print('Левая часть сообщения:', msgLeft);
print('Правая часть сообщения:', msgRight);

// Функция делает перестановку бит в переданном в нее ключе согласно таблице PC-1
const get56key = (key) => {
    let arr = [];
    const keyBytesArr = key.split(''); 
    for(let i = 0; i < key.length; i++) {
        arr[i] = keyBytesArr[pc1[i]];
    }
    return arr.join('');
}

// Создаем 56-битный ключ
const key56 = get56key(binaryKey);
print('56-битный ключ', key56);

// Делим 56-битный ключ на левую и правую часть
keyLeft = key56.slice(0, key56.length / 2);
keyRight = key56.slice(key56.length / 2, key56.length);
print('Левая часть ключа:', keyLeft);
print('Правая часть ключа:', keyRight);
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
