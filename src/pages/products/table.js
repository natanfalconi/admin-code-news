import { formatCurrency } from 'src/utils/format'

const columnsProducts = [
    { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
    { name: 'img_url', align: 'left', label: 'Imagem', field: 'img_url', sortable: false },
    { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
    { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
    { name: 'amount', align: 'left', label: 'Quantidade', field: 'amount', sortable: true },
    { name: 'price', align: 'left', label: 'Valor', field: 'price', sortable: true, format: (val) => formatCurrency(val) },
    { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: false }
]


export {
    columnsProducts
}