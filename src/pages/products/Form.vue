<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-form class="row justify-center" @submit.prevent='handleSubmit'>
                    <p class="col-12 text-h5 text-center">{{ isUpdate ? 'Editar Produto' : "Novo Produto" }}</p>
                    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
                        <q-input label="Nome do produto" type='text' lazy-rules v-model='form.name'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <q-input label="Descrição" type='text' lazy-rules v-model='form.description'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <q-input label="Quantidade" type='number' lazy-rules v-model='form.amount'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <q-input label="Valor" type='number' lazy-rules v-model='form.price'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <q-select outlined v-model="form.category_id" :options="options" label="Selecione a categoria" />


                        <div class="full-width q-pt-md q-gutter-y-sm">
                            <q-btn :label='isUpdate ? "Editar" : "Salvar"' type="submit" color='primary'
                                class="full-width" />
                            <q-btn label='Cancelar' color='negative' flat class="full-width" :to="{ name: 'products' }" />
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
    name: 'FormProductsPage',
    setup() {
        const { post, getById, update, list } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const route = useRoute()
        const router = useRouter()
        const isUpdate = computed(() => route.params.id)
        const nameTable = 'products'

        const options = ref([])

        const form = ref({
            name: '',
            description: '',
            amount: null,
            price: null,
            category_id: null,
        })

        const getCategory = async () => {
            try {
                const data = await list('category')

                const categoryOptions = data.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })

                options.value = categoryOptions
            } catch (error) {
                notifyError(error.message)
            }
        }

        const getProductsById = async (id) => {
            try {
                const response = await getById(nameTable, id)
                const findOptionsLabel = options.value.find((item) => item.value === response.category_id)

                form.value = {
                    ...response,
                    category_id: findOptionsLabel
                }
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleSubmit = async () => {
            let type = ''
            try {
                if (isUpdate.value) {
                    await update(nameTable, {
                        ...form.value,
                        category_id: form.value.category_id.value
                    })
                    type = 'Editada'
                } else {
                    await post(nameTable, {
                        ...form.value,
                        category_id: form.value.category_id.value
                    })
                    form.value = ''
                    type = 'Criada'
                }
                notifySuccess(`Categoria ${type} com sucesso`)
                router.push({ name: 'products' })
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
            getCategory()
            getProductsById(isUpdate.value)
        })

        return {
            form,
            options,
            isUpdate,
            handleSubmit
        }
    }
})
</script>