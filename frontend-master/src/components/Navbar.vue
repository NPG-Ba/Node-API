<template>
    <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">LisB</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <b-nav-item href="#">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown v-bind:text="$t('common.select_lang')" right>
            <b-dropdown-item @click="setLangUS()"><flag iso="us"/></b-dropdown-item>
            <b-dropdown-item @click="setLangJP()"><flag iso="jp"/></b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>

    </b-collapse>
    </b-navbar>
</template>

<!-- navbar-1.vue -->     

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavbarComponent extends Vue {
  
  /* Set lang jp */
  public setLangJP() {
    this.$store.dispatch("changeLang", "ja");
  }
  /* Set lang us */
  public setLangUS() {
    this.$store.dispatch("changeLang", "en");
  }
}
</script>
<style>
.dropdown-menu {
    min-width: 4rem !important;
}
#lang {
  color: #fff;
  background-color: white !important;
  border-color: #6c757d;
}
</style>

