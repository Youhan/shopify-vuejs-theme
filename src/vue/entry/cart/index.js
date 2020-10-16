import Vue from "vue";
import Vuex from "vuex";
import store from "@vue/store";
import "document-register-element";
import filters from "@vue/filters";
import plugins from "@vue/plugins";

/**
 * import a list of custom elements / web components
 * =================================================================*/
import customElements from "./custom-elements/index.js";

/**
 * Components
 * =================================================================*/
import "./components/index.js";

/**
 * Vuex
 * =================================================================*/
Vue.use(Vuex);
const vuexStore = new Vuex.Store(store);

/**
 * Register Filters
 * =================================================================*/
Object.entries(filters).forEach(filter => {
  Vue.filter(...filter);
});

/**
 * Register Plugins
 * =================================================================*/
plugins.forEach(plugin => {
  Vue.use(plugin);
});

/**
 * Register Directives
 * =================================================================*/

/**
 * Register Custom Elements
 * =================================================================*/
Object.entries(customElements).forEach(component => {
  const [name, module] = component;

  module.store = vuexStore;
  Vue.customElement(name, module);
  Vue.config.ignoredElements = [name];
});
