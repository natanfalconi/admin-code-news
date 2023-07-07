<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-form class="row justify-center" @submit.prevent='handleSubmit'>
                    <p class="col-12 text-h5 text-center">{{ isUpdate ? 'Editar Post' : "Novo Post" }}</p>
                    <div class="col-md-8 col-sm-6 col-xs-10 q-gutter-y-sm">
                        <q-input label="Nome da categoria" type='text' lazy-rules v-model='form.title'
                            :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" outlined />

                        <q-input filled label="Imagem" stack-label type='file' lazy-rules v-model='img' accept='image/*'
                            outlined />

                        <q-editor v-model="form.description" placeholder="Descrição" :toolbar="[
                            [
                                {
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    list: 'only-icons',
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['bold', 'italic', 'underline'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                            }]
                        ]" :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" min-height="5rem" />

                        <div class="full-width q-pt-md q-gutter-y-sm">
                            <q-btn :label='isUpdate ? "Editar" : "Salvar"' type="submit" color='primary'
                                class="full-width" />
                            <q-btn label='Cancelar' color='negative' flat class="full-width" :to="{ name: 'posts' }" />
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
    name: 'FormPostsPage',
    setup() {
        const { post, getById, update, list, uploudImg } = useApi()
        const { notifyError, notifySuccess } = useNotify()
        const route = useRoute()
        const router = useRouter()
        const isUpdate = computed(() => route.params.id)
        const nameTable = 'posts'

        const optionsCategories = ref([])
        const img = ref([])
        const form = ref({
            title: '',
            description: '',
            imagem_url: '',
        })

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
                    const imgUrl = await uploudImg(img.value[0], 'blogImg')
                    form.value.imagem_url = imgUrl.publicUrl
                }

                if (isUpdate.value) {
                    await update(nameTable, form.value)
                    type = 'Editada'
                } else {
                    await post(nameTable, form.value)
                    type = 'Criada'
                }
                notifySuccess(`Categoria ${type} com sucesso`)
                router.push({ name: 'posts' })
            } catch (error) {
                notifyError(error.message)
            }
        }

        onMounted(() => {
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