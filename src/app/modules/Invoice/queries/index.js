import axios from 'axios';

export default {
  customers: {
    get: () => axios.get(`/api/customers`)
      .catch((error) => {
        console.log(error);
      }),
  },
  products: {
    get: () => axios.get(`/api/products`)
      .catch((error) => {
        console.log(error);
      }),
  },
  invoices: {
    get: (params) => axios.get(`/api/invoices`)
      .catch((error) => {
        console.log(error);
      }),
  },
  invoice: {
    get: (params) => axios.get(`/api/invoices/${params.invoice_id}`)
      .catch((error) => {
        console.log(error);
      }),
    post: (params, data) => axios.post(`/api/invoices`, {
      customer_id: data.customer_id,
      discount: data.discount,
      total: data.total,
    })
      .catch((error) => {
        console.log(error);
      }),
    put: (params, data) => axios.put(`/api/invoices/${params.invoice_id}`, {
      customer_id: data.customer_id,
      discount: data.discount,
      total: data.total,
    })
      .catch((error) => {
        console.log(error);
      }),
  },
  invoiceItems: {
    get: (params) => axios.get(`/api/invoices/${params.invoice_id}/items`)
      .catch((error) => {
        console.log(error);
      }),
    post: (params, data) => axios.post(`/api/invoices/${params.invoice_id}/items`, {
      product_id: data.product_id,
      quantity: data.quantity,
    })
      .catch((error) => {
        console.log(error);
      }),
    delete: (params) => axios.delete(`/api/invoices/${params.invoice_id}/items/${params.id}`)
      .catch((error) => {
        console.log(error);
      }),
    put: (params, data) => axios.put(`/api/invoices/${params.invoice_id}/items/${params.id}`, {
      product_id: data.product_id,
      quantity: data.quantity,
    })
      .catch((error) => {
        console.log(error);
      }),
  },
}
