var isLAN = function (ip) {
    ip.toLowerCase();
    if (new RegExp('^localhost.*').test(ip)) return true;
    var a_ip = 0;
    if (ip == "") return false;
    var aNum = ip.split(".");
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = a_ip >> 16 & 0xFFFF;
    return (a_ip >> 8 == 0x7F || a_ip >> 8 == 0xA || a_ip == 0xC0A8 || (a_ip >= 0xAC10 && a_ip <= 0xAC1F));
}

var load_filter = function () {
    var host = location.host;
    if (isLAN(host)) {
        return false;
    }

    return true;
}

if (load_filter()) {
    try {
        const start = new Date().getTime()
        window['speed_call'] = function (data) {
            console.log('ilink visit speed : ' + (data - start) + 'ms')
        }
        const script = document.createElement('script')
        script.src = "https://speed.ilink-tk.com/spd/tongji?start=" + start
        script.type = "text/javascript";
        script.async = true;
        script.charset = 'utf-8';
        document.head.appendChild(script)
    } catch (e) {

    }
}