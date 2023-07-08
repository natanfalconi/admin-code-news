<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="author" :columns="columnsAuthor" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <span class="text-h6">Autor</span>

          <q-space></q-space>
          <q-btn v-if="$q.platform.is.desktop" label="Adiconar" color='primary' icon="mdi-plus"
            :to="{ name: 'form-author' }">
            <q-tooltip>Adicionar</q-tooltip>
          </q-btn>

        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon='mdi-pencil' color='info' dense flat
              :to="{ name: 'form-author', params: { id: `${props.row.id}` } }">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn icon='mdi-delete' color='negative' dense flat @click="handleDeleteAuthor(props.row.id)">
              <q-tooltip>Deletar</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile" color='primary' icon="mdi-plus" fab :to="{ name: 'form-author' }" />
    </q-page-sticky>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import useApi from 'src/composables/UseApi.js'
import useNotify from 'src/composables/useNotify';
import { useQuasar } from 'quasar'
import { columnsAuthor } from './table'

export default defineComponent({
  name: 'PageAuthorList',

  setup() {
    const author = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const $q = useQuasar()

    const handleListAuthor = async () => {
      try {
        loading.value = true
        author.value = await list('author')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleDeleteAuthor = async (id) => {
      try {
        $q.dialog({
          title: 'Excluir',
          message: 'Deseja realmente excluir?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove('author', id)
          notifySuccess('Exclusão realizada com sucesso !')
          handleListAuthor()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListAuthor()
    })

    return {
      columnsAuthor,
      author,
      loading,
      handleDeleteAuthor,
    }
  }
})
</script>
