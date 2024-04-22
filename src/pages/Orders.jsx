import React from 'react';

//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';

function Orders() {
  return (
    <div>
      <PageHeader title="Listado de Pedidos"></PageHeader>
      <PageContent>
        <h2>Contenido principal</h2>
        <p>Esta es una página web de ejemplo. Puedes agregar aquí todo tipo de contenido, como texto, imágenes, videos, formularios y mucho más.</p>
        <img src="https://via.placeholder.com/400" alt="Imagen de ejemplo" />
        <p>¡Espero que disfrutes creando tu propia página web!</p>

      </PageContent>
    </div>
  );
}

export default Orders;