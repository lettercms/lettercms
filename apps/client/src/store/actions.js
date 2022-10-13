const viewLoad = () => ({
  type: 'VIEW_LOAD',
});
const showAlert = (message) => ({
  type: 'SHOW_ALERT',
  message,
});
const hideAlert = () => ({
  type: 'HIDE_ALERT',
});
const showModal = () => ({
  type: 'SHOW_MODAL',
});
const hideModal = () => ({
  type: 'HIDE_MODAL',
});
const setBlogData = data => ({
  type: 'SET_BLOG_DATA',
  ...data
});

export {
  viewLoad,
  showModal,
  hideModal,
  showAlert,
  hideAlert,
  setBlogData
};
