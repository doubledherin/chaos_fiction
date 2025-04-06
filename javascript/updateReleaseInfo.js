function getReleaseCopy() {
  const prereleaseHtml = `<div>New album Steady Nerves releasing on April 11, 2025<div>`
  const postreleaseHtml = `<div>New album Steady Nerves now streaming everywhere.</br>Vinyl coming soon!</br>Listen <a href='https://chaosfiction.hearnow.com/steady-nerves'>here</a>.<div>`
  return isPostRelease() ? postreleaseHtml : prereleaseHtml
}

function isPostRelease() {
  const releaseDateTimestamp = "2025-04-11T07:01:00Z"
  const releaseDate = new Date(releaseDateTimestamp)
  // console.log(getISODateStringFor10SecondsFromNow())
  // const tenSecondsFromNow = new Date("2025-04-06T21:03:10Z")
  const now = new Date()
  return now >= releaseDate
}

// for testing the update to the release info
function getISODateStringFor10SecondsFromNow() {
  const now = new Date()
  const thirtySecondsFromNow = new Date(now.getTime() + 10000) // Add 30 seconds

  // Format the date to "YYYY-MM-DDTHH:mm:ssZ"
  const year = thirtySecondsFromNow.getUTCFullYear()
  const month = String(thirtySecondsFromNow.getUTCMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(thirtySecondsFromNow.getUTCDate()).padStart(2, "0")
  const hours = String(thirtySecondsFromNow.getUTCHours()).padStart(2, "0")
  const minutes = String(thirtySecondsFromNow.getUTCMinutes()).padStart(2, "0")
  const seconds = String(thirtySecondsFromNow.getUTCSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
}

document.addEventListener("DOMContentLoaded", () => {
  const releaseInfoDiv = document.querySelector(".release-info")

  if (typeof getReleaseCopy === "function") {
    releaseInfoDiv.innerHTML = getReleaseCopy()
  } else {
    console.error("getReleaseCopy is not defined")
  }
})
