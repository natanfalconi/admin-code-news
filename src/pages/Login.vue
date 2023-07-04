<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent='handleLogin'>
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="E-mail" v-model='form.email' outlined
          :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" lazy-rules type="email" />
        <q-input label="Senha" v-model='form.password' outlined
          :rules="[val => (val && val.length > 0) || 'Campo Obrigatório']" lazy-rules type="password" />

        <div class="full-width q-pt-md">
          <q-btn label='Entrar' color='primary' class="full-width" outlined type='submit' />
        </div>

        <div class="full-width">
          <q-btn label='Registro' color='primary' class="full-width" flat to="/register" />
          <q-btn label='Reculperar senha' color='primary' class="full-width" flat to="/forgot-password" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/useNotify'

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  },
})
</script>
