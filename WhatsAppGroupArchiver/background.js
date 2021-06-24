
// grupa 1031

const wapp_chats_JS_path = "#pane-side > div:nth-child(1) > div > div"

const csie_wapp_group_JS_path = "#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div.TbtXF > div._2pkLM > div._3Dr46 > span"

document.querySelector("#pane-side > div:nth-child(1) > div > div > div:nth-child(8) > div > div > div.TbtXF > div._2pkLM > div._3Dr46 > span")

// grup anunturi
const info_eco_eng_group_JS_path = "#pane-side > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div.TbtXF > div._2pkLM > div._3Dr46 > span"

const archive_button_JS_path = "#app > div > span:nth-child(4) > div > ul > li:nth-child(1) > div._11srW._2xxet"

function sleep(seconds) {
   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


async function add_to_archive(element) {
   var contextmenu_event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: false,
      view: window,
      button: 2,
      buttons: 0,
      clientX: element.getBoundingClientRect().x,
      clientY: element.getBoundingClientRect().y
   })

   // right clicked
   element.dispatchEvent(contextmenu_event)

   await sleep(1)

   const archive_button = document.querySelector(archive_button_JS_path)

   if (archive_button !== null) {
      console.log("archive button found:", archive_button)
      // chat to archive
      archive_button.click()
      console.log(element.textContent, " added to archive successfully!")
   }
}

async function background_running() {
   while (true) {

      console.log("trying to find chats...")
      const wapp_chats = document.querySelector(wapp_chats_JS_path)

      if (wapp_chats) {
         console.log("chats found.")
         const chats = wapp_chats.children
         for (var i = 0; i < chats.length; i++) {
            console.log("trying to find CSIE 1031 G...")
            const csie_1031_group = chats[i].querySelector('[title="CSIE G1031"]')

            if (csie_1031_group) {
               console.log("found csie 1031:", csie_1031_group)
               await add_to_archive(csie_1031_group)
               break
            }
         }

         await sleep(0.2)

         for (var i = 0; i < chats.length; i++) {
            console.log("trying to find INFO ECO END ASE(serious)")
            const info_eco_eng = chats[i].querySelector('[title="INFO ECO ENG ASE(serious)"]')

            if (info_eco_eng) {
               console.log("trying to find info_eco_eng...")
               await add_to_archive(info_eco_eng)
               break
            }
         }
      }
      await sleep(1)
   }
}


background_running()