function updateReleaseInfo() {
  const releaseInfo = document.getElementById("release-info")
  const now = new Date()
  console.log(getISODateStringFor30SecondsFromNow())
  const releaseDate = new Date("2025-04-11T07:01:00Z") // 12:01 AM Pacific Time (UTC-7)
  // const tenSecondsFromNow = new Date("2025-04-03T18:27:38Z")

  // If the current time is past the target date, update the text
  if (now >= releaseDate) {
    releaseInfo.innerHTML = `<div>New album Steady Nerves now streaming everywhere.</br>Vinyl coming soon!</br>Listen <a href='https://chaosfiction.hearnow.com/steady-nerves'>here</a>.</div>`
    clearInterval(checkTimeInterval) // Stop checking once the update is made
  }
}
// check once a second to see if the release date/time has been reached
const checkTimeInterval = setInterval(updateReleaseInfo, 1000)

function getISODateStringFor30SecondsFromNow() {
  const now = new Date()
  const thirtySecondsFromNow = new Date(now.getTime() + 30000) // Add 30 seconds

  // Format the date to "YYYY-MM-DDTHH:mm:ssZ"
  const year = thirtySecondsFromNow.getUTCFullYear()
  const month = String(thirtySecondsFromNow.getUTCMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(thirtySecondsFromNow.getUTCDate()).padStart(2, "0")
  const hours = String(thirtySecondsFromNow.getUTCHours()).padStart(2, "0")
  const minutes = String(thirtySecondsFromNow.getUTCMinutes()).padStart(2, "0")
  const seconds = String(thirtySecondsFromNow.getUTCSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
}
