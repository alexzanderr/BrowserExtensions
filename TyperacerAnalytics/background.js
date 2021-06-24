


// window.addEventListener("beforeunload", function (e) {
//   var confirmationMessage = "hello my name is andre";

//   window.event.returnValue = confirmationMessage; //Gecko + IE
//   return confirmationMessage;                            //Webkit, Safari, Chrome
// });



function getSessionData(baseURL, wpm, accuracy = "None", text = "None") {
    return {
        wpm: wpm,
        url: baseURL,
        time: getCurrentTime(),
        date: getCurrentDate(),
        accuracy: accuracy,
        text: text
    }
}

function sleep(seconds) {
   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const http_localhost_8000 = "http://localhost:8000/"
const remote_server_http_192_168_1_234 = "http://192.168.1.234"



// 10 FAST FINGERS
const ten_fast_fingers_com = "https://10fastfingers.com/"
const ten_fast_fingers_wpm_js_path = "#wpm > strong"
const ten_fast_fingers_accuracy_js_path = "#accuracy > td.value > strong"
const ten_fast_fingers_timer_js_path = "#timer"


function getTenFastFingersWPM() {
    const result = document.querySelector(ten_fast_fingers_wpm_js_path)
    // console.log(result)
    if (result) {
        wpm = result.textContent // "70 WPM"
        items = wpm.split(" ") // array
        wpm = items[0]
        return parseInt(wpm)
    }
    return null
}


function getTenFastFingersAccuracy() {
    const element = document.querySelector(ten_fast_fingers_accuracy_js_path)
    // console.log(element)

    if (element) {
        let accuracy = element.textContent
        accuracy = accuracy[0] + accuracy[1] + accuracy[2] + accuracy[3] + accuracy[4]
        return parseFloat(accuracy)
    }
    return null
}


function getTenFastFingersTimerValue() {
    const element = document.querySelector(ten_fast_fingers_timer_js_path)
    // console.log(element)

    if (element) {
        let timer = element.textContent
        let minutes = timer[0]
        if (minutes == "1") {
            return 60
        }
        let seconds = timer[2] + timer[3]
        return parseInt(seconds)
    }
    return null
}


async function TenFastFingersAnalytics() {
    let sent = false;

    while (true) {
        // integer
        const timer = getTenFastFingersTimerValue()
        // console.log(timer)

        if (timer == 60) {
            // do nothing because there is no typing
            sent = true;
        } else if (0 < timer && timer < 60) {
            // the guy is typing
            sent = false;
        } else if (timer == 0 && !sent ) {
            // timer is done
            // meaning that we are done typing
            // and we need to send the data to
            // localhost
            const wpm = getTenFastFingersWPM()
            console.log(wpm)

            const accuracy = getTenFastFingersAccuracy()
            console.log(accuracy)

            if (wpm && accuracy) {
                console.log(`WPM: ${wpm}`)
                console.log(`Accuracy: ${accuracy}`)

                const response = postRequest(
                    http_localhost_8000,
                    getSessionData(ten_fast_fingers_com, wpm, accuracy)
                )
                console.log(response)

                sent = true
            } else if (wpm) {
                console.log(`WPM: ${wpm}`)

                const response = postRequest(
                    http_localhost_8000,
                    getSessionData(ten_fast_fingers_com, wpm)
                )
                console.log(response)

                sent = true
            } else {
                console.log("results NOT FOUND.")
            }
        }

        await sleep(backgroundPauseDuration)
    }
}


// TYPERACER
const play_typeracer_com = "https://play.typeracer.com/"
const play_typeracer_WPM_js_path = "#gwt-uid-17 > table > tbody > tr:nth-child(4) > td > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > div > div"
const play_typeracer_ACCURACY_js_path = "#gwt-uid-17 > table > tbody > tr:nth-child(4) > td > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > div"
const play_typeracer_TEXT_js_path = "#gwt-uid-17 > table > tbody > tr:nth-child(4) > td > div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > div > span.remainingChars"


function getPlayTyperacerWPM() {
    let element = document.getElementsByClassName("tblOwnStatsNumber")
    element = element.item(0)

    if (element) {
        // console.log(element)

        let wpm = element.textContent // "70 wpm"
        let items = wpm.split(" ") // array
        wpm = items[0]
        return parseInt(wpm)
    } else {
        element = document.querySelector(play_typeracer_WPM_js_path)
        if (element) {
            wpm = element.textContent // "70 wpm"
            items = wpm.split(" ") // array
            wpm = items[0]
            return parseInt(wpm)
        }
    }
    return null
}


function getPlayTyperacerAccuracy() {
    let element = document.getElementsByClassName("tblOwnStatsNumber tblOwnStatsNumber-bad")
    element = element.item(0)

    if (element) {
        // console.log(element)

        let acc = element.textContent // "96%"
        return parseInt(acc[0] + acc[1])
    } else {
        element = document.querySelector(play_typeracer_ACCURACY_js_path)
        if (element) {
            let acc = element.textContent // "96%"
            return parseInt(acc[0] + acc[1])
        }
    }
    return null
}


function getPlayTyperacerText() {
    let element = document.getElementsByClassName("remainingChars")
    element = element.item(0)

    if (element) {
        return element.textContent
    } else {
        element = document.querySelector(play_typeracer_TEXT_js_path)
        if (element) {
            return element.textContent
        }
    }
    return null
}


async function PlayTyperacerAnalytics() {
    let sent = false;

    while (true) {

        const wpm = getPlayTyperacerWPM()
        const accuracy = getPlayTyperacerAccuracy()
        const text = getPlayTyperacerText()

        if (wpm && accuracy && !sent && text) {
            console.log(`Wpm: ${wpm}`)
            console.log(`Accuracy: ${accuracy}`)

            const response = postRequest(
                http_localhost_8000,
                getSessionData(play_typeracer_com, wpm, accuracy, text)
            )
            console.log(response)

            sent = true;

        } else if (wpm === null && accuracy === null && text === null && sent) {
            sent = false;
        }

        await sleep(backgroundPauseDuration)
    }
}


// TYPING IO
const typing_io = "https://typing.io/"
const typing_io_WPM_js_path = "#main > dir > div.breakdown > table > tbody > tr:nth-child(5) > td.value"

const typing_io_TYPEABLE_CHARS_js_path = "#main > dir > div.breakdown > table > tbody > tr:nth-child(1) > td:nth-child(2) > span"
const typing_io_TYPED_CHARS_js_path = "#main > dir > div.breakdown > table > tbody > tr:nth-child(2) > td:nth-child(2) > span"
const typing_io_CODE_js_path = "#main > div.lesson.texture.paused > pre"


function getTypingIoWPM() {
    const wpm_score_element = document.querySelector(typing_io_WPM_js_path)
    if (wpm_score_element) {
        return parseInt(wpm_score_element.textContent) // 70
    }
    return null
}

function calculateTypingIoAccuracy() {
    let typeable_chars = document.querySelector(typing_io_TYPEABLE_CHARS_js_path)
    let typed_chars = document.querySelector(typing_io_TYPED_CHARS_js_path)

    if (typeable_chars && typed_chars) {
        typeable_chars = parseFloat(typeable_chars.textContent)
        typed_chars = parseFloat(typed_chars.textContent)
        let acc = typeable_chars / typed_chars
        acc *= 100
        return parseFloat(acc.toFixed(2))
    }
    return null
}

function getTypingIoCode() {
    let element = document.querySelector(typing_io_CODE_js_path)
    if (element) {
        return element.textContent
    }
    return null
}

async function TypingIoAnalytics() {
    let sent = false;

    while (true) {

        const wpm = getTypingIoWPM()
        const accuracy = calculateTypingIoAccuracy()

        if (wpm && accuracy && !sent) {
            console.log(`wpm: ${wpm}`)
            console.log(`acc: ${accuracy}`)

            const response = postRequest(
                http_localhost_8000,
                getSessionData(typing_io, wpm, accuracy)
            )
            console.log(response)

            sent = true;

        } else if (wpm === null && accuracy === null && sent) {
            sent = false;
        }

        await sleep(backgroundPauseDuration)
    }
}



function getCurrentURL() {
    return window.location.href
}


function checkServerOnline(url) {
    try {
        const response = fetch(url, {
            method: "GET",
            mode: 'no-cors'
        })
        console.log(response)

        return 200

    } catch (error) {
        console.log(error)
        if (error instanceof TypeError) {
            alert(`${url} OFFLINE`)

            return 500
        }
    }
}


function continuouslyCheckServerOnline() {
    let local_status = 500
    // let remote_status = 500
    while (local_status != 200) {
        local_status = checkServerOnline(http_localhost_8000)
        // remote_status = checkServerOnline(remote_server_http_192_168_1_234)
    }
    alert(`${http_localhost_8000} is ONLINE\n`)
}


async function postRequest(url, _json) {
    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: "json",
            body: JSON.stringify(_json)
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
        console.log(`POST request sent to ${http_localhost_8000} successfully!`)
        return response.json()

    } catch (error) {
        console.log("some error found in postRequest function")
        console.log(error)
    }
}


function getCurrentTime() {
    const currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }

    return `${hours}:${minutes}:${seconds}`
}

function getCurrentDate() {
    let currentDate = new Date()
    currentDate = JSON.stringify(currentDate)

    let items = currentDate.split("-")
    let year = items[0].slice(1, items[0].length)
    let month = items[1]
    let day = items[2].slice(0, 2)

    return `${day}.${month}.${year}`
}





const backgroundPauseDuration = 1

async function backgroundRunning() {
    // this is running on every website when extension is ON

    const currentURL = getCurrentURL()
    console.log(`Current URL: ${currentURL}`)

    if (currentURL.includes(ten_fast_fingers_com)) {
        // https://10fastfingers.com/

        continuouslyCheckServerOnline()

        TenFastFingersAnalytics()

    } else if (currentURL.includes(play_typeracer_com)) {
        // https://play.typeracer.com/

        continuouslyCheckServerOnline()

        PlayTyperacerAnalytics()

    } else if (currentURL.includes(typing_io)) {
        // https://typing.io/

        continuouslyCheckServerOnline()

        TypingIoAnalytics()

    }

    // pause
    await sleep(backgroundPauseDuration)
}

try {

    backgroundRunning()

} catch (error) {
    console.log(error)
}