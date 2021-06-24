

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
        console.log(`POST request sent to ${localhost_8080} successfully!`)
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



function getCurrentGoogleSearch() {
    let content_searched = document.querySelector("head > title").textContent

    content_searched = content_searched.split(" - Google Search")[0].trim()
    return content_searched
}

const localhost_8080 = "http://localhost:8080/"

function sendGoogleSearchToLocalhost() {
    postRequest(
        localhost_8080,
        {
            "date": getCurrentDate(),
            "time": getCurrentTime(),
            "datetime": `${getCurrentDate()}-${getCurrentTime()}`,
            "url": getCurrentURL(),
            "search": getCurrentGoogleSearch()
        }
    )
    console.log(`post request with google search sent to ${localhost_8080}`)
}


function continuouslyCheckServerOnline() {
    let local_status = 500
    // let remote_status = 500
    while (local_status != 200) {
        local_status = checkServerOnline(localhost_8080)
        // remote_status = checkServerOnline(remote_server_http_192_168_1_234)
    }
    alert(`${localhost_8080} is ONLINE\n`)

}

sendGoogleSearchToLocalhost()
// alert(`content searched: ${getCurrentGoogleSearch()}`)