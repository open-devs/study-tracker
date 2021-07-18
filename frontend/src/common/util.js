export default {
  getHeader: () => ({ headers: { 'Authorization': `Bearer ${localStorage.getItem('bearer')}`, } })
}
