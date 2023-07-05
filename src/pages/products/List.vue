<template>
    <q-page padding>
        <div class="row">
            <q-table :rows="products" :columns="columnsProducts" row-key="id" class="col-12" :loading="loading">
                <template v-slot:top>
                    <span class="text-h6">Produtos</span>

                    <q-btn label="Minha Loja" color='primary' class="q-ml-sm" outline flat icon="mdi-store"
                        @click="handleGoToStore" />

                    <q-space />

                    <q-btn v-if="$q.platform.is.desktop" label="Adiconar" color='primary' icon="mdi-plus"
                        :to="{ name: 'form-products' }">
                        <q-tooltip>Adicionar</q-tooltip>
                    </q-btn>

                </template>

                <template v-slot:body-cell-img_url="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-avatar v-if="props.row.img_url">
                            <img :src="props.row.img_url" alt="imagem do produto">
                        </q-avatar>

                        <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
                    </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon='mdi-pencil' color='info' dense flat
                            :to="{ name: 'form-products', params: { id: `${props.row.id}` } }">
                            <q-tooltip>Editar</q-tooltip>
                        </q-btn>
                        <q-btn icon='mdi-delete' color='negative' dense flat @click="handleDeleteProducts(props.row.id)">
                            <q-tooltip>Deletar</q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" color='primary' icon="mdi-plus" fab :to="{ name: 'form-products' }" />
        </q-page-sticky>
    </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import useApi from 'src/composables/UseApi.js'
import useAuth from 'src/composables/UseAuthUser.js'
import useNotify from 'src/composables/useNotify';
import { useQuasar } from 'quasar'
import { columnsProducts } from './table'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'PageProductsList',

    setup() {
        const products = ref([])
        const loading = ref(true)
        const { remove, listPublic } = useApi()
        const router = useRouter()
        const { user } = useAuth()
        const { notifyError, notifySuccess } = useNotify()
        const $q = useQuasar()

        const handleListProducts = async () => {
            try {
                loading.value = true
                products.value = await listPublic('products', user.value.id)
                loading.value = false
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleGoToStore = () => {
            const idUser = user.value.id
            router.push({ name: 'list-products', params: { id: idUser } })
        }

        const handleDeleteProducts = async (id) => {
            try {
                $q.dialog({
                    title: 'Excluir',
                    message: 'Deseja realmente excluir?',
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await remove('products', id)
                    notifySuccess('Exclusão realizada com sucesso !')
                    handleListProducts()
                })
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
            handleListProducts()
        })

        return {
            columnsProducts,
            products,
            loading,
            handleDeleteProducts,
            handleGoToStore
        }
    }
})
</script>