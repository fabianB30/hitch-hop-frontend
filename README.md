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

Es necesario seguir los pasos del development build para que el emulador funcione bien 
