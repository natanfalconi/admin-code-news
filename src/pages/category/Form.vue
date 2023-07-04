<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-form class="row justify-center" @submit.prevent='handleCreateOrEditCategory'>
                    <p class="col-12 text-h5 text-center">{{ isUpdate ? 'Editar categoria' : "Nova categoria" }}</p>
                    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
                        <q-input label="Nome da categoria" type='text' lazy-rules v-model='form.name'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <div class="full-width q-pt-md q-gutter-y-sm">
                            <q-btn :label='isUpdate ? "Editar" : "Salvar"' type="submit" color='primary'
                                class="full-width" />
                            <q-btn label='Cancelar' color='negative' flat class="full-width" :to="{ name: 'category' }" />
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
    name: 'FormCategoryPage',
    setup() {
        const { post, getById, update } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const route = useRoute()
        const router = useRouter()
        const isUpdate = computed(() => route.params.id)

        let category = {}
        const form = ref({
            name: ''
        })

        const getCategory = async (id) => {
            try {
                category = await getById('category', id)
                form.value = category
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleCreateOrEditCategory = async () => {
            let type = ''
            try {
                if (isUpdate.value) {
                    await update('category', {
                        ...form.value
                    })
                    type = 'Editada'
                } else {
                    await post('category', form.value)
                    form.value.name = ''
                    type = 'Criada'
                }
                notifySuccess(`Categoria ${type} com sucesso`)
                router.push({ name: 'category' })
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
            if (isUpdate.value) {
                getCategory(isUpdate.value)
            }
        })

        return {
            form,
            isUpdate,
            handleCreateOrEditCategory
        }
    }
})
</script>