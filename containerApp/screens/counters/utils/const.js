const hotWaterObject = {
    name: 'Горячая вода',
    address: '123456789',
    counterNumber: '1234567891',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};

const coldWaterObject = {
    name: 'Холодная вода',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};

const electrocityObject = {
    name: 'Электричество',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};


const heatObject = {
    name: 'Отопление',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};


const nightElectrocityObject = {
    name: 'Электричество ночь',
    counterNumber: '1234567891111',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};

const gasObject = {
    name: 'Газ',
    counterNumber: '123456789',
    dateOfCounterVerification: new Date().toString(),
    dateOfCounterVerificationNext: new Date().toString(),
    costOfaUnitOfMeasurement: '1',
};

const arrayFirstObgCounterData = [hotWaterObject, coldWaterObject, electrocityObject, heatObject, gasObject];

export { hotWaterObject, coldWaterObject, electrocityObject, gasObject, heatObject, arrayFirstObgCounterData };