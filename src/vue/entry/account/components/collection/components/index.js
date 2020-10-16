import Vue from "vue";
import { upperFirst, camelCase } from "@vue/utils/Helpers.js";

function RegisterComponents(requireComponents) {
  requireComponents.keys().forEach(fileName => {
    // get component config
    const componentConfig = requireComponents(fileName);
    // get pascal-case name of the component
    const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")));
    // register the component Globally
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}

/**
 * Register global components
 * =================================================================*/
const requireGlobalComponent = require.context("../../../components/global/", true, /\.vue$/);
RegisterComponents(requireGlobalComponent);

/**
 * Register local components
 * =================================================================*/
const requireComponent = require.context(".", true, /\.vue$/);
RegisterComponents(requireComponent);
