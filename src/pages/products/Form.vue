<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-form class="row justify-center" @submit.prevent='handleSubmit'>
                    <p class="col-12 text-h5 text-center">{{ isUpdate ? 'Editar Produto' : "Novo Produto" }}</p>
                    <div class="col-md-8 col-sm-6 col-xs-10 q-gutter-y-sm">
                        <q-input label="Nome do produto" type='text' lazy-rules v-model='form.name'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <!-- <q-input label="Descrição" type='text' lazy-rules v-model='form.description'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined /> -->

                        <q-editor v-model="form.description" placeholder="Descrição"
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" min-height="5rem" />

                        <q-input filled label="Imagem" stack-label type='file' lazy-rules v-model='img' accept='image/*'
                            :rules="[val => (val && val[0]) || 'Campo Obrigatório']" outlined />

                        <q-input label="Quantidade" type='number' lazy-rules v-model='form.amount'
                            :rules="[val => !!val || 'Campo Obrigatório']" outlined />

                        <q-input label="Valor" type='number' lazy-rules v-model='form.price' prefix="R$"
                            :rules="[val => !!val || 'Campo Obrigatório']" outlined />

                        <q-select outlined v-model="form.category_id" :options="optionsCategories"
                            :rules="[val => !!val || 'Campo Obrigatório']" label="Selecione a categoria" option-value="id"
                            option-label="name" map-options emit-value />

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
        const { post, getById, update, list, uploudImg } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const route = useRoute()
        const router = useRouter()
        const isUpdate = computed(() => route.params.id)
        const nameTable = 'products'

        const optionsCategories = ref([])
        const img = ref([])
        const form = ref({
            name: '',
            description: '',
            img_url: '',
            amount: 0,
            price: 0,
            category_id: null,
        })

        const getListCategories = async () => {
            // VERSÃO 1
            // try {
            //     const data = await list('category')

            //     const categoryOptions = data.map((item) => {
            //         return {
            //             label: item.name,
            //             value: item.id
            //         }
            //     })

            //     options.value = categoryOptions
            // } catch (error) {
            //     notifyError(error.message)
            // }

            // VERSÃO 2 - REFATORAÇÃO // o campo select também mudou
            try {
                optionsCategories.value = await list('category')
            } catch (error) {
                notifyError(error.message)
            }
        }

        const getProductsById = async (id) => {
            try {
                if (isUpdate.value) {
                    form.value = await getById(nameTable, id)
                }
            } catch (error) {
                notifyError(error.message)
            }
        }

        const handleSubmit = async () => {
            let type = ''
            try {
                if (img.value.length > 0) {
                    const imgUrl = await uploudImg(img.value[0], 'products')
                    form.value.img_url = imgUrl.publicUrl
                }

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
            getListCategories()
            getProductsById(isUpdate.value)
        })

        return {
            form,
            optionsCategories,
            isUpdate,
            handleSubmit,
            img,
        }
    }
})
</script>