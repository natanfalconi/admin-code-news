<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent='handleCreateCategory'>
            <p class="col-12 text-h5 text-center">Nova categoria</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
                <q-input label="Nome da categoria" type='text' lazy-rules v-model='form.name'
                    :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                <div class="full-width q-pt-md">
                    <q-btn label='Salvar' type="submit" color='primary' class="full-width" />
                </div>

            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
    name: 'CreateCategoryPage',

    setup() {
        const { post } = useApi()
        const { notifyError, notifySuccess } = useNotify()

        const form = ref({
            name: ''
        })
        const handleCreateCategory = async () => {
            try {
                await post('category', form.value)
                notifySuccess('Categoria criada com sucesso')
                form.value.name = ''
            } catch (error) {
                notifyError(error.message)
            }
        }

        return {
            form,
            handleCreateCategory
        }
    }
})
</script>