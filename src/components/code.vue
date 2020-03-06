<router-link to="/product/1"> WORKS

<router-link v-bind:to="{path: '/product/' + product.id}"> WORKS

<router-link :to="{ name: 'product_show', params: { id: product.id } }"> WORKS

