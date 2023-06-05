import {roundNumbetTo2Digits} from './MyMath'

export function Generate({tileSize}) {
    const tabSize = (20 / 200); // tiles connection shape size
    const jitter = (4 / 100);
    let seed = Math.random() * 10000;
    let a, b, c, d, e, flip;

    let offsetX = 0;
    let offsetY = 0;
    let x = 0;
    let y = 0;

    const random = () => {
        seed++;
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const uniform = (min, max) => {
        let r = random();
        return min + r * (max - min);
    };

    const randomBool = () => { // rbool
        return random() > 0.5;
    };

    const l = (v) => {
        const r = x + tileSize * v; // setPosition (x) + tile_size (height) * curveK (v)
        return roundNumbetTo2Digits(r);
    };

    const w = (v) => {
        const r = y + tileSize * v * (flip ? -1 : 1);
        return roundNumbetTo2Digits(r);
    };

    const l0 = () => l(0);
    const l1 = () => l(0.2);
    const l2 = () => l(0.5 + b + d);
    const l3 = () => l(0.5 - tabSize + b);
    const l4 = () => l(0.5 - 2.0 * tabSize + b - d);
    const l5 = () => l(0.5 + 2.0 * tabSize + b - d);
    const l6 = () => l(0.5 + tabSize + b);
    const l7 = () => l(0.5 + b + d);
    const l8 = () => l(0.8);
    const l9 = () => l(1.0); // h=1, v=0

    const w0 = () => w(0);
    const w1 = () => w(a);
    const w2 = () => w(-tabSize + c);
    const w3 = () => w(tabSize + c);
    const w4 = () => w(3 * tabSize + c);
    const w5 = w4;
    const w6 = w3;
    const w7 = w2;
    const w8 = () => w(e);
    const w9 = () => w(0); // h=0, v=1


    const next = () => {
        let flipold = flip;
        flip = randomBool();

        a = (flip == flipold ? -e: e);
        b = uniform(-jitter, jitter);
        c = uniform(-jitter, jitter);
        d = uniform(-jitter, jitter);
        e = uniform(-jitter, jitter);
    };

    const first = () => {
        e = uniform(-jitter, jitter);
        next();
    };

    const setPos = (xPos, yPos) => {
        x = xPos;
        y = yPos;
    };

    this.horizontal = () => {
        first();

        let arr = [];

        arr[0] = [' C', l1(), w1(),l2(), w2(),l3(), w3()];
        arr[1] = [' C', l4(), w4(),l5(), w5(),l6(), w6()];
        arr[2] = [' C', l7(), w7(),l8(), w8(),l9(), w9()];

        return arr;
    };

    this.vertical = () => {
        first();

        let arr = [];

        arr[0] = [' C', w1(), l1(),w2(), l2(),w3(), l3()];
        arr[1] = [' C', w4(), l4(),w5(), l5(),w6(), l6()];
        arr[2] = [' C', w7(), l7(),w8(), l8(),w9(), l9()];

        return arr;
    };

    // [xPos, yPos] - puzzle tile position on image
    // {top, right, left, bottom} - take a tile side from previous tile
    // for the right side of current tile set the "left" from previous tile is it exist
    this.tile = ([xPos, yPos], { top = null, right = null, left = null, bottom = null }) => {
        offsetX = xPos;
        offsetY = yPos;
        let path = '';

        // first triangle
        setPos(offsetX, offsetY);
        path += [' M', l0(), w0()];
        top = (top === 'line') ? [' L', offsetX + tileSize, offsetY] : top;
        top = top || this.horizontal();
        path += top;

        setPos(offsetY, offsetX + tileSize);
        right = (right === 'line') ? [' L', offsetX + tileSize, offsetY + tileSize] : right;
        right = right || this.vertical();
        path += right;

        // move to start point
        setPos(offsetX, offsetY);
        path += [' M', l0(), w0()];

        // second triangle
        setPos(offsetY, offsetX);
        left = (left === 'line') ? [' L', offsetX, offsetY + tileSize] : left;
        left = left || this.vertical();
        path += left;

        setPos(offsetX, offsetY + tileSize);
        bottom = (bottom === 'line') ? [' L', offsetX + tileSize, offsetY + tileSize] : bottom;
        bottom = bottom || this.horizontal();
        path += bottom;

        return {path, top, right, left, bottom};
    };
}