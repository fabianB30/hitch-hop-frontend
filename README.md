# hitch-hop-frontend
Frontend Proyecto AP 1S-2025

## Web 
La librería de componentes utilizada para web es Shadcn
https://ui.shadcn.com/docs/installation/vite

Esta se utiliza para "construir" una biblioteca de componentes propia, por lo que cada componente debe ser descargado. Para esto se utiliza el comando 

```
npx shadcn@latest add button

```

Cambiando el tipo de componente instalado por nombre. Ver más en docs. 

Usualmente después de instalar uno es recomendable actualizar los packages. 

```
npm i
```
*El folder de ui se utiliza exclusivamente para los archivos directos de Shadcn, por favor no poner componente o archivos propios adentro.*

## Movil 
El proyecto móvil utiliza Expo y Android Studio. 

Docs de setup para ambiente de desarrollo 
https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build

### Versiones
#### SDK Android
Android 15.0 ("VanillaIceCream")

#### Emulator
Android Emulator 35.5.10

### API
36.0 "Baklava"; Android 16.0 

### Other 
Services: Google Play Store 
System Image: Google Play Intel x86_64 Atom System Image 

Android application id: com.hitchhopmovil

Es necesario seguir los pasos del development build para que el emulador funcione bien. 

Node es requisito para correr los proyectos. 

## Comandos 
Para ejecutar el proyecto web: 
    cd hitch-hop-web
    npm install --legacy-peer-deps
    npm run dev

Para ejecutar el proyecto movil: 
    cd hitch-hop-movil
    npm install --legacy-peer-deps
    npx expo start 


# Estructura Web
Dentro de la carpeta src se agregaron varias carpetas más. La idea es que estas sean utilizadas para mantener un orden conforme trabajamos el proyecto. A continuación un listado de las carpetas y sus propósitos. Tratemos de mantener este orden para evitar problemas a futuro. 

## assets
Como suele ser el caso, esta se usa para contener archivos como imágenes, logos, iconos, etc. **Si van a agregar cosas como estas, NO se ponen en la carpeta public.** Esta carpeta es la que recibe el navegador y poner cosas ahí puede afectar el rendimiento de la app. 

## components
Bastante self explanatory, acá se ponen todos los componentes que se ocupen para la construcción de la app. Vamos a manejar las carpetas por módulo. 

### consultas, login, stats
Son módulos que ya se agregaron, si hacen falta más los pueden agregar acá. 


### ui
**Acá no se ponen componentes custom.** En esta carpeta se agregan los componentes de ShadCN de manera automática, por lo que mejor evitar agregar cosas que no sean directamente relacionadas a estas. 

### shared 
Utilizada para aquellos componentes que son utilizados a través de todo el app, como por ejemplo el Sidebar. 

## context 
Para agregar contexts de react. Puede que en el futuro se ocupe un coontext handler, lo más probable que no, pero en caso de ser necesario lo pueden mencionar y lo vemos. Mientras tanto, sientanse libres de manejarlos anidados y todo debería estar bien :) 

## pages 
Para agregar las páginas del flujo de navegación (que también son componentes de react). 
**Importante:** todas las páginas acá agregadas deben ser integradas con el Router para que puedan ser accesables en la navegación del app. 

https://www.geeksforgeeks.org/what-is-react-router-dom/

Usen el componente de *Link*, es lo más fácil de usar y con buen rendimiento. 

## router
solo cosas relacionadas al Router previamente mencionado. De nuevo, si llega a ser necesario se pueden manejar las rutas de manera separada pero no debería ser necesario. Si llega a serlo lo mencionan. 