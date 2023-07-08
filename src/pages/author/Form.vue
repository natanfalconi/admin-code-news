<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-form class="row justify-center" @submit.prevent='handleCreateOrEditAuthor'>
          <p class="col-12 text-h5 text-center">{{ isUpdate ? 'Editar Autor' : "Novo Autor" }}</p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input label="Nome" type='text' lazy-rules v-model='form.name'
              :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

            <q-input label="Descrição" type='text' lazy-rules v-model='form.description'
              :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

            <q-input label="Escolaridade" type='text' lazy-rules v-model='form.schooling'
              :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

            <div class="full-width q-pt-md q-gutter-y-sm">
              <q-btn :label='isUpdate ? "Editar" : "Salvar"' type="submit" color='primary' class="full-width" />
              <q-btn label='Cancelar' color='negative' flat class="full-width" :to="{ name: 'author' }" />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/useNotify'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormAuthorPage',
  setup() {
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const route = useRoute()
    const router = useRouter()
    const isUpdate = computed(() => route.params.id)

    let author = {}
    const form = ref({
      name: '',
      description: '',
      schooling: ''
    })

    const getAuthor = async (id) => {
      try {
        author = await getById('author', id)
        form.value = author
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleCreateOrEditAuthor = async () => {
      let type = ''
      try {
        if (isUpdate.value) {
          await update('author', form.value)
          type = 'Editada'
        } else {
          await post('author', form.value)
          form.value.name = ''
          type = 'Criada'
        }
        notifySuccess(`Autor ${type} com sucesso`)
        router.push({ name: 'author' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (isUpdate.value) {
        getAuthor(isUpdate.value)
      }
    })

    return {
      form,
      isUpdate,
      handleCreateOrEditAuthor
    }
  }
})
</script>
