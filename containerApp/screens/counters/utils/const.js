const hotWaterObject = {
    name: 'Горячая вода',
    address: '123456789',
    counterNumber: '1234567891',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};

const coldWaterObject = {
    name: 'Холодная вода',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};

const electrocityObject = {
    name: 'Электричество',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};


const heatObject = {
    name: 'Отопление',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};


const nightElectrocityObject = {
    name: 'Электричество ночь',
    counterNumber: '1234567891111',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};

const gasObject = {
    name: 'Газ',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
};

const arrayFirstObgCounterData = [hotWaterObject, coldWaterObject, electrocityObject, heatObject, gasObject];

export { hotWaterObject, coldWaterObject, electrocityObject, gasObject, heatObject, arrayFirstObgCounterData };