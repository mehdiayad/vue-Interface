<div class="col-4 col-sm-4 mx-auto text-white mt-3 mb-3">
    <span v-if="canGoBefore()"> <a class="btn btn-info text-white mx-1" v-on:click="previousPage()"> Precedent </a> </span>
    <span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="previousPage()"> Precedent </a> </span>				
    <span class="text text-dark mx-1"> {{products.currentPage}} of {{products.lastPage}} </span>
    <span v-if="canGoAfter()"> <a class="btn btn-info text-white mx-1" v-on:click="nextPage()"> Suivant </a> </span>
    <span v-else> <a class="btn btn-info text-white disabled mx-1" v-on:click="nextPage()"> Suivant </a> </span>
</div>