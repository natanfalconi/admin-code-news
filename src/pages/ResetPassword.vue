<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent=''>
      <p class="col-12 text-h5 text-center">Nova senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input label="Nova senha" v-model='newPassword' outlined />

        <div class="full-width q-pt-md">
          <q-btn label='Redefinir' color='primary' class="full-width" @click='handlePasswordReset' />
        </div>

        <!-- <div class="full-width">
          <q-btn label='Voltar' color='primary' class="full-width" flat to="/login" />
        </div> -->
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'ResetPasswordPage',
  setup() {
    const { resetPassword } = useAuthUser();
    const route = useRoute()
    const router = useRouter()
    const newPassword = ref('')

    const handlePasswordReset = async () => {
      await resetPassword(newPassword.value)
      router.push({ name: 'login' })

    }

    return {
      newPassword,
      handlePasswordReset
    }
  }
})
</script>
