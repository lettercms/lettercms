# Recommendation Engine

Sistema de recomendaciones basado en Brain.js

## Obtencion de datos

Lo que se quiere obtener es usar Brain.JS para crear una red neuronal para generar recomendaciones lo mas personalizadas posibles.

Para esto se van a hacer uso de 2 factores importantes.

Factor discreto, que se obtiene al dividir la cantidad de vistas de dicho post entre la cantidad de vistas total en dicha sesion multiplicado por 5.

```js
const discreteFactor = (postView / totalViews) * 5; 
```

la cual da como resultado un valor entre 0 y 5.

Y el factor directo, el cual se obtiene de una calificacion, entre 1 y 5.

Los datos para el entrenamiento seran guardados en Sesion, debido a que al obtener los datos discretos, el valor de cada posts puede cambiar. Y los datos directos son inmutables.

Una vez el usuario finaliza su sesion y sale del sitio web, los datos de dicha sesion se enviaran al **servidor de entrenamiento** el cual debera entar en Heroku, Digital Ocean o El otro q dijo Luis. Se obtiene el modelo en formato JSON de la BBDD principal en Mongo, una vez entrenado el modelo, se exporta nuevamente en JSON y se actualiza la BBDD con el nuevo modelo.

## Entrega de datos

los datos seran servidos mediante una API alojada en Vercel.

Se recibe la peticion del cliente.

### Usuarios

Para usuarios se recibira el siguiente esquema a travez de una peticion **GET**:

```js
{
  query: {
    user: "<uid>", //Get on Vercel Params
    limit: 10, //By default
    sort: "desc", // By default
    page: 1 //By default
  }
}
// GET /api/recommendation/<uid>?limit=10&sort=desc&page=1

```
Retornara como respuesta un Objeto con los posts ordenados desde el mas recomendado hasta el menos recomendado para dicho usuario.

### Posts

Para los posts se manejara el mismo esquema anterior pero con la siguiente URL:
**/api/recommendation/post/\<postUrl>**

Este retornara los posts similares por orden descendente