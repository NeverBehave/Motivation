
// Initial general data that may be changed by the user
let generalData = {
    year: 1970,
    month: 1,
    day: 1,
    level: 'Moderate',
    granularity: 'year',
    font: 'default', // defined in html font
    fps: 30
}

let storage = {
    dateObj: null,
    interval: null,
}

function fps2Interval(fps) {
    return Math.floor(1000 / fps)
}

function generateDateString(year, month, day) {
    return year.toString() + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0')
}

function updateString (str) {
    document.getElementById('content').innerText = str
}

function updateStyle(font) {
    let style = '';
    switch(font) {
        case 'terminal':
            style = "font-family: 'VT323', monospace !important;"
            break
    }

    document.getElementById('content').style = style
}

function generateConfig() {
    const dateString = generateDateString(generalData.year, generalData.month, generalData.day)
    updateStyle(generalData.font)
    const m = dayjs(dateString)
    if (m.isValid()) {
        storage.dateObj = m
        return true
    }

    return false
}

function start() {
    const isValid = generateConfig()
    if (!isValid) {
        updateString("Missing date or date is invalid.")
        return
    }

    // main loop
    const func = () => updateString(filterLevel(storage.dateObj))
    storage.interval = setInterval(func, fps2Interval(generalData.fps))
}

function stop () {
    if (storage.interval !== null) {
        clearInterval(storage.interval)
        storage.interval = null
    }
}

function restart() {
    stop()
    start()
}

function filterLevel (fromDate) {
    // WTF? Original
    // Terrifying 9 digits
    // Moderate 8 digits
    // Light 7 digits
    let n = dayjs().diff(fromDate, generalData.granularity, true)
    switch (generalData.level) {
        case 'Terrifying':
            return n.toFixed(9)
        case 'Moderate':
            return n.toFixed(8)
        case 'Light':
            return n.toFixed(7)
        case 'WTF?':
        default:
            return n
    }
}

// A global object that can listen to property changes
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        // document: not all properties will appear on each update, so do it on demand
        Object.keys(generalData).forEach(e => {
            if (properties[e]) {
                generalData[e] = properties[e].value
            }
        })

        restart()
    },
    applyGeneralProperties: function(properties) {
        if (properties.fps) {
            generalData.fps = properties.fps;
        }

        restart()
    },
    setPaused: function(isPaused) {
        if (isPaused) {
            // Actually, time could not be paused :)
            // Never Stop the beat
            // But we can kindly pause for you
            stop()
        } else {
           restart()
        }
    }
};

window.onload = function() {
    // Entry Code
    restart()
};