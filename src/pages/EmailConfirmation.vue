<template>
  <q-page padding>
    <p class="text-body1">Obrigado por se registrar</p>
    <p class="text-body1">Por favor, confirme seu email para finalizar o cadastro: <strong>{{ $route.query.email
    }}</strong></p>
  </q-page>

  <div class="row justify-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
      <div class="full-width">
        <q-btn label='Login' color='primary' class="full-width" to="/login" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage'
})
</script>
