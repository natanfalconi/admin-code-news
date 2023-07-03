<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent=''>
      <p class="col-12 text-h5 text-center">Registro</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="Nome" v-model='form.name' outlined />
        <q-input label="E-mail" v-model='form.email' outlined />
        <q-input label="Senha" v-model='form.password' outlined />

        <div class="full-width q-pt-md">
          <q-btn label='Criar cadastro' color='primary' class="full-width" @click='handleRegister' />
        </div>

        <div class="full-width">
          <q-btn label='Login' color='primary' class="full-width" flat to="/login" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const { register } = useAuthUser()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
