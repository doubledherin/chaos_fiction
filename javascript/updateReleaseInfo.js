function updateReleaseCopy(postreleaseHtml) {
  const releaseInfo = document.getElementById("release-info")

  const releaseDate = new Date("2025-04-11T07:01:00Z") // 12:01 AM Pacific Time (UTC-7)
  console.log(getISODateStringFor10SecondsFromNow())
  const tenSecondsFromNow = "2025-04-03T20:34:50Z"
  const now = new Date()
  if (now >= releaseDate) {
    clearInterval(checkTimeInterval) // Stop checking once the update is made
    releaseInfo.innerHTML = postreleaseHtml
  }
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
