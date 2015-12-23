/* Canvas Variables. */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var size = canvas.width;
var refreshRate = 42;

/* Time Logic Variables. */
var hoursCap = 24;
var minutesCap = 60;
var secondsCap = 60;
var milliCap = 1000;

/* Set Circle Drawing Variables. */
var spacing = 40, initOffset = 20;
ctx.strokeStyle = '#28d1fa';
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = ctx.strokeStyle;

/* Background Variables. */
var gStartColor = '#09303a', gStartSize = 5;
var gEndColor = '#000000', gEndSize = 300;
gradient = ctx.createRadialGradient(size / 2, size / 2, gStartSize, size / 2, size / 2, gEndSize);
gradient.addColorStop(0, gStartColor);
gradient.addColorStop(1, gEndColor);

/* Text Variables. */
var dateFontSize = 25, dateFont = 'bold ' + dateFontSize + 'px Courier New';
var timeFontSize = 20, timeFont = '' + timeFontSize + 'px Courier New';
var textColor = '#26d1fa';

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function getEndRads(big, medium, mediumCap, small, smallCap) {
    var start = degToRad(270);
    var end = degToRad(360 * (medium / mediumCap + small / smallCap / mediumCap) - 90);
    if (big % 2 == 0) {
        return [start, end];
    } else {
        return [end, start];
    }
}

function render() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();

    /* Paint background. */
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    /* Paint hour circle. */
    var endRads = getEndRads(day, hours, hoursCap, minutes, minutesCap);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - initOffset, endRads[0], endRads[1]);
    ctx.stroke();

    /* Paint minute circle. */
    endRads = getEndRads(hours, minutes, minutesCap, seconds, secondsCap);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - spacing - initOffset, endRads[0], endRads[1]);
    ctx.stroke();

    /* Paint seconds circle. */
    endRads = getEndRads(minutes, seconds, secondsCap, milliseconds, milliCap);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - spacing * 2 - initOffset, endRads[0], endRads[1]);
    ctx.stroke();

    /* Paint date. */
    ctx.font = dateFont;
    ctx.fillStyle = textColor;
    var textWidth = ctx.measureText(today).width;
    ctx.fillText(today, size / 2 - textWidth / 2, size / 2 - dateFontSize / 2);

    /* Paint time. */
    ctx.font = timeFont;
    ctx.fillText(time, size / 2 - textWidth / 2, size / 2 - dateFontSize / 2 + timeFontSize + timeFontSize / 3);
}
//render();
setInterval(render, refreshRate);