import { createStore, combineReducers } from 'redux';

const loadBar = {
  show: false,
};
const modal = {
  show: false,
};
const searchState = {
  actual: '',
  bind: '',
};
const blogState = {
  categories: '',
  title: '',
  description: '',
  url: ''
};

const alert = (state = { message: '', show: false }, action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        show: true,
        message: action.message,
      };
    case 'HIDE_ALERT':
      return {
        show: false,
        message: '',
      };
    default: return state;
  }
};
const appLoad = (state = loadBar, action) => {
  switch (action.type) {
    case 'SHOW_LOAD':
      return {
        show: true,
      };
    case 'HIDE_LOAD':
      return {
        show: false,
      };
    default: return state;
  }
};
const subscriptionModal = (state = modal, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        show: true,
      };
    case 'HIDE_MODAL':
      return {
        show: false,
      };
    default: return state;
  }
};
const search = (state = searchState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        actual: action.search,
      };
    case 'BIND':
      return {
        ...state,
        bind: action.bind,
      };
    default: return state;
  }
};
const blog = (state = blog, action) => {
  switch (action.type) {
    case 'SET_BLOG_DATA':
      return {
        ...action
      };
    default: return state;
  }
};

const reducer = combineReducers({
  appLoad,
  subscriptionModal,
  search,
  alert,
  blog
});

export default createStore(reducer);
