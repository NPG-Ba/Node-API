<template>
        <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <div class="container">
                <b-navbar-brand href="#">LisB Project</b-navbar-brand>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                    <b-nav-item href="#"></b-nav-item>
                    <b-nav-item href="#"></b-nav-item>
                    </b-navbar-nav>
                    <b-collapse is-nav id="nav_collapse">
                            <!-- Right aligned nav items -->
                            <b-navbar-nav class="ml-auto">
                                <b-button size="sm" style="background-color: #f8f9fa" class="my-2 my-sm-0 lang" @click="setLang('en')"><img src="/img/icons/america.png"></b-button>
                                <b-button size="sm" style="background-color: #f8f9fa" class="my-2 my-sm-0 lang" @click="setLang('ja')"><img src="/img/icons/japan.png"></b-button>
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
  
  /* Set lang  */
  public setLang(code:any) {
    this.$store.dispatch("changeLang", code);
  }
}
</script>


