<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
/*Nav*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,'MS UI Gothic','ＭＳ Ｐ明朝';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 30px;
}
#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
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
  /*List*/
.modal-footer {
    flex-direction: row-reverse;
    justify-content: space-around;
    display: flex;
    justify-content: flex-start !important;
    border-top: 0px solid #e9ecef !important;
}
.modal-footer .btn-secondary{
margin-left: 10px;
}
.modal-header {
    border-bottom: 0px solid #e9ecef !important;
}
.modal-body {
    display: contents;
}
/*Table*/
table {
  text-align: center;
}
.btn-secondary {
  margin-right: 20px;
}
.btn-addold {
  margin-left: 30px;
}

@media (min-width: 1200) {
  .colum-age {
    width: 15%;
  }
  .action {
    width: 15%;
  }
}
.table-responsive tbody tr td:first-child{
  text-align: left;
}
.table-responsive tbody tr td:nth-child(3){
  text-align: right!important;  
}
.table-responsive tbody tr td:nth-child(2) pre{
    max-height: 75px;
    overflow: hidden;
}
.table-responsive tbody tr td:nth-child(2) pre:hover{

    overflow-y: auto;
    display: block;
}
.table-responsive thead th {
    vertical-align: bottom;
}
.table-responsive thead tr th{
border-top: 0px solid #dee2e6 !important; 
}
.table-responsive thead th{
  border-bottom: 0px !important;
}
.table-responsive tbody tr:first-child td{
  border-top:none !important;
}
.table-responsive thead{
  display: none;
}
.table-responsive{
  overflow-y: scroll;
}
.table-responsive{
  height: 300px;
  margin-bottom: 10px;
}
p.help.is-danger {
    color: red;
}
  pre {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
  font-family: 'Avenir', Helvetica, Arial, sans-serif ,'ＭＳ Ｐ明朝'!important;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  }
  /*From*/
  .pre {
  font-size: 1rem !important;
}
.btn-primary {
  background-color: #007bff !important;
}
@media (min-width: 768px) {
  .input-small {
    width: 60% !important;
  }
}
label {
    font-weight: bold;
    /* font-size: 19px; */
}
.col-form-label {
    font-size: 16px  !important;
}
@media (min-width: 576px){
.col-sm-2 {
    -ms-flex: 0 0 16.666667%;
    -webkit-box-flex: 0;
    flex: 0 0 16.666667%;
    max-width: 11.666667% !important;
  }
}
.row {
    margin-right: -40px !important;
}
input:valid {
  border-color: green;
}
input:invalid {
  border-color: red;
}
.table-responsive{
  height: 640px;
  margin-bottom: 50px;
}
</style>
