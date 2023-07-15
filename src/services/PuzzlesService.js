import LZString from 'lz-string';

export function importPuzzles(dataToRestore = {}) {
    const dataInJSON = LZString.decompress(LZString.decompressFromEncodedURIComponent(dataToRestore));

    return JSON.parse(dataInJSON);
}

export async function exportPuzzles(url, dataToSave) {
    const dataInJSON = JSON.stringify(dataToSave);

    let dataCompressed = LZString.compressToEncodedURIComponent(LZString.compress(dataInJSON));

    // use an url for send data to the server
    // for test save data to the localStorage
    localStorage.setItem('puzzles', dataCompressed)
}