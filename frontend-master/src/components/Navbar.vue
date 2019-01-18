<template>
        <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <div class="container">
                <b-navbar-brand href="#">LisB</b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <b-nav-item href="#">About</b-nav-item>
                    </b-navbar-nav>
                    <b-collapse is-nav id="nav_collapse">
                            <!-- Right aligned nav items -->
                            <b-navbar-nav class="ml-auto">
                                <b-button size="sm" style="background-color: #f8f9fa" class="my-2 my-sm-0 lang" @click="setLangUS()"><flag iso="us"/></b-button>
                                <b-button size="sm" style="background-color: #f8f9fa" class="my-2 my-sm-0 lang" @click="setLangJP()"><flag iso="jp"/></b-button>
                            </b-navbar-nav>
                    </b-collapse>
                </b-collapse>
            </div>
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
.navbar {
    position: relative;
    display: -ms-flexbox;
    display: -webkit-box !important;;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0.0rem 0rem !important; 
}
.bg-info {
    background-color: white !important;
}

</style>

