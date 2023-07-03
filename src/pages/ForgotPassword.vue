<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent=''>
      <p class="col-12 text-h5 text-center">Reculperar senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="E-mail" v-model='form.email' outlined />

        <div class="full-width q-pt-md">
          <q-btn label='Enviar' color='primary' class="full-width" @click='handleForgotPassword' />
        </div>

        <div class="full-width">
          <q-btn label='Voltar' color='primary' class="full-width" flat to="/login" />
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
  name: 'ForgotPasswordPage',
  setup() {
    const { sendPasswordRestEmail } = useAuthUser()
    const form = ref({
      email: '',
    })

    const handleForgotPassword = async () => {
      await sendPasswordRestEmail(form.value)
      alert(`E-mail enviado para ${form.value.email}`)
    }

    return {
      form,
      handleForgotPassword
    }
  }
})
</script>
