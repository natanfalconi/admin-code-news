<template>
    <q-page padding>
        <div class="row">
            <q-table grid :filter="filter.trim()" :rows="products" :columns="columnsProducts" row-key="id" class="col-12"
                :loading="loading">
                <template v-slot:top>
                    <span class="text-h6">Produtos</span>
                    <q-space />
                    <q-input outlined dense v-model="filter" debounce="300" placeholder="pesquisar" class="q-mr-sm">
                        <template v-slot:append>
                            <q-icon name='mdi-magnify' />
                        </template>
                    </q-input>
                </template>

                <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                        <q-card bordered>
                            <q-img :src="props.row.img_url" :ratio="2 / 1" />
                            <q-separator />
                            <q-card-section class="text-center">
                                <strong>{{ props.row.name }}</strong>
                                <p>{{ formatCurrency(props.row.price) }}</p>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import useNotify from 'src/composables/useNotify';
import { useRoute } from 'vue-router'
import { columnsProducts } from './table'
import useApi from 'src/composables/UseApi';
import { formatCurrency } from 'src/utils/format';

export default defineComponent({
    name: 'PagePublicProducts',

    setup() {
        const products = ref([])
        const loading = ref(true)
        const filter = ref('')
        const { listPublic } = useApi()
        const route = useRoute()
        const { notifyError } = useNotify()

        const handleListProducts = async (userId) => {
            try {
                loading.value = true
                products.value = await listPublic('products', userId)
                loading.value = false
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
            if (route.params.id) {
                handleListProducts(route.params.id)
            }
        })

        return {
            columnsProducts,
            products,
            loading,
            filter,
            formatCurrency
        }
    }
})
</script>