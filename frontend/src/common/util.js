export default {
  getHeader: () => ({ headers: { 'Authorization': `Bearer ${localStorage.getItem('bearer')}`, } }),
  convertMinsToHrsMins: (mins) => {
    let h = Math.floor(mins / 60)
    let m = Math.floor(mins % 60)
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    return `${h} hrs ${m} mins`
  },
  getDateNow: () => new Date().toISOString().split("T")[0],
  getSevenDaysAgo: () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
}
