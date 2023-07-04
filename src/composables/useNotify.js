import { useQuasar } from 'quasar'
export default function useNotify() {
    const $q = useQuasar()

    const notifySuccess = (message) => {
        $q.notify({
            type: 'positive',
            message: message || 'Tudo certo !',
            timeout: 1000
        })
    }

    const notifyError = (message) => {
        $q.notify({
            type: 'negative',
            message: message || 'Algo deu errado',
            timeout: 1000
        })
    }

    return {
        notifySuccess,
        notifyError
    }
}