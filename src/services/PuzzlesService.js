import LZString from 'lz-string';

export async function importPuzzles(/*userId*/) {

    // load data from the server
    let compressedData = localStorage.getItem('puzzles');

    const dataInJSON = LZString.decompress(LZString.decompressFromEncodedURIComponent(compressedData));

    const dataToRestore = JSON.parse(dataInJSON);

    return dataToRestore;
}

export async function exportPuzzles(/*userId,*/ dataToSave) {

    const dataInJSON = JSON.stringify(dataToSave);

    let compressed = LZString.compressToEncodedURIComponent(LZString.compress(dataInJSON));

    // send data to the server
    localStorage.setItem('puzzles', compressed)
}