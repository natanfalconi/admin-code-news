<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent='handleEditCategory'>
            <p class="col-12 text-h5 text-center">Editar categoria</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
                <q-input label="Nome da categoria" type='text' lazy-rules v-model='form.name'
                    :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                <div class="full-width q-pt-md">
                    <q-btn label='Editar' type="submit" color='primary' class="full-width" />
                </div>

            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/useNotify'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'EditCategoryPage',

    setup() {
        const { update, getById } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const route = useRoute()

        const form = ref({
            name: ''
        })

        const getCategory = async (id) => {
            try {
                const data = await getById('category', id)
                form.value = data
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleEditCategory = async () => {
            console.log('form.value', form.value.name)
            try {
                await update('category', form.value.name, route.params.id)
                notifySuccess('Categoria editada com sucesso')
                // form.value.name = ''
            } catch (error) {
                notifyError(error.message)
            }
        }


        onMounted(() => {
            getCategory(route.params.id)
        })

        return {
            form,
            handleEditCategory
        }
    }
})
</script>