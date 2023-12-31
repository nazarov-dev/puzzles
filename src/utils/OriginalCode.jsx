import React from 'react';
import MyButton from "./UI/button/MyButton";

const puzzleSVG = () => {


    function save(filename, data)
    {
        let blob = new Blob([data], {type: "text/csv"});
        if (window.navigator.msSaveOrOpenBlob)
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            let elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }

    let seed = 1;
    function random() { let x = Math.sin(seed) * 10000; seed += 1; return x - Math.floor(x); }
    function uniform(min, max) { let r = random(); return min + r * (max - min); }
    function rbool() { return random() > 0.5; }

    function $(id) { return document.getElementById(id); }

    function updateseed()     { $("_seed").value =    $("seed").value;          update(); }
    function updatetabsize()  { $("_tabsize").value = $("tabsize").value + "%"; update(); }
    function updatejitter()   { $("_jitter").value =  $("jitter").value + "%";  update(); }
    function update_seed()    { let val = parseFloat($("_seed").value);    if (!isNaN(val)) { $("seed").value = val; }    updateseed(); }
    function update_tabsize() { let val = parseFloat($("_tabsize").value); if (!isNaN(val)) { $("tabsize").value = val; } updatetabsize(); }
    function update_jitter()  { let val = parseFloat($("_jitter").value);  if (!isNaN(val)) { $("jitter").value = val; }  updatejitter(); }

    let a, b, c, d, e, t, j, flip, xi, yi, xn, yn, vertical, offset, width, height;

    function first() { e = uniform(-j, j); next();}
    function next()  { let flipold = flip; flip = rbool(); a = (flip == flipold ? -e: e); b = uniform(-j, j); c = uniform(-j, j); d = uniform(-j, j); e = uniform(-j, j);}
    function sl()  { return vertical ? height / yn : width / xn; }
    function sw()  { return vertical ? width / xn : height / yn;}
    function ol()  { return offset + sl() * (vertical ? yi : xi); }
    function ow()  { return offset + sw() * (vertical ? xi : yi); }
    function l(v)  { let ret = ol() + sl() * v; return Math.round(ret * 100) / 100; }
    function w(v)  { let ret = ow() + sw() * v * (flip ? -1.0 : 1.0); return Math.round(ret * 100) / 100; }

    function p0l() { return l(0.0); }
    function p0w() { return w(0.0); }
    function p1l() { return l(0.2); }
    function p1w() { return w(a); }
    function p2l() { return l(0.5 + b + d); }
    function p2w() { return w(-t + c); }
    function p3l() { return l(0.5 - t + b); }
    function p3w() { return w(t + c); }
    function p4l() { return l(0.5 - 2.0 * t + b - d); }
    function p4w() { return w(3.0 * t + c); }
    function p5l() { return l(0.5 + 2.0 * t + b - d); }
    function p5w() { return w(3.0 * t + c); }
    function p6l() { return l(0.5 + t + b); }
    function p6w() { return w(t + c); }
    function p7l() { return l(0.5 + b + d); }
    function p7w() { return w(-t + c); }
    function p8l() { return l(0.8); }
    function p8w() { return w(e); }
    function p9l() { return l(1.0); }
    function p9w() { return w(0.0); }

    function gen_d()
    {
        let str = "";

        seed = parseInt($("seed").value);
        t = parseFloat($("tabsize").value) / 200.0;
        j = parseFloat($("jitter").value) / 100.0;
        xn = parseInt($("xn").value);
        yn = parseInt($("yn").value);

        vertical = 0;
        for (yi = 1; yi < yn; ++yi)
        {
            xi = 0;
            first();
            str += "M" + p0l() + "," + p0w() + " ";
            for (; xi < xn; ++xi)
            {
                console.log(a, b, c, d, e);
                str += "C" + p1l() + "," + p1w() + " " + p2l() + "," + p2w() + " " + p3l() + "," + p3w() + " ";
                str += "C" + p4l() + "," + p4w() + " " + p5l() + "," + p5w() + " " + p6l() + "," + p6w() + " ";
                str += "C" + p7l() + "," + p7w() + " " + p8l() + "," + p8w() + " " + p9l() + "," + p9w() + " ";
                next();
            }
        }

        vertical = 1;
        for (xi = 1; xi < xn; ++xi)
        {
            yi = 0;
            first();
            str += "M" + p0w() + "," + p0l() + " ";
            for (; yi < yn; ++yi)
            {
                str += "C" + p1w() + "," + p1l() + " " + p2w() + "," + p2l() + " " + p3w() + "," + p3l() + " ";
                str += "C" + p4w() + "," + p4l() + " " + p5w() + "," + p5l() + " " + p6w() + "," + p6l() + " ";
                str += "C" + p7w() + "," + p7l() + " " + p8w() + "," + p8l() + " " + p9w() + "," + p9l() + " ";
                next();
            }
        }

        str += "M" + offset + "," + offset + " "
        str += "L" + (offset + width) + "," + offset + " "
        str += "L" + (offset + width) + "," + (offset + height) + " "
        str += "L" + offset + "," + (offset + height) + " "
        str += "L" + offset + "," + offset + " ";

        return str;
    }

    function update()
    {
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        let ratio = 1.0 * width / height;
        if (ratio > 1.5)
        {
            width = 900;
            height = width / ratio;
        }
        else
        {
            height = 600;
            width = height * ratio;
        }
        $("puzzlecontainer").setAttribute("width", width + 11);
        $("puzzlecontainer").setAttribute("height", height + 11);
        offset = 5.5;
        $("puzzlepath").setAttribute("d", gen_d());
    }

    function generate()
    {
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        offset = 0.0;

        let data = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" ";
        data += "width=\"" + width + "mm\" height=\"" + height + "mm\" viewBox=\"0 0 " + width + " " + height + "\">";
        data += "<path fill=\"none\" stroke=\"black\" stroke-width=\"0.1\" d=\"";
        data += gen_d();
        data += "\"></path></svg>";

        save("jigsaw.svg", data);
    }

    const create = () => {
        $('seed').value = Math.random() * 10000; updateseed();
    };

    return (
        <div>
            <MyButton onClick={() => create()}>Create</MyButton>
            <table>
                <tbody>
                <tr>
                    <td>Seed:</td>
                    <td><input id="_seed" type="text" value="0" onChange={() => update_seed()}/></td>
                    <td><input id="seed" type="range" value="0" min="0" max="9999" step="1" onChange={() => updateseed()}/>
                    </td>
                </tr>
                <tr>
                    <td>Tab Size:</td>
                    <td><input id="_tabsize" type="text" value="20%" onChange={() => update_tabsize()}/></td>
                    <td><input id="tabsize" type="range" value="20" min="10" max="30" step="0.1"
                               onChange={() => updatetabsize()}/></td>
                </tr>
                <tr>
                    <td>Jitter:</td>
                    <td><input id="_jitter" type="text" value="4%" onChange={() => update_jitter()}/></td>
                    <td><input id="jitter" type="range" value="4" min="0" max="13" step="0.1"
                               onChange={() => updatejitter()}/></td>
                </tr>
                <tr>
                    <td>Tiles:</td>
                    <td><input id="xn" type="text" value="15" size="4" onChange={() => update()}/> x
                        <input id="yn"
                               type="text"
                               value="10"
                               size="4"
                               onChange={() => update()}/>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Size:</td>
                    <td><input id="width" type="text" value="300" size="4" onChange={() => update()}/> x <input id="height"
                                                                                                                type="text"
                                                                                                                value="200"
                                                                                                                size="4"
                                                                                                                onChange={() => update()}/> mm
                    </td>
                    <td>
                        <button onClick={() => generate()}>Download SVG</button>
                    </td>
                </tr>
                </tbody>

            </table>
            <svg id="puzzlecontainer">
                <path id="puzzlepath" fill="none" stroke="black"></path>
            </svg>
        </div>
    );
};

export default puzzleSVG;