import axios from 'axios';
import LZString from 'lz-string';

function compressData(data) {
    const dataInJSON = JSON.stringify(data);

    return LZString.compressToEncodedURIComponent(LZString.compress(dataInJSON));
}

function decompressData(data) {
    const dataInJSON = LZString.decompress(LZString.decompressFromEncodedURIComponent(data));

    return JSON.parse(dataInJSON);
}

function sentDataToServer(data) {
    const exportConfig = window.puzzles.exportConfig;

    const timestamp = Date.now();
    
    // insert data into the config to send
    let config = {
        ...exportConfig,
        data: {
            data,
            timestamp,
        },
    };

    // send data with axios
    axios(config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.warn(error);
        });
}

export function importPuzzles(dataToRestore = '') {
    return decompressData(dataToRestore);
}

export async function exportPuzzles(dataToSave) {
    let data = compressData(dataToSave);

    sentDataToServer(data);
}

export async function exportPuzzlesFromLocalStorage() {
    let data = localStorage.getItem('puzzles');

    sentDataToServer(data);
}

export async function savePuzzlesToLocalStorage(dataToSave) {
    let data = compressData(dataToSave);

    localStorage.setItem('puzzles', data);
}