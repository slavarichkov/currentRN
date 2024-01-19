import { getDataByCounterName, createOrInsertData } from "../../../../utils/db/SQLite/dbCounters"

async function getDataCounters() {
    const test = await getDataByCounterName('e');
    console.log(test);
}

export { getDataCounters }