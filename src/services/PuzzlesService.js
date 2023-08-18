import axios from 'axios';
import LZString from 'lz-string';

export function importPuzzles(dataToRestore = {}) {
    const dataInJSON = LZString.decompress(LZString.decompressFromEncodedURIComponent(dataToRestore));

    return JSON.parse(dataInJSON);
}

export async function exportPuzzles(config, dataToSave) {
    const dataInJSON = JSON.stringify(dataToSave);

    let dataCompressed = LZString.compressToEncodedURIComponent(LZString.compress(dataInJSON));

    // use exportConfig for send data to the server
    // for test save data to the localStorage
    if (config) {
        let exportConfig = {
            ...config,
            data: dataCompressed
        };

        axios(exportConfig)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        localStorage.setItem('puzzles', dataCompressed);
    }
}