
// Initial general data that may be changed by the user
let generalData = {
    year: null,
    month: null,
    day: null,
    level: 'Moderate'
}

let storage = {
    dateObj: null,
    interval: null,
}

function generateDateString(year, month, day) {
    return year.toString() + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0')
}

function start() {
    if (storage.interval === null) {
        storage.interval = setInterval(run, 33) // 1/30 second
    }
}

function stop () {
    if (storage.interval !== null) {
        clearInterval(storage.interval)
        storage.interval = null
    }
}

function run() {
    if (storage.dateObj !== null) {
        updateString(filterLevel(storage.dateObj))
    }
}

function filterLevel (fromDate) {
    // WTF? Original
    // Terrifying 9 digits
    // Moderate 8 digits
    // Light 7 digits
    let n = moment().diff(fromDate, 'year', true)
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

function updateString (str) {
    document.getElementById('content').innerText = str
}

// A global object that can listen to property changes
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.year && properties.month && properties.day) {
            let m = moment(generateDateString(properties.year.value, properties.month.value, properties.day.value))
            if (m.isValid()) {
                storage.dateObj = m
            }
        }

        if (properties.level) {
            generalData.level = properties.level.value
        }
    },
    setPaused: function(isPaused) {
        if (isPaused) {
            // Actually, time should not be paused :)
            // Never Stop the beat
            // But we can kindly pause for you
            stop()
        } else {
           start()
        }
    }
};

window.onload = function() {
    // Entry Code
    start()
};