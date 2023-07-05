<template>
    <q-page padding>
        <div class="row">
            <q-table :rows="posts" :columns="columnsPosts" row-key="id" class="col-12" :loading="loading">
                <template v-slot:top>
                    <span class="text-h6">Posts</span>

                    <q-space></q-space>
                    <q-btn v-if="$q.platform.is.desktop" label="Adiconar" color='primary' icon="mdi-plus"
                        :to="{ name: 'form-posts' }">
                        <q-tooltip>Adicionar</q-tooltip>
                    </q-btn>

                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon='mdi-pencil' color='info' dense flat
                            :to="{ name: 'form-posts', params: { id: `${props.row.id}` } }">
                            <q-tooltip>Editar</q-tooltip>
                        </q-btn>
                        <q-btn icon='mdi-delete' color='negative' dense flat @click="handleDeletePosts(props.row.id)">
                            <q-tooltip>Deletar</q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn v-if="$q.platform.is.mobile" color='primary' icon="mdi-plus" fab :to="{ name: 'form-posts' }" />
        </q-page-sticky>
    </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import useApi from 'src/composables/UseApi.js'
import useNotify from 'src/composables/useNotify';
import { useQuasar } from 'quasar'
import { columnsPosts } from './table'

export default defineComponent({
    name: 'PagePostList',

    setup() {
        const posts = ref([])
        const loading = ref(true)
        const { list, remove } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const $q = useQuasar()

        const handleListPosts = async () => {
            try {
                loading.value = true
                posts.value = await list('posts')
                loading.value = false
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleDeletePosts = async (id) => {
            try {
                $q.dialog({
                    title: 'Excluir',
                    message: 'Deseja realmente excluir?',
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await remove('post', id)
                    notifySuccess('Exclusão realizada com sucesso !')
                    handleListPosts()
                })
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
            handleListPosts()
        })

        return {
            columnsPosts,
            posts,
            loading,
            handleDeletePosts,
        }
    }
})
</script>